export interface Notification {
  id: string;
  type: 'alert' | 'message' | 'update' | 'success';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface AdminProfile {
  id?: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface DashboardDeadline {
  id: string;
  project: string;
  client: string;
  due: string;
  severity: 'high' | 'medium' | 'low';
}

export interface DashboardActivity {
  title: string;
  desc: string;
  tag: string;
}

export interface DashboardFinancials {
  totalRevenue: number;
  totalPaid: number;
  outstanding: number;
  upcomingInvoices: number;
}

export interface DashboardStats {
  activeProjects: number;
  totalProjects: number;
  completedProjects: number;
  completionRate: number;
  projectsThisMonth: number;
  monthlyRevenue: number;
  activeTeam: number;
  totalTeam: number;
  teamUtilization: number;
  totalBlogViews: number;
  publishedBlogs: number;
}

export interface DashboardPerformance {
  teamVelocity: number[];
  deliveryTime: number[];
  clientNps: number[];
  teamVelocityCurrent: number;
  deliveryTimeCurrent: number;
  clientNpsCurrent: number;
}

export interface DashboardCharts {
  weeklyBlogViews: number[];
  projectCompletionRate: number;
  activeTeamRate: number;
}

export interface DashboardData {
  stats: DashboardStats;
  financials: DashboardFinancials;
  projects: import('@/features/projects/types').Project[];
  deadlines: DashboardDeadline[];
  activities: DashboardActivity[];
  performance: DashboardPerformance;
  charts: DashboardCharts;
}
