import { ReactNode } from "react";

export interface Service {
  id: string;
  title: string;
  description: string;
  category: "Software & Design" | "Cloud Solutions" | "Cybersecurity" | "Data & Strategy";
  iconName: string; // We will use react-icons based on this string
  bg?: string;
}

export interface ServiceCategoryGroup {
  category: string;
  services: Service[];
  colorTheme: string;
}
