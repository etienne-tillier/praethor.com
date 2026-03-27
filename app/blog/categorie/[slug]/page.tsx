/* eslint-disable */
import { getPostsByCategory, getCategoryBySlug } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 21600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.label} — Guides JDR`,
    description: category.description || undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return notFound();

  const posts = await getPostsByCategory(category.id);

  return (
    <>
      <Header />

      <div className="relative py-20 overflow-hidden border-b border-accent/10"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(212,165,45,0.08) 0%, transparent 60%)",
        }}
      >
        <div className="gold-line absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="section-eyebrow">Catégorie</span>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6">
            {category.label}
          </h1>
          {category.description && (
            <p className="text-lg text-foreground/60 font-sans">{category.description}</p>
          )}
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 min-h-[50vh]">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="card-arcane p-16 rounded-sm text-center max-w-3xl mx-auto">
            <div className="text-5xl mb-6 opacity-20">📜</div>
            <p className="text-xl text-foreground/50 font-heading">
              Aucun article publié pour le moment.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
