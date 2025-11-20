import Image from "next/image";
import Link from "next/link";

type HeroCard =
  | { type: "image"; src: string; alt: string; className?: string }
  | { type: "stat"; label: string; value: string; description: string; bg: string }
  | { type: "rating"; label: string; value: string; description: string };

type ProcessStep = { title: string; description: string };
type HighlightCard =
  | { type: "image"; src: string; alt: string }
  | {
      type?: "text";
      title: string;
      description: string;
      bg: string;
      text: string;
      icon?: string;
      image?: string;
    };

const heroCards: HeroCard[] = [
  {
    type: "image",
    src: "/images/home/heroImg2.jpg",
    alt: "Creative consultation",
    className: "h-64 sm:h-72",
  },
  {
    type: "stat",
    label: "Happy Partners",
    value: "25K+",
    description: "Global relationships",
    bg: "bg-[#f3d9ff]",
  },
  {
    type: "image",
    src: "/images/home/heroImg3.png",
    alt: "Team collaboration",
    className: "h-72 sm:h-80",
  },
  {
    type: "rating",
    value: "4.9",
    label: "Google Rating",
    description: "Based on 1,200+ reviews",
  },
];

const processSteps: ProcessStep[] = [
  {
    title: "Choose a Plan",
    description: "Select the flexible or premium plan that suits your roadmap.",
  },
  {
    title: "Subscribe Instantly",
    description: "Activate your engagement with a single click—no forms, no hassle.",
  },
  {
    title: "Get Tailored Solutions",
    description: "Receive personalized roadmaps, creative systems, and engineering pods.",
  },
  {
    title: "Receive Your Deliverables",
    description: "Go live with production-grade launches, delivered on schedule every time.",
  },
];

const excellenceHighlights: HighlightCard[] = [
  {
    title: "Fast Delivery",
    description: "Count on prompt, dependable delivery that ensures you never miss a milestone.",
    bg: "bg-[#0f1c54]",
    text: "text-white",
  },
  {
    type: "image",
    src: "/images/why/fast.png",
    alt: "Fast operations",
  },
  {
    title: "Consistent Flow",
    description: "Guaranteed visibility for uninterrupted production and campaign flow.",
    bg: "bg-[#e7ecff]",
    text: "text-[#1b2361]",
    icon: "/images/technologies/ts.png",
  },
  {
    title: "Customized Solutions",
    description: "Every component is tailored to your industry, audience, and GTM priorities.",
    bg: "bg-[#dfe9ff]",
    text: "text-[#0f1c54]",
    image: "/images/why/trust.png",
  },
  {
    title: "24/7 Customer Support",
    description: "Hybrid support pods ready whenever you are.",
    bg: "bg-[#0e1a45]",
    text: "text-white",
    image: "/images/why/trust3.png",
  },
];

const contractTiles = [
  {
    title: "All Your Campaign Intelligence in One Place",
    description: "Centralize briefs, research, and creative assets for every launch in a single, secure hub.",
  },
  {
    title: "AI-Powered Campaign Assistance",
    description: "Generate headlines, audience insights, and testing plans with contextual AI copilots.",
  },
  {
    title: "Lifecycle Reminders & Notifications",
    description: "Automated alerts keep SEO audits, sprint demos, and nurture journeys on schedule.",
  },
  {
    title: "AI-Powered Asset Insights",
    description: "Surface performance signals across content, ads, and product drops to plan the next sprint.",
  },
];

const dashboardChips = [
  { label: "Strategy Pods" },
  { label: "Build Pods" },
];

const dashboardPeople = [
  { name: "Luisa Dzen", status: "In progress", detail: "Leading brand refresh sprint", minutes: "3 min ago" },
  { name: "Tomas Levi", status: "Live", detail: "Shipping Next.js storefront", minutes: "7 hrs ago" },
  { name: "Rosie Shein", status: "QA", detail: "Validating CRM automations", minutes: "3 hrs ago" },
];

const insightsTiles = [
  {
    title: "Effortless project orchestration",
    description: "Manage strategy, design, engineering, and marketing workstreams inside one command center.",
  },
  { title: "Reliable tracking & analytics", description: "Monitor impressions, CAC, and retention in real time." },
  { title: "Analyze & predict", description: "Use AI forecasting to prioritize roadmaps and media budgets." },
  { title: "Detect issues early", description: "Guard releases with automated QA, accessibility, and perf checks." },
  { title: "Scale on demand", description: "Spin up cross-functional pods whenever your roadmap expands." },
];

