import type { NextConfig } from "next";
const config: NextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            { protocol: "https", hostname: "pub-04ceb20f6a914fb588a8026b02652d02.r2.dev" },
            { protocol: "https", hostname: "pub-b3187798a9984007aaf6f0c22cc7265a.r2.dev" },
            { protocol: "https", hostname: "pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev" },
            { protocol: "https", hostname: "*.supabase.co" },
            { protocol: "https", hostname: "images.unsplash.com" },
        ],
    },
    experimental: {},
};
export default config;
