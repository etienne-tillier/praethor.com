import Link from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

type LinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const normalizeHostname = (value: string) => value.trim().toLowerCase().replace(/^www\./, "");

const resolveSiteHostname = () => {
    const candidates = [process.env.SITE_DOMAIN, process.env.NEXT_PUBLIC_SITE_URL];
    for (const candidate of candidates) {
        if (!candidate) continue;
        const raw = candidate.trim();
        if (!raw) continue;

        try {
            const withProtocol = raw.startsWith("http://") || raw.startsWith("https://")
                ? raw
                : `https://${raw}`;
            return normalizeHostname(new URL(withProtocol).hostname);
        } catch {
            const cleaned = raw.replace(/^https?:\/\//i, "").split("/")[0] ?? "";
            if (cleaned) return normalizeHostname(cleaned);
        }
    }
    return "";
};

const parseHttpUrl = (value: string) => {
    try {
        if (value.startsWith("//")) {
            return new URL(`https:${value}`);
        }
        const parsed = new URL(value);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            return parsed;
        }
    } catch {
        return null;
    }
    return null;
};

const extractDomainHref = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (/^(?:www\.)?[a-z0-9][a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s<)]*)?$/i.test(trimmed)) {
        return `https://${trimmed}`;
    }
    return null;
};

export const MarkdownLink = ({ href, children, ...props }: LinkProps) => {
    if (!href) {
        const text = typeof children === "string"
            ? children
            : Array.isArray(children)
                ? children.map((child) => (typeof child === "string" ? child : "")).join(" ")
                : "";
        const fallbackHref = extractDomainHref(text);
        if (fallbackHref) {
            return <a href={fallbackHref} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
        }
        return <a {...props}>{children}</a>;
    }

    const dofollowMarker = "{dofollow}";
    const dofollowMarkerEncoded = "%7Bdofollow%7D";
    const dofollowParam = "__dofollow=1";
    const hasDofollowMarker = href.includes(dofollowMarker) || href.toLowerCase().includes(dofollowMarkerEncoded) || href.includes(dofollowParam);

    let cleanHref = href.replace(dofollowMarker, "").replace(/%7Bdofollow%7D/gi, "");
    if (cleanHref.startsWith("http://") || cleanHref.startsWith("https://")) {
        try { const parsed = new URL(cleanHref); parsed.searchParams.delete("__dofollow"); cleanHref = parsed.toString(); } catch { cleanHref = cleanHref.replace(/[?&]__dofollow=1/g, ""); }
    } else { cleanHref = cleanHref.replace(/[?&]__dofollow=1/g, ""); }

    const isHttpAbsolute = cleanHref.startsWith("http://")
        || cleanHref.startsWith("https://")
        || cleanHref.startsWith("//");

    if (!isHttpAbsolute) {
        if (cleanHref.startsWith("mailto:") || cleanHref.startsWith("tel:")) {
            return <a href={cleanHref} {...props}>{children}</a>;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Link href={cleanHref} {...(props as any)}>{children}</Link>;
    }

    const parsedHref = parseHttpUrl(cleanHref);
    const siteHostname = resolveSiteHostname();
    const hrefHostname = parsedHref ? normalizeHostname(parsedHref.hostname) : "";
    const isInternalAbsolute = Boolean(siteHostname && hrefHostname && hrefHostname === siteHostname);

    if (isInternalAbsolute && parsedHref) {
        const internalHref = `${parsedHref.pathname}${parsedHref.search}${parsedHref.hash}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Link href={internalHref || "/"} {...(props as any)}>{children}</Link>;
    }

    return (
        <a href={cleanHref} target="_blank" rel={hasDofollowMarker ? "noopener noreferrer" : "nofollow noopener noreferrer"} {...props}>
            {children}
        </a>
    );
};
