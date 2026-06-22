/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
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
  { name: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const [isWhiteBg, setIsWhiteBg] = useState(false);

  // Scroll behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    const previous = scrollY.getPrevious() || 0;

    if (currentScrollY > previous && currentScrollY > 80) {
      // Scrolling down
      if (showNav) setShowNav(false);
    } else {
      // Scrolling up
      if (!showNav) setShowNav(true);
    }

    // Check if over white background sections
    const testimonialsEl = document.getElementById("testimonials");
    const technologiesEl = document.getElementById("technologies");
    
    let overWhite = false;
    const navHeight = 80;

    if (testimonialsEl) {
      const rect = testimonialsEl.getBoundingClientRect();
      if (rect.top <= navHeight && rect.bottom >= navHeight) {
        overWhite = true;
      }
    }
    if (technologiesEl) {
      const rect = technologiesEl.getBoundingClientRect();
      if (rect.top <= navHeight && rect.bottom >= navHeight) {
        overWhite = true;
      }
    }

    if (isWhiteBg !== overWhite) {
      setIsWhiteBg(overWhite);
    }
  });

  useEffect(() => {
    const current = navLinks.find((link) => link.href === pathname);
    if (current) {
      setActiveLink(current.name);
    } else if (pathname === "/") {
      setActiveLink("Home");
    }
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        showNav ? "translate-y-0" : "-translate-y-full"
      } ${
        pathname === "/" && scrollY.get() < 50 ? "bg-transparent" : (isWhiteBg ? "bg-white/95 backdrop-blur-md" : "bg-black/95 backdrop-blur-md")
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
          <ul 
            className="flex items-center gap-6"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <li 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => setHoveredLink(link.name)}
              >
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative z-10 block rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                    activeLink === link.name
                      ? "text-white"
                      : (isWhiteBg ? "text-gray-600 group-hover:text-[#2b6deb]" : "text-[#60a5fa] group-hover:text-[#2b6deb]")
                  }`}
                >
                  {link.name}
                </Link>

                {/* Hover Border for non-active links */}
                {hoveredLink === link.name && activeLink !== link.name && (
                  <motion.div 
                    layoutId="hover-border"
                    className="absolute -left-2 -right-2 top-1/2 -translate-y-1/2 h-[36px] flex pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="h-full flex-1 border-y-[1.5px] border-l-[1.5px] border-[#2b6deb] rounded-l-xl" />
                    <svg width="40" height="36" viewBox="0 0 40 36" className="shrink-0 -mx-[0.5px]">
                      <path d="M 0 0.75 C 4 0.75, 6 6.75, 12 6.75 L 28 6.75 C 34 6.75, 36 0.75, 40 0.75 M 40 35.25 C 36 35.25, 34 29.25, 28 29.25 L 12 29.25 C 6 29.25, 4 35.25, 0 35.25" fill="none" stroke="#2b6deb" strokeWidth="1.5" />
                    </svg>
                    <div className="h-full flex-1 border-y-[1.5px] border-r-[1.5px] border-[#2b6deb] rounded-r-xl" />
                  </motion.div>
                )}

                {/* Active Pill Fill */}
                {activeLink === link.name && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute -left-2 -right-2 top-1/2 -translate-y-1/2 h-[36px] flex pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="h-full flex-1 bg-[#2b6deb] rounded-l-xl" />
                    <svg width="40" height="36" viewBox="0 0 40 36" className="shrink-0 -mx-[0.5px]">
                      <path d="M 0 0 C 4 0, 6 6, 12 6 L 28 6 C 34 6, 36 0, 40 0 L 40 36 C 36 36, 34 30, 28 30 L 12 30 C 6 30, 4 36, 0 36 Z" fill="#2b6deb" />
                    </svg>
                    <div className="h-full flex-1 bg-[#2b6deb] rounded-r-xl" />
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/get-started"
          style={{ clipPath: "path('M 12 0 L 50 0 C 54 0, 56 6, 62 6 L 78 6 C 84 6, 86 0, 90 0 L 128 0 A 12 12 0 0 1 140 12 L 140 28 A 12 12 0 0 1 128 40 L 90 40 C 86 40, 84 34, 78 34 L 62 34 C 56 34, 54 40, 50 40 L 12 40 A 12 12 0 0 1 0 28 L 0 12 A 12 12 0 0 1 12 0 Z')" }}
          className={`hidden sm:inline-flex group relative h-10 w-[140px] items-center transition-transform ${isWhiteBg ? 'bg-white' : 'bg-black'}`}
        >
          <svg className="absolute inset-0 pointer-events-none z-20" width="140" height="40" viewBox="0 0 140 40">
            <path d="M 12 0 L 50 0 C 54 0, 56 6, 62 6 L 78 6 C 84 6, 86 0, 90 0 L 128 0 A 12 12 0 0 1 140 12 L 140 28 A 12 12 0 0 1 128 40 L 90 40 C 86 40, 84 34, 78 34 L 62 34 C 56 34, 54 40, 50 40 L 12 40 A 12 12 0 0 1 0 28 L 0 12 A 12 12 0 0 1 12 0 Z" fill="none" stroke="#2b6deb" strokeWidth="2" />
          </svg>
          
          {/* Dynamic Section */}
          <div className="flex h-full w-[80%] relative z-10 items-center justify-center rounded-xl bg-transparent group-hover:bg-[#2b6deb] transition-all duration-500 ease-in-out group-hover:w-full">
            <span className="text-[#2b6deb] group-hover:text-white transition-colors duration-500 text-sm font-bold tracking-tight whitespace-nowrap">
              Get started
            </span>
          </div>

          {/* Icon Section */}
          <div className="flex h-full w-[20%] relative z-10 items-center justify-center text-[#2b6deb] overflow-hidden transition-all duration-300 ease-in-out group-hover:w-0 group-hover:opacity-0">
            <IoIosArrowForward className="h-5 w-5 flex-shrink-0" />
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden absolute left-5"
        >
          {menuOpen ? (
            <IoIosClose size={40} className={isWhiteBg ? 'text-black' : 'text-white'} />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#2b6deb]">
              <path d="M4 9H20M4 15H20" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            className="md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-between pt-[100px] pb-10 px-8 overflow-y-auto"
          >
            {/* Ambient background glow */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#2b6deb]/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#7fcbe4]/20 rounded-full blur-[80px] pointer-events-none" />

            <motion.ul 
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col gap-6 relative z-10"
            >
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  variants={{
                    closed: { opacity: 0, x: -20 },
                    open: { opacity: 1, x: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.name);
                      setMenuOpen(false);
                    }}
                    className={`block text-4xl sm:text-5xl font-bold tracking-tighter transition-all duration-300 ${
                      activeLink === link.name
                        ? "text-transparent bg-clip-text bg-linear-to-r from-[#2b6deb] to-[#7fcbe4] pl-4 border-l-4 border-[#2b6deb]"
                        : "text-gray-400 hover:text-white hover:pl-2"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 mt-12 flex flex-col gap-8"
            >
              <Link
                href="/get-started"
                onClick={() => setMenuOpen(false)}
                style={{ clipPath: "path('M 12 0 L 60 0 C 64 0, 66 6, 72 6 L 88 6 C 94 6, 96 0, 100 0 L 148 0 A 12 12 0 0 1 160 12 L 160 36 A 12 12 0 0 1 148 48 L 100 48 C 96 48, 94 42, 88 42 L 72 42 C 66 42, 64 48, 60 48 L 12 48 A 12 12 0 0 1 0 36 L 0 12 A 12 12 0 0 1 12 0 Z')" }}
                className="group relative inline-flex h-12 w-[160px] items-center bg-black transition-transform shadow-md hover:scale-105"
              >
                <svg className="absolute inset-0 pointer-events-none z-20" width="160" height="48" viewBox="0 0 160 48">
                  <path d="M 12 0 L 60 0 C 64 0, 66 6, 72 6 L 88 6 C 94 6, 96 0, 100 0 L 148 0 A 12 12 0 0 1 160 12 L 160 36 A 12 12 0 0 1 148 48 L 100 48 C 96 48, 94 42, 88 42 L 72 42 C 66 42, 64 48, 60 48 L 12 48 A 12 12 0 0 1 0 36 L 0 12 A 12 12 0 0 1 12 0 Z" fill="none" stroke="#2b6deb" strokeWidth="2" />
                </svg>
                
                <div className="flex h-full w-[80%] relative z-10 items-center justify-center rounded-xl bg-transparent group-hover:bg-[#2b6deb] transition-all duration-500 ease-in-out group-hover:w-full">
                  <span className="text-[#2b6deb] group-hover:text-white transition-colors duration-500 text-sm font-bold tracking-tight whitespace-nowrap">
                    Get started
                  </span>
                </div>

                <div className="flex h-full w-[20%] relative z-10 items-center justify-center text-[#2b6deb] overflow-hidden transition-all duration-300 ease-in-out group-hover:w-0 group-hover:opacity-0">
                  <IoIosArrowForward className="h-5 w-5 flex-shrink-0" />
                </div>
              </Link>
              
              {/* Footer Links */}
              <div className="pt-8 border-t border-white/10 flex justify-between items-center text-sm font-medium text-gray-500">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
