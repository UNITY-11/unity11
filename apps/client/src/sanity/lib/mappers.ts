import type { BlogPost } from "@/features/blogs/types";
import type { ClientLogo } from "@/features/home/types";
import type { Project } from "@/features/projects/types";
import {
  blogBgColor,
  estimateReadTime,
  formatBlogDate,
  getAuthorAvatar,
  getImageUrl,
  htmlToParagraphs,
} from "./helpers";

export function mapSanityProject(doc: {
  _id: string;
  title?: string;
  description?: string;
  tags?: string[];
  bgStart?: string;
  bgEnd?: string;
  mainImage?: Parameters<typeof getImageUrl>[0];
  completionDate?: string;
  _createdAt?: string;
}): Project {
  const tags: string[] = doc.tags ?? [];
  const bg =
    doc.bgStart && doc.bgEnd
      ? `linear-gradient(to top, ${doc.bgStart}, ${doc.bgEnd})`
      : "linear-gradient(to top, #2052bd, #7fcbe4)";

  return {
    id: doc._id,
    title: doc.title ?? "Untitled",
    description: doc.description ?? "",
    tag1: tags[0] ?? "General",
    tag2: tags[1] ?? "",
    image: getImageUrl(doc.mainImage, "/images/blog/blog1.png"),
    bg,
    date: doc.completionDate ?? doc._createdAt ?? new Date().toISOString(),
  };
}

export function mapSanityBlog(
  doc: {
    _id: string;
    title?: string;
    slug?: string;
    author?: string;
    category?: string;
    description?: string;
    mainImage?: Parameters<typeof getImageUrl>[0];
    publishedAt?: string;
    _createdAt?: string;
    bodyHtml?: string;
  },
  index = 0
): BlogPost {
  const authorName = doc.author ?? "Unity11 Team";

  return {
    id: doc._id,
    title: doc.title ?? "Untitled",
    excerpt: doc.description ?? "",
    image: getImageUrl(doc.mainImage, "/images/blog/blog1.png"),
    category: doc.category ?? "General",
    date: formatBlogDate(doc.publishedAt ?? doc._createdAt),
    readTime: estimateReadTime(doc.bodyHtml ?? doc.description),
    slug: doc.slug ?? doc._id,
    bgColor: blogBgColor(index),
    author: {
      name: authorName,
      avatar: getAuthorAvatar(authorName),
      role: "Contributor",
    },
    content: htmlToParagraphs(doc.bodyHtml),
    bodyHtml: doc.bodyHtml,
  };
}

export function mapSanityClientLogo(doc: {
  _id: string;
  name?: string;
  logo?: Parameters<typeof getImageUrl>[0];
  logoUrl?: string;
}): ClientLogo {
  const logoFromImage = doc.logo ? getImageUrl(doc.logo) : null;

  return {
    id: doc._id,
    name: doc.name ?? "Client",
    logo: logoFromImage ?? doc.logoUrl ?? "/images/placeholder.png",
  };
}
