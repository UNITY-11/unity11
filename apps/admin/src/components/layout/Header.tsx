"use client";

import { useState, useEffect } from "react";

export function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-transparent shrink-0 relative">
      <div className="flex-1"></div>
      
      {/* Screen-Centered Logo */}
      <div className="fixed left-1/2 top-0 h-16 flex items-center -translate-x-1/2 pointer-events-none z-50">
        <img src="/images/logos/unity11-text-logo.png" alt="Logo" className="h-8 object-contain pointer-events-auto" />
      </div>

      <div className="flex-1 flex justify-end items-center gap-4 mt-2">
        {/* Fullscreen Button */}
        <button onClick={toggleFullScreen} className="p-2 text-[#888888] hover:text-white transition-colors" title="Toggle Fullscreen">
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
          )}
        </button>

        {/* Notification Button */}
        <button className="p-2 text-[#888888] hover:text-white transition-colors relative">
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#007ee1] rounded-full border border-[#0a0a0a]"></span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        <div className="w-10 h-10 rounded-full border border-[#333333] overflow-hidden shrink-0">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
