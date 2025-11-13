"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Technologies() {
  return (
    <section className="relative h-vh py-20 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 gap-10">
        {/* Left side text */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            Our Technologies
          </p>
          <h2 className="text-3xl md:text-6xl text- leading-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
            TECHNOLOGIES OUR TEAM USES
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
            We leverage the latest technologies to build scalable, secure, and
            high-performing digital products that power your business success.
          </p>
          <Link
            href="/technologies"
            className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-xl hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            Explore Technologies
          </Link>
        </div>

        {/* Right side logos grid */}
        <motion.div
          className="grid grid-cols-4 grid-rows-4 gap-2  justify-center items-center w-100 h-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="col-span-2 row-span-2 bg-linear-to-t from-slate-950 to-blue-600 w-full h-full rounded-2xl flex justify-center items-center">
            <Image
              src="/images/technologies/nextJs.png"
              alt="next.js"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 col-span-2 row-span-2 w-full h-full gap-2">
            <div className="col-span-1 row-span-1 bg-linear-to-t from-slate-950 to-blue-600 rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/js.png"
                alt="js"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl flex justify-center items-center">
             
            </div>
            <div className="col-span-1 row-span-1 bg-linear-to-t from-slate-950 to-blue-600 rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/reacta.png"
                alt="react"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div className="col-span-1 row-span-1 bg-linear-to-t from-slate-950 to-blue-600 rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/nodeJs.png"
                alt="node Js"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>{" "}
          </div>
          <div className="grid grid-cols-2 grid-rows-2 col-span-2 row-span-2 w-full h-full gap-2">
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-1 row-span-1 bg-linear-to-t from-slate-950 to-blue-600 rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/mongoDB.png"
                alt="mongoDB"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-1 row-span-1"></div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 col-span-2 row-span-2 w-full h-full gap-2">
            <div className="col-span-1 row-span-1 bg-linear-to-t from-slate-950 to-blue-600 rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/tailwind.png"
                alt="tailwind"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>{" "}
            <div className="col-span-1 row-span-1 bg-linear-to-t from-slate-950 to-blue-600 rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/aws.png"
                alt="aws"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>{" "}
            <div className="col-span-1 row-span-1 bg-linear-to-t from-slate-950 to-blue-600 rounded-2xl flex justify-center items-center">
              <Image
                src="/images/technologies/ts.png"
                alt="ts"
                width={60}
                height={60}
                className="object-contain rounded-2xl"
              />
            </div>
            <div className="col-span-1 row-span-1  rounded-2xl flex justify-center items-center"></div>{" "}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
