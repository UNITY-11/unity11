import { fetchClientRawById } from "@/sanity/lib/fetchers";
import { ClientEditForm } from "@/features/clients/components/ClientForm";
import { notFound } from "next/navigation";
import { getImageUrl } from "@/sanity/lib/helpers";

export const dynamic = "force-dynamic";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await fetchClientRawById(id);

  if (!client) notFound();

  return (
    <ClientEditForm
      client={{
        id: client._id,
        name: client.name ?? "",
        logo: client.logoUrl ?? getImageUrl(client.logo, ""),
        contactNumber: client.contactNumber ?? "",
        email: client.email ?? "",
        projectStatus: client.projectStatus ?? "Active",
        scope: client.scope ?? "",
        budget: client.budget ?? 0,
        startDate: client.startDate ?? client._createdAt ?? "",
        endDate: client.endDate ?? "",
      }}
    />
  );
}
