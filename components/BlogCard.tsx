/* eslint-disable */
import Link from "next/link";
import Image from "next/image";

export function BlogCard({ post }: { post: any }) {
  const imageUrl = post.cover?.file_url;
  const imageAlt = post.cover?.alt || post.h1;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm h-full card-tech hover:border-primary/40 transition-all duration-400 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-secondary">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
            />
            {/* Scanline overlay */}
            <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full tech-grid flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-12 h-12 opacity-15">
              <ellipse cx="50" cy="50" rx="24" ry="15" fill="none" stroke="#00d278" strokeWidth="2"/>
              <circle cx="50" cy="50" r="9" fill="none" stroke="#00d278" strokeWidth="2"/>
              <circle cx="50" cy="50" r="4" fill="#00d278"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {/* Category */}
        {post.category?.label && (
          <span className="absolute top-3 left-3 tag-tech">{post.category.label}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-sans font-semibold text-base text-foreground/90 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
          {post.h1}
        </h3>
        {post.description && (
          <p className="text-foreground/50 text-sm line-clamp-3 mb-4 flex-1 font-sans leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-2 pt-3 border-t border-primary/8">
          <span className="text-xs font-mono text-primary/60 group-hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider">
            <span className="text-primary/40">&gt;</span> Lire l&apos;analyse
            <svg className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
