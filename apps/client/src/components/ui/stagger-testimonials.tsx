"use client"

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We work 5x faster with COMPANY.",
    by: "Alex, CEO at TechCorp",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 1,
    testimonial: "I'm confident my data is safe with COMPANY. I can't say that about other providers.",
    by: "Dan, CTO at SecureNet",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 2,
    testimonial: "I know it's cliche, but we were lost before we found COMPANY. Can't thank you guys enough!",
    by: "Stephanie, COO at InnovateCo",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 3,
    testimonial: "COMPANY's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie, CFO at FuturePlanning",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Andre, Head of Design at CreativeSolutions",
    imgSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 5,
    testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy, Product Manager at TimeWise",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on COMPANY, we're never going back.",
    by: "Pam, Marketing Director at BrandBuilders",
    imgSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 7,
    testimonial: "I would be lost without COMPANY's in-depth analytics. The ROI is EASILY 100X for us.",
    by: "Daniel, Data Scientist at AnalyticsPro",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 8,
    testimonial: "It's just the best. Period.",
    by: "Fernando, UX Designer at UserFirst",
    imgSrc: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 9,
    testimonial: "I switched 5 years ago and never looked back.",
    by: "Andy, DevOps Engineer at CloudMasters",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a solution like COMPANY for YEARS. So glad I finally found one!",
    by: "Pete, Sales Director at RevenueRockets",
    imgSrc: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Marina, HR Manager at TalentForge",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 12,
    testimonial: "COMPANY's customer support is unparalleled. They're always there when we need them.",
    by: "Olivia, Customer Success Manager at ClientCare",
    imgSrc: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 13,
    testimonial: "The efficiency gains we've seen since implementing COMPANY are off the charts!",
    by: "Raj, Operations Manager at StreamlineSolutions",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 14,
    testimonial: "COMPANY has revolutionized how we handle our workflow. It's a game-changer!",
    by: "Lila, Workflow Specialist at ProcessPro",
    imgSrc: "https://images.unsplash.com/photo-1508214751196-bfd14317fdb0?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 15,
    testimonial: "The scalability of COMPANY's solution is impressive. It grows with our business seamlessly.",
    by: "Trevor, Scaling Officer at GrowthGurus",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 16,
    testimonial: "I appreciate how COMPANY continually innovates. They're always one step ahead.",
    by: "Naomi, Innovation Lead at FutureTech",
    imgSrc: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 17,
    testimonial: "The ROI we've seen with COMPANY is incredible. It's paid for itself many times over.",
    by: "Victor, Finance Analyst at ProfitPeak",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 18,
    testimonial: "COMPANY's platform is so robust, yet easy to use. It's the perfect balance.",
    by: "Yuki, Tech Lead at BalancedTech",
    imgSrc: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&q=80"
  },
  {
    tempId: 19,
    testimonial: "We've tried many solutions, but COMPANY stands out in terms of reliability and performance.",
    by: "Zoe, Performance Manager at ReliableSystems",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80"
  }
];

const generateCardPath = (width: number, height: number, offset = 1) => {
  const R = 24;
  const X = width / 2;
  const NW = 160; // Width of the notch opening
  const FW = 100; // Width of the flat bottom of the notch
  const NH = 25;  // Depth of the notch
  const CS = 25;  // Curve strength for the smooth bend

  const topNotch = `
    L ${X - NW / 2} ${offset}
    C ${X - NW / 2 + CS} ${offset}, ${X - FW / 2 - CS} ${offset + NH}, ${X - FW / 2} ${offset + NH}
    L ${X + FW / 2} ${offset + NH}
    C ${X + FW / 2 + CS} ${offset + NH}, ${X + NW / 2 - CS} ${offset}, ${X + NW / 2} ${offset}
  `;

  const bottomY = height - offset;
  const bottomNotch = `
    L ${X + NW / 2} ${bottomY}
    C ${X + NW / 2 - CS} ${bottomY}, ${X + FW / 2 + CS} ${bottomY - NH}, ${X + FW / 2} ${bottomY - NH}
    L ${X - FW / 2} ${bottomY - NH}
    C ${X - FW / 2 - CS} ${bottomY - NH}, ${X - NW / 2 + CS} ${bottomY}, ${X - NW / 2} ${bottomY}
  `;

  return `
    M ${offset + R} ${offset}
    ${topNotch}
    L ${width - offset - R} ${offset}
    A ${R} ${R} 0 0 1 ${width - offset} ${offset + R}
    L ${width - offset} ${height - offset - R}
    A ${R} ${R} 0 0 1 ${width - offset - R} ${height - offset}
    ${bottomNotch}
    L ${offset + R} ${height - offset}
    A ${R} ${R} 0 0 1 ${offset} ${height - offset - R}
    L ${offset} ${offset + R}
    A ${R} ${R} 0 0 1 ${offset + R} ${offset}
    Z
  `.replace(/\s+/g, ' ').trim();
};

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;
  const [isHovered, setIsHovered] = useState(false);

  const pathD = generateCardPath(cardSize, cardSize, 1);

  return (
    <div
      onClick={() => handleMove(position)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-in-out"
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          translateY(${isHovered ? -10 : 0}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isHovered ? 1.02 : 1})
        `,
        zIndex: isCenter ? 10 : 0,
      }}
    >
      {/* SVG Background with Smooth Frame Curves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-500"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: isCenter
            ? 'drop-shadow(0 10px 40px rgba(59,130,246,0.3))'
            : isHovered
              ? 'drop-shadow(0 15px 50px rgba(0,0,0,0.25))'
              : 'drop-shadow(0 10px 40px rgba(0,0,0,0.15))'
        }}
      >
        <path
          d={pathD}
          strokeWidth="2"
          className={cn(
            "transition-colors duration-300",
            isCenter ? "fill-blue-600 stroke-blue-500" : isHovered ? "fill-white stroke-blue-400" : "fill-white stroke-white"
          )}
        />
      </svg>

      {/* Content Wrapper */}
      <div
        className={cn(
          "w-full h-full p-8 pt-10 pb-10 flex flex-col relative z-10",
          isCenter ? "text-white" : "text-slate-900"
        )}
      >
        <div className="flex items-center gap-4">
          <img
            src={testimonial.imgSrc}
            alt={testimonial.by.split(',')[0]}
            className="h-14 w-14 rounded-full bg-gray-800 object-cover object-top shadow-md shrink-0"
          />
          <div className="flex flex-col">
            <span className={cn(
              "font-semibold text-base",
              isCenter ? "text-white" : "text-slate-900"
            )}>
              {testimonial.by.split(',')[0]}
            </span>
            <span className={cn(
              "text-xs sm:text-sm",
              isCenter ? "text-white/80" : "text-slate-500"
            )}>
              {testimonial.by.split(',').slice(1).join(',').trim()}
            </span>
          </div>
        </div>
        <h3 className={cn(
          "text-base sm:text-lg font-medium my-auto",
          isCenter ? "text-white" : "text-slate-800"
        )}>
          "{testimonial.testimonial}"
        </h3>
      </div>
    </div>
  );
};

export interface StaggerTestimonialsHandle {
  handleMove: (steps: number) => void;
}

export const StaggerTestimonials = forwardRef<StaggerTestimonialsHandle, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useImperativeHandle(ref, () => ({
    handleMove
  }));

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 500 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
    </div>
  );
});

StaggerTestimonials.displayName = 'StaggerTestimonials';
