import { Hero } from "@/components/sections/home/Hero";
import Clients from "@/components/sections/home/Clients";
import AboutSection from "@/components/sections/home/About";
import ServiceSection from "@/components/sections/services/ServiceSection";

export default function Home() {
  return (
    <>
    <Hero />
    <Clients/>
    <AboutSection/>
    <ServiceSection/>
    </>
  );
}
