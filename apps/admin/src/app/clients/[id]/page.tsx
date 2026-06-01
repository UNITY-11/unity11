"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Shared extended mock data
const mockClientsData = [
  {
    id: 1,
    name: "Apple Inc.",
    logo: "https://logo.clearbit.com/apple.com",
    contactNumber: "+1 (555) 123-4567",
    projectStatus: "Active",
    email: "contact@apple.com",
    details: {
      startDate: "Oct 1, 2025",
      targetDate: "Mar 31, 2026",
      budget: 120000,
      scope: "Redesign of global e-commerce platform including new 3D product viewer and seamless checkout flow.",
      milestones: [
        { title: "Project Kickoff", date: "Oct 5, 2025", status: "completed" },
        { title: "UX Wireframes", date: "Nov 15, 2025", status: "completed" },
        { title: "UI Design & Prototyping", date: "Dec 20, 2025", status: "completed" },
        { title: "Frontend Development", date: "Feb 10, 2026", status: "in-progress" },
        { title: "UAT & Launch", date: "Mar 31, 2026", status: "upcoming" }
      ],
      payments: [
        { description: "Initial Deposit (30%)", amount: 36000, date: "Oct 5, 2025", status: "paid" },
        { description: "Design Approval (30%)", amount: 36000, date: "Dec 22, 2025", status: "paid" },
        { description: "Beta Release (20%)", amount: 24000, date: "Mar 1, 2026", status: "pending" },
        { description: "Final Handover (20%)", amount: 24000, date: "Mar 31, 2026", status: "pending" }
      ],
      team: [
        { name: "Sarah Connor", role: "Project Manager", avatar: "https://i.pravatar.cc/150?u=sarah" },
        { name: "Alex Chen", role: "Lead Designer", avatar: "https://i.pravatar.cc/150?u=alex" },
        { name: "Marcus Johnson", role: "Frontend Dev", avatar: "https://i.pravatar.cc/150?u=marcus" }
      ],
      documents: ['Project Proposal.pdf', 'Design Assets.zip', 'Q3 Invoice.pdf']
    }
  },
  {
    id: 2,
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    contactNumber: "+1 (555) 987-6543",
    projectStatus: "Pending",
    email: "hello@google.com",
    details: {
      startDate: "TBD",
      targetDate: "TBD",
      budget: 85000,
      scope: "Development of internal dashboard analytics tool with real-time data visualization.",
      milestones: [
        { title: "Contract Signing", date: "Pending", status: "in-progress" },
        { title: "Project Kickoff", date: "TBD", status: "upcoming" },
      ],
      payments: [
        { description: "Retainer", amount: 10000, date: "TBD", status: "pending" }
      ],
      team: [
        { name: "Sarah Connor", role: "Project Manager", avatar: "https://i.pravatar.cc/150?u=sarah" }
      ],
      documents: ['NDA.pdf']
    }
  },
  {
    id: 3,
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    contactNumber: "+1 (555) 555-0199",
    projectStatus: "Completed",
    email: "info@microsoft.com",
    details: {
      startDate: "Jan 10, 2025",
      targetDate: "Aug 30, 2025",
      budget: 250000,
      scope: "Cloud infrastructure migration and enterprise security audit.",
      milestones: [
        { title: "Initial Audit", date: "Feb 1, 2025", status: "completed" },
        { title: "Final Handover", date: "Aug 30, 2025", status: "completed" }
      ],
      payments: [
        { description: "Full Contract", amount: 250000, date: "Sep 1, 2025", status: "paid" }
      ],
      team: [
        { name: "David Kim", role: "Cloud Architect", avatar: "https://i.pravatar.cc/150?u=david" }
      ],
      documents: ['Final Audit Report.pdf']
    }
  }
];

