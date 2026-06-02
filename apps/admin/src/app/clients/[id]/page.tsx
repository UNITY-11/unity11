import { ClientDetailView } from "@/features/clients/components/ClientDetailView";

export default function ClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return <ClientDetailView params={params} />;
}
