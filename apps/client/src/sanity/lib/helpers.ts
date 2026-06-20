import { urlForImage } from "./image";

export function getImageUrl(
  source: Parameters<typeof urlForImage>[0] | null | undefined,
  fallback = "/images/placeholder.png"
) {
  if (!source) return fallback;
  return urlForImage(source).width(800).url();
}

export function formatBlogDate(date?: string) {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

export function estimateReadTime(html?: string) {
  if (!html) return "1 min";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

export function htmlToParagraphs(html?: string): string[] {
  if (!html) return [];
  const paragraphs = html
    .split(/<\/p>|<br\s*\/?>/i)
    .map((chunk) => chunk.replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
  return paragraphs.length > 0 ? paragraphs : [html.replace(/<[^>]+>/g, "").trim()].filter(Boolean);
}

const BLOG_BG_COLORS = [
  "from-[#0E18E4] to-white",
  "from-[#606871] to-white",
  "from-[#5F55AD] to-white",
  "from-[#2052bd] to-white",
];

export function blogBgColor(index: number) {
  return BLOG_BG_COLORS[index % BLOG_BG_COLORS.length];
}

export function getAuthorAvatar(name: string) {
  return `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(name)}&backgroundColor=2052bd,7fcbe4`;
}
