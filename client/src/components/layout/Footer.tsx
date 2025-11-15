"use client";

import React from "react";
import Link from "next/link";
import FooterCTA from '@/components/layout/FooterCTA'

// Importing icons from react-icons
import {
  FaCode,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaDribbble,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import Image from "next/image";

// --- Data for the links ---
// This makes the component cleaner and easier to update.

interface NavLink {
  name: string;
  href: string;
}

interface SocialLink extends NavLink {
  icon: React.ReactElement;
}

const exploreLinks: NavLink[] = [
  { name: "Our Story", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
];

const supportLinks: NavLink[] = [
  { name: "Contact", href: "/contact" },
  { name: "FAQs", href: "/faq" },
  { name: "Careers", href: "/careers" },
  { name: "Case Studies", href: "/case-studies" },
];

const socialLinks: SocialLink[] = [
  { name: "LinkedIn", href: "#", icon: <FaLinkedin size={18} /> },
  { name: "GitHub", href: "#", icon: <FaGithub size={18} /> },
  { name: "Twitter", href: "#", icon: <FaTwitter size={18} /> },
  { name: "Dribbble", href: "#", icon: <FaDribbble size={18} /> },
];

// --- The Component ---

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-300">
      <FooterCTA/>
      <div className="container mx-auto pt-16 px-4">
        {/* Top section: Brand and Links */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left Section: Brand & Slogan */}
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logos/unity11-logo.gif"
                alt="Unity11 logo icon"
                width={44}
                height={44}
                className="h-11 w-11"
                unoptimized
              />
              <Image
                src="/images/logos/unity11-text-logo.png"
                alt="Unity11 text logo"
                width={120}
                height={32}
                className="h-6 w-auto"
                priority
              />
            </Link>
            <h2 className="text-3xl md:text-5xl leading-13  tracking-wide bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent py-4">
              Transforming Ideas
              <br />
              Into Digital Reality.
            </h2>
          </div>

          {/* Right Section: Links Columns */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 md:gap-20">
            {/* Column 1: Explore */}
            <div>
              <h3 className="text-lg bg-linear-to-t from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent uppercase tracking-wider">
                Explore
              </h3>
              <ul className="mt-4 space-y-3">
                {exploreLinks.map((link) => (
                  <li
                    key={link.name}
                    className="flex justify-between items-center text-transparent hover:text-[#2052bd]"
                  >
                    <Link
                      href={link.href}
                      className="bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent hover:text-[#2052bd] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                    <IoIosArrowForward />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <h3 className="text-lg bg-linear-to-t from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent uppercase tracking-wider">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                {supportLinks.map((link) => (
                  <li
                    key={link.name}
                    className="flex justify-between text-transparent hover:text-[#2052bd] items-center"
                  >
                    <Link
                      href={link.href}
                      className="bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent hover:text-[#2052bd] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                    <IoIosArrowForward />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Connect */}
            <div>
              <h3 className="text-lg bg-linear-to-t from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent uppercase tracking-wider">
                Connect
              </h3>
              <ul className="mt-4 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    {/* External links use <a>, internal links use <Link> */}
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-linear-to-tr from-[#073ba9] to-[#7fcbe4] bg-clip-text text-transparent hover:text-[#2052bd] transition-colors duration-200"
                    >
                      <span className="text-[#3bceffdd]"> {link.icon}</span>
                      <span>{link.name}</span>
                      <IoIosArrowForward />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full h-[10vh] sm:h-[20vh] flex items-center justify-center overflow-hidden sm:mt-20">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: [0.25, 1, 0.5, 1],
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center w-full"
          >
            <Image
              src="/images/logos/unity11-text-logo.png"
              alt="unity11"
              width={1200}
              height={400}
              className="w-full h-auto mt-10 sm:mt-[10vh]"
              priority
            />
          </motion.div>
        </div>

        {/* Bottom section: Copyright */}
        <div className="flex justify-center items-center border-t-2 border-gray-200 py-4 sm:py-10">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Unity11 Solutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
