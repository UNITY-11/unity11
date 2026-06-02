import { ClientEditForm } from "@/features/clients/components/ClientEditForm";

export default function EditClientPage({ params }: { params: { id: string } }) {
  return <ClientEditForm params={params} />;
}
