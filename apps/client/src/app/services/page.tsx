import { ServicesGrid, ServicesHero } from "@/features/services";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-6">
        <ServicesHero />
        <ServicesGrid />
      </div>
    </main>
  );
}
