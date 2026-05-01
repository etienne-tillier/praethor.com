import Link from "next/link";
import { BlogPost } from "@/types";

const LANG_MAP: Record<string, string> = { fr: "Français", en: "English", es: "Español", de: "Deutsch", it: "Italiano", nl: "Nederlands", pt: "Português" };
type LanguageLink = { lang: string; slug: string; label: string };

export function getAvailableLanguages(post: BlogPost, currentSlug: string): LanguageLink[] {
    const links: LanguageLink[] = [];
    if (post.default_locale) {
        const code = post.default_locale.split("-")[0].toLowerCase();
        links.push({ lang: code, slug: post.slug, label: LANG_MAP[code] || code.toUpperCase() });
    } else { links.push({ lang: "fr", slug: post.slug, label: "Français" }); }
    if (post.translations) {
        let translations = post.translations;
        if (typeof translations === "string") { try { translations = JSON.parse(translations); } catch { /* noop */ } }
        Object.entries(translations).forEach(([key, val]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const t = val as any;
            if (t.slug) { const code = key.split("-")[0].toLowerCase(); links.push({ lang: code, slug: t.slug, label: LANG_MAP[code] || code.toUpperCase() }); }
        });
    }
    return links.filter((l) => l.slug !== currentSlug);
}

export function LanguageSwitcher({ post, currentSlug, className = "" }: { post: BlogPost; currentSlug: string; className?: string }) {
  // Legacy translations are intentionally hidden from the UI; unique translated URLs remain reachable for indexing.
  return null;
    const otherLinks = getAvailableLanguages(post, currentSlug);
    if (otherLinks.length === 0) return null;
    return (
        <div className={`flex gap-3 items-center text-sm ${className}`}>
            <span className="opacity-60">Lire en :</span>
            {otherLinks.map((l) => (<Link key={l.lang} href={`/blog/${l.slug}`} className="underline decoration-1 underline-offset-2 hover:opacity-80 transition-opacity uppercase font-medium">{l.label}</Link>))}
        </div>
    );
}
