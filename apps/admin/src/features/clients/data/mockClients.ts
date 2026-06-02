import { Client } from "../types";

export const mockClients: Client[] = [
  {
    id: 1,
    name: "Apple Inc.",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=apple.com",
    contactNumber: "+1 (555) 123-4567",
    projectStatus: "Active",
    email: "contact@apple.com",
    startDate: "2023-01-15",
    endDate: "2024-12-31"
  },
  {
    id: 2,
    name: "Google",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=google.com",
    contactNumber: "+1 (555) 987-6543",
    projectStatus: "Pending",
    email: "hello@google.com",
    startDate: "2023-11-01",
    endDate: "2024-06-30"
  },
  {
    id: 3,
    name: "Microsoft",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=microsoft.com",
    contactNumber: "+1 (555) 555-0199",
    projectStatus: "Completed",
    email: "info@microsoft.com",
    startDate: "2022-05-10",
    endDate: "2023-05-10"
  },
  {
    id: 4,
    name: "Amazon",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=amazon.com",
    contactNumber: "+1 (555) 444-3322",
    projectStatus: "Active",
    email: "partners@amazon.com",
    startDate: "2023-08-20",
    endDate: "2025-01-15"
  },
  {
    id: 5,
    name: "Meta",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=meta.com",
    contactNumber: "+1 (555) 666-7788",
    projectStatus: "On Hold",
    email: "inquiries@meta.com",
    startDate: "2024-02-01",
    endDate: "2024-11-30"
  },
];