const revenueTiles = [
  {
    title: "Predictable, Retained Revenue",
    description: "Membership, subscription, and loyalty programs managed end-to-end.",
  },
  {
    title: "Real-Time Growth Insights",
    description: "Track pipeline, revenue, and conversion movements inside one dashboard.",
  },
  {
    title: "Fewer Failed Payments",
    description: "Smart retries and billing automation keep recurring revenue intact.",
  },
  {
    title: "Higher Conversion at Checkout",
    description: "Personalized upsells and incentives drive AOV gains across commerce builds.",
  },
  {
    title: "Fast Setup, No Headaches",
    description: "Launch new funnels and digital products in weeks with managed implementation.",
  },
  {
    title: "Grow Profits via Memberships",
    description: "Pair product ecosystems with retention programs tailored to your audience.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-[#f6f6fb] pt-32 pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-[#f0f4ff] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2d6b]">
              Why Choose Unity11
            </span>
            <h1 className="text-3xl font-semibold leading-tight text-[#0e1228] sm:text-4xl">
              Unique, Outcome-Driven Approach to Marketing, Product, and Growth
            </h1>
            <p className="text-base text-[#5b6073]">
              From SEO and brand systems to full-stack engineering and lifecycle automation, Unity11 pairs every
              engagement with measurable traction and premium craft.
            </p>
            <div className="rounded-3xl bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <p className="text-sm text-[#101425]">
                “Unity11 kept strategy, design, and code in sync from day one. Our campaign, platform release, and CRM
                automation shipped faster than any prior vendor.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Image
                  src="/images/people/avatar1.png"
                  alt="Maria Joy"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">Maria Joy</p>
                  <p className="text-xs text-[#636a82]">Product Lead, Polaris</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {heroCards.map((card, index) => {
              if (card.type === "image") {
                return (
                  <div
                    key={card.src}
                    className="overflow-hidden rounded-[24px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      width={420}
                      height={420}
                      className={`${card.className ?? ""} w-full object-cover`}
                      priority={index === 0}
                    />
                  </div>
                );
              }

              if (card.type === "stat") {
                return (
                  <div
                    key={card.label}
                    className={`${card.bg} rounded-[24px] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]`}
                  >
                    <p className="text-4xl font-semibold text-[#0f0f3d]">{card.value}</p>
                    <p className="mt-2 text-sm font-medium text-[#4a4372]">{card.label}</p>
                    <p className="mt-2 text-xs uppercase tracking-widest text-[#72659b]">{card.description}</p>
                  </div>
                );
              }

              return (
                <div
                  key={card.label}
                  className="rounded-[24px] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/company-images/google.svg"
                      alt="Google"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full border border-slate-100 bg-white object-contain"
                    />
                    <span className="text-sm font-semibold text-[#0f172a]">{card.label}</span>
                  </div>
                  <p className="mt-6 text-4xl font-semibold text-[#101425]">{card.value}</p>
                  <p className="mt-2 text-sm text-[#5b6073]">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#050f2f] py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7ee6]">4 Simple Steps</p>
          <h2 className="mt-4 text-3xl font-semibold">Effortless Process, Continuous Supply</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex h-full flex-col rounded-[28px] bg-[#1a1f45] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
              >
                <p className="text-sm font-semibold text-[#8ba5ff]">0{index + 1}.</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-[#b8c0ff]">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 rounded-[40px] bg-[#11163b] p-6 text-sm text-white shadow-[0_24px_48px_rgba(0,0,0,0.35)] lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((idx) => (
                  <Image
                    key={idx}
                    src={`/images/people/avatar${idx}.png`}
                    alt="Partner avatar"
                    width={48}
                    height={48}
                    className="h-10 w-10 rounded-full border-2 border-[#11163b] object-cover"
                  />
                ))}
              </div>
              <p>
                Align with businesses that <span className="font-semibold text-white">choose quality</span>
              </p>
            </div>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#050f2f]"
            >
              Start Now
            </Link>
          </div>
        </div>
      </section>

      {/* Excellence Highlights */}
      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {excellenceHighlights.map((card, index) => {
              if (card.type === "image") {
                return (
                  <div
                    key={`${card.src}-${index}`}
                    className="h-full overflow-hidden rounded-[36px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  >
                    <Image src={card.src} alt={card.alt} width={360} height={480} className="h-full w-full object-cover" />
                  </div>
                );
              }

              return (
                <div
                  key={card.title}
                  className={`${card.bg} ${card.text} flex h-full flex-col justify-between rounded-[36px] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]`}
                >
                  <div>
                    <p className="text-lg font-semibold">{card.title}</p>
                    <p className="mt-3 text-sm opacity-80">{card.description}</p>
                  </div>
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={220}
                      height={220}
                      className="mx-auto mt-6 h-24 w-auto object-contain"
                    />
                  ) : card.icon ? (
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={48}
                      height={48}
                      className="mt-6 h-12 w-12 object-contain"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campaign Intelligence Grid */}
      <section className="bg-[#f8f7fb] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative rounded-[32px] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] md:col-span-2">
              <div className="flex items-center justify-between rounded-2xl border border-[#ece9fb] bg-[#faf8ff] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5ff] text-sm font-semibold text-[#5c6ac4]">
                      W
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7fdf7] text-sm font-semibold text-[#1ea885]">
                      P
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#717b9e]">Syncing insights…</span>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#c0c4d9]">Marketing Stack</span>
              </div>
              <p className="mt-8 text-xl font-semibold text-[#0f1224]">All Your Campaign Intelligence in One Place</p>
              <p className="mt-3 text-sm text-[#69708a]">
                Briefs, roadmaps, and creative systems live together so product, marketing, and growth teams stay aligned.
              </p>
            </div>
            <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <div className="rounded-2xl bg-[#fff7f5] px-5 py-4 text-sm font-semibold text-[#ff6b5f]">Orchestrating...</div>
              <p className="mt-8 text-xl font-semibold text-[#0f1224]">AI-Powered Asset Insights</p>
              <p className="mt-3 text-sm text-[#69708a]">Automatically surface learnings across content, ads, and releases.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {contractTiles.map((tile) => (
              <div
                key={tile.title}
                className="rounded-[32px] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
              >
                <p className="text-base font-semibold text-[#0f1224]">{tile.title}</p>
                <p className="mt-3 text-sm text-[#69708a]">{tile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Dashboard Snapshot */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_auto]">
            <div className="rounded-[40px] bg-[#f6f8ff] p-6 shadow-[0_25px_50px_rgba(15,23,42,0.08)]">
              <div className="flex gap-2">
                {dashboardChips.map((chip, idx) => (
                  <span
                    key={chip.label}
                    className={`rounded-full px-5 py-2 text-sm font-semibold ${
                      idx === 0 ? "bg-[#11163b] text-white" : "bg-white text-[#7a81a0]"
                    }`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                {dashboardPeople.map((person, idx) => (
                  <div
                    key={person.name}
                    className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-[0_15px_30px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={`/images/people/avatar${(idx % 4) + 1}.png`}
                        alt={person.name}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#0f1224]">{person.name}</p>
                        <p className="text-xs text-[#7a81a0]">{person.detail}</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-[#a1a7c4]">{person.minutes}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[40px] bg-white p-6 shadow-[0_25px_50px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src="/images/people/avatar2.png"
                  alt="Lead Designer"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold text-[#0f1224]">Marina Budarina</p>
                  <p className="text-sm text-[#7a81a0]">@marina_uiux</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 rounded-3xl border border-[#eceff8] bg-[#f5f7ff] p-4 text-center text-sm font-semibold text-[#0f1224]">
                <div>
                  <p className="text-xl">32</p>
                  <p className="text-xs text-[#7a81a0]">Skills</p>
                </div>
                <div>
                  <p className="text-xl">67</p>
                  <p className="text-xs text-[#7a81a0]">Projects</p>
                </div>
                <div>
                  <p className="text-xl">110%</p>
                  <p className="text-xs text-[#7a81a0]">Return</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {["UI/UX design pro", "Figma advanced", "Add skill"].map((skill, idx) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between rounded-2xl border border-[#eceff8] px-4 py-3 text-sm font-semibold text-[#0f1224]"
                  >
                    <span>{skill}</span>
                    <span className="text-[#8ba5ff]">{idx === 2 ? "+" : "⚙︎"}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-[40px] bg-[#f5f7ff] p-6 shadow-[0_25px_50px_rgba(15,23,42,0.08)]">
              <div className="rounded-2xl bg-white p-4 text-sm font-semibold text-[#0f1224] shadow-[0_15px_30px_rgba(15,23,42,0.08)]">
                Tim Peterson <span className="text-[#7a81a0]"> / $82,000</span>
              </div>
              <div className="rounded-2xl bg-white p-4 text-sm font-semibold text-[#0f1224] shadow-[0_15px_30px_rgba(15,23,42,0.08)]">
                Maria Marks <span className="text-[#7a81a0]"> / $11,850</span>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-[0_15px_30px_rgba(15,23,42,0.08)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#a1a7c4]">Slider</p>
                <div className="mt-3 h-3 rounded-full bg-[#eceff8]">
                  <div className="h-3 w-2/3 rounded-full bg-linear-to-r from-[#7a81ff] to-[#4de1ff]" />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-[#7a81a0]">
                  <span>BG</span>
                  <span>FG</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="bg-[#eef3ff] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {insightsTiles.map((tile) => (
              <div
                key={tile.title}
                className="rounded-[32px] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
              >
                <p className="text-lg font-semibold text-[#0f1224]">{tile.title}</p>
                <p className="mt-3 text-sm text-[#69708a]">{tile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Tiles */}
      <section className="bg-white pb-24 pt-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {revenueTiles.map((tile) => (
              <div
                key={tile.title}
                className="rounded-[32px] bg-[#f7f9ff] p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
              >
                <p className="text-base font-semibold text-[#0f1224]">{tile.title}</p>
                <p className="mt-3 text-sm text-[#69708a]">{tile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

