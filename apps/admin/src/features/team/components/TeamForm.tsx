"use client";

import { useState, useRef, useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "../actions/teamActions";
import { stashListMutation } from "@/lib/adminListCache";

type TeamFormData = {
  id?: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  bio: string;
  status: string;
  avatar?: string;
  joinDate?: string;
};

export function TeamForm({ member }: { member?: TeamFormData }) {
  const isEdit = Boolean(member?.id);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    isEdit ? updateTeamMember : createTeamMember,
    null
  );
  const [previewImage, setPreviewImage] = useState<string | null>(member?.avatar ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.success && state.item) {
      stashListMutation("team", {
        op: isEdit ? "update" : "add",
        item: state.item,
      });
      router.push("/team");
    }
  }, [state, router, isEdit]);

  const handleDelete = async () => {
    if (!member?.id || !confirm("Delete this team member?")) return;
    const result = await deleteTeamMember(member.id);
    if (result?.error) alert(result.error);
    else {
      stashListMutation("team", { op: "remove", id: member.id });
      router.push("/team");
    }
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">{isEdit ? "Edit Team Member" : "Add Team Member"}</h1>
          <p className="text-text-muted mt-2">Manage your team profiles stored in Sanity.</p>
        </div>
        <Link href="/team" className="px-4 py-2 bg-surface-hover border border-border-muted text-text-muted rounded-full text-sm font-medium">Cancel</Link>
      </div>

      {state?.error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">{state.error}</div>
      )}

      <form action={formAction} className="bg-surface border border-border-base rounded-[24px] p-8 shadow-xl space-y-6">
        {isEdit && <input type="hidden" name="id" value={member?.id} />}
        <input type="hidden" name="avatarPreview" value={previewImage ?? ""} />
        {isEdit && <input type="hidden" name="existingJoinDate" value={member?.joinDate ?? ""} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-muted mb-1">Full Name</label>
            <input type="text" name="name" defaultValue={member?.name} required className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Role</label>
            <input type="text" name="role" defaultValue={member?.role} required className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Department</label>
            <select name="department" defaultValue={member?.department ?? "Engineering"} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground">
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
            <input type="email" name="email" defaultValue={member?.email} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Phone</label>
            <input type="tel" name="phone" defaultValue={member?.phone} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Status</label>
            <select name="status" defaultValue={member?.status ?? "Active"} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground">
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-muted mb-1">Bio</label>
            <textarea name="bio" rows={4} defaultValue={member?.bio} className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground resize-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-muted mb-1">Profile Image</label>
            <div className="flex items-center gap-4">
              {previewImage && <img src={previewImage} alt="Preview" className="w-16 h-16 rounded-full object-cover" />}
              <input type="file" name="image" ref={fileInputRef} accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPreviewImage(URL.createObjectURL(file));
              }} className="text-sm text-text-muted" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-border-base">
          {isEdit ? (
            <button type="button" onClick={handleDelete} className="px-6 py-2 bg-danger/10 text-danger rounded-full font-medium border border-danger/20 text-sm">
              Delete Member
            </button>
          ) : <div />}
          <button type="submit" disabled={isPending} className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium disabled:opacity-50">
            {isPending ? "Saving..." : isEdit ? "Save Changes" : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