// Fallback for missing clients
const getClientData = (id: number) => {
  return mockClientsData.find(c => c.id === id) || {
    id, name: "Unknown Client", logo: "", contactNumber: "", projectStatus: "Active", email: "",
    details: { startDate: "TBD", targetDate: "TBD", budget: 0, scope: "N/A", milestones: [], payments: [], team: [], documents: [] }
  };
}

export default function ClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const clientId = parseInt(resolvedParams.id);
  const initialClient = getClientData(clientId);

  if (initialClient.name === "Unknown Client") {
    notFound();
  }

  const [clientData, setClientData] = useState(initialClient);
  const [activeModal, setActiveModal] = useState<'milestone' | 'document' | 'payment' | 'member' | null>(null);

  // Form states
  const [newMilestone, setNewMilestone] = useState({ title: '', date: '', status: 'upcoming' });
  const [newDocument, setNewDocument] = useState('');
  const [newPayment, setNewPayment] = useState({ description: '', amount: '', date: '', status: 'pending' });
  const [newMember, setNewMember] = useState({ name: '', role: '' });

  // Computed Financials
  const totalBudget = clientData.details.budget;
  const totalPaid = clientData.details.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = totalBudget - totalPaid;

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    setClientData({
      ...clientData,
      details: { ...clientData.details, milestones: [...clientData.details.milestones, newMilestone] }
    });
    setActiveModal(null);
    setNewMilestone({ title: '', date: '', status: 'upcoming' });
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    setClientData({
      ...clientData,
      details: { ...clientData.details, documents: [newDocument, ...clientData.details.documents] }
    });
    setActiveModal(null);
    setNewDocument('');
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setClientData({
      ...clientData,
      details: { ...clientData.details, payments: [...clientData.details.payments, { ...newPayment, amount: Number(newPayment.amount) }] }
    });
    setActiveModal(null);
    setNewPayment({ description: '', amount: '', date: '', status: 'pending' });
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setClientData({
      ...clientData,
      details: { ...clientData.details, team: [...clientData.details.team, { ...newMember, avatar: `https://i.pravatar.cc/150?u=${Math.random()}` }] }
    });
    setActiveModal(null);
    setNewMember({ name: '', role: '' });
  };

  const handleUpdateMilestoneStatus = (idx: number, newStatus: string) => {
    const updatedMilestones = [...clientData.details.milestones];
    updatedMilestones[idx].status = newStatus;
    setClientData({
      ...clientData,
      details: { ...clientData.details, milestones: updatedMilestones }
    });
  };

  const handleUpdatePaymentStatus = (idx: number, newStatus: string) => {
    const updatedPayments = [...clientData.details.payments];
    updatedPayments[idx].status = newStatus;
    setClientData({
      ...clientData,
      details: { ...clientData.details, payments: updatedPayments }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="flex flex-col h-full max-w-[1400px] w-full mx-auto space-y-4 p-4 md:p-6">
      
      {/* Removed Back button - now in global Header */}

      {/* Hero Section */}
      <div className="relative bg-[#0a0a0a] rounded-[32px] p-[1px] shadow-2xl overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#222222] via-[#111111] to-[#222222]"></div>
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#007ee1]/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00b4d8]/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative bg-[#111111]/80 backdrop-blur-xl rounded-[31px] p-8 lg:p-12 flex flex-col md:flex-row md:items-center gap-8 justify-between z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-[24px] bg-white border border-[#2a2a2a] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center shrink-0">
              <img src={clientData.logo} alt={clientData.name} className="w-full h-full object-contain" />
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <h1 className="text-3xl lg:text-5xl font-bold text-white">{clientData.name}</h1>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#222222]">
                  <div className={`w-2 h-2 rounded-full ${clientData.projectStatus === 'Active' ? 'bg-[#00c853] shadow-[0_0_8px_#00c853]' : clientData.projectStatus === 'Pending' ? 'bg-[#ffc107] shadow-[0_0_8px_#ffc107]' : clientData.projectStatus === 'Completed' ? 'bg-[#007ee1]' : 'bg-[#ff4444]'}`}></div>
                  <span className="text-white font-medium tracking-wide uppercase text-xs">{clientData.projectStatus}</span>
                </div>
              </div>
              <p className="text-[#888888] max-w-2xl text-lg leading-relaxed">{clientData.details.scope}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex bg-white rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-[#2a2a2a]">
              <a href={`tel:${clientData.contactNumber.replace(/[^0-9+]/g, '')}`} className="w-14 h-14 flex items-center justify-center text-[#007ee1] hover:bg-[#007ee1] hover:text-white transition-colors duration-300 border-r border-gray-200" title="Call">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </a>
              <a href={`mailto:${clientData.email}`} className="w-14 h-14 flex items-center justify-center text-[#ff4444] hover:bg-[#ff4444] hover:text-white transition-colors duration-300 border-r border-gray-200" title="Email">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </a>
              <a href={`https://wa.me/${clientData.contactNumber.replace(/[^0-9+]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-300" title="WhatsApp">
                <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
            <Link href={`/clients/${clientData.id}/edit`} className="w-full text-center py-3 rounded-full border border-[#333] text-[#888] hover:text-white hover:border-[#555] transition-colors text-sm font-medium">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Top Level Bento Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Timeline Bento */}
            <div className="bg-[#111111] border border-[#222222] rounded-[32px] p-8 shadow-lg flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#888888] text-sm font-medium mb-1">Start Date</p>
                  <p className="text-xl font-bold text-white">{clientData.details.startDate}</p>
                </div>
                <div>
                  <p className="text-[#888888] text-sm font-medium mb-1">Target Launch</p>
                  <p className="text-xl font-bold text-white">{clientData.details.targetDate}</p>
                </div>
              </div>
            </div>

            {/* Financial Bento */}
            <div className="bg-[#111111] border border-[#222222] rounded-[32px] p-8 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c853]/10 blur-[40px] rounded-full group-hover:bg-[#00c853]/20 transition-colors pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <p className="text-[#888888] text-sm font-medium mb-1">Total Contract Value</p>
                  <p className="text-3xl font-black text-white tracking-tight">{formatCurrency(totalBudget)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#222222]">
                  <div>
                    <p className="text-[#888888] text-xs font-medium mb-1 uppercase tracking-wider">Paid Amount</p>
                    <p className="text-lg font-bold text-[#00c853]">{formatCurrency(totalPaid)}</p>
                  </div>
                  <div>
                    <p className="text-[#888888] text-xs font-medium mb-1 uppercase tracking-wider">Pending Amount</p>
                    <p className="text-lg font-bold text-[#ffc107]">{formatCurrency(totalPending)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Milestones Table */}
          <div className="bg-[#111111] border border-[#222222] rounded-[32px] p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-[#007ee1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Payment Milestones
              </h2>
              <button onClick={() => setActiveModal('payment')} className="text-[#007ee1] hover:text-white transition-colors text-sm font-medium bg-[#007ee1]/10 px-4 py-2 rounded-full">
                Add Payment
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#222222] text-[#888888] text-sm uppercase tracking-wider">
                    <th className="pb-4 font-medium pl-4">Description</th>
                    <th className="pb-4 font-medium">Due Date</th>
                    <th className="pb-4 font-medium text-right">Amount</th>
                    <th className="pb-4 font-medium text-center pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222]">
                  {clientData.details.payments.map((payment, idx) => (
                    <tr key={idx} className="hover:bg-[#1a1a1a] transition-colors group">
                      <td className="py-4 pl-4 text-white font-medium">{payment.description}</td>
                      <td className="py-4 text-[#888888]">{payment.date}</td>
                      <td className="py-4 text-right font-mono font-medium text-white">{formatCurrency(payment.amount)}</td>
                      <td className="py-4 pr-4">
                        <div className="flex justify-center">
                          <select
                            value={payment.status}
                            onChange={(e) => handleUpdatePaymentStatus(idx, e.target.value)}
                            className={`w-28 text-center px-2 py-1.5 appearance-none cursor-pointer rounded-full text-xs font-bold uppercase tracking-wider border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] transition-colors ${
                              payment.status === 'paid' ? 'bg-[#00c853]/10 text-[#00c853] border-[#00c853]/20 focus:ring-[#00c853]' : 'bg-[#ffc107]/10 text-[#ffc107] border-[#ffc107]/20 focus:ring-[#ffc107]'
                            }`}
                          >
                            <option value="pending" className="bg-[#111] text-white">PENDING</option>
                            <option value="paid" className="bg-[#111] text-white">PAID</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {clientData.details.payments.length === 0 && (
                     <tr>
                       <td colSpan={4} className="py-8 text-center text-[#666]">No payment records found.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Project Milestones Timeline */}
          <div className="bg-[#111111] border border-[#222222] rounded-[32px] p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00b4d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Project Milestones
              </h2>
              <button onClick={() => setActiveModal('milestone')} className="text-[#007ee1] hover:text-white transition-colors text-sm font-medium bg-[#007ee1]/10 px-4 py-2 rounded-full">
                Add Milestone
              </button>
            </div>

            <div className="relative border-l-2 border-[#222222] ml-4 space-y-10 pb-4 mt-4">
              {clientData.details.milestones.map((milestone, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-[#111111] ${
                    milestone.status === 'completed' ? 'bg-[#00c853]' :
                    milestone.status === 'in-progress' ? 'bg-[#007ee1] animate-pulse' :
                    'bg-[#444444]'
                  }`}></div>
                  
                  <div className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#444444] transition-colors ${
                    milestone.status === 'completed' ? 'opacity-70' : ''
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className={`text-lg font-bold ${milestone.status === 'completed' ? 'text-[#a0a0a0] line-through' : 'text-white'}`}>
                          {milestone.title}
                        </h4>
                        <p className="text-[#888888] text-sm mt-1 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {milestone.date}
                        </p>
                      </div>
                      
                      <select
                        value={milestone.status}
                        onChange={(e) => handleUpdateMilestoneStatus(idx, e.target.value)}
                        className={`w-32 text-center px-3 py-1 appearance-none cursor-pointer rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-colors ${
                          milestone.status === 'completed' ? 'bg-[#00c853]/10 text-[#00c853] border-[#00c853]/20 focus:ring-[#00c853]' :
                          milestone.status === 'in-progress' ? 'bg-[#007ee1]/10 text-[#007ee1] border-[#007ee1]/20 focus:ring-[#007ee1]' :
                          'bg-[#333333] text-[#888888] border-[#444444] focus:ring-[#888888]'
                        }`}
                      >
                        <option value="upcoming" className="bg-[#111] text-white">Upcoming</option>
                        <option value="in-progress" className="bg-[#111] text-white">In Progress</option>
                        <option value="completed" className="bg-[#111] text-white">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {clientData.details.milestones.length === 0 && (
                <p className="pl-8 text-[#666]">No project milestones set.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-8">
          
          <div className="bg-[#111111] border border-[#222222] rounded-[32px] p-8 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#007ee1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Assigned Team
            </h2>
            
            {clientData.details.team.length > 0 ? (
              <div className="space-y-4">
                {clientData.details.team.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-[16px] hover:bg-[#1a1a1a] transition-colors border border-transparent hover:border-[#2a2a2a] group cursor-pointer">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border-2 border-[#333] group-hover:border-[#007ee1] transition-colors" />
                    <div>
                      <h4 className="text-white font-medium group-hover:text-[#007ee1] transition-colors">{member.name}</h4>
                      <p className="text-[#888888] text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#666] italic bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">No team members assigned.</p>
            )}
            
            <button onClick={() => setActiveModal('member')} className="w-full mt-6 py-3 rounded-xl border border-[#333] border-dashed text-[#888] hover:text-white hover:border-[#007ee1] hover:bg-[#007ee1]/5 transition-all text-sm font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Assign Member
            </button>
          </div>
          
          <div className="bg-[#111111] border border-[#222222] rounded-[32px] p-8 shadow-lg">
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-[#007ee1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Documents
              </h2>
              <button onClick={() => setActiveModal('document')} className="text-[#007ee1] hover:text-white transition-colors p-1 bg-[#007ee1]/10 rounded-full" title="Add Document">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </button>
             </div>

            <div className="space-y-3">
              {clientData.details.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#444] transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#222] flex items-center justify-center group-hover:bg-[#007ee1]/10 transition-colors shrink-0">
                      <svg className="w-4 h-4 text-[#888] group-hover:text-[#007ee1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-sm font-medium text-white truncate">{doc}</span>
                  </div>
                  <svg className="w-4 h-4 text-[#555] group-hover:text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </div>
              ))}
              {clientData.details.documents.length === 0 && (
                <p className="text-[#666] italic bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">No documents added.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111111] border border-[#333] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-md overflow-hidden relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-[#888] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            {activeModal === 'milestone' && (
              <form onSubmit={handleAddMilestone} className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Add Project Milestone</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Title</label>
                    <input required type="text" value={newMilestone.title} onChange={e => setNewMilestone({...newMilestone, title: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]" placeholder="e.g. Phase 1 Delivery" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Date</label>
                    <input required type="text" value={newMilestone.date} onChange={e => setNewMilestone({...newMilestone, date: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]" placeholder="e.g. Dec 15, 2025" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Status</label>
                    <select value={newMilestone.status} onChange={e => setNewMilestone({...newMilestone, status: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]">
                      <option value="upcoming">Upcoming</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full mt-8 bg-[#007ee1] text-white font-bold py-3 rounded-xl hover:bg-[#005bb5] transition-colors">Add Milestone</button>
              </form>
            )}

            {activeModal === 'payment' && (
              <form onSubmit={handleAddPayment} className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Add Payment Milestone</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Description</label>
                    <input required type="text" value={newPayment.description} onChange={e => setNewPayment({...newPayment, description: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]" placeholder="e.g. Q4 Retainer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Amount (USD)</label>
                    <input required type="number" min="0" value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]" placeholder="5000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Due Date</label>
                    <input required type="text" value={newPayment.date} onChange={e => setNewPayment({...newPayment, date: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]" placeholder="e.g. Nov 1, 2025" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Status</label>
                    <select value={newPayment.status} onChange={e => setNewPayment({...newPayment, status: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]">
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full mt-8 bg-[#007ee1] text-white font-bold py-3 rounded-xl hover:bg-[#005bb5] transition-colors">Record Payment</button>
              </form>
            )}

            {activeModal === 'document' && (
              <form onSubmit={handleAddDocument} className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Upload Document</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">File Name</label>
                    <input required type="text" value={newDocument} onChange={e => setNewDocument(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]" placeholder="e.g. Final Contract.pdf" />
                  </div>
                </div>
                <button type="submit" className="w-full mt-8 bg-[#007ee1] text-white font-bold py-3 rounded-xl hover:bg-[#005bb5] transition-colors">Add Document</button>
              </form>
            )}

            {activeModal === 'member' && (
              <form onSubmit={handleAddMember} className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Assign Team Member</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Name</label>
                    <input required type="text" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]" placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#888] mb-1">Role</label>
                    <input required type="text" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#007ee1]" placeholder="e.g. UI/UX Designer" />
                  </div>
                </div>
                <button type="submit" className="w-full mt-8 bg-[#007ee1] text-white font-bold py-3 rounded-xl hover:bg-[#005bb5] transition-colors">Assign Member</button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
