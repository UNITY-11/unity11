import { ServicesGrid, ServicesHero } from "@/features/services";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black pb-24 selection:bg-blue-500/30">
      <ServicesHero />
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <ServicesGrid />
      </div>
    </main>
  );
}
