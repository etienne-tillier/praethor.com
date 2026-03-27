import type { Metadata } from "next";
import "./globals.css";

/**
 * Minimal root layout. The AI agent MUST:
 * 1. Import and configure Google Fonts here
 * 2. Add <Header /> and <Footer /> components
 * 3. Set proper metadata from the thematic brief
 *
 * This file is intentionally bare — the agent customizes it per site.
 */

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_SITE_NAME || "Mon Site",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
