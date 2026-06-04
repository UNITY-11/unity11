import { AboutHero, CoreValues, Stats, CompanyLogos } from "@/features/about/components";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export const metadata = {
  title: "About Us | Unity11 IT Solutions",
  description: "Learn about our mission, our story, and the leadership team driving innovation at Unity11.",
  openGraph: {
    title: "About Us | Unity11 IT Solutions",
    description: "Learn about our mission, our story, and the leadership team driving innovation at Unity11.",
    type: "website",
    url: "https://unity11.com/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Unity11",
    "url": "https://unity11.com/about",
    "description": "Learn about our mission, our story, and the leadership team driving innovation at Unity11."
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutHero />
      <CoreValues />
      <Stats />
      
      {/* Testimonials Section */}
      <section className="py-24 bg-[#050505] flex items-center justify-center">
        <StaggerTestimonials />
      </section>

      <CompanyLogos />
    </main>
  );
}
