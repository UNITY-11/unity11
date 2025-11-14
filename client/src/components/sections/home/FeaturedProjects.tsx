"use client";

import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface ProjectCardProps {
  tag1: string;
  tag2: string;
  title: string;
  description: string;
  image: string;
  bg: string;
}

const projects: ProjectCardProps[] = [
  {
    tag1: "AI + Analytics",
    tag2: "Dashboard",
    title: "AI-Powered Insights Platform",
    description:
      "Built an insights dashboard with real-time analytics, LLM automation, and advanced monitoring tools.",
    image: "/images/blog/blog2.png",
    bg: "bg-linear-to-t from-purple-600 to-blue-300", // soft purple
  },
  {
    tag1: "2024",
    tag2: "Mobile App",
    title: "Fintech App Modernization",
    description:
      "A complete redesign + modernization of an outdated fintech application, improving speed, UX, and scalability.",
    image: "/images/blog/blog1.png",
    bg: "bg-linear-to-tl from-gray-700 to-gray-300", // neon green
  },
  {
    tag1: "E-commerce",
    tag2: "Branding",
    title: "Next-Gen Storefront",
    description:
      "A complete e-commerce revamp with improved conversion flow, brand identity, and blazing fast UI.",
    image: "/images/blog/blog3.png",
    bg: "bg-linear-to-t from-white to-blue-700",
  },
  {
    tag1: "2024",
    tag2: "Mobile App",
    title: "Fintech App Modernization",
    description:
      "A complete redesign + modernization of an outdated fintech application, improving speed, UX, and scalability.",
    image: "/images/blog/blog1.png",
    bg: "bg-linear-to-tl from-gray-700 to-gray-300",
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section className="w-full py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* heading */}
        <div className="mb-10">
          <p className="text-xs tracking-wider text-gray-600">
            FEATURED PROJECTS
          </p>

          <div className="flex justify-between items-end">
            <h2 className="text-[40px] md:text-[52px] leading-none mt-3 text-white">
              Engineering Real-World
              <br /> Digital Impact
            </h2>

            <div className="flex justify-end gap-5">
              <button className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                <IoIosArrowBack className="text-lg" />
              </button>
              <button className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                <IoIosArrowForward className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  tag1,
  tag2,
  title,
  description,
  image,
  bg,
}: ProjectCardProps) {
  return (
    <div
      className={`group ${bg} min-w-[290px] max-w-[300px] rounded-4xl overflow-hidden shadow-sm  flex flex-col justify-between`}
    >
      <div className="p-5">
        {/* tags */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg- px-3 py-1.5 rounded-full  text-white backdrop-blur-3xl border-white border">
            {tag1}
          </span>
          <span className="text-xs bg- px-3 py-1.5 rounded-full  text-white backdrop-blur-3xl border-white border ">
            {tag2}
          </span>
        </div>

        {/* title & desc */}
        <h3 className="text-2xl font-semibold mb-2 text-black">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>

      {/* image */}
      <div className="relative w-full h-56 rounded-t-4xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-500"
        />
        {/* CTA */}
        <button className="absolute bottom-4 left-4 text-sm font-medium flex items-center gap-2 bg-white/20 backdrop-blur-2xl rounded-full p-2 px-4 text-white hover:gap-3 transition-all duration-300">
          View Case Study <IoIosArrowForward className="text-xl" />
        </button>
      </div>
    </div>
  );
}
