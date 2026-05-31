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
      
      {/* Center Logo */}
      <div className="flex-1 flex justify-center">
        <img src="/images/logos/unity11-text-logo.png" alt="Logo" className="h-8 object-contain" />
      </div>

      <div className="flex-1 flex justify-end items-center gap-4 mt-2">
        {/* Fullscreen Button */}
        <button onClick={toggleFullScreen} className="p-2 text-[#888888] hover:text-white transition-colors" title="Toggle Fullscreen">
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9V5H5m6 10v4H5m14-4v4h-4m4-14v4h-4" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" /></svg>
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
