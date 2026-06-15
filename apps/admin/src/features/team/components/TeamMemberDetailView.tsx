"use client";

import React from 'react';
import Link from "next/link";
import type { TeamMember } from "../types";

type TeamMemberDetail = TeamMember & { bio?: string };

export function TeamMemberDetailView({ member }: { member: TeamMemberDetail }) {
  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-success text-success border-success/20" : "bg-warning text-warning border-warning/20";
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto min-h-full pb-20">
      <div className="relative rounded-[32px] bg-surface border border-border-base shadow-sm overflow-hidden mb-8">
        <div className="h-48 w-full bg-gradient-to-r from-primary/20 via-[#00b4d8]/20 to-primary/5 relative">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(var(--border-base) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5 }}></div>
        </div>
        
        <div className="px-8 pb-8 pt-0 flex flex-col md:flex-row items-center md:items-end gap-6 relative -mt-20 z-10">
          <div className="w-40 h-40 rounded-full border-4 border-surface shadow-xl overflow-hidden bg-surface shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-1">{member.name}</h1>
              <p className="text-lg text-primary font-medium mb-2">{member.role}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-opacity-10 border shadow-sm ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-text-muted bg-surface-hover px-3 py-1.5 rounded-full border border-border-muted">
                  <span className="w-2 h-2 rounded-full bg-primary/60"></span>
                  {member.department}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link href={`/team/${member.id}/edit`} className="flex-1 md:flex-none px-6 py-3 bg-surface border border-border-base rounded-full hover:border-primary text-text-muted hover:text-primary transition-colors flex items-center justify-center shadow-sm text-sm font-medium">
                Edit Profile
              </Link>
              <a href={`mailto:${member.email}`} className="flex-1 md:flex-none px-6 py-3 bg-surface border border-border-base rounded-full hover:border-primary text-text-muted hover:text-primary transition-colors flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </a>
              <a href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`} className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-primary to-[#00b4d8] text-white rounded-full hover:shadow-[0_0_20px_rgba(0,126,225,0.4)] transition-shadow flex items-center justify-center font-medium shadow-md">
                Contact Member
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="bg-surface rounded-[24px] p-6 border border-border-base shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              About
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              {member.bio || "No biography added yet."}
            </p>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-foreground">{member.email || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-medium text-foreground">{member.phone || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-1">Joined Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(member.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-surface rounded-[24px] border border-border-base shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="p-6 border-b border-border-base">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Recent Activity
              </h3>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-surface-active rounded-full flex items-center justify-center mb-4 border border-border-muted">
                <svg className="w-8 h-8 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <p className="text-foreground font-medium mb-1">No recent activity</p>
              <p className="text-sm text-text-muted max-w-sm">Activity feed will show up here once {member.name.split(' ')[0]} completes tasks or pushes updates to their assigned projects.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
