"use client";
import React from "react";
import FlowCards, { CompanyCardItem } from "@/components/ui/cards/FlowCards";
import { companies } from "@/data/companies";

function Clients() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 py-20 bg-black">
      <h2 className="text-center text-2xl md:text-4xl lg:text-6xl text-white tracking-tight space-x-2">
        <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
          Our
        </span>
        <span className="inline-block">Clients</span>
      </h2>

      <FlowCards direction="right" speed="slow">
        {companies.map((c, idx) => (
          <CompanyCardItem
            key={idx}
            img={c.img}
            nameImg={c.nameImg}
            name={c.name}
            width={c.id === 4 || c.id === 5 ? 100 : 150}
          />
        ))}
      </FlowCards>
    </div>
  );
}

export default Clients;
