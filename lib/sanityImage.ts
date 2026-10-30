/**
 * Resized, auto-format (WebP/AVIF) URL for a cdn.sanity.io image.
 * Used for <video poster> where next/image can't be used.
 */
export function sanityImageUrl(url: string | undefined, width: number, height?: number): string | undefined {
  if (!url || !url.includes("cdn.sanity.io")) return url;
  const params = new URLSearchParams({ w: String(width), auto: "format", q: "75", fit: "crop" });
  if (height) params.set("h", String(height));
  return `${url.split("?")[0]}?${params.toString()}`;
}
