"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/10 shadow-xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full gap-6 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First name</label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:border-[#7fcbe4] focus:ring-2 focus:ring-[#7fcbe4]/20 transition-all outline-none"
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:border-[#7fcbe4] focus:ring-2 focus:ring-[#7fcbe4]/20 transition-all outline-none"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:border-[#7fcbe4] focus:ring-2 focus:ring-[#7fcbe4]/20 transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:border-[#7fcbe4] focus:ring-2 focus:ring-[#7fcbe4]/20 transition-all outline-none resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "group relative w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-medium text-white overflow-hidden transition-all",
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-[#2052bd]"
              )}
            >
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#2052bd] to-[#7fcbe4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-12 relative z-10 h-full min-h-[400px]"
          >
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message sent!</h3>
            <p className="text-gray-400 max-w-sm">
              Thanks for reaching out. We&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Blob */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-tr from-[#2052bd]/5 to-[#7fcbe4]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
