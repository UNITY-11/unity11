"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const statusOptions = [
  { value: "New", label: "New" },
  { value: "Working On", label: "Working On" },
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
];

export function ProjectEditForm() {
  const params = useParams();
  // In a real app, we would fetch data based on params.id
  // For the UI demonstration, we'll pre-fill with dummy data

  const [title, setTitle] = useState("AI-Powered Insights Platform");
  const [description, setDescription] = useState("Built an insights dashboard with real-time analytics, LLM automation, and advanced monitoring tools.");
  const [startColor, setStartColor] = useState("#9333ea");
  const [endColor, setEndColor] = useState("#93c5fd");
  const [status, setStatus] = useState("Completed");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(["AI + Analytics", "Dashboard"]);
  const [tagInput, setTagInput] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>("/images/blog/blog2.png");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit Project</h1>
          <p className="text-text-muted mt-2">Modify the details of your existing project portfolio entry.</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Text Inputs */}
          <div className="lg:col-span-2 space-y-6 bg-surface rounded-[24px] border border-border-base p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-text-muted">Project Title</label>
                <input 
                  type="text" 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow placeholder:text-text-dim" 
                  placeholder="e.g. Modern E-Commerce Platform" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="tags" className="block text-sm font-medium text-text-muted">Project Tags</label>
                <div className="w-full h-[50px] px-3 rounded-xl border border-border-base bg-background focus-within:ring-2 focus-within:ring-[var(--primary)] transition-shadow flex flex-nowrap gap-2 items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {tags.map((tag) => (
                    <span key={tag} className="bg-surface-active text-text-muted px-3 py-1.5 rounded-full text-sm flex items-center gap-1 border border-border-muted shrink-0">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        className="hover:text-foreground transition-colors ml-1 focus:outline-none"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  ))}
                  <input 
                    type="text" 
                    id="tags" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-w-[120px] bg-transparent text-foreground focus:outline-none placeholder:text-text-dim" 
                    placeholder={tags.length === 0 ? "Type and press Enter..." : ""} 
                  />
                </div>
                <p className="text-xs text-text-dim">Press Enter or comma to add a tag.</p>
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-text-muted">Project Status</label>
                <div className="relative">
                  <button 
                    type="button"
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className="w-full px-4 py-3 rounded-xl border border-border-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow flex items-center justify-between"
                  >
                    <span>{statusOptions.find(o => o.value === status)?.label}</span>
                    <svg className={`w-5 h-5 text-text-muted transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  
                  {isStatusOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border-base rounded-xl shadow-xl overflow-hidden z-50">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setStatus(option.value);
                            setIsStatusOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-surface-hover transition-colors flex items-center justify-between ${status === option.value ? 'text-primary bg-primary/10' : 'text-foreground'}`}
                        >
                          {option.label}
                          {status === option.value && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-text-muted">Description</label>
                <textarea 
                  id="description" 
                  rows={5} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow resize-none placeholder:text-text-dim" 
                  placeholder="Describe the project goals and achievements..."
                ></textarea>
              </div>

              {/* Form Actions with Delete Button */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-between pt-6 mt-4 border-t border-border-base">
                <button type="button" className="px-6 py-2.5 rounded-full border border-red-500/50 text-red-500 font-medium hover:bg-red-500 hover:text-foreground transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Delete Project
                </button>
                <div className="flex gap-4">
                  <Link href="/projects" className="px-6 py-2.5 rounded-full text-text-muted font-medium hover:text-foreground transition-colors flex items-center justify-center">
                    Cancel
                  </Link>
                  <button type="button" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Visual Media & Theming */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Image Upload Area */}
            <div className="bg-surface rounded-[24px] border border-border-base p-6 shadow-xl space-y-4">
              <label className="block text-sm font-medium text-text-muted">Project Image (4:3)</label>
              <div 
                className="border-2 border-dashed border-border-muted hover:border-primary rounded-[16px] flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-background group aspect-[4/3] relative overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                {previewImage ? (
                  <>
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-gradient-to-r from-primary to-primary-light text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        Change Image
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                      <svg className="w-8 h-8 text-text-dim group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <p className="text-foreground font-medium mb-1">Click to upload</p>
                    <p className="text-text-dim text-xs">or drag and drop</p>
                  </>
                )}
              </div>
            </div>

            {/* Custom Gradient Selector */}
            <div className="bg-surface rounded-[24px] border border-border-base p-6 shadow-xl space-y-4">
              <label className="block text-sm font-medium text-text-muted">Card Gradient Design</label>
              
              {/* Preview Block */}
              <div 
                className="w-full h-24 rounded-[16px] shadow-inner mb-4 transition-all"
                style={{ backgroundImage: `linear-gradient(to right, ${startColor}, ${endColor})` }}
              ></div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startColor" className="block text-xs font-medium text-text-dim">Start Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      id="startColor" 
                      value={startColor}
                      onChange={(e) => setStartColor(e.target.value)}
                      className="w-10 h-10 rounded-full border-2 border-border-base bg-transparent cursor-pointer p-0 appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none shrink-0" 
                    />
                    <span className="text-foreground text-sm uppercase flex-1">{startColor}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="endColor" className="block text-xs font-medium text-text-dim">End Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      id="endColor" 
                      value={endColor}
                      onChange={(e) => setEndColor(e.target.value)}
                      className="w-10 h-10 rounded-full border-2 border-border-base bg-transparent cursor-pointer p-0 appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none shrink-0" 
                    />
                    <span className="text-foreground text-sm uppercase flex-1">{endColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
