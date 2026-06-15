"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, updateClient, deleteClient } from "../actions/clientActions";
import { stashListMutation } from "@/lib/adminListCache";

type ClientFormData = {
  id?: string;
  name: string;
  logo: string;
  contactNumber: string;
  email: string;
  projectStatus: string;
  scope?: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
};

function ClientFormFields({
  client,
  isEdit,
}: {
  client?: ClientFormData;
  isEdit: boolean;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    isEdit ? updateClient : createClient,
    null
  );

  useEffect(() => {
    if (state?.success && state.item) {
      stashListMutation("clients", {
        op: isEdit ? "update" : "add",
        item: state.item,
      });
      router.push("/clients");
    }
  }, [state, router, isEdit]);

  const handleDelete = async () => {
    if (!client?.id || !confirm("Delete this client?")) return;
    const result = await deleteClient(client.id);
    if (result?.error) alert(result.error);
    else {
      stashListMutation("clients", { op: "remove", id: client.id });
      router.push("/clients");
    }
  };

  return (
    <div className="bg-surface border border-border-base rounded-[24px] p-8 shadow-xl">
      {state?.error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
          {state.error}
        </div>
      )}
      <form action={formAction} className="space-y-6">
        {isEdit && <input type="hidden" name="id" value={client?.id} />}
        <input type="hidden" name="logoPreview" value={client?.logo ?? ""} />
        {isEdit && (
          <>
            <input type="hidden" name="existingStartDate" value={client?.startDate ?? ""} />
            <input type="hidden" name="existingEndDate" value={client?.endDate ?? ""} />
          </>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Company Name</label>
            <input type="text" name="name" defaultValue={client?.name} required className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Logo URL</label>
            <input type="url" name="logo" defaultValue={client?.logo} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Logo File (optional)</label>
            <input type="file" name="logoFile" accept="image/*" className="w-full text-sm text-text-muted" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Contact Number</label>
              <input type="tel" name="contactNumber" defaultValue={client?.contactNumber} required className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Email Address</label>
              <input type="email" name="email" defaultValue={client?.email} required className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Project Scope</label>
            <textarea name="scope" defaultValue={client?.scope} rows={3} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Budget (USD)</label>
            <input type="number" name="budget" min="0" defaultValue={client?.budget ?? 0} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Project Status</label>
            <select name="projectStatus" defaultValue={client?.projectStatus ?? "Active"} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground">
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="pt-4 border-t border-border-base flex justify-between items-center">
          {isEdit ? (
            <button type="button" onClick={handleDelete} className="px-6 py-2 bg-danger/10 text-danger rounded-full font-medium border border-danger/20 text-sm">
              Delete Client
            </button>
          ) : <div />}
          <button type="submit" disabled={isPending} className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium disabled:opacity-50">
            {isPending ? "Saving..." : isEdit ? "Save Changes" : "Save Client"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function ClientForm() {
  return (
    <div className="flex flex-col h-full max-w-[800px] w-full mx-auto space-y-8 p-4 md:p-6 lg:p-8 pb-16 lg:pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Add New Client</h1>
          <p className="text-text-muted">Create a new client profile.</p>
        </div>
        <Link href="/clients" className="px-4 py-2 bg-surface-hover border border-border-muted text-text-muted rounded-full text-sm font-medium">Cancel</Link>
      </div>
      <ClientFormFields isEdit={false} />
    </div>
  );
}

export function ClientEditForm({ client }: { client: ClientFormData }) {
  return (
    <div className="flex flex-col h-full max-w-[800px] w-full mx-auto space-y-8 p-4 md:p-6 lg:p-8 pb-16 lg:pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Edit Client</h1>
          <p className="text-text-muted">Update information for {client.name}</p>
        </div>
        <Link href="/clients" className="px-4 py-2 bg-surface-hover border border-border-muted text-text-muted rounded-full text-sm font-medium">Cancel</Link>
      </div>
      <ClientFormFields client={client} isEdit />
    </div>
  );
}
