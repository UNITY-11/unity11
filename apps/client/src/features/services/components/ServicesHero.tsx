"use client";

import { motion } from "motion/react";
import { Blocks, BarChart3, Link } from "lucide-react";

export function ServicesHero() {
  return (
    <div className="relative w-full flex flex-col items-center pt-32 pb-24 px-4 min-h-[80vh] overflow-hidden bg-[#010514] border-b border-white/5">
      {/* Starry Background / Noise (Simulated with tiny dots pattern if possible, or just deep radial gradients) */}
      <div 
        className="absolute inset-0 z-0 opacity-40" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}
      ></div>
      
      {/* Huge Glowing Orb in the center/bottom */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[150vw] max-w-[800px] h-[500px] bg-blue-600/30 rounded-[100%] blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[120vw] max-w-[600px] h-[300px] bg-cyan-500/30 rounded-[100%] blur-[100px] pointer-events-none"></div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-6xl mx-auto flex flex-col items-center px-2"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.2] md:leading-[1.15]">
          Build Fast. Deploy Smart.<br className="hidden sm:block" />
          Scale Securely.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-blue-100/70 mb-10 max-w-3xl text-center px-4">
          We provide lightning-fast IT solutions, scalable infrastructure, and enterprise-grade security tools — all in one powerful platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-24 w-full sm:w-auto px-6 sm:px-0">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_40px_-5px_rgba(59,130,246,0.6)] border border-white/10">
            Get Started
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-md text-white font-semibold hover:bg-white/10 transition-all border border-white/10">
            Explore Services
          </button>
        </div>
      </motion.div>

      {/* Cards Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-b from-[#0a1536] to-[#030618] p-6 sm:p-8 rounded-[2rem] border border-[#1e3a8a]/60 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group"
        >
          {/* Card Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-1/2 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none"></div>
          
          <div className="mb-6 sm:mb-8 mt-2 relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#172a58] to-[#09112a] flex items-center justify-center border-t border-l border-[#2563eb] border-b border-r border-[#0f172a] shadow-[0_15px_40px_-10px_rgba(59,130,246,0.6)] transform -rotate-6 sm:-rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <Blocks className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300 stroke-[1.5]" />
            </div>
            {/* Icon Glow */}
            <div className="absolute inset-0 bg-blue-500/40 blur-2xl rounded-full -z-10 pointer-events-none"></div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Instant IT Solutions</h3>
          <p className="text-sm text-blue-100/70 leading-relaxed">
            Get up and running with secure, low-latency applications tailored for your enterprise needs.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-b from-[#0a1536] to-[#030618] p-6 sm:p-8 rounded-[2rem] border border-[#1e3a8a]/60 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-1/2 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none"></div>
          
          <div className="mb-6 sm:mb-8 mt-2 relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#0f3b5c] to-[#051829] flex items-center justify-center border-t border-l border-[#0891b2] border-b border-r border-[#082f49] shadow-[0_15px_40px_-10px_rgba(6,182,212,0.6)] transform -rotate-6 sm:-rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-300 stroke-[1.5]" />
            </div>
            <div className="absolute inset-0 bg-cyan-500/40 blur-2xl rounded-full -z-10 pointer-events-none"></div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Real-Time Analytics</h3>
          <p className="text-sm text-blue-100/70 leading-relaxed">
            Monitor deployments, handle traffic spikes, and scale resources effortlessly with live dashboards.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-b from-[#0a1536] to-[#030618] p-6 sm:p-8 rounded-[2rem] border border-[#1e3a8a]/60 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-1/2 bg-sky-500/10 blur-[40px] rounded-full pointer-events-none"></div>
          
          <div className="mb-6 sm:mb-8 mt-2 relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#0c3158] to-[#05112a] flex items-center justify-center border-t border-l border-[#0284c7] border-b border-r border-[#075985] shadow-[0_15px_40px_-10px_rgba(14,165,233,0.6)] transform -rotate-6 sm:-rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <Link className="w-8 h-8 sm:w-10 sm:h-10 text-sky-300 stroke-[1.5]" />
            </div>
            <div className="absolute inset-0 bg-sky-500/40 blur-2xl rounded-full -z-10 pointer-events-none"></div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Unified Integrations</h3>
          <p className="text-sm text-blue-100/70 leading-relaxed">
            Protect your assets, secure your networks, and maintain compliance from a unified platform.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
