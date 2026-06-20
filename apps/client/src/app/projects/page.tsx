import { ProjectsClient } from "@/features/projects/components/ProjectsClient";
import { fetchPublishedProjects } from "@/sanity/lib/fetchers";

export const revalidate = 60;

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

export default async function ProjectsPage() {
  const projects = await fetchPublishedProjects();

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
      <ProjectsClient projects={projects} />
    </>
  );
}
