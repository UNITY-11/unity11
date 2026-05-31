import { AboutHero, CoreValues, Stats, CompanyLogos } from "@/features/about/components";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export const metadata = {
  title: "About Us | Spirox IT Solutions",
  description: "Learn about our mission, our story, and the leadership team driving innovation at Spirox.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden flex flex-col">
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
