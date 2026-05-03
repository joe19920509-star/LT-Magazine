/**
 * ltmagazine.cn — public URL for canonical / OG.
 * ltmagazine.com — origin for markdown images and paths like /articles/images/...
 */
export const CONTENT_ASSET_ORIGIN =
  process.env.NEXT_PUBLIC_CONTENT_ASSET_ORIGIN?.replace(/\/$/, "") ||
  "https://ltmagazine.com";

export const PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://ltmagazine.cn";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200";

export function resolveMediaUrl(
  src: string | undefined | null,
  placeholder = DEFAULT_IMG
): string {
  if (!src?.trim()) return placeholder;
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/")) return `${CONTENT_ASSET_ORIGIN}${s}`;
  return s;
}

/** Rewrite <img src="/..."> in rendered markdown to absolute CDN origin. */
export function rewriteHtmlAssetUrls(html: string): string {
  return html.replace(
    /src="(\/[^"]+)"/g,
    (_, path: string) => `src="${CONTENT_ASSET_ORIGIN}${path}"`
  );
}
