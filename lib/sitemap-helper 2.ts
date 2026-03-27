import { getBlogPostsForSitemap } from "./blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

/**
 * Generate a sitemap XML string for a given locale.
 * @param lang - The locale code (e.g., 'fr', 'en', 'es', 'de', 'it')
 * @param staticPages - Array of static page paths to include (only for the default locale 'fr')
 */
export async function generateSitemapXml(
    lang: string,
    staticPages: string[] = [
        "",
        "/blog",
        "/contact",
        "/a-propos",
        "/mentions-legales",
        "/politique-confidentialite",
    ]
) {
    const posts = await getBlogPostsForSitemap(lang);

    let urls: { loc: string; lastmod: string }[] = [];

    // Static pages only for the default locale (fr)
    if (lang === "fr") {
        urls = staticPages.map((route) => ({
            loc: `${BASE_URL}${route}`,
            lastmod: new Date().toISOString(),
        }));
    }

    // Blog posts for this locale
    urls = [
        ...urls,
        ...posts.map((post: { slug: string; updated_at?: string }) => ({
            loc: `${BASE_URL}/blog/${post.slug}`,
            lastmod: post.updated_at || new Date().toISOString(),
        })),
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
            .map(
                (url) => `
    <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
    </url>`
            )
            .join("")}
</urlset>`;
}
