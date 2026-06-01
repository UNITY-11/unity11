"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Apple Inc.",
    logo: "https://logo.clearbit.com/apple.com",
    contactNumber: "+1 (555) 123-4567",
    email: "contact@apple.com",
    projectStatus: "Active",
  });

  // In a real app, fetch the client data here using params.id

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating client:", formData);
    // Add logic here to save data to the server
    router.push("/clients");
  };

  return (
    <div className="flex flex-col h-full max-w-[800px] w-full mx-auto space-y-8 p-4 md:p-6 lg:p-8 pb-16 lg:pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Edit Client</h1>
          <p className="text-[#888888]">Update information for {formData.name}</p>
        </div>
        <Link href="/clients" className="px-4 py-2 bg-[#1a1a1a] border border-[#333333] hover:bg-[#222222] hover:text-white text-[#888888] rounded-full text-sm font-medium transition-colors">
          Cancel
        </Link>
      </div>

      <div className="bg-[#111111] border border-[#222222] rounded-[24px] p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#888888] mb-1">Company Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#007ee1] transition-colors" 
                placeholder="e.g. Acme Corp" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#888888] mb-1">Logo URL</label>
              <input 
                type="url" 
                name="logo" 
                value={formData.logo} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#007ee1] transition-colors" 
                placeholder="https://logo.clearbit.com/acme.com" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#888888] mb-1">Contact Number</label>
                <input 
                  type="tel" 
                  name="contactNumber" 
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#007ee1] transition-colors" 
                  placeholder="+1 (555) 123-4567" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#888888] mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#007ee1] transition-colors" 
                  placeholder="contact@company.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#888888] mb-1">Project Status</label>
              <div className="relative">
                <select 
                  name="projectStatus" 
                  value={formData.projectStatus} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#007ee1] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
                <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#222222] flex justify-between items-center">
            <button type="button" className="px-6 py-2 bg-[#ff4444]/10 text-[#ff4444] rounded-full font-medium hover:bg-[#ff4444] hover:text-white transition-colors border border-[#ff4444]/20 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Delete Client
            </button>
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-[#007ee1] to-[#00b4d8] text-white rounded-full font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-opacity flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
