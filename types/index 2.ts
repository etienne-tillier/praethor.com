export interface Site {
    id: string;
    domain: string;
    name: string;
}

export interface Author {
    id?: string;
    name: string;
    avatar_url?: string;
    bio?: string;
    role?: string;
}

export interface Category {
    id: string;
    slug: string;
    label: string;
    description?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    h1: string;
    seo_title?: string;
    meta_title?: string;
    meta_description: string;
    published_at: string;
    updated_at?: string;
    body_md?: string;
    excerpt?: string;
    focus_keyword?: string;
    cover?: {
        file_url: string;
        alt_text?: string;
    };
    author?: Author;
    categories?: Category[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translations?: Record<string, any>;
    default_locale?: string;
    faqs?: Array<{ question: string; answer: string }>;
}
