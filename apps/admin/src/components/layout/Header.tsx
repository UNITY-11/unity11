"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

export function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  if (pathname === '/login' || pathname.startsWith('/studio')) return null;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const pathParts = pathname.split('/').filter(Boolean);
  const isSubPage = pathParts.length > 1;
  const pageTitle = pathParts.length > 0 ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1) : 'Dashboard';

  let backLabel = "Back";
  let backHref = "";

  if (isSubPage) {
    const sectionName = pathParts[0];
    if (sectionName === 'clients') {
      backLabel = "Back to Clients";
      backHref = "/clients";
    } else if (sectionName === 'projects') {
      backLabel = "Back to Projects";
      backHref = "/projects";
    } else if (sectionName === 'blogs') {
      backLabel = "Back to Blogs";
      backHref = "/blogs";
    } else if (sectionName === 'team') {
      backLabel = "Back to Team";
      backHref = "/team";
    } else {
      backLabel = `Back to ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`;
      backHref = `/${sectionName}`;
    }
  }

  return (
    <header className="h-20 py-4 flex items-center justify-between px-8 bg-transparent shrink-0 relative">
      <div className="flex-1">
        {isSubPage && (
          <Link href={backHref} className="inline-flex items-center gap-2 text-text-muted hover:text-foreground transition-colors w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {backLabel}
          </Link>
        )}
      </div>
      
      {/* Screen-Centered Page Name */}
      <div className="fixed left-1/2 top-0 h-20 flex items-center -translate-x-1/2 pointer-events-none z-50">
        <h1 className="text-4xl font-[700] tracking- pointer-events-auto flex font-[family-name:var(--font-comfortaa)]">
          {pageTitle.toUpperCase().split('').map((char, index) => (
            <span key={index} className={index % 2 === 0 ? "text-[#007ee1]" : "text-[#00b4d8]"}>
              {char}
            </span>
          ))}
        </h1>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        {/* Fullscreen Button */}
        <button onClick={toggleFullScreen} className="p-2 text-text-muted hover:text-foreground transition-colors" title="Toggle Fullscreen">
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
          )}
        </button>

        {/* Notification Button */}
        <Link href="/notifications" className="p-2 text-text-muted hover:text-foreground transition-colors relative block">
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-background"></span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </Link>
        <Link href="/profile" className="w-10 h-10 rounded-full border border-border-muted overflow-hidden shrink-0 block hover:ring-2 hover:ring-primary transition-all">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
        </Link>
      </div>
    </header>
  );
}
