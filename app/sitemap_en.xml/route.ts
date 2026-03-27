import { generateSitemapXml } from "@/lib/sitemap-helper";
export const revalidate = 86400;
export async function GET() { const xml = await generateSitemapXml("en"); return new Response(xml, { headers: { "Content-Type": "application/xml" } }); }
