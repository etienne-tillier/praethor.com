export const revalidate = 86400;
export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
    const langs = ["fr", "en", "es", "de", "it"];
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${langs.map((lang) => `\n  <sitemap>\n    <loc>${baseUrl}/sitemap_${lang}.xml</loc>\n  </sitemap>`).join("")}
</sitemapindex>`;
    return new Response(sitemapIndex, { headers: { "Content-Type": "application/xml" } });
}
