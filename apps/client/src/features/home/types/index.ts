import { LucideIcon } from "lucide-react";

export interface FeaturedProject {
  id: string;
  tag1: string;
  tag2: string;
  title: string;
  description: string;
  image: string;
  bg: string;
  index?: number;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
}

export interface Tab {
  id: string;
  label: string;
  isActive: boolean;
  description?: string;
}

export interface Reason {
  icon: LucideIcon;
  img: string;
  title: string;
  desc: string;
}

export interface ReasonItemProps {
  item: Reason;
  index: number;
}
