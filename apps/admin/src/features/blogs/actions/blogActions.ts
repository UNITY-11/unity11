"use server";

import { getWriteClient } from "@/sanity/lib/writeClient";
import { imageRef, slugify, uploadImage, normalizeBlogTags } from "@/sanity/lib/helpers";
import { mapSanityBlog } from "@/sanity/lib/mappers";
import { createNotification } from "@/features/notifications/actions/notificationActions";
import type { Blog } from "../types";

function buildBlogListItem(
  id: string,
  fields: {
    title: string;
    category: string;
    tags: string[];
    description: string;
    status: string;
    mainImage?: { asset: { _ref: string } } | null;
    publishedAt?: string | null;
    createdAt?: string;
    views?: number;
    likes?: number;
  }
): Blog {
  return mapSanityBlog({
    _id: id,
    title: fields.title,
    author: "Unity11 Team",
    category: fields.category,
    tags: fields.tags,
    description: fields.description,
    status: fields.status,
    mainImage: fields.mainImage,
    publishedAt: fields.publishedAt,
    _createdAt: fields.createdAt ?? new Date().toISOString(),
    views: fields.views ?? 0,
    likes: fields.likes ?? 0,
  });
}

export async function createBlog(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string) || slugify(title);
    const category = formData.get("category") as string;
    const tagsRaw = formData.get("tags") as string;
    const tags = normalizeBlogTags(tagsRaw ? JSON.parse(tagsRaw) : []);
    const description = formData.get("description") as string;
    const bodyHtml = formData.get("bodyHtml") as string;
    const status = formData.get("status") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const keywords = formData.get("keywords") as string;
    const cover = formData.get("cover") as File | null;

    if (!title) return { error: "Title is required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(cover);

    const created = await writeClient.create({
      _type: "blog",
      title,
      slug: { _type: "slug", current: slugify(slug) },
      author: "Unity11 Team",
      category,
      tags,
      description: description || metaDescription,
      bodyHtml,
      status,
      metaTitle,
      metaDescription,
      keywords,
      views: 0,
      likes: 0,
      publishedAt: status === "Published" ? new Date().toISOString() : null,
      ...(imageAsset && { mainImage: imageRef(imageAsset._id) }),
    });

    await createNotification({
      type: "update",
      title: "Blog Post Saved",
      message: `"${title}" was ${status === "Published" ? "published" : "saved as draft"}.`,
      link: "/blogs",
    });

    return {
      success: true,
      item: buildBlogListItem(created._id, {
        title,
        category,
        tags,
        description: description || metaDescription,
        status,
        mainImage: imageAsset ? imageRef(imageAsset._id) : null,
        publishedAt: status === "Published" ? new Date().toISOString() : null,
        createdAt: created._createdAt,
      }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create blog.";
    return { error: message };
  }
}

export async function updateBlog(formData: FormData) {
  const id = formData.get("id") as string;
  const existingViews = Number(formData.get("existingViews") || 0);
  const existingLikes = Number(formData.get("existingLikes") || 0);
  const existingImage = (formData.get("existingImage") as string) || "";
  const existingDate = (formData.get("existingDate") as string) || new Date().toISOString();

  try {
    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string) || slugify(title);
    const category = formData.get("category") as string;
    const tagsRaw = formData.get("tags") as string;
    const tags = normalizeBlogTags(tagsRaw ? JSON.parse(tagsRaw) : []);
    const description = formData.get("description") as string;
    const bodyHtml = formData.get("bodyHtml") as string;
    const status = formData.get("status") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const keywords = formData.get("keywords") as string;
    const cover = formData.get("cover") as File | null;

    if (!id || !title) return { error: "Blog ID and title are required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(cover);

    await writeClient
      .patch(id)
      .set({
        title,
        slug: { _type: "slug", current: slugify(slug) },
        category,
        tags,
        description: description || metaDescription,
        bodyHtml,
        status,
        metaTitle,
        metaDescription,
        keywords,
        ...(status === "Published" ? { publishedAt: new Date().toISOString() } : {}),
      })
      .commit();

    if (imageAsset) {
      await writeClient.patch(id).set({ mainImage: imageRef(imageAsset._id) }).commit();
    }

    const item = buildBlogListItem(id, {
      title,
      category,
      tags,
      description: description || metaDescription,
      status,
      mainImage: imageAsset ? imageRef(imageAsset._id) : existingImage ? { asset: { _ref: "" } } : null,
      publishedAt: status === "Published" ? new Date().toISOString() : existingDate,
      createdAt: existingDate,
      views: existingViews,
      likes: existingLikes,
    });

    if (!imageAsset && existingImage) {
      item.image = existingImage;
    }

    return { success: true, item };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update blog.";
    return { error: message };
  }
}

export async function deleteBlog(id: string) {
  try {
    const writeClient = getWriteClient();
    await writeClient.delete(id);
    return { success: true, id };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete blog.";
    return { error: message };
  }
}

export async function updateBlogStatus(id: string, status: string) {
  try {
    const writeClient = getWriteClient();
    await writeClient
      .patch(id)
      .set({
        status,
        ...(status === "Published" ? { publishedAt: new Date().toISOString() } : {}),
      })
      .commit();
    return { success: true, id, status };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update blog status.";
    return { error: message };
  }
}
