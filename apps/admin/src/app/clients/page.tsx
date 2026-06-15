import { fetchClients } from "@/sanity/lib/fetchers";
import { ClientsView } from "@/features/clients/components/ClientsView";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await fetchClients();
  return <ClientsView clients={clients} />;
}
