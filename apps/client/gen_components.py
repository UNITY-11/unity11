import os

components_dir = r'c:\Business\unity\web\apps\client\src\components\ui'
if not os.path.exists(components_dir):
    os.makedirs(components_dir)

meteors_code = """\"use client\";
import { useEffect, useState } from \"react\";
import { cn } from \"@/utils/cn\";

export const Meteors = ({ number = 20, className }: { number?: number; className?: string }) => {
  const [meteors, setMeteors] = useState<number[]>([]);
  useEffect(() => { setMeteors(new Array(number).fill(true)); }, [number]);
  return (
    <div className={cn(\"absolute inset-0 overflow-hidden pointer-events-none\", className)}>
      {meteors.map((el, idx) => (
        <span key={\"meteor\" + idx}
          className={cn(\"absolute top-1/2 left-1/2 h-[0.1rem] w-[0.1rem] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]\",
            \"before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent\"
          )}
          style={{ top: 0, left: Math.floor(Math.random() * (400 - -400) + -400) + \"px\", animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + \"s\", animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + \"s\", animationName: 'meteor' }}
        ></span>
      ))}
    </div>
  );
};
"""
with open(os.path.join(components_dir, 'meteors.tsx'), 'w', encoding='utf-8') as f: f.write(meteors_code)

beams_code = """\"use client\";
import { cn } from \"@/utils/cn\";
import { motion } from \"motion/react\";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn(\"absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden\", className)}>
      <div className=\"absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]\" />
      <motion.div animate={{ opacity: [0, 1, 0], y: [-100, 100], x: [-100, 100] }} transition={{ duration: 3, repeat: Infinity, ease: \"linear\" }} className=\"absolute top-1/2 left-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-45\" />
      <motion.div animate={{ opacity: [0, 1, 0], y: [100, -100], x: [-100, 100] }} transition={{ duration: 4, repeat: Infinity, ease: \"linear\", delay: 1 }} className=\"absolute top-1/2 left-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent -rotate-45\" />
    </div>
  );
};
"""
with open(os.path.join(components_dir, 'background-beams.tsx'), 'w', encoding='utf-8') as f: f.write(beams_code)

evervault_code = """\"use client\";
import { useMotionValue, motion, useMotionTemplate } from \"motion/react\";
import React, { useState, useEffect } from \"react\";
import { cn } from \"@/utils/cn\";

export const EvervaultCard = ({ text, className }: { text?: string; className?: string }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState(\"\");

  useEffect(() => {
    let str = \"\";
    const characters = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%\";
    for (let i = 0; i < 1500; i++) { str += characters.charAt(Math.floor(Math.random() * characters.length)); }
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className={cn(\"p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative\", className)} onMouseMove={onMouseMove}>
      <div className=\"group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full\">
        <div className=\"pointer-events-none\">
          <div className=\"absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50\"></div>
          <motion.div className=\"absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500\" style={{ WebkitMaskImage: useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)` }} />
          <motion.div className=\"absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100\" style={{ WebkitMaskImage: useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)` }}>
            <p className=\"absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-[#0f0] font-mono font-bold transition duration-500\">{randomString}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
"""
with open(os.path.join(components_dir, 'evervault-card.tsx'), 'w', encoding='utf-8') as f: f.write(evervault_code)
