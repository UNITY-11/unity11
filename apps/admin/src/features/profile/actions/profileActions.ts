"use server";

import { getWriteClient } from "@/sanity/lib/writeClient";
import { imageRef, uploadImage } from "@/sanity/lib/helpers";
import { requireAdmin } from "@/lib/auth/require-admin";
import type { AdminProfile } from "../types";

export async function updateAdminProfile(prevState: unknown, formData: FormData) {
  await requireAdmin();
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const avatarFile = formData.get("avatarFile") as File | null;
    const existingAvatar = (formData.get("existingAvatar") as string) || "";

    if (!name || !email) return { error: "Name and email are required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(avatarFile);
    let profileId = id;

    if (id) {
      await writeClient.patch(id).set({ name, email, role }).commit();
      if (imageAsset) {
        await writeClient.patch(id).set({ avatar: imageRef(imageAsset._id) }).commit();
      }
    } else {
      const created = await writeClient.create({
        _type: "adminProfile",
        name,
        email,
        role,
        ...(imageAsset && { avatar: imageRef(imageAsset._id) }),
      });
      profileId = created._id;
    }

    return {
      success: true,
      profile: {
        id: profileId,
        name,
        email,
        role,
        avatar: existingAvatar,
      } satisfies AdminProfile,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update profile.";
    return { error: message };
  }
}
