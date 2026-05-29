"use client";

import { motion } from "motion/react";
import React from "react";
import Image from "next/image";

export interface MarqueeImage {
  src: string;
  alt: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number; // default is 4
  onImageClick?: (image: MarqueeImage, index: number) => void;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
}) => {
  // Clone the image list multiple times to fill the columns entirely
  const duplicatedImages = Array(10).fill(images).flat();

  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
    <section
      className={`mx-auto block h-[600px] max-sm:h-[400px] 
        overflow-hidden rounded-2xl ${className}`}
    >
      <div
        className="flex w-[150%] h-[150%] -ml-[25%] -mt-[25%] items-center justify-center overflow-visible"
        style={{
          transform: "rotateX(55deg) rotateY(0deg) rotateZ(45deg)",
        }}
      >
        <div className="w-full overflow-visible scale-75 sm:scale-90">
          <div
            className="relative grid h-full w-full origin-center gap-6 transform"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {imageGroups.map((imagesInGroup, idx) => (
              <motion.div
                key={`column-${idx}`}
                animate={{ y: idx % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: idx % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="flex flex-col items-center gap-6 relative"
              >
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-100" />
                {imagesInGroup.map((image, imgIdx) => {
                  const globalIndex = idx * groupSize + imgIdx;
                  const isClickable = image.href || onImageClick;

                  return (
                    <div key={`img-${imgIdx}`} className="relative w-full max-w-[320px]">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-100" />
                      <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`relative aspect-[970/700] w-full rounded-lg overflow-hidden ring ring-gray-200/50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
                          isClickable ? "cursor-pointer" : ""
                        }`}
                        onClick={() => handleImageClick(image, globalIndex)}
                      >
                         <Image
                           src={image.src}
                           alt={image.alt}
                           fill
                           className="object-cover"
                         />
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
