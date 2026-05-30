"use client";

import { motion } from "motion/react";
import { getServiceCategories } from "../data/mockData";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid() {
  const categoryGroups = getServiceCategories();

  return (
    <div className="flex flex-col gap-24">
      {categoryGroups.map((group, groupIdx) => (
        <section key={group.category} className="relative">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-center gap-4"
          >
            <div className={`w-2 h-10 rounded-full bg-linear-to-b ${group.colorTheme}`} />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {group.category}
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.services.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index} 
                  className="col-span-1"
                />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
