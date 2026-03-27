import { supabaseAdmin } from "./supabase";
import { BlogPost } from "@/types";

const SITE_DOMAIN = (process.env.SITE_DOMAIN || "").replace(/^https?:\/\//, "");

// ─── Optimized SELECT constants (egress reduction) ───────────────────────────

/** Lightweight select for listings (blog index, home, related posts). Never includes body_md or translations. */
const BLOG_LISTING_SELECT = `
  id, slug, h1, seo_title, meta_description, published_at, default_locale, excerpt,
  cover:blog_assets(file_url, alt_text),
  author:authors(name, avatar_url),
  categories:blog_post_categories(category:site_categories(id, slug, label))
`;

/** Full select for single article page. Includes body_md, translations, faqs. */
const BLOG_DETAIL_SELECT = `
  id, slug, h1, seo_title, meta_description, body_md, published_at, updated_at,
  default_locale, focus_keyword, excerpt, translations, faqs,
  cover:blog_assets(file_url, alt_text),
  author:authors(name, avatar_url, bio, role),
  categories:blog_post_categories(category:site_categories(id, slug, label))
`;

// ─── Site ID resolution ──────────────────────────────────────────────────────

let cachedSiteId: string | null = null;

async function getSiteId(): Promise<string | null> {
    if (cachedSiteId) return cachedSiteId;
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

    cachedSiteId = site.id;
    return site.id;
}

// ─── Helper: normalize nested Supabase response ─────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePost(post: any): BlogPost {
    // Parse JSON string fields if needed
    if (typeof post.translations === "string") {
        try { post.translations = JSON.parse(post.translations); } catch { /* noop */ }
    }
    if (typeof post.faqs === "string") {
        try { post.faqs = JSON.parse(post.faqs); } catch { /* noop */ }
    }

    return {
        ...post,
        meta_title: post.seo_title || post.meta_title,
        cover: Array.isArray(post.cover) ? post.cover[0] : post.cover,
        author: Array.isArray(post.author) ? post.author[0] : post.author,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        categories: post.categories?.map((c: any) => c.category).filter(Boolean) || [],
    };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getPublishedBlogPosts(limit?: number): Promise<BlogPost[]> {
    const siteId = await getSiteId();
    if (!siteId || !supabaseAdmin) return [];

    let query = supabaseAdmin
        .from("blog_posts")
        .select(BLOG_LISTING_SELECT)
        .eq("site_id", siteId)
        .eq("status", "published")
        .not("published_at", "is", null)
        .order("published_at", { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return (data || []).map(normalizePost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const siteId = await getSiteId();
    if (!siteId || !supabaseAdmin) return null;

    // 1. Try direct slug match (most common, cheapest)
    const { data: post, error } = await supabaseAdmin
        .from("blog_posts")
        .select(BLOG_DETAIL_SELECT)
        .eq("site_id", siteId)
        .eq("slug", slug)
        .single();

    if (!error && post) return normalizePost(post);

    // 2. Fallback: search in translations JSONB (optimized — lightweight select first)
    const { data: candidates } = await supabaseAdmin
        .from("blog_posts")
        .select("id, slug, translations")
        .eq("site_id", siteId)
        .eq("status", "published")
        .not("translations", "is", null);

    if (!candidates) return null;

    const matchedCandidate = candidates.find((candidate) => {
        if (!candidate.translations) return false;
        let translations = candidate.translations;
        if (typeof translations === "string") {
            try { translations = JSON.parse(translations); } catch { return false; }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Object.values(translations).some((t: any) => t.slug === slug);
    });

    if (!matchedCandidate) return null;

    // 3. Found a match — fetch the full post by ID (single row, full select)
    const { data: fullPost } = await supabaseAdmin
        .from("blog_posts")
        .select(BLOG_DETAIL_SELECT)
        .eq("id", matchedCandidate.id)
        .single();

    if (!fullPost) return null;
    return normalizePost(fullPost);
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
    const siteId = await getSiteId();
    if (!siteId || !supabaseAdmin) return [];

    const { data: category } = await supabaseAdmin
        .from("site_categories")
        .select("id")
        .eq("site_id", siteId)
        .eq("slug", categorySlug)
        .single();

    if (!category) return [];

    const { data: posts, error } = await supabaseAdmin
        .from("blog_posts")
        .select(BLOG_LISTING_SELECT)
        .eq("site_id", siteId)
        .eq("status", "published")
        .eq("categories.category_id", category.id)
        .order("published_at", { ascending: false });

    if (error) return [];
    return (posts || []).map(normalizePost);
}

export async function getAllCategories(): Promise<{ id: string; slug: string; label: string }[]> {
    const siteId = await getSiteId();
    if (!siteId || !supabaseAdmin) return [];

    const { data, error } = await supabaseAdmin
        .from("site_categories")
        .select("id, slug, label")
        .eq("site_id", siteId);

    if (error) return [];
    return data || [];
}

export async function getBlogPostsForSitemap(lang: string = "fr") {
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

        if (post.default_locale?.toLowerCase().startsWith(langLower)) {
            isMatch = true;
        }

        if (post.translations) {
            let translations = post.translations;
            if (typeof translations === "string") {
                try { translations = JSON.parse(translations); } catch { /* noop */ }
            }

            const matchingKey = Object.keys(translations).find((key) =>
                key.toLowerCase().startsWith(langLower)
            );

            if (matchingKey) {
                isMatch = true;
                if (translations[matchingKey]?.slug) {
                    finalSlug = translations[matchingKey].slug;
                }
            }
        }

        if (isMatch) {
            acc.push({
                slug: finalSlug,
                updated_at: post.published_at,
            });
        }
        return acc;
    }, []);
}

export { getSiteId };
