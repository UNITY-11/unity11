"use server";

import { getWriteClient } from "@/sanity/lib/writeClient";
import { imageRef, uploadImage } from "@/sanity/lib/helpers";
import { createNotification } from "@/features/notifications/actions/notificationActions";
import type { Client } from "../types";

function buildClientListItem(
  id: string,
  fields: {
    name: string;
    logoUrl?: string;
    logoPreview?: string;
    contactNumber: string;
    email: string;
    projectStatus: string;
    scope?: string;
    budget?: number;
    startDate?: string;
  }
): Client {
  const now = new Date().toISOString();
  return {
    id,
    name: fields.name,
    logo: fields.logoPreview || fields.logoUrl || "/images/placeholder.png",
    contactNumber: fields.contactNumber,
    projectStatus: fields.projectStatus,
    email: fields.email,
    startDate: fields.startDate ?? now,
    endDate: "",
    details: {
      startDate: fields.startDate ?? now,
      targetDate: "TBD",
      budget: fields.budget ?? 0,
      scope: fields.scope ?? "",
      milestones: [],
      payments: [],
      team: [],
      documents: [],
    },
  };
}

export async function createClient(prevState: unknown, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const logoUrl = formData.get("logo") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const email = formData.get("email") as string;
    const projectStatus = formData.get("projectStatus") as string;
    const scope = formData.get("scope") as string;
    const budget = Number(formData.get("budget") || 0);
    const logoFile = formData.get("logoFile") as File | null;
    const logoPreview = (formData.get("logoPreview") as string) || "";

    if (!name) return { error: "Company name is required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(logoFile);

    const created = await writeClient.create({
      _type: "client",
      name,
      logoUrl: logoUrl || undefined,
      contactNumber,
      email,
      projectStatus,
      scope,
      budget,
      milestones: [],
      payments: [],
      documents: [],
      assignedTeam: [],
      startDate: new Date().toISOString(),
      ...(imageAsset && { logo: imageRef(imageAsset._id) }),
    });

    await createNotification({
      type: "success",
      title: "New Client Added",
      message: `${name} was added to Sanity.`,
      link: "/clients",
    });

    return {
      success: true,
      item: buildClientListItem(created._id, {
        name,
        logoUrl,
        logoPreview,
        contactNumber,
        email,
        projectStatus,
        scope,
        budget,
        startDate: created.startDate,
      }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create client.";
    return { error: message };
  }
}

export async function updateClient(prevState: unknown, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const logoUrl = formData.get("logo") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const email = formData.get("email") as string;
    const projectStatus = formData.get("projectStatus") as string;
    const scope = formData.get("scope") as string;
    const budget = Number(formData.get("budget") || 0);
    const logoFile = formData.get("logoFile") as File | null;
    const logoPreview = (formData.get("logoPreview") as string) || "";
    const existingStartDate = (formData.get("existingStartDate") as string) || "";
    const existingEndDate = (formData.get("existingEndDate") as string) || "";

    if (!id || !name) return { error: "Client ID and name are required" };

    const writeClient = getWriteClient();
    const imageAsset = await uploadImage(logoFile);

    await writeClient
      .patch(id)
      .set({
        name,
        logoUrl: logoUrl || undefined,
        contactNumber,
        email,
        projectStatus,
        scope,
        budget,
      })
      .commit();

    if (imageAsset) {
      await writeClient.patch(id).set({ logo: imageRef(imageAsset._id) }).commit();
    }

    const item = buildClientListItem(id, {
      name,
      logoUrl,
      logoPreview,
      contactNumber,
      email,
      projectStatus,
      scope,
      budget,
      startDate: existingStartDate,
    });
    item.endDate = existingEndDate;

    return { success: true, item };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update client.";
    return { error: message };
  }
}

export async function deleteClient(id: string) {
  try {
    const writeClient = getWriteClient();
    await writeClient.delete(id);
    return { success: true, id };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete client.";
    return { error: message };
  }
}

export async function updateClientDetails(id: string, detailsJson: string) {
  try {
    const details = JSON.parse(detailsJson);
    const writeClient = getWriteClient();

    await writeClient
      .patch(id)
      .set({
        scope: details.scope,
        budget: details.budget,
        milestones: details.milestones,
        payments: details.payments,
        documents: details.documents,
        assignedTeam: (details.team ?? []).map((member: { name: string; role: string; avatar: string }) => ({
          name: member.name,
          role: member.role,
          avatar: member.avatar,
        })),
      })
      .commit();

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save client details.";
    return { error: message };
  }
}
