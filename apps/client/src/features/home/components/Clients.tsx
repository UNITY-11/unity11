"use client";
import React from "react";
import { CompanyCardItem } from "@/components/ui/cards/FlowCards";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/MagicUi/ScrollBasedVelocity";
import { companies } from "@/features/home/data/companies";

function Clients() {
  const logos = (
    <ul className="flex shrink-0 gap-12 md:gap-24 py-2 px-6 md:px-12 items-center list-none m-0">
      {companies.map((c, idx) => (
        <CompanyCardItem
          key={idx}
          img={c.img}
          nameImg={c.nameImg}
          name={c.name}
          width={c.id === 4 || c.id === 5 ? 100 : 150}
        />
      ))}
    </ul>
  );

  return (
    <div className="w-full py-16 md:py-24 overflow-hidden relative z-20">
      <ScrollVelocityContainer className="flex flex-col gap-2 md:gap-4 w-full [mask:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <ScrollVelocityRow baseVelocity={2} direction={1}>
          {logos}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={2} direction={-1}>
          {logos}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}

export default Clients;
