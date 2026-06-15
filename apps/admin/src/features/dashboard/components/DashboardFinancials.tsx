"use client";

import { motion } from "framer-motion";
import type { DashboardFinancials as FinancialsData } from "../types";

export function DashboardFinancials({ data }: { data: FinancialsData }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateBars = (values: number[]) => {
    const max = Math.max(...values, 1);
    return values.map((v) => Math.round((v / max) * 100));
  };

  const AnimatedBars = ({ values, color = "bg-primary" }: { values: number[]; color?: string }) => {
    const bars = generateBars(values);
    return (
      <div className="flex items-end justify-between gap-1 h-12 mt-6 w-full opacity-60">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${Math.max(h, 8)}%` }}
            transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
            className={`w-full ${color} rounded-t-sm`}
          />
        ))}
      </div>
    );
  };

  const paidRatio = data.totalRevenue ? Math.round((data.totalPaid / data.totalRevenue) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-primary rounded-2xl p-6 shadow-lg relative overflow-hidden group flex flex-col justify-between min-h-[160px]">
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2z" />
          </svg>
        </div>
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="p-1.5 bg-white/20 rounded-lg text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white font-medium">Total Revenue</p>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-3">{formatCurrency(data.totalRevenue)}</h2>
          <p className="text-white/80 text-sm">From all client budgets</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border-base relative overflow-hidden group flex flex-col justify-between min-h-[160px]">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-text-muted">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-text-muted font-medium">Total Paid</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-foreground tracking-tight mb-3">{formatCurrency(data.totalPaid)}</h2>
          <p className="text-text-muted text-sm">{paidRatio}% of total revenue collected</p>
          <AnimatedBars values={[data.totalPaid, data.totalRevenue * 0.3, data.totalPaid * 0.8]} />
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border-base relative overflow-hidden group flex flex-col justify-between min-h-[160px]">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-text-muted">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-text-muted font-medium">Remaining Amount</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-foreground tracking-tight mb-3">{formatCurrency(data.outstanding)}</h2>
          <p className="text-text-muted text-sm">Outstanding from client contracts</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border-base relative overflow-hidden group flex flex-col justify-between min-h-[160px]">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-text-muted">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-text-muted font-medium">Upcoming Invoices</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-foreground tracking-tight mb-3">{formatCurrency(data.upcomingInvoices)}</h2>
          <p className="text-text-muted text-sm">Pending payment milestones</p>
        </div>
      </div>
    </div>
  );
}
