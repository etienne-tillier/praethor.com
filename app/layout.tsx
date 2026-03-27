import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_SITE_NAME || "Mon Site",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
