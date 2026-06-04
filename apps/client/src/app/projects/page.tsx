import { ProjectsClient } from "@/features/projects/components/ProjectsClient";

export const metadata = {
  title: "Our Projects | Unity11",
  description: "Explore our portfolio of digital transformations. From enterprise platforms to cutting-edge mobile apps, see how we build software that drives results.",
  openGraph: {
    title: "Our Projects | Unity11",
    description: "Explore our portfolio of digital transformations.",
    type: "website",
    url: "https://unity11.com/projects",
    images: [{ url: "https://unity11.com/og-projects.jpg" }],
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Unity11 Projects",
    "url": "https://unity11.com/projects",
    "description": "Portfolio of digital transformation projects by Unity11."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
