import type { Blog } from "@/features/blogs/types";
import type { Client, ClientDetails } from "@/features/clients/types";
import type { DashboardActivity } from "@/features/dashboard/types";
import type { Notification } from "@/features/notifications/types";
import type { AdminProfile } from "@/features/profile/types";
import type { Project } from "@/features/projects/types";
import type { TeamMember } from "@/features/team/types";
import { getImageUrl, normalizeBlogTags } from "./helpers";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  working: "Working On",
  pending: "Pending",
  completed: "Completed",
};

export function mapProjectStatus(status?: string) {
  if (!status) return "New";
  return STATUS_LABELS[status] ?? status;
}

export function mapProjectStatusToValue(status?: string) {
  const reverse: Record<string, string> = {
    New: "new",
    "Working On": "working",
    Pending: "pending",
    Completed: "completed",
  };
  if (!status) return "new";
  return reverse[status] ?? status.toLowerCase();
}

function formatDisplayDate(date?: string) {
  if (!date) return "TBD";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return date;
  }
}

export function mapSanityProject(doc: any): Project {
  const tags: string[] = doc.tags ?? [];
  return {
    id: doc._id,
    title: doc.title ?? "Untitled",
    description: doc.description ?? "",
    tag1: tags[0] ?? "General",
    tag2: tags[1] ?? "",
    image: getImageUrl(doc.mainImage, "/images/blog/blog1.png"),
    bg:
      doc.bgStart && doc.bgEnd
        ? `linear-gradient(to right, ${doc.bgStart}, ${doc.bgEnd})`
        : "linear-gradient(to right, #2052bd, #7fcbe4)",
    date: doc.completionDate ?? doc._createdAt ?? new Date().toISOString(),
    status: mapProjectStatus(doc.status),
  };
}

export function mapSanityBlog(doc: any): Blog {
  return {
    id: doc._id,
    title: doc.title ?? "Untitled",
    author: doc.author ?? "Unity11 Team",
    category: doc.category ?? "",
    tags: normalizeBlogTags(doc.tags),
    description: doc.description ?? "",
    image: getImageUrl(doc.mainImage, "/images/blog/blog1.png"),
    bg: "linear-gradient(to right, #2052bd, #7fcbe4)",
    date: doc.publishedAt ?? doc._createdAt ?? new Date().toISOString(),
    status: doc.status ?? "Draft",
    views: doc.views ?? 0,
    likes: doc.likes ?? 0,
  };
}

export function mapSanityClientDetails(doc: any): ClientDetails {
  const team = (doc.assignedTeam ?? []).map((member: any) => ({
    name: member.name ?? "",
    role: member.role ?? "",
    avatar:
      member.avatar ??
      getImageUrl(
        member.teamAvatar,
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name ?? "team"}`
      ),
  }));

  return {
    startDate: formatDisplayDate(doc.startDate),
    targetDate: formatDisplayDate(doc.endDate),
    budget: doc.budget ?? 0,
    scope: doc.scope ?? "",
    milestones: doc.milestones ?? [],
    payments: (doc.payments ?? []).map((p: any) => ({
      description: p.description ?? "",
      amount: p.amount ?? 0,
      date: p.date ?? "",
      status: p.status ?? "pending",
    })),
    team,
    documents: doc.documents ?? [],
  };
}

export function mapSanityClient(doc: any): Client {
  const logoFromImage = doc.logo ? getImageUrl(doc.logo) : null;
  const logo = logoFromImage ?? doc.logoUrl ?? "/images/placeholder.png";

  return {
    id: doc._id,
    name: doc.name ?? "Unknown",
    logo,
    contactNumber: doc.contactNumber ?? "",
    projectStatus: doc.projectStatus ?? "Active",
    email: doc.email ?? "",
    startDate: doc.startDate ?? doc._createdAt ?? new Date().toISOString(),
    endDate: doc.endDate ?? "",
    details: mapSanityClientDetails(doc),
  };
}

export function mapSanityTeamMember(doc: any): TeamMember {
  return {
    id: doc._id,
    name: doc.name ?? "Unknown",
    role: doc.role ?? "",
    department: doc.department ?? "Engineering",
    email: doc.email ?? "",
    phone: doc.phone ?? "",
    avatar: getImageUrl(doc.image, "https://api.dicebear.com/7.x/avataaars/svg?seed=team"),
    status: doc.status ?? "Active",
    joinDate: doc.joinDate ?? doc._createdAt ?? new Date().toISOString(),
  };
}

export function mapSanityNotification(doc: any): Notification {
  const timestamp = doc.timestamp ?? doc._createdAt ?? new Date().toISOString();
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  let relative = "Just now";
  if (diffDays > 0) relative = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  else if (diffHours > 0) relative = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  else if (diffMins > 0) relative = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;

  return {
    id: doc._id,
    type: doc.type ?? "update",
    title: doc.title ?? "",
    message: doc.message ?? "",
    timestamp: relative,
    isRead: doc.isRead ?? false,
    link: doc.link ?? undefined,
  };
}

export function mapSanityAdminProfile(doc: any | null): AdminProfile {
  if (!doc) {
    return {
      name: "Admin User",
      email: "admin@unity11.com",
      role: "Lead Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    };
  }
  return {
    id: doc._id,
    name: doc.name ?? "Admin User",
    email: doc.email ?? "admin@unity11.com",
    role: doc.role ?? "Lead Architect",
    avatar: getImageUrl(doc.avatar, "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"),
  };
}

export function buildRecentActivities(raw: any): DashboardActivity[] {
  const items: Array<DashboardActivity & { sortDate: string }> = [];

  for (const p of raw.projects ?? []) {
    items.push({
      title: p.title ?? "Project updated",
      desc: `Project • ${new Date(p._updatedAt).toLocaleString()}`,
      tag: mapProjectStatus(p.status),
      sortDate: p._updatedAt,
    });
  }
  for (const b of raw.blogs ?? []) {
    items.push({
      title: b.title ?? "Blog updated",
      desc: `Blog • ${new Date(b._updatedAt).toLocaleString()}`,
      tag: b.status ?? "Draft",
      sortDate: b._updatedAt,
    });
  }
  for (const c of raw.clients ?? []) {
    items.push({
      title: `${c.name} updated`,
      desc: `Client • ${new Date(c._updatedAt).toLocaleString()}`,
      tag: c.projectStatus ?? "Active",
      sortDate: c._updatedAt,
    });
  }
  for (const t of raw.team ?? []) {
    items.push({
      title: `${t.name} profile updated`,
      desc: `${t.role ?? "Team"} • ${new Date(t._updatedAt).toLocaleString()}`,
      tag: "Team",
      sortDate: t._updatedAt,
    });
  }

  return items
    .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
    .slice(0, 5)
    .map(({ title, desc, tag }) => ({ title, desc, tag }));
}
