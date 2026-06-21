"use server";

import { getWriteClient } from "@/sanity/lib/writeClient";
import { imageRef, slugify, uploadImage } from "@/sanity/lib/helpers";
import { mapProjectStatus, mapProjectStatusToValue } from "@/sanity/lib/mappers";
import { createNotification } from "@/features/notifications/actions/notificationActions";
import type { Project } from "../types";

function buildProjectListItem(
  id: string,
  fields: {
    title: string;
    description: string;
    status: string;
    tags: string[];
    bgStart: string;
    bgEnd: string;
    mainImage?: { asset: { _ref: string } } | null;
    imageUrl?: string;
    date?: string;
    visibility?: string;
    liveLink?: string;
  }
): Project {
  const tags: string[] = fields.tags ?? [];
  return {
    id,
    title: fields.title,
    description: fields.description,
    tag1: tags[0] ?? "General",
    tag2: tags[1] ?? "",
    image: fields.imageUrl ?? "/images/blog/blog1.png",
    bg:
      fields.bgStart && fields.bgEnd
        ? `linear-gradient(to right, ${fields.bgStart}, ${fields.bgEnd})`
        : "linear-gradient(to right, #2052bd, #7fcbe4)",
    date: fields.date ?? new Date().toISOString(),
    status: mapProjectStatus(fields.status),
    visibility: fields.visibility,
    liveLink: fields.liveLink,
  };
}

export async function createProject(prevState: unknown, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const tagsRaw = formData.get("tags") as string;
    const tags = tagsRaw ? JSON.parse(tagsRaw) : [];
    const bgStart = formData.get("bgStart") as string;
    const bgEnd = formData.get("bgEnd") as string;
    const visibility = formData.get("visibility") as string;
    const liveLink = formData.get("liveLink") as string;
    const image = formData.get("image") as File | null;
    const previewImage = (formData.get("previewImage") as string) || "";
    const existingDate = (formData.get("existingDate") as string) || new Date().toISOString();

    if (!title) return { error: "Title is required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(image);

    const created = await writeClient.create({
      _type: "project",
      title,
      slug: { _type: "slug", current: slugify(title) },
      description,
      status,
      tags,
      bgStart: bgStart || "#2052bd",
      bgEnd: bgEnd || "#7fcbe4",
      visibility: status === "completed" ? visibility : undefined,
      liveLink: status === "completed" && visibility === "public" ? liveLink : undefined,
      completionDate: status === "completed" ? new Date(existingDate).toISOString() : new Date().toISOString(),
      ...(imageAsset && { mainImage: imageRef(imageAsset._id) }),
    });

    await createNotification({
      type: "success",
      title: "New Project Created",
      message: `"${title}" was added to Sanity.`,
      link: "/projects",
    });

    return {
      success: true,
      item: buildProjectListItem(created._id, {
        title,
        description,
        status,
        tags,
        bgStart: bgStart || "#2052bd",
        bgEnd: bgEnd || "#7fcbe4",
        imageUrl: previewImage || undefined,
        date: created.completionDate ?? existingDate,
        visibility: status === "completed" ? visibility : undefined,
        liveLink: status === "completed" && visibility === "public" ? liveLink : undefined,
      }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create project.";
    return { error: message };
  }
}

export async function updateProject(prevState: unknown, formData: FormData) {
  const id = formData.get("id") as string;

  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const tagsRaw = formData.get("tags") as string;
    const tags = tagsRaw ? JSON.parse(tagsRaw) : [];
    const bgStart = formData.get("bgStart") as string;
    const bgEnd = formData.get("bgEnd") as string;
    const visibility = formData.get("visibility") as string;
    const liveLink = formData.get("liveLink") as string;
    const image = formData.get("image") as File | null;
    const previewImage = (formData.get("previewImage") as string) || "";
    const existingDate = (formData.get("existingDate") as string) || new Date().toISOString();

    if (!id || !title) return { error: "Project ID and title are required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(image);

    await writeClient
      .patch(id)
      .set({
        title,
        slug: { _type: "slug", current: slugify(title) },
        description,
        status,
        tags,
        bgStart: bgStart || "#2052bd",
        bgEnd: bgEnd || "#7fcbe4",
        visibility: status === "completed" ? visibility : null,
        liveLink: status === "completed" && visibility === "public" ? liveLink : null,
        ...(status === "completed" ? { completionDate: new Date(existingDate).toISOString() } : {}),
      })
      .setIfMissing({ completionDate: new Date().toISOString() })
      .commit();

    if (imageAsset) {
      await writeClient.patch(id).set({ mainImage: imageRef(imageAsset._id) }).commit();
    }

    return {
      success: true,
      item: buildProjectListItem(id, {
        title,
        description,
        status,
        tags,
        bgStart: bgStart || "#2052bd",
        bgEnd: bgEnd || "#7fcbe4",
        imageUrl: previewImage || undefined,
        date: existingDate,
        visibility: status === "completed" ? visibility : undefined,
        liveLink: status === "completed" && visibility === "public" ? liveLink : undefined,
      }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update project.";
    return { error: message };
  }
}

export async function deleteProject(id: string) {
  try {
    const writeClient = getWriteClient();
    await writeClient.delete(id);
    return { success: true, id };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete project.";
    return { error: message };
  }
}

export async function updateProjectStatus(id: string, status: string) {
  try {
    const writeClient = getWriteClient();
    await writeClient
      .patch(id)
      .set({ status: mapProjectStatusToValue(status) })
      .commit();
    return { success: true, id, status };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update project status.";
    return { error: message };
  }
}

export async function toggleProjectFeatured(id: string, featured: boolean) {
  try {
    const writeClient = getWriteClient();
    await writeClient.patch(id).set({ featured }).commit();
    return { success: true, id, featured };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle featured status.";
    return { error: message };
  }
}
