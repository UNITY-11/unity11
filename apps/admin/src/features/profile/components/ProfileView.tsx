"use client";

import React, { useActionState, useState, useEffect } from "react";
import type { AdminProfile } from "../types";
import { updateAdminProfile } from "../actions/profileActions";

export function ProfileView({ profile: initialProfile }: { profile: AdminProfile }) {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction, isPending] = useActionState(updateAdminProfile, null);

  useEffect(() => {
    if (state?.success && state.profile) {
      setProfile((prev) => ({ ...prev, ...state.profile }));
      setIsEditing(false);
    }
  }, [state]);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col w-full px-6 lg:px-8 h-[calc(100vh-5rem)] overflow-hidden pt-4">
      <div className="w-full rounded-2xl overflow-hidden shadow-lg flex-1 flex flex-col" style={{ backgroundColor: "#141824" }}>
        <div className="h-[200px] relative" style={{ background: "linear-gradient(135deg, #007ee1 0%, #00b4d8 100%)" }} />

        <div className="px-8 pb-8 flex-1" style={{ backgroundColor: "#1a1f2e" }}>
          {state?.error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">{state.error}</div>
          )}
          {state?.success && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm">Profile saved to Sanity.</div>
          )}

          <form action={formAction} className="flex items-end gap-8">
            {profile.id && <input type="hidden" name="id" value={profile.id} />}
            <input type="hidden" name="existingAvatar" value={profile.avatar} />

            <div
              className="shrink-0 rounded-2xl overflow-hidden shadow-2xl z-10 flex items-center justify-center"
              style={{
                width: "180px",
                height: "180px",
                marginTop: "-70px",
                backgroundColor: "#007ee1",
                border: "6px solid #1a1f2e",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0 pb-1" style={{ marginTop: "20px" }}>
              {isEditing ? (
                <div className="space-y-3 mb-3">
                  <input
                    type="text"
                    name="name"
                    defaultValue={profile.name}
                    autoFocus
                    className="font-bold font-[family-name:var(--font-comfortaa)] rounded-lg focus:outline-none w-full max-w-lg"
                    style={{ fontSize: "38px", color: "#ffffff", backgroundColor: "#141824", border: "2px solid #007ee1", padding: "4px 16px" }}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    defaultValue={profile.email}
                    className="rounded-lg focus:outline-none w-full max-w-lg"
                    style={{ color: "#ffffff", backgroundColor: "#141824", border: "2px solid #2e3446", padding: "8px 16px" }}
                    required
                  />
                  <input
                    type="text"
                    name="role"
                    defaultValue={profile.role}
                    className="rounded-lg focus:outline-none w-full max-w-lg"
                    style={{ color: "#ffffff", backgroundColor: "#141824", border: "2px solid #2e3446", padding: "8px 16px" }}
                  />
                  <input type="file" name="avatarFile" accept="image/*" className="text-sm text-text-muted" />
                </div>
              ) : (
                <>
                  <h2 className="font-bold leading-tight mb-3 font-[family-name:var(--font-comfortaa)]" style={{ fontSize: "38px", color: "#ffffff" }}>
                    {profile.name}
                  </h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-wider px-3 py-1.5 rounded" style={{ backgroundColor: "rgba(0,126,225,0.15)", color: "#00b4d8", border: "1px solid rgba(0,180,216,0.25)" }}>
                      {profile.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-wider px-3 py-1.5 rounded" style={{ backgroundColor: "#252a3a", color: "#94a3b8", border: "1px solid #2e3446" }}>
                      {profile.email}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="shrink-0 pb-1 flex gap-2">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="font-mono font-bold tracking-wider rounded-lg"
                    style={{ padding: "10px 24px", fontSize: "13px", color: "#ffffff", backgroundColor: "#007ee1" }}
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="font-mono font-bold tracking-wider rounded-lg"
                    style={{ padding: "10px 24px", fontSize: "13px", color: "#94a3b8", backgroundColor: "#252a3a" }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="font-mono font-bold tracking-wider rounded-lg"
                  style={{ padding: "10px 24px", fontSize: "13px", color: "#ffffff", backgroundColor: "#007ee1", border: "2px solid #007ee1" }}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
          {!isEditing && (
            <p className="text-text-dim text-xs mt-6">Profile stored in Sanity. Initials: {initials}</p>
          )}
        </div>
      </div>
    </div>
  );
}
