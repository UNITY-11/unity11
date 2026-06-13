"use server";

import { getWriteClient } from "@/sanity/lib/writeClient";

export async function markNotificationRead(id: string) {
  try {
    const writeClient = getWriteClient();
    await writeClient.patch(id).set({ isRead: true }).commit();
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to mark notification as read.";
    return { error: message };
  }
}

export async function markAllNotificationsRead() {
  try {
    const writeClient = getWriteClient();
    const ids: string[] = await writeClient.fetch(
      `*[_type == "notification" && isRead != true]._id`
    );
    if (ids.length) {
      const tx = writeClient.transaction();
      ids.forEach((id) => tx.patch(id, { set: { isRead: true } }));
      await tx.commit();
    }
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to mark all as read.";
    return { error: message };
  }
}

export async function deleteNotification(id: string) {
  try {
    const writeClient = getWriteClient();
    await writeClient.delete(id);
    return { success: true, id };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete notification.";
    return { error: message };
  }
}

export async function createNotification(data: {
  type: string;
  title: string;
  message: string;
  link?: string;
}) {
  try {
    const writeClient = getWriteClient();
    await writeClient.create({
      _type: "notification",
      type: data.type,
      title: data.title,
      message: data.message,
      timestamp: new Date().toISOString(),
      isRead: false,
      link: data.link,
    });
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create notification.";
    return { error: message };
  }
}
