"use server";

import { getWriteClient } from "@/sanity/lib/writeClient";
import { imageRef, uploadImage } from "@/sanity/lib/helpers";
import { createNotification } from "@/features/notifications/actions/notificationActions";
import type { TeamMember } from "../types";

function buildTeamListItem(
  id: string,
  fields: {
    name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    status: string;
    avatarPreview?: string;
    joinDate?: string;
  }
): TeamMember {
  return {
    id,
    name: fields.name,
    role: fields.role,
    department: fields.department || "Engineering",
    email: fields.email,
    phone: fields.phone,
    avatar:
      fields.avatarPreview ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fields.name)}`,
    status: fields.status || "Active",
    joinDate: fields.joinDate ?? new Date().toISOString(),
  };
}

export async function createTeamMember(prevState: unknown, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const department = formData.get("department") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const bio = formData.get("bio") as string;
    const status = formData.get("status") as string;
    const image = formData.get("image") as File | null;
    const avatarPreview = (formData.get("avatarPreview") as string) || "";

    if (!name || !role) return { error: "Name and role are required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(image);

    const created = await writeClient.create({
      _type: "teamMember",
      name,
      role,
      department: department || "Engineering",
      email,
      phone,
      bio,
      status: status || "Active",
      joinDate: new Date().toISOString(),
      ...(imageAsset && { image: imageRef(imageAsset._id) }),
    });

    await createNotification({
      type: "message",
      title: "Team Member Added",
      message: `${name} joined the team in Sanity.`,
      link: "/team",
    });

    return {
      success: true,
      item: buildTeamListItem(created._id, {
        name,
        role,
        department,
        email,
        phone,
        status,
        avatarPreview,
        joinDate: created.joinDate,
      }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create team member.";
    return { error: message };
  }
}

export async function updateTeamMember(prevState: unknown, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const department = formData.get("department") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const bio = formData.get("bio") as string;
    const status = formData.get("status") as string;
    const image = formData.get("image") as File | null;
    const avatarPreview = (formData.get("avatarPreview") as string) || "";
    const existingJoinDate = (formData.get("existingJoinDate") as string) || "";

    if (!id || !name || !role) return { error: "ID, name and role are required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(image);

    await writeClient
      .patch(id)
      .set({
        name,
        role,
        department,
        email,
        phone,
        bio,
        status,
      })
      .commit();

    if (imageAsset) {
      await writeClient.patch(id).set({ image: imageRef(imageAsset._id) }).commit();
    }

    return {
      success: true,
      item: buildTeamListItem(id, {
        name,
        role,
        department,
        email,
        phone,
        status,
        avatarPreview,
        joinDate: existingJoinDate,
      }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update team member.";
    return { error: message };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const writeClient = getWriteClient();
    await writeClient.delete(id);
    return { success: true, id };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete team member.";
    return { error: message };
  }
}
