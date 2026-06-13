import { client, readClient } from "./client";
import type { DashboardData, DashboardDeadline } from "@/features/dashboard/types";
import type { Project } from "@/features/projects/types";
import type { Blog } from "@/features/blogs/types";
import type { Client } from "@/features/clients/types";
import type { TeamMember } from "@/features/team/types";
import {
  adminProfileQuery,
  blogsQuery,
  clientByIdQuery,
  clientsQuery,
  notificationsQuery,
  projectByIdQuery,
  projectsQuery,
  recentActivityQuery,
  teamMemberByIdQuery,
  teamQuery,
  blogByIdQuery,
  unreadNotificationsCountQuery,
} from "./queries";
import {
  buildRecentActivities,
  mapSanityAdminProfile,
  mapSanityBlog,
  mapSanityClient,
  mapSanityNotification,
  mapSanityProject,
  mapSanityTeamMember,
  mapProjectStatus,
} from "./mappers";

export async function fetchProjects() {
  const docs = await readClient.fetch(projectsQuery);
  return docs.map(mapSanityProject);
}

export async function fetchProjectById(id: string) {
  const doc = await readClient.fetch(projectByIdQuery, { id });
  return doc ? mapSanityProject(doc) : null;
}

export async function fetchProjectRawById(id: string) {
  return readClient.fetch(projectByIdQuery, { id });
}

export async function fetchBlogs() {
  const docs = await readClient.fetch(blogsQuery);
  return docs.map(mapSanityBlog);
}

export async function fetchBlogById(id: string) {
  return readClient.fetch(blogByIdQuery, { id });
}

export async function fetchClients() {
  const docs = await readClient.fetch(clientsQuery);
  return docs.map(mapSanityClient);
}

export async function fetchClientById(id: string) {
  const doc = await readClient.fetch(clientByIdQuery, { id });
  return doc ? mapSanityClient(doc) : null;
}

export async function fetchClientRawById(id: string) {
  return readClient.fetch(clientByIdQuery, { id });
}

export async function fetchTeamMembers() {
  const docs = await readClient.fetch(teamQuery);
  return docs.map(mapSanityTeamMember);
}

export async function fetchTeamMemberById(id: string) {
  const doc = await readClient.fetch(teamMemberByIdQuery, { id });
  return doc ? mapSanityTeamMember(doc) : null;
}

export async function fetchTeamMemberRawById(id: string) {
  return readClient.fetch(teamMemberByIdQuery, { id });
}

export async function fetchNotifications() {
  const docs = await client.fetch(notificationsQuery);
  return docs.map(mapSanityNotification);
}

export async function fetchAdminProfile() {
  const doc = await client.fetch(adminProfileQuery);
  return mapSanityAdminProfile(doc);
}

function getProgress(status: string) {
  switch (status) {
    case "Completed":
      return 100;
    case "Working On":
      return 65;
    case "Pending":
      return 30;
    case "New":
      return 10;
    default:
      return 0;
  }
}

function getDeadlineSeverity(daysUntil: number): "high" | "medium" | "low" {
  if (daysUntil <= 3) return "high";
  if (daysUntil <= 7) return "medium";
  return "low";
}

