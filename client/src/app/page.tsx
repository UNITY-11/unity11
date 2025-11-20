import { Hero } from "@/components/sections/home/Hero";
import Clients from "@/components/sections/home/Clients";
import AboutSection from "@/components/sections/home/About";
import ServiceSection from "@/components/sections/services/ServiceSection";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import ProcessSection from "@/components/sections/home/ProcessSection";
import TestimonialSection from "@/components/sections/home/TestimonialSection"

export default function Home() {
  return (
    <>
    <Hero />
    <Clients/>
    <AboutSection/>
    <ServiceSection/>
    <WhyChooseUs/>
    <ProcessSection/>
    <TestimonialSection/>
    </>
  );
}
