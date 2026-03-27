/* eslint-disable */
import { getPublishedBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Guides & Tests — Équipements Surveillance",
  description:
    "Tous nos guides d'achat, tests et comparatifs de caméras espion, micros cachés, GPS trackers et équipements de surveillance discrète.",
};

export default async function BlogIndex() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <Header />

      <div className="relative py-20 overflow-hidden border-b border-primary/10"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,210,120,0.06) 0%, transparent 60%)" }}
      >
        <div className="green-line absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="section-eyebrow">Base de Données</span>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
            Guides <span className="text-primary">&</span> Analyses
          </h1>
          <p className="text-foreground/55 font-sans">
            Caméras espion, micros cachés, GPS trackers, contre-surveillance —
            tous nos tests et guides d'achat indépendants.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 min-h-[50vh]">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post: any) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="card-tech p-16 rounded-sm text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs text-primary/40 block mb-3">[LOADING...]</span>
            <p className="text-xl text-foreground/40 font-sans">
              Aucun article publié pour le moment.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
