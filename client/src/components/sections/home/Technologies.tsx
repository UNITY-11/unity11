"use client";
import { IconCloud } from "@/components/ui/MagicUi/IconCloud";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiDocker,
  SiKubernetes,
  SiFigma,
  SiPython,
  SiC,
  SiCplusplus,
  SiPhp,
  SiLaravel,
  SiRedux,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiGooglecloud,
  SiThreedotjs,
  SiFramer,
  SiVercel,
  SiLinux,
  SiGnubash,
  SiAndroid,
  SiSwift,
  SiFlutter,
  SiDart,
} from "react-icons/si";

const techIcons = [
  <SiReact color="#61DBFB" />,
  <SiNextdotjs color="white" />,
  <SiNodedotjs color="#73aa63" />,
  <SiMongodb color="#4DB33D" />,
  <SiJavascript color="#f7df1e" />,
  <SiTypescript color="#3178c6" />,
  <SiHtml5 color="#e44d26" />,
  <SiCss3 color="#264de4" />,
  <SiTailwindcss color="#38bdf8" />,
  <SiBootstrap color="#7952b3" />,
  <SiGit color="#f54d27" />,
  <SiGithub color="white" />,
  <SiDocker color="#1D63ED" />,
  <SiKubernetes color="#316CE6" />,
  <SiFigma color="#A259FF" />,
  <SiPython color="#3776AB" />,
  <SiC color="#A8B9CC" />,
  <SiCplusplus color="#00599C" />,
  <SiPhp color="#8993be" />,
  <SiLaravel color="#ff2d20" />,
  <SiRedux color="#764abc" />,
  <SiExpress color="white" />,
  <SiPrisma color="#2D3748" />,
  <SiPostgresql color="#336791" />,
  <SiMysql color="#005c84" />,
  <SiFirebase color="#FFA611" />,
  <SiGooglecloud color="#4285F4" />,
  <SiThreedotjs color="white" />,
  <SiFramer color="#0055FF" />,
  <SiVercel color="white" />,
  <SiLinux color="#FCC624" />,
  <SiGnubash color="#292e33" />,
  <SiAndroid color="#3DDC84" />,
  <SiSwift color="#FA7343" />,
  <SiFlutter color="#46D1FD" />,
  <SiDart color="#0175C2" />,
];


export default function Technologies() {
  return (
    <section className="relative h-screen py-20 overflow-hidden">
      <div className="max-w-7xl h-full mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 gap-10">
        {/* Left side text */}
        <div className="flex-1 text-center lg:text-left sm:w-[50%]">
          <h2 className="text-3xl md:text-6xl leading-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
            TECHNOLOGIES <br /> OUR TEAM USES
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
            We leverage the latest technologies to build scalable, secure, and
            high-performing digital products that power your business success.
          </p>
          <Link
            href="/technologies"
            className="inline-block px-6 py-3 bg-primary border-blue-500 border rounded-full  text-blue-500 font-medium hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            Explore Technologies
          </Link>
        </div>

        {/* Right side logos grid */}
        {/* <motion.div
          className="grid grid-cols-4 grid-rows-4 gap-2  justify-center items-center w-110 h-110 "
          initial={{  y: 30 }}
          whileInView={{  y: 0 }}
          transition={{ duration: 1 }}
          // viewport={{ once: true }}
        >
          <motion.div 
            initial={{scale:0.3, x:20}}
            whileInView={{scale:1, x:0}}
            whileHover={{scale:0.9}}
            transition={{duration:0.5}}
          className="col-span-2 row-span-2  bg-slate-950 shadow-blue-500/80 shadow-md w-full h-full rounded-2xl flex justify-center items-center">
            <Image
              src="/images/technologies/reacta.png"
              alt="next.js"
              width={150}
              height={150}
              className="object-contain"
            />
          </motion.div>
          <div className="grid grid-cols-2 grid-rows-2 col-span-2 row-span-2 w-full h-full gap-2">
            <motion.div 
            initial={{scale:0.3, x:20}}
            whileInView={{scale:1, x:0}}
            whileHover={{scale:0.9}}
            transition={{duration:0.5}}
            className="col-span-1 row-span-1  bg-slate-950 shadow-blue-500/80 shadow-md rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/js.png"
                alt="js"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>
            <div className="col-span-1 row-span-1 rounded-2xl flex justify-center items-center">
             
            </div>
            <motion.div 
            initial={{scale:0.3, x:20}}
            whileInView={{scale:1, x:0}}
            whileHover={{scale:0.9}}
            transition={{duration:0.5}} 
            className="col-span-1 row-span-1  bg-slate-950 shadow-blue-500/80 shadow-md rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/reacta.png"
                alt="react"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>
            <motion.div 
            initial={{scale:0.3, x:20}}
            whileInView={{scale:1, x:0}}
            whileHover={{scale:0.9}}
            transition={{duration:0.5}}

            className="col-span-1 row-span-1  bg-slate-950 shadow-blue-500/80 shadow-md rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/nodeJs.png"
                alt="node Js"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>{" "}
          </div>
          <div className="grid grid-cols-2 grid-rows-2 col-span-2 row-span-2 w-full h-full gap-2">
            <div className="col-span-1 row-span-1"></div>
            <motion.div 
            initial={{scale:0.3, x:20}}
            whileInView={{scale:1, x:0}}
            whileHover={{scale:0.9}}
            transition={{duration:0.5}}
            className="col-span-1 row-span-1  bg-slate-950 shadow-blue-500/80 shadow-md rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/mongoDB.png"
                alt="mongoDB"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-1 row-span-1"></div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 col-span-2 row-span-2 w-full h-full gap-2">
            <motion.div 
            initial={{scale:0.3, x:20}}
            whileInView={{scale:1, x:0}}
            whileHover={{scale:0.9}}
            transition={{duration:0.5}}
            className="col-span-1 row-span-1  bg-slate-950 shadow-blue-500/80 shadow-md rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/tailwind.png"
                alt="tailwind"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>{" "}
            <motion.div 
            initial={{scale:0.3, x:20}}
            whileInView={{scale:1, x:0}}
            whileHover={{scale:0.9}}
            transition={{duration:0.5}}
            className="col-span-1 row-span-1  bg-slate-950 shadow-blue-500/80 shadow-md rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/aws.png"
                alt="aws"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>{" "}
            <motion.div 
            initial={{scale:0.3, x:20}}
            whileInView={{scale:1, x:0}}
            whileHover={{scale:0.9}}
            transition={{duration:0.5}}
            className="col-span-1 row-span-1  bg-slate-950 shadow-blue-500/80 shadow-md rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/ts.png"
                alt="ts"
                width={60}
                height={60}
                className="object-contain rounded-2xl"
              />
            </motion.div>
            <div className="col-span-1 row-span-1  rounded-2xl flex justify-center items-center"></div>{" "}
          </div>
        </motion.div> */}

        <div className="relative overflow-hidden sm:w-[50%] sm:-mr-40">
          <IconCloud icons={techIcons} />
        </div>
      </div>
    </section>
  );
}
