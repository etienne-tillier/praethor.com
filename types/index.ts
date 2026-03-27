export interface Site { id: string; domain: string; name: string; }
export interface Author { id?: string; slug?: string; name: string; full_name?: string; avatar_url?: string; photo_url?: string; bio?: string; role?: string; description?: string; }
export interface Category { id: string; slug: string; label: string; description?: string; }
export interface BlogPost {
    id: string; slug: string; h1: string; seo_title?: string; meta_title?: string;
    meta_description: string; published_at: string; updated_at?: string; body_md?: string;
    excerpt?: string; focus_keyword?: string; reading_time?: number;
    tags?: string[]; canonical_url?: string;
    cover?: { file_url: string; alt?: string };
    author?: Author; categories?: Category[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translations?: Record<string, any>;
    default_locale?: string; faqs?: Array<{ question: string; answer: string }>;
}
