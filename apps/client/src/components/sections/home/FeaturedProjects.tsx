"use client";

import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { easeInOut, motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  tag1: string;
  tag2: string;
  title: string;
  description: string;
  image: string;
  bg: string;
  index?: number;
}

const projects: ProjectCardProps[] = [
  {
    id: "ai-insights-1",
    tag1: "AI + Analytics",
    tag2: "Dashboard",
    title: "AI-Powered Insights Platform",
    description:
      "Built an insights dashboard with real-time analytics, LLM automation, and advanced monitoring tools.",
    image: "/images/blog/blog2.png",
    bg: "bg-linear-to-t from-purple-600 to-blue-300", // soft purple
  },
  {
    id: "fintech-app-1",
    tag1: "2024",
    tag2: "Mobile App",
    title: "Fintech App Modernization",
    description:
      "A complete redesign + modernization of an outdated fintech application, improving speed, UX, and scalability.",
    image: "/images/blog/blog1.png",
    bg: "bg-linear-to-tl from-gray-700 to-gray-300", // neon green
  },
  {
    id: "ecommerce-1",
    tag1: "E-commerce",
    tag2: "Branding",
    title: "Next-Gen Storefront",
    description:
      "A complete e-commerce revamp with improved conversion flow, brand identity, and blazing fast UI.",
    image: "/images/blog/blog3.png",
    bg: "bg-linear-to-t from-white to-blue-700",
  },
  {
    id: "mobile-app-1",
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
  const router = useRouter();

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* heading */}
        <motion.div
          initial={{ y: "30%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10 flex flex-col justify-center items-center text-center"
        >
          <p className="text-xs tracking-wider text-blue-500">
            FEATURED PROJECTS
          </p>

          <div className="flex justify-between items-end">
            <h2 className="text-[40px] md:text-[52px] leading-none mt-3 text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4] pb-2">
              Engineering Real-World
              <br /> Digital Impact
            </h2>
          </div>
        </motion.div>

        {/* cards */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
          {projects.map((p, index) => (
            <ProjectCard key={p.id} index={index} {...p} />
          ))}
        </div>
      </div>

      <div className="mt-10 right-0 flex justify-center text-blue-500">
        <div className="flex justify-between items-center mx-5">
          <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
            <IoIosArrowBack className="text-lg" />
          </button>
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center rounded-full bg-linear-to-r px-20 py-2 text-[#2052bd] border-2 border-blue-500 shadow-lg transition-all gap-4 hover:gap-8 duration-500"
          >
            See More
          </button>
          <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
            <IoIosArrowForward className="text-lg" />
          </button>
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
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ y: "30%" }}
      whileInView={{ y: 0 }}
      transition={{ delay: (index ?? 0) * 0.3, duration: 1, ease: "easeOut" }}
      className={`group ${bg} min-w-[290px] max-w-[300px] rounded-4xl overflow-hidden shadow-sm flex flex-col justify-between z-40`}
    >
      <motion.div className="p-5">
        {/* tags */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg- px-3 py-1.5 rounded-full  text-white bg-white/40 backdrop-blur-3xl">
            {tag1}
          </span>
          <span className="text-xs bg- px-3 py-1.5 rounded-full  text-white bg-white/40 backdrop-blur-3xl">
            {tag2}
          </span>
        </div>

        {/* title & desc */}
        <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm text-gray-100">{description}</p>
      </motion.div>

      {/* image */}
      <motion.div
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-[200px] rounded-4xl overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-500"
        />
        {/* CTA */}
        <button className="absolute bottom-4 left-4 text-sm font-medium flex items-center gap-2 bg-blue-600/10 backdrop-blur-2xl rounded-full p-2 px-4 text-white hover:gap-3 transition-all duration-300">
          View Case Study <IoIosArrowForward className="text-xl" />
        </button>
      </motion.div>
    </motion.div>
  );
}
