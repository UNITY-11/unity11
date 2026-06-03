"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const links = [
  { name: 'Dashboard', href: '/', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg> },
  { name: 'Analytics', href: '/analytics', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
  { name: 'Projects', href: '/projects', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg> },
  { name: 'Blogs', href: '/blogs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
  { name: 'Clients', href: '/clients', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
  { name: 'Team', href: '/team', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM9 10.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197" /></svg> },
  { name: 'Notifications', href: '/notifications', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg> },
  { name: 'Profile', href: '/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
];

const extendedLinks = Array(30).fill(links).flat();
const itemHeight = 60; // Fixed height per item

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const [scrollCenterIndex, setScrollCenterIndex] = useState(-1);
  const isInitialized = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  if (pathname === '/login') return null;

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Sync scroll position with the current active route
  useEffect(() => {
    if (!navRef.current) return;

    // Determine the logical active index from the pathname
    const baseActiveIndex = links.findIndex(link => pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)));
    const targetBase = baseActiveIndex === -1 ? 0 : baseActiveIndex;

    let targetIndex = -1;
    let behavior: ScrollBehavior = 'smooth';

    if (!isInitialized.current) {
      // First load: Start exactly in the middle of our 180 items
      const middleGroupStart = 15 * links.length;
      targetIndex = middleGroupStart + targetBase;
      behavior = 'auto'; // Instant scroll on first load!
      isInitialized.current = true;
    } else {
      // Subsequent navigations: Find the NEAREST instance of this item to our current scroll position
      const currentCenter = Math.round(navRef.current.scrollTop / itemHeight) + 2;
      
      // Look around the current center to find the closest matching index
      let closestDist = Infinity;
      for (let i = 0; i < extendedLinks.length; i++) {
        if (extendedLinks[i].name === links[targetBase].name) {
          const dist = Math.abs(i - currentCenter);
          if (dist < closestDist) {
            closestDist = dist;
            targetIndex = i;
          }
        }
      }
    }

    if (targetIndex !== -1) {
      // Scroll to align the targetIndex at the center (3rd item out of 5 visible)
      // The top of the container should be 2 items above the target
      const targetScrollTop = (targetIndex - 2) * itemHeight;
      navRef.current.scrollTo({ top: targetScrollTop, behavior });
      setScrollCenterIndex(targetIndex);
    }
  }, [pathname]);

  // Update center index as the user manually scrolls
  const handleScroll = () => {
    if (!navRef.current) return;
    const newCenter = Math.round(navRef.current.scrollTop / itemHeight) + 2;
    
    if (newCenter !== scrollCenterIndex) {
      setScrollCenterIndex(newCenter);
    }
    
    // Auto-navigate logic
    // Clear timeout on every scroll event to prevent navigating while the user is still scrolling
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    scrollTimeoutRef.current = setTimeout(() => {
      const targetLink = extendedLinks[newCenter];
      if (targetLink) {
        const isCurrentlyActive = pathname === targetLink.href || (targetLink.href !== '/' && pathname.startsWith(targetLink.href));
        if (!isCurrentlyActive) {
          router.push(targetLink.href);
        }
      }
    }, 1000);
  };

  return (
    <aside className="w-24 bg-background flex flex-col hidden md:flex shrink-0 items-center py-8">
      {/* Logo */}
      <div className="mb-12">
        <img src="/images/logos/unity11-logo.gif" alt="Unity11 Logo" className="w-10 h-10 object-contain drop-shadow-md" />
      </div>

      {/* Nav Wrapper with Arrows */}
      <div className="relative w-full my-auto flex flex-col items-center justify-center">
        {/* Top Arrow */}
        <div className="absolute top-[-24px] left-0 right-0 flex justify-center pointer-events-none z-40 opacity-30">
          <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>

        {/* Sticky Blue Center Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-primary shadow-[0_0_20px_rgba(0,180,216,0.4)] pointer-events-none z-10 scale-110"></div>

        <nav 
          ref={navRef}
          onScroll={handleScroll}
          className="flex flex-col w-full items-center h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-y snap-mandatory relative z-20"
        >
          {extendedLinks.map((link, index) => {
            // Calculate distance from center for scaling
            const distance = Math.abs(index - scrollCenterIndex);
            
            let scaleClass = "scale-0 opacity-0 pointer-events-none";
            let colorClass = "text-text-muted hover:bg-surface-active hover:text-foreground";

            if (scrollCenterIndex !== -1) {
              if (distance === 0) {
                // 3rd item (Center) - Largest, white text, no background needed (sticky bg is behind it)
                scaleClass = "scale-110 opacity-100";
                colorClass = "text-white";
              } else if (distance === 1) {
                // 2nd & 4th items - Medium
                scaleClass = "scale-100 opacity-80";
              } else if (distance === 2) {
                // 1st & 5th items - Small
                scaleClass = "scale-90 opacity-60";
              }
            }

            return (
              <Link
                key={`${link.name}-${index}`}
                href={link.href}
                title={link.name}
                scroll={false}
                className={`flex items-center justify-center shrink-0 w-full h-[60px] snap-center transition-all duration-300 ${distance > 2 ? 'pointer-events-none' : ''}`}
              >
                <div className={`flex items-center justify-center rounded-full w-[48px] h-[48px] transition-all duration-300 ${colorClass} ${scaleClass}`}>
                  {link.icon}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Arrow */}
        <div className="absolute bottom-[-24px] left-0 right-0 flex justify-center pointer-events-none z-40 opacity-30">
          <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-auto">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle Theme" 
          className="relative flex items-center justify-center w-[42px] h-[42px] hover:scale-110 transition-all duration-300 group"
        >
          {/* Rotated Diamond Border */}
          <div className="absolute inset-0 border-2 border-primary rotate-45 rounded-xl transition-all duration-300 group-hover:bg-primary/20"></div>

          <div className="relative z-10 text-primary">
            {mounted ? (
              theme === 'dark' ? (
                // Sun icon (Switch to Light)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                // Moon icon (Switch to Dark)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )
            ) : (
              <div className="w-5 h-5" />
            )}
          </div>
        </button>
      </div>
    </aside>
  );
}
