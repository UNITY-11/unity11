"use client";

import { motion } from "motion/react";
import React from "react";
import { Service } from "../types";

// ═══════════════════════════════════════════════════════════════
// PREMIUM SERVICE ANIMATIONS — each one is unique, rich & relatable
// ═══════════════════════════════════════════════════════════════

// ── Web Application Development: rich IDE with sidebar, tabs, terminal ──
const WebDevGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden [perspective:800px]">
    {/* Ambient glow */}
    <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-[#2052bd]/15 rounded-full blur-[50px]" />
    <motion.div
      animate={{ y: [-6, 6, -6], rotateX: [2, -2, 2], rotateY: [-3, 3, -3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-52 h-32 bg-[#0d0d0d] rounded-xl border border-[#1e1e1e] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex overflow-hidden"
    >
      {/* Sidebar */}
      <div className="w-8 bg-[#111] border-r border-[#1e1e1e] flex flex-col items-center py-2 gap-2">
        <div className="w-3 h-3 rounded bg-[#2052bd]/30" />
        <div className="w-3 h-3 rounded bg-white/5" />
        <div className="w-3 h-3 rounded bg-white/5" />
        <div className="mt-auto w-3 h-3 rounded bg-blue-500/30" />
      </div>
      {/* Main editor */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="h-5 bg-[#111] border-b border-[#1e1e1e] flex items-center px-1 gap-0.5">
          <div className="px-2 h-4 bg-[#0d0d0d] rounded-t text-[6px] text-[#7fcbe4] flex items-center border-t border-x border-[#2052bd]/20">index.tsx</div>
          <div className="px-2 h-4 text-[6px] text-white/20 flex items-center">app.tsx</div>
        </div>
        {/* Code area with line numbers */}
        <div className="flex-1 flex p-1">
          <div className="w-4 flex flex-col items-end pr-1 gap-[2px]">
            {[1,2,3,4,5,6,7].map(n => <div key={n} className="text-[5px] text-white/10 leading-none">{n}</div>)}
          </div>
          <div className="flex-1 flex flex-col gap-[2px]">
            <motion.div animate={{ width: ["30%", "65%", "30%"] }} transition={{ duration: 3, repeat: Infinity }} className="h-[4px] bg-[#2052bd]/30 rounded-sm" />
            <div className="w-[50%] h-[4px] bg-white/5 rounded-sm" />
            <motion.div animate={{ width: ["45%", "80%", "45%"] }} transition={{ duration: 4, repeat: Infinity }} className="h-[4px] bg-[#2052bd]/30 rounded-sm" />
            <div className="w-[35%] h-[4px] bg-[#7fcbe4]/20 rounded-sm" />
            <motion.div animate={{ width: ["60%", "40%", "60%"] }} transition={{ duration: 3.5, repeat: Infinity }} className="h-[4px] bg-blue-500/20 rounded-sm" />
            <div className="w-[55%] h-[4px] bg-white/5 rounded-sm" />
            <div className="w-[25%] h-[4px] bg-blue-400/20 rounded-sm" />
          </div>
        </div>
        {/* Terminal */}
        <div className="h-6 bg-[#0a0a0a] border-t border-[#1e1e1e] px-1.5 flex items-center gap-1">
          <span className="text-[5px] text-blue-400">❯</span>
          <motion.div animate={{ width: ["0%", "60%"], opacity: [0, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} className="h-[3px] bg-blue-500/30 rounded-sm" />
        </div>
      </div>
    </motion.div>
  </div>
);

// ── Mobile App Development: iPhone 16 Pro with titanium flat-edge design ──
const MobileDevGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[30%] left-[40%] w-24 h-24 bg-[#2052bd]/10 rounded-full blur-[40px]" />
    <motion.div
      animate={{ y: [-8, 8, -8], rotateZ: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-[72px] h-[148px] bg-[#0a0a0a] rounded-[12px] border-[1.5px] border-[#2a2a2a] shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.04)] flex flex-col overflow-hidden relative"
    >
      {/* Titanium frame highlight — top edge */}
      <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-30" />
      {/* Side buttons — Action Button (left) */}
      <div className="absolute left-[-3px] top-[28px] w-[3px] h-[6px] bg-[#2a2a2a] rounded-l-sm" />
      {/* Side buttons — Volume Up */}
      <div className="absolute left-[-3px] top-[42px] w-[3px] h-[10px] bg-[#2a2a2a] rounded-l-sm" />
      {/* Side buttons — Volume Down */}
      <div className="absolute left-[-3px] top-[56px] w-[3px] h-[10px] bg-[#2a2a2a] rounded-l-sm" />
      {/* Side buttons — Power (right) */}
      <div className="absolute right-[-3px] top-[40px] w-[3px] h-[14px] bg-[#2a2a2a] rounded-r-sm" />
      {/* Side buttons — Camera Control (right, lower) */}
      <div className="absolute right-[-3px] top-[90px] w-[3px] h-[6px] bg-[#333] rounded-r-sm" />

      {/* Dynamic Island — narrower, refined pill */}
      <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-8 h-[7px] bg-black rounded-full z-20 border border-[#1a1a1a] shadow-[0_0_4px_rgba(0,0,0,0.8)]" />

      {/* Screen bezel area — ultra-thin uniform bezels */}
      <div className="mt-[16px] mx-[3px] flex-1 rounded-[8px] flex flex-col gap-[3px] p-[3px] overflow-hidden bg-[#050505]">
        {/* Status bar */}
        <div className="flex justify-between items-center px-[2px]">
          <div className="text-[5px] text-white/40 font-medium">9:41</div>
          <div className="flex gap-[2px] items-center">
            <div className="w-[6px] h-[4px] bg-white/25 rounded-[1px]" />
            <div className="w-[4px] h-[4px] bg-white/25 rounded-[1px]" />
            {/* Battery */}
            <div className="w-[8px] h-[4px] bg-white/20 rounded-[1px] border border-white/10 relative">
              <motion.div animate={{ width: ["40%", "90%", "40%"] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-[0.5px] bg-blue-400/60 rounded-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Hero card with gradient */}
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-full h-8 bg-gradient-to-br from-[#2052bd]/25 via-blue-500/15 to-[#7fcbe4]/20 rounded-[5px] border border-white/5 flex items-end p-[3px]"
        >
          <div className="w-8 h-[3px] bg-white/15 rounded-full" />
        </motion.div>

        {/* Feature cards row */}
        <div className="flex gap-[3px]">
          <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="flex-1 h-9 bg-[#111] rounded-[5px] border border-[#1e1e1e] flex flex-col items-center justify-center gap-[3px]">
            <div className="w-3.5 h-3.5 rounded-[4px] bg-[#2052bd]/20 border border-[#2052bd]/10" />
            <div className="w-6 h-[2px] bg-white/10 rounded-full" />
            <div className="w-4 h-[2px] bg-white/5 rounded-full" />
          </motion.div>
          <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="flex-1 h-9 bg-[#111] rounded-[5px] border border-[#1e1e1e] flex flex-col items-center justify-center gap-[3px]">
            <div className="w-3.5 h-3.5 rounded-[4px] bg-blue-500/15 border border-blue-500/10" />
            <div className="w-6 h-[2px] bg-white/10 rounded-full" />
            <div className="w-4 h-[2px] bg-white/5 rounded-full" />
          </motion.div>
        </div>

        {/* List items */}
        <div className="flex flex-col gap-[2px]">
          {[1, 2].map((n) => (
            <div key={n} className="flex items-center gap-[3px] px-[2px] py-[2px] bg-[#0e0e0e] rounded-[4px] border border-[#1a1a1a]">
              <div className="w-2.5 h-2.5 rounded-[3px] bg-[#2052bd]/15" />
              <div className="flex-1 flex flex-col gap-[1px]">
                <div className="w-[70%] h-[2px] bg-white/10 rounded-full" />
                <div className="w-[45%] h-[2px] bg-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Tab bar — iOS-style */}
        <div className="mt-auto flex justify-around items-center py-[2px] border-t border-white/5">
          <div className="flex flex-col items-center gap-[1px]">
            <div className="w-[5px] h-[5px] rounded-[2px] bg-[#2052bd]/50" />
            <div className="w-[2px] h-[2px] rounded-full bg-[#2052bd]/60" />
          </div>
          <div className="w-[5px] h-[5px] rounded-[2px] bg-white/10" />
          <div className="w-[5px] h-[5px] rounded-[2px] bg-white/10" />
          <div className="w-[5px] h-[5px] rounded-[2px] bg-white/10" />
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex items-center justify-center py-[3px]">
        <div className="w-8 h-[3px] bg-white/20 rounded-full" />
      </div>
    </motion.div>
  </div>
);

// ── API Development: network topology with glowing connections ──
const ApiDevGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[25%] left-[35%] w-28 h-28 bg-[#2052bd]/10 rounded-full blur-[50px]" />
    <div className="relative w-44 h-32">
      {/* Central API hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="w-16 h-10 bg-[#111] border border-[#2052bd]/30 rounded-xl shadow-[0_0_20px_rgba(32,82,189,0.15)] flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 bg-[#2052bd]/60 rounded-full" />
          <span className="text-[7px] text-[#7fcbe4] font-mono font-bold tracking-wider">REST</span>
        </motion.div>
      </div>
      {/* Endpoint nodes with labels */}
      {[
        { top: "5%", left: "10%", color: "blue", label: "GET" },
        { top: "5%", right: "10%", color: "cyan", label: "POST" },
        { bottom: "5%", left: "15%", color: "sky", label: "PUT" },
        { bottom: "5%", right: "15%", color: "blue", label: "DEL" },
      ].map((node, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-8 h-5 bg-[#111] rounded-md flex items-center justify-center shadow-lg"
          style={{ top: node.top, left: node.left, right: node.right, bottom: node.bottom, borderColor: `var(--color-${node.color}-500)`, borderWidth: 1, borderStyle: "solid", borderOpacity: 0.3 } as React.CSSProperties}
        >
          <span className={`text-[5px] font-mono font-bold text-${node.color}-400/60`}>{node.label}</span>
        </motion.div>
      ))}
      {/* Animated connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 176 128">
        {[[25, 20, 75, 54], [145, 20, 100, 54], [30, 108, 75, 74], [140, 108, 100, 74]].map(([x1,y1,x2,y2], i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(32,82,189,0.15)" strokeWidth={1} strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.3 }} />
        ))}
      </svg>
    </div>
  </div>
);

// ── UI/UX Design: Figma-style artboard with floating layers ──
const UiUxGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    <div className="absolute top-[20%] right-[20%] w-28 h-28 bg-blue-500/10 rounded-full blur-[50px]" />
    <div className="relative w-48 h-32">
      {/* Figma-like artboard */}
      <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity }} className="absolute inset-0 border border-dashed border-[#333] rounded-lg">
        {/* Floating shapes */}
        <motion.div animate={{ y: [0, -8, 0], x: [0, 3, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-3 left-4 w-14 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-[#2052bd]/20 rounded-lg shadow-[0_4px_12px_rgba(32,82,189,0.1)]" />
        <motion.div animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} className="absolute top-4 right-6 w-10 h-10 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 border border-[#2052bd]/20 rounded-full shadow-[0_4px_12px_rgba(42,64,140,0.1)]" />
        <motion.div animate={{ y: [0, -6, 0], x: [0, -4, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 1 }} className="absolute bottom-4 left-8 w-20 h-5 bg-gradient-to-r from-[#2052bd]/20 to-blue-500/10 border border-blue-500/20 rounded-full shadow-[0_4px_12px_rgba(32,82,189,0.1)]" />
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.8 }} className="absolute bottom-6 right-4 w-8 h-12 bg-gradient-to-b from-cyan-500/15 to-blue-500/10 border border-cyan-500/15 rounded-md" />
      </motion.div>
      {/* Animated cursor */}
      <motion.div
        animate={{ x: [10, 120, 80, 30, 10], y: [20, 10, 80, 60, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-10"
      >
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M1 1L1 12L4 9L7 15L9 14L6 8L10 8L1 1Z" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5"/></svg>
      </motion.div>
    </div>
  </div>
);

// ── Cloud Migration: 3D server-to-cloud transfer with particles ──
const CloudMigrationGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[25%] left-[50%] w-32 h-32 bg-blue-500/10 rounded-full blur-[50px]" />
    <div className="relative w-48 h-28 flex items-center justify-between px-2">
      {/* Server rack */}
      <motion.div animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 3, repeat: Infinity }} className="w-14 h-20 bg-[#0d0d0d] border border-[#222] rounded-lg shadow-lg flex flex-col items-center p-1 gap-0.5">
        {[1,2,3].map(i => (
          <div key={i} className="w-full h-3 bg-[#151515] rounded-sm flex items-center px-1 justify-between">
            <div className="flex gap-0.5"><div className="w-1 h-1 bg-blue-500/50 rounded-full" /><div className="w-1 h-1 bg-blue-500/30 rounded-full" /></div>
            <div className="w-2 h-1.5 bg-[#222] rounded-sm" />
          </div>
        ))}
        <div className="text-[5px] text-white/20 mt-auto">ON-PREM</div>
      </motion.div>
      {/* Animated particles */}
      <div className="flex-1 relative h-4 mx-1">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-blue-500/20 via-[#2052bd]/20 to-[#7fcbe4]/20" />
        {[0, 0.4, 0.8, 1.2, 1.6].map((d, i) => (
          <motion.div key={i} animate={{ x: [0, 70], opacity: [1, 0.5, 0], scale: [1, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: d, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-[#7fcbe4]/60 shadow-[0_0_6px_rgba(96,165,250,0.5)]" />
        ))}
      </div>
      {/* Cloud */}
      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity }} className="w-16 h-14 bg-[#0d0d0d] border border-[#2052bd]/20 rounded-2xl shadow-[0_0_25px_rgba(32,82,189,0.1)] flex flex-col items-center justify-center gap-1">
        <div className="w-8 h-5 bg-[#2052bd]/10 rounded-full border border-[#2052bd]/20 flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-[#7fcbe4]/50 rounded-full" />
        </div>
        <div className="text-[5px] text-[#7fcbe4]/40">CLOUD</div>
      </motion.div>
    </div>
  </div>
);

// ── Cloud Hosting: professional server dashboard ──
const CloudHostingGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[20%] left-[25%] w-32 h-32 bg-blue-500/8 rounded-full blur-[50px]" />
    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity }} className="w-48 h-28 bg-[#0d0d0d] rounded-xl border border-[#1e1e1e] shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-5 bg-[#111] border-b border-[#1e1e1e] flex items-center px-2 justify-between">
        <span className="text-[5px] text-white/30 font-mono">Server Dashboard</span>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_4px_rgba(59,130,246,0.5)]" />
      </div>
      {/* Server rows */}
      <div className="flex-1 p-1.5 flex flex-col gap-1">
        {[
          { name: "us-east-1", cpu: "72%", status: "blue" },
          { name: "eu-west-2", cpu: "45%", status: "blue" },
          { name: "ap-south-1", cpu: "88%", status: "cyan" },
        ].map((srv, i) => (
          <div key={i} className="flex items-center gap-1.5 px-1.5 py-0.5 bg-[#111] rounded border border-[#1e1e1e]">
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }} className={`w-1.5 h-1.5 rounded-full ${srv.status === "blue" ? "bg-blue-500" : "bg-cyan-500"}`} />
            <span className="text-[5px] text-white/30 font-mono flex-1">{srv.name}</span>
            <motion.div animate={{ width: ["30%", srv.cpu === "88%" ? "88%" : srv.cpu === "72%" ? "72%" : "45%"] }} transition={{ duration: 1.5, delay: i * 0.2 }} className={`h-1.5 rounded-full ${srv.status === "blue" ? "bg-blue-500/30" : "bg-cyan-500/30"}`} style={{ width: srv.cpu }} />
            <span className="text-[5px] text-white/20 font-mono">{srv.cpu}</span>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

// ── SaaS Management: multi-app dashboard with floating cards ──
const SaasGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden [perspective:600px]">
    <div className="absolute top-[15%] right-[25%] w-24 h-24 bg-[#2052bd]/10 rounded-full blur-[40px]" />
    <div className="relative w-44 h-28">
      {/* Back card */}
      <motion.div animate={{ y: [2, -2, 2], rotateY: [-2, 2, -2] }} transition={{ duration: 5, repeat: Infinity, delay: 0.3 }} className="absolute top-1 left-2 w-36 h-22 bg-[#0e0e0e] border border-[#1e1e1e] rounded-xl shadow-lg" />
      {/* Middle card */}
      <motion.div animate={{ y: [-2, 2, -2], rotateY: [1, -1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-3 left-4 w-36 h-22 bg-[#101010] border border-[#222] rounded-xl shadow-xl" />
      {/* Front card */}
      <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-5 left-6 w-36 h-22 bg-[#131313] border border-[#252525] rounded-xl shadow-2xl flex flex-col overflow-hidden z-10">
        <div className="h-4 border-b border-[#222] flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded bg-[#2052bd]/30" />
          <div className="flex-1 h-1.5 bg-[#222] rounded-full" />
        </div>
        <div className="flex-1 p-1.5 grid grid-cols-3 gap-1">
          {["blue", "cyan", "sky", "blue", "cyan", "sky"].map((c, i) => (
            <motion.div key={i} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} className={`rounded bg-${c}-500/10 border border-${c}-500/10`} />
          ))}
        </div>
      </motion.div>
      {/* Notification */}
      <motion.div animate={{ scale: [1, 1.2, 1], y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-2 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-30 shadow-[0_0_12px_rgba(59,130,246,0.4)]">
        <span className="text-[7px] text-white font-bold">5</span>
      </motion.div>
    </div>
  </div>
);

// ── Threat Monitoring: real-time security dashboard ──
const ThreatMonitorGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[20%] left-[30%] w-28 h-28 bg-blue-500/8 rounded-full blur-[50px]" />
    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity }} className="w-48 h-28 bg-[#0d0d0d] rounded-xl border border-[#1e1e1e] shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
      <div className="h-5 bg-[#111] border-b border-[#1e1e1e] flex items-center px-2 justify-between">
        <span className="text-[5px] text-blue-400/60 font-mono">THREAT MONITOR</span>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
      </div>
      <div className="flex-1 flex gap-1 p-1.5">
        {/* Live bar chart */}
        <div className="flex-1 flex items-end gap-[2px] pb-1">
          {[65, 40, 80, 55, 90, 35, 70, 45, 60, 85].map((h, i) => (
            <motion.div key={i} animate={{ height: [`${h}%`, `${Math.max(20, h + (Math.random() > 0.5 ? 15 : -15))}%`, `${h}%`] }} transition={{ duration: 2 + i * 0.2, repeat: Infinity }} className={`flex-1 rounded-t-sm ${h > 75 ? "bg-blue-500/50 shadow-[0_0_4px_rgba(59,130,246,0.3)]" : h > 50 ? "bg-cyan-500/30" : "bg-sky-500/20"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        {/* Alert feed */}
        <div className="w-16 flex flex-col gap-0.5 overflow-hidden">
          {[
            { type: "WARN", color: "cyan" },
            { type: "CRIT", color: "blue" },
            { type: "INFO", color: "sky" },
            { type: "WARN", color: "cyan" },
          ].map((alert, i) => (
            <motion.div key={i} animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }} className={`h-3.5 rounded-sm flex items-center px-1 gap-0.5 bg-${alert.color}-500/10 border border-${alert.color}-500/10`}>
              <div className={`w-1 h-1 rounded-full bg-${alert.color}-500/60`} />
              <span className={`text-[4px] text-${alert.color}-400/60 font-mono`}>{alert.type}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

// ── Data Backup: animated cloud sync with progress ──
const DataBackupGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[30%] left-[40%] w-28 h-28 bg-blue-500/10 rounded-full blur-[50px]" />
    <div className="relative w-40 h-28 flex flex-col items-center justify-center gap-3">
      {/* Main drive + shield */}
      <div className="flex items-center gap-4">
        <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }} className="w-14 h-12 bg-[#0d0d0d] border border-[#222] rounded-lg shadow-lg flex flex-col items-center justify-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-3 h-4 bg-[#1a1a1a] rounded-sm border border-[#2a2a2a]" />
            <div className="w-3 h-4 bg-[#1a1a1a] rounded-sm border border-[#2a2a2a]" />
            <div className="w-3 h-4 bg-[#2052bd]/15 rounded-sm border border-[#2052bd]/20" />
          </div>
          <div className="text-[4px] text-white/20 font-mono">RAID-5</div>
        </motion.div>
        {/* Sync icon */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500/60 rounded-full" />
        {/* Cloud backup */}
        <motion.div animate={{ y: [2, -2, 2] }} transition={{ duration: 3, repeat: Infinity }} className="w-14 h-12 bg-[#0d0d0d] border border-blue-500/20 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.08)] flex flex-col items-center justify-center gap-1">
          <div className="w-8 h-4 bg-blue-500/10 rounded-full border border-blue-500/15" />
          <div className="text-[4px] text-blue-400/40 font-mono">BACKUP</div>
        </motion.div>
      </div>
      {/* Progress bar */}
      <div className="w-32 h-2 bg-[#111] rounded-full border border-[#222] overflow-hidden">
        <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="h-full bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full" />
      </div>
    </div>
  </div>
);

// ── Compliance Audits: official document with live checkmarks ──
const ComplianceGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[20%] right-[30%] w-24 h-24 bg-blue-500/10 rounded-full blur-[40px]" />
    <motion.div animate={{ y: [-5, 5, -5], rotateZ: [-1, 1, -1] }} transition={{ duration: 5, repeat: Infinity }} className="w-32 h-36 bg-[#0d0d0d] rounded-lg border border-[#1e1e1e] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
      {/* Header badge */}
      <div className="h-6 bg-[#111] border-b border-[#1e1e1e] flex items-center justify-center gap-1">
        <div className="w-3 h-3 border border-blue-500/30 rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-blue-500/40 rounded-full" /></div>
        <span className="text-[5px] text-blue-400/50 font-mono tracking-wider">AUDIT REPORT</span>
      </div>
      {/* Checklist items */}
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        {["GDPR", "SOC2", "HIPAA", "PCI-DSS", "ISO 27001"].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.6, duration: 0.4, repeat: Infinity, repeatDelay: 4 }} className="flex items-center gap-1.5">
            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ delay: i * 0.6 + 0.3, duration: 0.3, repeat: Infinity, repeatDelay: 4 }} className="w-3 h-3 rounded border border-blue-500/30 flex items-center justify-center bg-blue-500/10">
              <span className="text-[6px] text-blue-400">✓</span>
            </motion.div>
            <span className="text-[5px] text-white/25 font-mono">{item}</span>
            <div className="flex-1 h-[2px] bg-[#1a1a1a] rounded-full ml-auto" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

// ── Penetration Testing: hacker terminal with scanning ──
const PenTestGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[25%] left-[35%] w-28 h-28 bg-blue-500/8 rounded-full blur-[50px]" />
    <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity }} className="w-48 h-28 bg-[#050505] rounded-xl border border-blue-500/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
      <div className="h-4 bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center px-2 gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
        <span className="text-[5px] text-blue-400/40 font-mono">pentest@kali:~$</span>
      </div>
      <div className="flex-1 p-1.5 font-mono flex flex-col gap-[2px] overflow-hidden">
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 0, duration: 0.1, repeat: Infinity, repeatDelay: 5 }} className="text-[5px] text-blue-400/50">$ nmap -sV 192.168.1.0/24</motion.div>
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 0.5, duration: 0.1, repeat: Infinity, repeatDelay: 5 }} className="text-[5px] text-white/20">Scanning 254 hosts...</motion.div>
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 1, duration: 0.1, repeat: Infinity, repeatDelay: 5 }} className="text-[5px] text-white/20">PORT    STATE  SERVICE</motion.div>
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 1.5, duration: 0.1, repeat: Infinity, repeatDelay: 5 }} className="text-[5px] text-blue-400/40">22/tcp  open   ssh</motion.div>
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 2, duration: 0.1, repeat: Infinity, repeatDelay: 5 }} className="text-[5px] text-blue-400/40">80/tcp  open   http</motion.div>
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 2.5, duration: 0.1, repeat: Infinity, repeatDelay: 5 }} className="text-[5px] text-cyan-400/60">[!] VULN: CVE-2024-3094 detected</motion.div>
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 3, duration: 0.1, repeat: Infinity, repeatDelay: 5 }} className="text-[5px] text-sky-400/50">[*] Generating report...</motion.div>
        {/* Blinking cursor */}
        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-2 bg-blue-400/60 mt-0.5" />
      </div>
    </motion.div>
  </div>
);

// ── Digital Transformation: old-to-new morphing dashboard ──
const DigitalTransformGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[20%] left-[30%] w-28 h-28 bg-[#2052bd]/10 rounded-full blur-[50px]" />
    <div className="relative w-48 h-28 flex items-center justify-center gap-3">
      {/* Old: paper/manual */}
      <motion.div animate={{ opacity: [1, 0.4, 1], scale: [1, 0.95, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-16 h-20 bg-[#111] border border-[#222] rounded-lg flex flex-col items-center p-1.5 gap-1 shadow-lg">
        <div className="w-full h-2 bg-[#1a1a1a] rounded" />
        <div className="w-full h-1.5 bg-[#1a1a1a] rounded" />
        <div className="w-3/4 h-1.5 bg-[#1a1a1a] rounded" />
        <div className="w-full h-1.5 bg-[#1a1a1a] rounded" />
        <div className="mt-auto text-[4px] text-white/15 font-mono">MANUAL</div>
      </motion.div>
      {/* Transform arrow */}
      <div className="flex flex-col items-center gap-1">
        <motion.div animate={{ x: [0, 4, 0], scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-blue-400/40 text-lg">⚡</motion.div>
        <span className="text-[4px] text-blue-400/30 font-mono">AI</span>
      </div>
      {/* New: digital dashboard */}
      <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1, 0.95] }} transition={{ duration: 4, repeat: Infinity }} className="w-20 h-20 bg-[#0d0d0d] border border-[#2052bd]/20 rounded-xl flex flex-col overflow-hidden shadow-[0_0_20px_rgba(42,64,140,0.1)]">
        <div className="h-3 bg-[#111] border-b border-blue-500/10 flex items-center px-1">
          <div className="w-1 h-1 bg-blue-500/50 rounded-full" />
        </div>
        <div className="flex-1 p-1 grid grid-cols-2 gap-0.5">
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="bg-[#2052bd]/10 rounded" />
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="bg-[#2052bd]/10 rounded" />
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="bg-[#7fcbe4]/10 rounded col-span-2" />
        </div>
      </motion.div>
    </div>
  </div>
);

// ── Architecture Design: isometric system diagram ──
const ArchitectureGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center [perspective:600px]">
    <div className="absolute top-[25%] left-[30%] w-28 h-28 bg-[#2052bd]/8 rounded-full blur-[50px]" />
    <div className="relative w-44 h-28">
      {/* Layered architecture blocks */}
      {[
        { label: "Frontend", color: "blue", top: "5%", width: "w-36" },
        { label: "API Gateway", color: "cyan", top: "30%", width: "w-32" },
        { label: "Microservices", color: "sky", top: "55%", width: "w-28" },
        { label: "Database", color: "blue", top: "80%", width: "w-24" },
      ].map((layer, i) => (
        <motion.div
          key={i}
          animate={{ y: [-2, 2, -2], rotateX: [3, 5, 3] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
          className={`absolute ${layer.width} h-5 left-1/2 -translate-x-1/2 bg-[#0d0d0d] border border-${layer.color}-500/15 rounded-md flex items-center justify-between px-2 shadow-lg`}
          style={{ top: layer.top }}
        >
          <span className={`text-[5px] text-${layer.color}-400/40 font-mono`}>{layer.label}</span>
          <div className={`w-2 h-2 rounded-full bg-${layer.color}-500/20`} />
        </motion.div>
      ))}
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 176 112">
        {[[88, 22, 88, 33], [88, 50, 88, 60], [88, 77, 88, 88]].map(([x1,y1,x2,y2], i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="3 3" animate={{ strokeDashoffset: [0, -12] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        ))}
      </svg>
    </div>
  </div>
);

// ── Data Engineering: real data pipeline with ETL ──
const DataEngineeringGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute top-[25%] left-[40%] w-28 h-28 bg-[#7fcbe4]/10 rounded-full blur-[50px]" />
    <div className="relative w-48 h-28 flex items-center justify-between px-1">
      {/* Sources */}
      <div className="flex flex-col gap-1">
        {["SQL", "API", "CSV"].map((src, i) => (
          <motion.div key={i} animate={{ x: [-1, 1, -1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }} className="w-10 h-5 bg-[#111] border border-[#222] rounded flex items-center justify-center">
            <span className="text-[5px] text-white/25 font-mono">{src}</span>
          </motion.div>
        ))}
      </div>
      {/* ETL Pipeline */}
      <div className="flex-1 mx-2 relative">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 60 80">
          {[[0, 12, 20, 40], [0, 40, 20, 40], [0, 68, 20, 40], [40, 40, 60, 12], [40, 40, 60, 40], [40, 40, 60, 68]].map(([x1,y1,x2,y2], i) => (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(127,203,228,0.15)" strokeWidth={1} strokeDasharray="3 2" animate={{ strokeDashoffset: [0, -10] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          ))}
        </svg>
        {/* ETL node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div animate={{ rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="w-8 h-8 bg-[#0d0d0d] border border-[#7fcbe4]/30 rounded-lg rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(127,203,228,0.15)]">
            <span className="text-[5px] text-[#7fcbe4]/60 font-mono font-bold -rotate-45">ETL</span>
          </motion.div>
        </div>
      </div>
      {/* Destinations */}
      <div className="flex flex-col gap-1">
        {["DWH", "BI", "ML"].map((dst, i) => (
          <motion.div key={i} animate={{ x: [1, -1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }} className="w-10 h-5 bg-[#111] border border-[#7fcbe4]/15 rounded flex items-center justify-center shadow-[0_0_8px_rgba(127,203,228,0.05)]">
            <span className="text-[5px] text-[#7fcbe4]/30 font-mono">{dst}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

interface ServiceGraphicsProps {
  service: Service;
  index: number;
}

export function ServiceGraphics({ service, index }: ServiceGraphicsProps) {
  const renderGraphic = () => {
    switch (service.id) {
      case "web-dev":           return <WebDevGraphic />;
      case "mobile-dev":        return <MobileDevGraphic />;
      case "api-dev":           return <ApiDevGraphic />;
      case "ui-ux":             return <UiUxGraphic />;
      case "cloud-migration":   return <CloudMigrationGraphic />;
      case "cloud-hosting":     return <CloudHostingGraphic />;
      case "saas-management":   return <SaasGraphic />;
      case "threat-monitoring": return <ThreatMonitorGraphic />;
      case "data-backup":       return <DataBackupGraphic />;
      case "compliance-audits": return <ComplianceGraphic />;
      case "pen-testing":       return <PenTestGraphic />;
      case "digital-transformation": return <DigitalTransformGraphic />;
      case "architecture-design":    return <ArchitectureGraphic />;
      case "data-engineering":       return <DataEngineeringGraphic />;
      default:                  return <WebDevGraphic />;
    }
  };

  return (
    <div className="relative w-full h-full bg-[#080808] overflow-hidden group">
      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      {/* Micro dot pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px]" />
      {/* Service-specific animation */}
      {renderGraphic()}
    </div>
  );
}
