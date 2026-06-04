import { Metadata } from "next";
import { ContactHero, ContactInfo, ContactForm } from "@/features/contact/components";

export const metadata: Metadata = {
  title: "Contact Us | Unity11",
  description: "Get in touch with Unity11. We'd love to hear from you and see how we can help with your next project.",
  openGraph: {
    title: "Contact Us | Unity11",
    description: "Get in touch with Unity11. We'd love to hear from you and see how we can help with your next project.",
    type: "website",
    url: "https://unity11.com/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Unity11",
    "url": "https://unity11.com/contact",
    "description": "Get in touch with Unity11. We'd love to hear from you and see how we can help with your next project."
  };

  return (
    <main className="min-h-screen bg-black selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactHero />
      
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Contact Info (Left column on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 h-full">
              <ContactInfo />
          </div>
          
          {/* Contact Form (Right column on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
