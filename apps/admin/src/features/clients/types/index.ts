export interface ClientMilestone {
  title: string;
  date: string;
  status: string;
}

export interface ClientPayment {
  description: string;
  amount: number;
  date: string;
  status: string;
}

export interface ClientTeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface ClientDetails {
  startDate: string;
  targetDate: string;
  budget: number;
  scope: string;
  milestones: ClientMilestone[];
  payments: ClientPayment[];
  team: ClientTeamMember[];
  documents: string[];
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  contactNumber: string;
  projectStatus: string;
  email: string;
  startDate: string;
  endDate: string;
  details: ClientDetails;
}
