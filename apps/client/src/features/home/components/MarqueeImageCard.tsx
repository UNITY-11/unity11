"use client";

import React, { useRef, useState, useEffect } from "react";

export const MarqueeImageCard = ({ src, alt, i, direction }: { src: string; alt: string; i: number; direction: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (cardRef.current) {
        const { offsetWidth, offsetHeight } = cardRef.current;
        setDimensions(prev => prev.width === offsetWidth && prev.height === offsetHeight ? prev : { width: offsetWidth, height: offsetHeight });
      }
    };
    
    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => observer.disconnect();
  }, []);

  const generatePath = (width: number, height: number, variant: number) => {
    if (!width || !height) return "";
    
    const scale = Math.min(width, height) / 100; 
    const R = Math.max(8, 16 * scale); 
    
    let CW = width * 0.4;
    let SW = CW * 0.5;
    const NH = Math.max(4, 16 * scale);
    const CS = SW * 0.5;

    if (width < CW + R + 10) {
      CW = width - R - 10;
      SW = CW * 0.5;
    }

    if (variant === 0) {
      // Top-Left and Bottom-Right cut
      return `
        M ${CW} 0
        L ${width - R} 0
        A ${R} ${R} 0 0 1 ${width} ${R}
        L ${width} ${height - NH - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height - NH}
        L ${width - CW + SW} ${height - NH}
        C ${width - CW + SW - CS} ${height - NH}, ${width - CW + CS} ${height}, ${width - CW} ${height}
        L ${R} ${height}
        A ${R} ${R} 0 0 1 0 ${height - R}
        L 0 ${NH + R}
        A ${R} ${R} 0 0 1 ${R} ${NH}
        L ${CW - SW} ${NH}
        C ${CW - SW + CS} ${NH}, ${CW - CS} 0, ${CW} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    } else if (variant === 1) {
      // Top-Right and Bottom-Left cut
      return `
        M ${R} 0
        L ${width - CW} 0
        C ${width - CW + CS} 0, ${width - CW + SW - CS} ${NH}, ${width - CW + SW} ${NH}
        L ${width - R} ${NH}
        A ${R} ${R} 0 0 1 ${width} ${NH + R}
        L ${width} ${height - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height}
        L ${CW} ${height}
        C ${CW - CS} ${height}, ${CW - SW + CS} ${height - NH}, ${CW - SW} ${height - NH}
        L ${R} ${height - NH}
        A ${R} ${R} 0 0 1 0 ${height - NH - R}
        L 0 ${R}
        A ${R} ${R} 0 0 1 ${R} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    } else {
      // Top Center notch
      const cx = width / 2;
      return `
        M ${R} 0
        L ${cx - CW/2} 0
        C ${cx - CW/2 + CS} 0, ${cx - CW/2 + SW - CS} ${NH}, ${cx - CW/2 + SW} ${NH}
        L ${cx + CW/2 - SW} ${NH}
        C ${cx + CW/2 - SW + CS} ${NH}, ${cx + CW/2 - CS} 0, ${cx + CW/2} 0
        L ${width - R} 0
        A ${R} ${R} 0 0 1 ${width} ${R}
        L ${width} ${height - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height}
        L ${R} ${height}
        A ${R} ${R} 0 0 1 0 ${height - R}
        L 0 ${R}
        A ${R} ${R} 0 0 1 ${R} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    }
  };

  const pathD = generatePath(dimensions.width, dimensions.height, i % 3);
  const uniqueId = React.useId().replace(/:/g, '');
  const clipId = `clip-marquee-${uniqueId}`;

  return (
    <div className="relative flex items-center justify-center w-20 h-10 sm:w-28 sm:h-14 md:w-48 md:h-20 mx-6 shrink-0 group cursor-pointer">
      
      {/* Base Notched Image - Completely static */}
      <div 
        ref={cardRef as any}
        style={dimensions.width ? { clipPath: `url(#${clipId})` } : { overflow: 'hidden', borderRadius: '9999px' }}
        className="w-full h-full relative"
      >
        {dimensions.width > 0 && (
          <svg width="0" height="0" className="absolute pointer-events-none">
            <defs>
              <clipPath id={clipId}>
                <path d={pathD} />
              </clipPath>
            </defs>
          </svg>
        )}
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* Pop-Out Overlay Image - Fades in and sits above text on hover */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 sm:w-36 sm:h-24 md:w-56 md:h-32 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100] pointer-events-none shadow-2xl ${direction === 1 ? 'group-hover:rotate-3' : 'group-hover:-rotate-3'}`}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
      </div>

    </div>
  );
};
