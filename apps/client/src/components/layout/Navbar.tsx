/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { IoIosArrowForward, IoIosMenu, IoIosClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down
        setShowNav(false);
      } else {
        // Scrolling up
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const current = navLinks.find((link) => link.href === pathname);
    if (current) {
      setActiveLink(current.name);
    } else if (pathname === "/") {
      setActiveLink("Home");
    }
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNav ? 0 : -100 }}
      transition={{
        duration: 1.4,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        pathname === "/" && lastScrollY < 50 ? "bg-transparent border-transparent" : "bg-black/95 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between px-4 py-3">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center gap-2 backdrop-blur-md p-1 rounded-full shadow-md border border-white/5">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative z-10 block rounded-full px-6 py-2 text-sm font-medium transition-colors text-blue-400 ${
                    activeLink === link.name
                      ? "text-white"
                      : "hover:text-[#185fca]"
                  }`}
                >
                  {link.name}
                </Link>
                {activeLink === link.name && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button (Desktop) */}
        <Link
          href="/get-started"
          className="hidden sm:inline-flex group relative h-10 w-[140px] items-center overflow-hidden rounded-full border border-blue-400 bg-white p-0.5 transition-transform"
        >
          {/* Dynamic Section */}
          <div className="flex h-full w-[80%] items-center justify-center rounded-full bg-gradient-to-tr from-[#2052bd] to-[#7fcbe4] transition-all duration-500 ease-in-out group-hover:w-full">
            <span className="text-white text-sm font-bold tracking-tight whitespace-nowrap">
              Get started
            </span>
          </div>

          {/* Icon Section */}
          <div className="flex h-full w-[20%] items-center justify-center text-[#2052bd] overflow-hidden transition-all duration-300 ease-in-out group-hover:w-0 group-hover:opacity-0">
            <IoIosArrowForward className="h-5 w-5 flex-shrink-0" />
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white absolute left-5"
        >
          {menuOpen ? <IoIosClose size={40} /> : <IoIosMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-black border-t border-gray-800 mt-3 h-screen flex justify-center items-center py-10"
        >
          <ul className="h-full flex flex-col gap-10 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.name);
                    setMenuOpen(false);
                  }}
                  className={`text-lg font-medium ${
                    activeLink === link.name
                      ? "text-[#7fcbe4]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* CTA Button (Mobile) */}
            <Link
              href="/get-started"
              onClick={() => setMenuOpen(false)}
              className="group relative inline-flex h-12 w-[160px] items-center overflow-hidden rounded-full border border-blue-400 bg-white p-0.5 transition-transform shadow-md"
            >
              {/* Dynamic Section */}
              <div className="flex h-full w-[80%] items-center justify-center rounded-full bg-gradient-to-tr from-[#2052bd] to-[#7fcbe4] transition-all duration-500 ease-in-out group-hover:w-full">
                <span className="text-white text-sm font-bold tracking-tight whitespace-nowrap">
                  Get started
                </span>
              </div>

              {/* Icon Section */}
              <div className="flex h-full w-[20%] items-center justify-center text-[#2052bd] overflow-hidden transition-all duration-300 ease-in-out group-hover:w-0 group-hover:opacity-0">
                <IoIosArrowForward className="h-5 w-5 flex-shrink-0" />
              </div>
            </Link>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
