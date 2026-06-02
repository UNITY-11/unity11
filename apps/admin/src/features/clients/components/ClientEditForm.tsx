"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ClientEditForm({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Apple Inc.",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=apple.com",
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
          <h1 className="text-3xl font-bold text-primary mb-2">Edit Client</h1>
          <p className="text-text-muted">Update information for {formData.name}</p>
        </div>
        <Link href="/clients" className="px-4 py-2 bg-surface-hover border border-border-muted hover:bg-surface-active hover:text-foreground text-text-muted rounded-full text-sm font-medium transition-colors">
          Cancel
        </Link>
      </div>

      <div className="bg-surface border border-border-base rounded-[24px] p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Company Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors" 
                placeholder="e.g. Acme Corp" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Logo URL</label>
              <input 
                type="url" 
                name="logo" 
                value={formData.logo} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors" 
                placeholder="https://www.google.com/s2/favicons?sz=128&domain=acme.com" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Contact Number</label>
                <input 
                  type="tel" 
                  name="contactNumber" 
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors" 
                  placeholder="+1 (555) 123-4567" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors" 
                  placeholder="contact@company.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Project Status</label>
              <div className="relative">
                <select 
                  name="projectStatus" 
                  value={formData.projectStatus} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 bg-background border border-border-muted rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
                <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-base flex justify-between items-center">
            <button type="button" className="px-6 py-2 bg-danger/10 text-danger rounded-full font-medium hover:bg-danger hover:text-white transition-colors border border-danger/20 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Delete Client
            </button>
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-opacity flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
