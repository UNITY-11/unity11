import { urlForImage } from "./image";
import { getWriteClient } from "./writeClient";
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function uploadImage(file: File | null) {
  if (!file || file.size === 0) return null;

  const writeClient = getWriteClient();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return writeClient.assets.upload("image", buffer, {
    filename: file.name,
  });
}

export function imageRef(assetId: string) {
  return {
    _type: "image" as const,
    asset: {
      _type: "reference" as const,
      _ref: assetId,
    },
  };
}

export function getImageUrl(
  source: Parameters<typeof urlForImage>[0] | null | undefined,
  fallback = "/images/placeholder.png"
) {
  if (!source) return fallback;
  return urlForImage(source).width(800).url();
}

export function normalizeBlogTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter(Boolean);
}
