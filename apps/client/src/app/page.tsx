import { Hero } from "@/components/sections/home/Hero";
import Clients from "@/components/sections/home/Clients";
import AboutSection from "@/components/sections/home/About";
import ServiceSection from "@/components/sections/home/ServiceSection";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import ProcessSection from "@/components/sections/home/ProcessSection";
import TestimonialSection from "@/components/sections/home/TestimonialSection";
import Technologies from "@/components/sections/home/Technologies";
import BlogSection from "@/components/sections/home/BlogSection";
import FeaturesProjects from "@/components/sections/home/FeaturedProjects";

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <Clients />
      <AboutSection />
      <ServiceSection />
      <WhyChooseUs />
      <ProcessSection />
      <FeaturesProjects />
      <TestimonialSection />
      <Technologies />
      <BlogSection />
    </div>
  );
}
