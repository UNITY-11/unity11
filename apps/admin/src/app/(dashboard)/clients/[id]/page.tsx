import { fetchClientById } from "@/sanity/lib/fetchers";
import { ClientDetailView } from "@/features/clients/components/ClientDetailView";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await fetchClientById(id);

  if (!client) notFound();

  return <ClientDetailView client={client} />;
}
