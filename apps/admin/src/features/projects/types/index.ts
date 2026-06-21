export interface Project {
  id: string;
  title: string;
  description: string;
  status: "New" | "Working On" | "Pending" | "Completed" | string;
  tag1: string;
  tag2: string;
  image: string;
  bgStart?: string;
  bgEnd?: string;
  date: string;
  visibility?: "public" | "private" | string;
  liveLink?: string;
  featured?: boolean;
}
