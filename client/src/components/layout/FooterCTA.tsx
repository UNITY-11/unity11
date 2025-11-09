import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const FooterCTA: React.FC = () => {
  return (
    <div
      className="
        relative w-full  mx-auto
        flex flex-col items-center justify-center
        overflow-hidden rounded-2xl bg-black
        py-5 text-center px-10"
    >
      <div className="w-full flex flex-col justify-center items-center pb-[10vh] z-10">
        {/* Heading */}
        <h2 className="max-w-5xl text-4xl md:text-6xl bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent mb-4">
          Don't just build. Build to last.
        </h2>

        {/* Subheading */}
        <p className="text-lg text-gray-300 mb-8 z-10">
          We craft scalable, high-performance software that drives real results.
        </p>

        {/* Call to Action Button */}
        <button
          className="
          bg-white text-[#1a7ae1] hover:bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] hover:text-white font-semibold
          py-3 px-6 rounded-full
          transition-all duration-300 
          z-10 flex justify-center items-center gap-2 hover:gap-4
        "
        >
          Start Your Project
          <span className="text-2xl"><IoIosArrowForward /></span>
        </button>
        <div className="container absolute left-o bottom-0 h-[10vh] rounded-b-full bg-linear-to-t from-[#2052bd] via-[#207ebd] to-transparent"></div>
      </div>
    </div>
  );
};

export default FooterCTA;
