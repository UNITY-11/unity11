"use client";

import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function NotFound() {
  return (
    <div className="flex h-screen overflow-hidden flex-col items-center justify-center bg-black text-center font-faleway">
      {/* Animated 404 Text */}
      <h1 className="text-[55vw] max-sm:mb-[60%] bg-linear-to-tr from-[#0051ff] to-[#00bfff] bg-clip-text text-transparent animate-linear-x">
        404
      </h1>

      {/* Glass Effect Card */}
      <div className="absolute max-w-[90%] sm:max-w-md md:max-w-lg w-full rounded-3xl backdrop-blur-lg p-6 sm:p-8 md:p-10 shadow-lg z-10 border border-[#00bfff]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-[#00bfff]">
          Oops, page not found!
        </h2>
        <p className="mt-4 text-sm sm:text-md md:text-md text-[#02a1cd]">
          Something went wrong. The page you’re looking
          <br /> for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-6 inline-block px-4 sm:px-6 pr-4 py-2 sm:py-3 rounded-full 
       bg-linear-to-tr from-[#0050fd] to-[#7fcbe4]  
       text-white font-medium
       transition  animate-linear"
        >
          <button className="flex justify-center items-center gap-1 sm:gap-2 hover:gap-3 transform duration-300 text-sm sm:text-base">
            Back to homepage{" "}
            <IoIosArrowForward className="text-xl sm:text-2xl" />
          </button>
        </Link>
      </div>
    </div>
  );
}