function formatDueLabel(daysUntil: number, endDate: string) {
  if (daysUntil < 0) return "Overdue";
  if (daysUntil === 0) return "Today";
  if (daysUntil === 1) return "Tomorrow";
  if (daysUntil <= 7) {
    const day = new Date(endDate).toLocaleDateString("en-US", { weekday: "long" });
    return day;
  }
  return new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function monthKey(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`;
}

function last12MonthKeys() {
  const keys: string[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(`${d.getFullYear()}-${d.getMonth()}`);
  }
  return keys;
}

export async function fetchUnreadNotificationsCount() {
  return client.fetch<number>(unreadNotificationsCountQuery);
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const [projectDocs, blogDocs, clientDocs, teamDocs, activityRaw] = await Promise.all([
    readClient.fetch(projectsQuery),
    readClient.fetch(blogsQuery),
    readClient.fetch(clientsQuery),
    readClient.fetch(teamQuery),
    client.fetch(recentActivityQuery),
  ]);

  const projects: Project[] = projectDocs.map(mapSanityProject);
  const blogs: Blog[] = blogDocs.map(mapSanityBlog);
  const clients: Client[] = clientDocs.map(mapSanityClient);
  const team: TeamMember[] = teamDocs.map(mapSanityTeamMember);

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${now.getMonth()}`;
  const completedProjects = projects.filter((p) => p.status === "Completed");
  const activeProjects = projects.filter((p) => p.status !== "Completed");
  const activeTeam = team.filter((m) => m.status === "Active");

  let totalRevenue = 0;
  let totalPaid = 0;
  let upcomingInvoices = 0;

  for (const c of clients) {
    totalRevenue += c.details.budget;
    for (const payment of c.details.payments) {
      if (payment.status === "paid") totalPaid += payment.amount;
      else upcomingInvoices += payment.amount;
    }
  }

  const outstanding = Math.max(0, totalRevenue - totalPaid);

  const deadlines: DashboardDeadline[] = clients
    .filter((c) => c.endDate)
    .map((c) => {
      const end = new Date(c.endDate);
      const daysUntil = Math.ceil((end.getTime() - now.getTime()) / 86400000);
      return {
        id: c.id,
        project: c.details.scope ? c.details.scope.slice(0, 60) : c.name,
        client: c.name,
        due: formatDueLabel(daysUntil, c.endDate),
        severity: getDeadlineSeverity(daysUntil),
      };
    })
    .sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.severity] - order[b.severity];
    })
    .slice(0, 5);

  const monthKeys = last12MonthKeys();
  const teamVelocity = monthKeys.map((key) =>
    projectDocs.filter(
      (p: any) => mapProjectStatus(p.status) === "Completed" && monthKey(p.completionDate ?? p._updatedAt) === key
    ).length * 10 || 0
  );
  const deliveryTime = monthKeys.map((key) => {
    const completed = projectDocs.filter(
      (p: any) => mapProjectStatus(p.status) === "Completed" && monthKey(p.completionDate ?? p._updatedAt) === key
    );
    if (!completed.length) return 90;
    const avg =
      completed.reduce((sum: number, p: any) => {
        const start = new Date(p._createdAt).getTime();
        const end = new Date(p.completionDate ?? p._updatedAt).getTime();
        return sum + Math.max(1, Math.round((end - start) / 86400000));
      }, 0) / completed.length;
    return Math.round(avg);
  });
  const clientNps = monthKeys.map((key) => {
    const active = clients.filter((c) => monthKey(c.startDate) <= key).length;
    const completed = clients.filter((c) => c.projectStatus === "Completed").length;
    const base = clients.length ? Math.round((completed / clients.length) * 100) : 70;
    return Math.min(100, base + active * 2);
  });

  const dayOfWeek = now.getDay();
  const weeklyBlogViews = Array.from({ length: 7 }, (_, i) => {
    const dayIndex = (dayOfWeek - 6 + i + 7) % 7;
    return blogs
      .filter((b) => new Date(b.date).getDay() === dayIndex)
      .reduce((sum, b) => sum + b.views, 0);
  });
  const maxWeekly = Math.max(...weeklyBlogViews, 1);

  const completionRate = projects.length
    ? Math.round((completedProjects.length / projects.length) * 100)
    : 0;

  return {
    stats: {
      activeProjects: activeProjects.length,
      totalProjects: projects.length,
      completedProjects: completedProjects.length,
      completionRate,
      projectsThisMonth: projectDocs.filter((p: any) => monthKey(p._createdAt) === thisMonth).length,
      monthlyRevenue: totalPaid,
      activeTeam: activeTeam.length,
      totalTeam: team.length,
      teamUtilization: team.length ? Math.round((activeTeam.length / team.length) * 100) : 0,
      totalBlogViews: blogs.reduce((sum, b) => sum + b.views, 0),
      publishedBlogs: blogs.filter((b) => b.status === "Published").length,
    },
    financials: {
      totalRevenue,
      totalPaid,
      outstanding,
      upcomingInvoices,
    },
    projects: projects.slice(0, 5),
    deadlines,
    activities: buildRecentActivities(activityRaw),
    performance: {
      teamVelocity,
      deliveryTime,
      clientNps,
      teamVelocityCurrent: teamVelocity[teamVelocity.length - 1] ?? 0,
      deliveryTimeCurrent: deliveryTime[deliveryTime.length - 1] ?? 0,
      clientNpsCurrent: clientNps[clientNps.length - 1] ?? 0,
    },
    charts: {
      weeklyBlogViews: weeklyBlogViews.map((v) => Math.round((v / maxWeekly) * 100)),
      projectCompletionRate: completionRate,
      activeTeamRate: team.length ? Math.round((activeTeam.length / team.length) * 100) : 0,
    },
  };
}
