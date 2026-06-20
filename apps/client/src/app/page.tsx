import { Hero } from "@/features/home/components/Hero";
import Clients from "@/features/home/components/Clients";
import AboutSection from "@/features/home/components/About";
import ServiceSection from "@/features/home/components/ServiceSection";
import WhyChooseUs from "@/features/home/components/WhyChooseUs";
import ProcessSection from "@/features/home/components/ProcessSection";
import TestimonialSection from "@/features/home/components/TestimonialSection";
import Technologies from "@/features/home/components/Technologies";
import BlogSection from "@/features/home/components/BlogSection";
import FeaturesProjects from "@/features/home/components/FeaturedProjects";
import {
  fetchPublishedBlogs,
  fetchPublishedProjects,
} from "@/sanity/lib/fetchers";

export const revalidate = 60;

export const metadata = {
  title: "Software Development & IT Solutions | Unity11",
  description: "Unity11 is a leading software development agency offering custom software, mobile apps, and enterprise solutions.",
  openGraph: {
    title: "Software Development & IT Solutions | Unity11",
    description: "Unity11 is a leading software development agency offering custom software, mobile apps, and enterprise solutions.",
    type: "website",
    url: "https://unity11.com",
    images: [{ url: "https://unity11.com/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function Home() {
  const [projects, blogs] = await Promise.all([
    fetchPublishedProjects(),
    fetchPublishedBlogs(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Unity11",
    "url": "https://unity11.com",
    "logo": "https://unity11.com/logo.png",
    "sameAs": [
      "https://twitter.com/unity11",
      "https://linkedin.com/company/unity11"
    ]
  };

  return (
    <div className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Clients />
      <AboutSection />
      <ServiceSection />
      <WhyChooseUs />
      <ProcessSection />
      <FeaturesProjects projects={projects} />
      <TestimonialSection />
      <Technologies />
      <BlogSection posts={blogs} />
    </div>
  );
}
