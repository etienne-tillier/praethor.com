import Link from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

type LinkProps = DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

/**
 * Custom link component for ReactMarkdown.
 *
 * Rules:
 * - Internal links (relative or same domain): rendered as Next.js <Link>, no rel attribute
 * - External links (default): rel="nofollow noopener noreferrer", target="_blank"
 * - External dofollow links (marked with __dofollow param): rel="noopener noreferrer", target="_blank"
 *
 * The dofollow marker is injected by lib/dofollow.ts before the markdown is passed to ReactMarkdown.
 */
export const MarkdownLink = ({ href, children, ...props }: LinkProps) => {
    if (!href) return <a {...props}>{children}</a>;

    // ─── Detect dofollow marker ────────────────────────────────────────
    const dofollowMarker = "{dofollow}";
    const dofollowMarkerEncoded = "%7Bdofollow%7D";
    const dofollowParam = "__dofollow=1";
    const hasDofollowMarker =
        href.includes(dofollowMarker) ||
        href.toLowerCase().includes(dofollowMarkerEncoded) ||
        href.includes(dofollowParam);

    // ─── Clean the href ────────────────────────────────────────────────
    let cleanHref = href
        .replace(dofollowMarker, "")
        .replace(/%7Bdofollow%7D/gi, "");

    if (cleanHref.startsWith("http://") || cleanHref.startsWith("https://")) {
        try {
            const parsed = new URL(cleanHref);
            parsed.searchParams.delete("__dofollow");
            cleanHref = parsed.toString();
        } catch {
            cleanHref = cleanHref.replace(/[?&]__dofollow=1/g, "");
        }
    } else {
        cleanHref = cleanHref.replace(/[?&]__dofollow=1/g, "");
    }

    const isAbsoluteUrl =
        cleanHref.startsWith("http://") || cleanHref.startsWith("https://");

    // ─── Internal link (relative path) ─────────────────────────────────
    if (!isAbsoluteUrl) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Link href={cleanHref} {...(props as any)}>{children}</Link>;
    }

    // ─── Internal link (absolute URL, same domain) ─────────────────────
    const siteDomain = process.env.SITE_DOMAIN || "";
    const isInternalDomain = siteDomain && cleanHref.includes(siteDomain);

    if (isInternalDomain) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Link href={cleanHref} {...(props as any)}>{children}</Link>;
    }

    // ─── External link ─────────────────────────────────────────────────
    return (
        <a
            href={cleanHref}
            target="_blank"
            rel={hasDofollowMarker ? "noopener noreferrer" : "nofollow noopener noreferrer"}
            {...props}
        >
            {children}
        </a>
    );
};
