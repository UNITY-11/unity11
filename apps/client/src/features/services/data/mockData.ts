import { Service, ServiceCategoryGroup } from "../types";

export const mockServices: Service[] = [
  // Software & Design
  {
    id: "web-dev",
    title: "Web Application Development",
    description: "Building scalable platforms, SaaS products, and enterprise portals with cutting-edge web technologies.",
    category: "Software & Design",
    iconName: "browser",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description: "Creating highly performant, native and cross-platform iOS and Android applications.",
    category: "Software & Design",
    iconName: "smartphone",
  },
  {
    id: "api-dev",
    title: "API Development & Integration",
    description: "Connecting disparate software systems seamlessly to ensure data flows efficiently across your stack.",
    category: "Software & Design",
    iconName: "api",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Designing intuitive, conversion-optimized user interfaces and seamless user flows for digital products.",
    category: "Software & Design",
    iconName: "pen-tool",
  },

  // Cloud Solutions
  {
    id: "cloud-migration",
    title: "Cloud Migration",
    description: "Moving legacy, on-premise servers and data to scalable cloud environments (AWS, Azure, Google Cloud).",
    category: "Cloud Solutions",
    iconName: "cloud-upload",
  },
  {
    id: "cloud-hosting",
    title: "Cloud Hosting & Management",
    description: "Providing 24/7 ongoing administration, cost-optimization, and maintenance of your cloud servers.",
    category: "Cloud Solutions",
    iconName: "server",
  },
  {
    id: "saas-management",
    title: "SaaS Management",
    description: "Managing subscriptions, user access, and integrations for cloud tools like Google Workspace or Microsoft 365.",
    category: "Cloud Solutions",
    iconName: "layers",
  },

  // Cybersecurity
  {
    id: "threat-monitoring",
    title: "Threat Monitoring & Response",
    description: "24/7 monitoring of networks for suspicious activity with rapid incident response protocols.",
    category: "Cybersecurity",
    iconName: "shield",
  },
  {
    id: "data-backup",
    title: "Data Backup & Disaster Recovery",
    description: "Automated backups and rigorous strategies to quickly restore data in case of attacks or hardware failures.",
    category: "Cybersecurity",
    iconName: "save",
  },
  {
    id: "compliance-audits",
    title: "Compliance Audits",
    description: "Ensuring your complete technology stack meets industry regulations (HIPAA, GDPR, SOC2, PCI-DSS).",
    category: "Cybersecurity",
    iconName: "file-text",
  },
  {
    id: "pen-testing",
    title: "Penetration Testing",
    description: "Ethical hacking and deep security assessments to identify vulnerabilities before malicious actors do.",
    category: "Cybersecurity",
    iconName: "target",
  },

  // Data & Strategy
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    description: "Advising on digitizing manual workflows and adopting AI and automation for massive efficiency gains.",
    category: "Data & Strategy",
    iconName: "zap",
  },
  {
    id: "architecture-design",
    title: "Architecture Design",
    description: "Designing the foundational technical blueprint for complex infrastructure or new software builds.",
    category: "Data & Strategy",
    iconName: "compass",
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    description: "Building robust data pipelines, data warehouses, and interactive BI dashboards.",
    category: "Data & Strategy",
    iconName: "database",
  },
];

// Helper to group them
export const getServiceCategories = (): ServiceCategoryGroup[] => {
  return [
    {
      category: "Software & Design",
      services: mockServices.filter((s) => s.category === "Software & Design"),
      colorTheme: "from-[#2052bd] to-[#7fcbe4]",
    },
    {
      category: "Cloud Solutions",
      services: mockServices.filter((s) => s.category === "Cloud Solutions"),
      colorTheme: "from-[#2A408C] to-[#7fcbe4]",
    },
    {
      category: "Cybersecurity",
      services: mockServices.filter((s) => s.category === "Cybersecurity"),
      colorTheme: "from-[#2052bd] to-[#A0B0D9]",
    },
    {
      category: "Data & Strategy",
      services: mockServices.filter((s) => s.category === "Data & Strategy"),
      colorTheme: "from-[#2A408C] to-[#A0B0D9]",
    },
  ];
};
