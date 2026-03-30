import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "./supabase";
import { BlogPost } from "@/types";

export type { BlogPost } from "@/types";

const SITE_ID = process.env.SITE_ID?.trim() || null;
const SITE_DOMAIN = (process.env.SITE_DOMAIN || "").replace(/^https?:\/\//, "");
const SITE_CACHE_KEY = SITE_ID || SITE_DOMAIN || "unknown-site";
export const POSTS_PER_PAGE = 12;

const BLOG_LISTING_SELECT = `
  id, slug, h1, seo_title, meta_description, published_at, default_locale, excerpt,
  cover:blog_assets!cover_asset_id(file_url, alt),
  author:authors(name, avatar_url),
  categories:blog_post_categories(category:site_categories(id, slug, label))
`;

const BLOG_DETAIL_SELECT = `
  id, slug, h1, seo_title, meta_description, body_md, published_at, updated_at,
  default_locale, focus_keyword, excerpt, translations, faqs,
  cover:blog_assets!cover_asset_id(file_url, alt),
  author:authors(name, avatar_url, bio),
  categories:blog_post_categories(category:site_categories(id, slug, label))
`;

const getCachedSiteId = unstable_cache(
    async (): Promise<string | null> => {
        if (!supabaseAdmin || !SITE_DOMAIN) return null;

        const { data: site, error } = await supabaseAdmin
            .from("sites")
            .select("id")
            .eq("domain", SITE_DOMAIN)
            .single();

        if (error || !site) {
            console.error("Site not found for domain:", SITE_DOMAIN);
            return null;
        }

        return site.id;
    },
    [`site-id:${SITE_CACHE_KEY}`],
    { revalidate: 86400 }
);

async function getSiteId(): Promise<string | null> {
    if (SITE_ID) return SITE_ID;
    return getCachedSiteId();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePost(post: any): BlogPost {
    if (typeof post.translations === "string") { try { post.translations = JSON.parse(post.translations); } catch { /* noop */ } }
    if (typeof post.faqs === "string") { try { post.faqs = JSON.parse(post.faqs); } catch { /* noop */ } }
    return {
        ...post,
        meta_title: post.seo_title || post.meta_title,
        cover: Array.isArray(post.cover) ? post.cover[0] : post.cover,
        author: Array.isArray(post.author) ? post.author[0] : post.author,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        categories: post.categories?.map((c: any) => c.category).filter(Boolean) || [],
    };
}

function parseTranslations(translations: unknown): Record<string, any> {
    if (!translations) return {};
    if (typeof translations === "string") {
        try {
            return JSON.parse(translations);
        } catch {
            return {};
        }
    }
    if (typeof translations === "object") {
        return translations as Record<string, any>;
    }
    return {};
}

function matchesSearch(post: BlogPost, rawSearchTerm?: string | null): boolean {
    if (!rawSearchTerm) return true;

    const searchTerm = rawSearchTerm.trim().toLowerCase();
    if (!searchTerm) return true;

    const translations = parseTranslations(post.translations);
    const haystack = [
        post.slug,
        post.h1,
        post.seo_title,
        post.meta_description,
        post.excerpt,
        ...((post.categories || []).flatMap((category: any) => [category?.slug, category?.label])),
        ...Object.values(translations).flatMap((translation: any) => [
            translation?.slug,
            translation?.h1,
            translation?.seo_title,
            translation?.meta_description,
        ]),
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    return haystack.includes(searchTerm);
}

function parsePublishedPostsArgs(args: unknown[]) {
    let locale: string | undefined;
    let limit: number | undefined;
    let offset = 0;
    let searchTerm: string | undefined;

    if (typeof args[0] === "string") {
        const firstArg = args[0].trim();
        if (/^[a-z]{2}(?:-[A-Z]{2})?$/.test(firstArg)) {
            locale = firstArg;
            if (typeof args[1] === "number") limit = args[1];
            if (typeof args[2] === "number") offset = args[2];
            if (typeof args[3] === "string") searchTerm = args[3];
        } else {
            searchTerm = firstArg;
            if (typeof args[1] === "number") limit = args[1];
            if (typeof args[2] === "number") offset = args[2];
        }
    } else {
        if (typeof args[0] === "number") limit = args[0];
        if (typeof args[1] === "number") offset = args[1];
        if (typeof args[1] === "string") searchTerm = args[1];
        if (typeof args[2] === "string") searchTerm = args[2];

        if (limit === 0 && typeof args[1] === "number" && args[1] > 0) {
            offset = 0;
            limit = args[1];
        }
    }

    return { locale, limit, offset, searchTerm };
}

const getAllPublishedBlogPostsCached = unstable_cache(
    async (): Promise<BlogPost[]> => {
        const siteId = await getSiteId();
        if (!siteId || !supabaseAdmin) return [];

        const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .select(BLOG_LISTING_SELECT)
            .eq("site_id", siteId)
            .eq("status", "published")
            .not("published_at", "is", null)
            .order("published_at", { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
            return [];
        }

        return (data || []).map(normalizePost);
    },
    [`published-posts:${SITE_CACHE_KEY}`],
    { revalidate: 21600 }
);

export async function getPublishedBlogPosts(...args: unknown[]): Promise<BlogPost[]> {
    const { locale, limit, offset, searchTerm } = parsePublishedPostsArgs(args);
    let posts = await getAllPublishedBlogPostsCached();

    posts = posts.filter((post) => matchesSearch(post, searchTerm));

    if (locale) {
        const localeLower = locale.toLowerCase();
        posts = posts.filter((post) => {
            const translations = parseTranslations(post.translations);
            return (
                post.default_locale?.toLowerCase().startsWith(localeLower) ||
                Object.keys(translations).some((key) => key.toLowerCase().startsWith(localeLower))
            );
        });
    }

    if (typeof limit !== "number") {
        return posts.slice(offset);
    }

    return posts.slice(offset, offset + limit);
}

export async function getPublishedBlogPostsCount(searchTerm?: string): Promise<number> {
    const posts = await getAllPublishedBlogPostsCached();
    return posts.filter((post) => matchesSearch(post, searchTerm)).length;
}

const getBlogPostIdBySlugCached = unstable_cache(
    async (slug: string): Promise<string | null> => {
        const siteId = await getSiteId();
        if (!siteId || !supabaseAdmin) return null;

        const { data: directPost, error: directError } = await supabaseAdmin
            .from("blog_posts")
            .select("id")
            .eq("site_id", siteId)
            .eq("status", "published")
            .eq("slug", slug)
            .maybeSingle();

        if (directError) return null;
        if (directPost?.id) return directPost.id;

        const legacyEncodedSlug = (() => {
            const encoded = encodeURIComponent(slug)
                .toLowerCase()
                .replace(/%/g, "");

            return encoded && encoded !== slug.toLowerCase() ? encoded : null;
        })();

        const fallbackCandidates = legacyEncodedSlug
            ? [slug, legacyEncodedSlug]
            : [slug];

        for (const candidateSlug of fallbackCandidates) {
            const { data: fallbackPostId, error: fallbackError } = await supabaseAdmin.rpc(
                "find_published_blog_post_id_by_any_slug",
                { p_site_id: siteId, p_slug: candidateSlug }
            );

            if (fallbackError) {
                console.error("RPC find_published_blog_post_id_by_any_slug failed", fallbackError);
                continue;
            }

            if (typeof fallbackPostId === "string" && fallbackPostId.length > 0) {
                return fallbackPostId;
            }
        }

        return null;
    },
    [`blog-post-id-by-slug:${SITE_CACHE_KEY}`],
    { revalidate: 21600 }
);

const getBlogPostByIdCached = unstable_cache(
    async (id: string): Promise<BlogPost | null> => {
        const siteId = await getSiteId();
        if (!siteId || !supabaseAdmin) return null;

        const { data: post, error } = await supabaseAdmin
            .from("blog_posts")
            .select(BLOG_DETAIL_SELECT)
            .eq("site_id", siteId)
            .eq("id", id)
            .eq("status", "published")
            .single();

        if (error || !post) return null;
        return normalizePost(post);
    },
    [`blog-post-by-id:${SITE_CACHE_KEY}`],
    { revalidate: 21600 }
);

const getBlogPostBySlugCached = unstable_cache(
    async (slug: string): Promise<BlogPost | null> => {
        const postId = await getBlogPostIdBySlugCached(slug);
        if (!postId) return null;
        return getBlogPostByIdCached(postId);
    },
    [`blog-post-by-slug:${SITE_CACHE_KEY}`],
    { revalidate: 21600 }
);

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    return getBlogPostBySlugCached(slug);
}

const getPostsByCategoryCached = unstable_cache(
    async (categorySlug: string): Promise<BlogPost[]> => {
        const posts = await getAllPublishedBlogPostsCached();
        return posts.filter((post) =>
            (post.categories || []).some((category) => category?.slug === categorySlug)
        );
    },
    [`posts-by-category:${SITE_CACHE_KEY}`],
    { revalidate: 21600 }
);


export async function getPostsByCategory(categorySlug: string, limit?: number, offset: number = 0): Promise<BlogPost[]> {
    const posts = await getPostsByCategoryCached(categorySlug);
    if (typeof limit !== "number") return posts.slice(offset);
    return posts.slice(offset, offset + limit);
}

const getCategoryInfoCached = unstable_cache(
    async (slug: string): Promise<{ id: string; slug: string; label: string; description?: string | null } | null> => {
        const siteId = await getSiteId();
        if (!siteId || !supabaseAdmin) return null;

        const { data, error } = await supabaseAdmin
            .from("site_categories")
            .select("id, slug, label, description")
            .eq("site_id", siteId)
            .eq("slug", slug)
            .single();

        if (error) return null;
        return data;
    },
    [`category-info:${SITE_CACHE_KEY}`],
    { revalidate: 21600 }
);

export async function getCategoryInfo(slug: string) {
    return getCategoryInfoCached(slug);
}

export async function getCategoryBySlug(slug: string) {
    return getCategoryInfo(slug);
}

const getAllCategoriesCached = unstable_cache(
    async (): Promise<{ id: string; slug: string; label: string }[]> => {
        const siteId = await getSiteId();
        if (!siteId || !supabaseAdmin) return [];

        const { data, error } = await supabaseAdmin
            .from("site_categories")
            .select("id, slug, label")
            .eq("site_id", siteId);

        if (error) return [];
        return data || [];
    },
    [`all-categories:${SITE_CACHE_KEY}`],
    { revalidate: 21600 }
);

export async function getAllCategories(): Promise<{ id: string; slug: string; label: string }[]> {
    return getAllCategoriesCached();
}

export async function getCategories(): Promise<{ id: string; slug: string; label: string }[]> {
    return getAllCategories();
}

export async function getBlogPostsByCategory(categorySlug: string, limit?: number, offset: number = 0): Promise<BlogPost[]> {
    const posts = await getPostsByCategory(categorySlug);
    if (typeof limit !== "number") return posts.slice(offset);
    return posts.slice(offset, offset + limit);
}

export async function getBlogPostsByCategoryCount(categorySlug: string): Promise<number> {
    const posts = await getPostsByCategory(categorySlug);
    return posts.length;
}

export function getPostMetadata(post: BlogPost, locale?: string) {
    const translations = parseTranslations(post.translations);
    const translated = locale ? translations[locale] : null;

    return {
        title: translated?.seo_title || translated?.h1 || post.seo_title || post.h1,
        description: translated?.meta_description || post.meta_description || post.excerpt || "",
        slug: translated?.slug || post.slug,
    };
}

export async function getPostTranslations(post: BlogPost) {
    const translations = parseTranslations(post.translations);
    const allTranslations: Record<string, { slug: string }> = {};

    if (post.default_locale && post.slug) {
        allTranslations[post.default_locale] = { slug: post.slug };
    }

    Object.entries(translations).forEach(([locale, translation]: [string, any]) => {
        if (translation?.status === "published" && translation?.slug) {
            allTranslations[locale] = { slug: translation.slug };
        }
    });

    return allTranslations;
}

export async function getRelatedPosts(postId: string, _tags?: unknown, limit: number = 3): Promise<BlogPost[]> {
    const posts = await getAllPublishedBlogPostsCached();
    const currentPost = posts.find((post) => post.id === postId);

    if (!currentPost) {
        return posts.slice(0, limit);
    }

    const currentCategorySlugs = new Set(
        (currentPost.categories || []).map((category) => category?.slug).filter((slug): slug is string => Boolean(slug))
    );

    const related = posts
        .filter((post) => post.id !== postId)
        .map((post) => {
            const overlap = (post.categories || []).reduce((score: number, category) => {
                if (category?.slug && currentCategorySlugs.has(category.slug)) return score + 1;
                return score;
            }, 0);
            return { post, overlap };
        })
        .filter((entry) => entry.overlap > 0)
        .sort((a, b) => {
            if (b.overlap !== a.overlap) return b.overlap - a.overlap;
            return new Date(b.post.published_at || 0).getTime() - new Date(a.post.published_at || 0).getTime();
        })
        .slice(0, limit)
        .map((entry) => entry.post);

    if (related.length > 0) return related;

    return posts.filter((post) => post.id !== postId).slice(0, limit);
}


const getBlogPostsForSitemapCached = unstable_cache(
    async (lang: string = "fr") => {
        const siteId = await getSiteId();
        if (!siteId || !supabaseAdmin) return [];

        const { data: posts, error } = await supabaseAdmin
            .from("blog_posts")
            .select("slug, updated_at, published_at, default_locale, translations")
            .eq("site_id", siteId)
            .eq("status", "published")
            .not("published_at", "is", null);

        if (error || !posts) return [];

        const langLower = lang.toLowerCase();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return posts.reduce((acc: any[], post) => {
            let finalSlug = post.slug;
            let isMatch = false;

            if (post.default_locale?.toLowerCase().startsWith(langLower)) isMatch = true;

            if (post.translations) {
                let translations = post.translations;
                if (typeof translations === "string") {
                    try {
                        translations = JSON.parse(translations);
                    } catch {
                        /* noop */
                    }
                }

                const matchingKey = Object.keys(translations).find((key) => key.toLowerCase().startsWith(langLower));
                if (matchingKey) {
                    isMatch = true;
                    if (translations[matchingKey]?.slug) finalSlug = translations[matchingKey].slug;
                }
            }

            if (isMatch) acc.push({ slug: finalSlug, updated_at: post.published_at });
            return acc;
        }, []);
    },
    [`blog-posts-for-sitemap:${SITE_CACHE_KEY}`],
    { revalidate: 21600 }
);

export async function getBlogPostsForSitemap(lang: string = "fr") {
    return getBlogPostsForSitemapCached(lang);
}

export { getSiteId };
