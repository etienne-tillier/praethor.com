export function injectDofollowMarker(markdown: string): string {
    const markerPattern = /(?:\{dofollow\}|\{do follow\}|dofollow|do follow|do-follow)/gi;

    const addDofollowParam = (rawUrl: string): string => {
        try {
            const parsed = new URL(rawUrl);
            parsed.searchParams.set("__dofollow", "1");
            return parsed.toString();
        } catch {
            const hashIndex = rawUrl.indexOf("#");
            const hash = hashIndex !== -1 ? rawUrl.slice(hashIndex) : "";
            const base = hashIndex !== -1 ? rawUrl.slice(0, hashIndex) : rawUrl;
            const separator = base.includes("?") ? "&" : "?";
            return `${base}${separator}__dofollow=1${hash}`;
        }
    };

    let output = markdown.replace(
        /(\[[^\]]+\])\(([^)]+)\)\s*(?:\{dofollow\}|\{do follow\}|dofollow|do follow|do-follow)/gi,
        (_match, textPart, urlPart) => `${textPart}(${addDofollowParam(urlPart)})`,
    );

    output = output.replace(
        /(^|[\s(>])((?:https?:\/\/)?(?:www\.)?[a-z0-9][a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s<)]*)?)\s*(?:\{dofollow\}|\{do follow\}|dofollow|do follow|do-follow)/gim,
        (_match, prefix, rawUrl) => {
            const absoluteUrl = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
            return `${prefix}[${rawUrl}](${addDofollowParam(absoluteUrl)})`;
        },
    );

    output = output.replace(
        /<a>\s*((?:https?:\/\/)?(?:www\.)?[a-z0-9][a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s<)]*)?)\s*<\/a>\s*(?:\{dofollow\}|\{do follow\}|dofollow|do follow|do-follow)?/gim,
        (_match, rawUrl) => {
            const absoluteUrl = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
            return `[${rawUrl}](${addDofollowParam(absoluteUrl)})`;
        },
    );

    output = output.replace(markerPattern, "");
    return output;
}
