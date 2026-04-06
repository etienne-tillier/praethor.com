/* eslint-disable */
import { MarkdownLink } from "@/components/MarkdownLink";
import { injectDofollowMarker } from "@/lib/dofollow";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

const buildAlternatesByLocale = (post: { slug: string; default_locale?: string | null; translations?: unknown }) => {
  const siteOriginRaw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteOrigin = siteOriginRaw
    ? siteOriginRaw.replace(/\/+$/, "")
    : `https://${(process.env.SITE_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  if (!siteOrigin || siteOrigin === "https://") {
    return {};
  }

  const languages: Record<string, string> = {};
  const defaultLocale = post.default_locale || "fr-FR";
  languages[defaultLocale] = `${siteOrigin}/blog/${post.slug}`;

  if (post.translations && typeof post.translations === "object") {
    for (const [locale, value] of Object.entries(post.translations as Record<string, unknown>)) {
      if (!value || typeof value !== "object") continue;
      const translation = value as Record<string, unknown>;
      const translatedSlug = typeof translation.slug === "string" ? translation.slug : "";
      const status = typeof translation.status === "string" ? translation.status : "published";

      if (!translatedSlug || status !== "published") continue;
      languages[locale] = `${siteOrigin}/blog/${translatedSlug}`;
    }
  }

  return languages;
};

export const revalidate = 21600;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    alternates: { languages: buildAlternatesByLocale(post) },
    title: post.h1,
    description: (post as any).description || undefined,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return notFound();

  // Traduction
  let displayH1 = post.h1;
  let displayBody = post.body_md;
  if (post.slug !== slug && post.translations) {
    for (const [_key, val] of Object.entries(post.translations)) {
      if ((val as any).slug === slug) {
        displayH1 = (val as any).h1 || displayH1;
        displayBody = (val as any).body_md || displayBody;
        break;
      }
    }
  }
  const bodyMd = injectDofollowMarker(displayBody || "");

  return (
    <>
      <Header />
      <article className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 max-w-4xl pt-12">
          {/* Article header */}
          <header className="mb-10 text-center">
            {(post as any).category?.label && (
              <span className="section-eyebrow">{(post as any).category.label}</span>
            )}
            <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6 leading-tight">
              {displayH1}
            </h1>
            {(post as any).description && (
              <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto font-sans">
                {(post as any).description}
              </p>
            )}
            <LanguageSwitcher post={post} currentSlug={slug} />
          </header>

          {/* Cover image */}
          {post.cover?.file_url && (
            <div className="mb-12 rounded-sm overflow-hidden shadow-2xl border border-accent/20">
              <Image
                src={post.cover.file_url}
                alt={post.cover.alt || displayH1}
                width={1200}
                height={630}
                priority
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Body */}
          <div className="card-arcane rounded-sm p-6 sm:p-10 md:p-12">
            <div className="prose prose-lg prose-invert max-w-none prose-headings:font-heading prose-headings:text-accent prose-p:text-foreground/80 prose-a:text-accent prose-strong:text-accent prose-li:text-foreground/75 prose-blockquote:border-accent prose-blockquote:text-foreground/70">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{ a: MarkdownLink as any }}
              >
                {bodyMd}
              </ReactMarkdown>
            </div>

            {/* Author */}
            {post.author && (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-12 pt-8 border-t border-accent/15 text-center sm:text-left">
                {post.author.avatar_url && (
                  <Image
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-sm object-cover shadow-lg border border-accent/20"
                  />
                )}
                <div>
                  <p className="font-heading font-bold text-lg text-accent">
                    {post.author.name}
                  </p>
                  {post.author.bio && (
                    <p className="text-foreground/55 mt-1 font-sans text-sm">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
