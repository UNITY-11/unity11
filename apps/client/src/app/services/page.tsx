import { ServicesGrid, ServicesHero } from "@/features/services";

export const metadata = {
  title: "Our Services | Unity11",
  description: "Explore the wide range of custom software development, cloud, and digital services offered by Unity11.",
  openGraph: {
    title: "Our Services | Unity11",
    description: "Explore the wide range of custom software development, cloud, and digital services offered by Unity11.",
    type: "website",
    url: "https://unity11.com/services",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Software Development",
    "provider": {
      "@type": "Organization",
      "name": "Unity11"
    },
    "url": "https://unity11.com/services",
    "description": "Explore the wide range of custom software development, cloud, and digital services offered by Unity11."
  };

  return (
    <main className="min-h-screen bg-black pb-24 selection:bg-blue-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesHero />
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <ServicesGrid />
      </div>
    </main>
  );
}
