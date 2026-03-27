/**
 * Dofollow marker injection for Markdown content.
 *
 * Scans markdown for links followed by {dofollow} annotation and converts
 * them to use a query parameter that MarkdownLink.tsx can detect.
 *
 * Example:
 *   Input:  [Anchor](https://partner.com) {dofollow}
 *   Output: [Anchor](https://partner.com?__dofollow=1)
 */
export function injectDofollowMarker(markdown: string): string {
    return markdown.replace(
        /(\[[^\]]+\])\(([^)]+)\)\s*(?:\{dofollow\}|\{do follow\}|dofollow|do follow|do-follow)/gi,
        (_match, textPart, urlPart) => {
            let newUrl = urlPart;
            try {
                const parsed = new URL(urlPart);
                parsed.searchParams.set("__dofollow", "1");
                newUrl = parsed.toString();
            } catch {
                const hashIndex = urlPart.indexOf("#");
                const hash = hashIndex !== -1 ? urlPart.slice(hashIndex) : "";
                const base = hashIndex !== -1 ? urlPart.slice(0, hashIndex) : urlPart;
                const separator = base.includes("?") ? "&" : "?";
                newUrl = `${base}${separator}__dofollow=1${hash}`;
            }
            return `${textPart}(${newUrl})`;
        }
    );
}
