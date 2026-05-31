"use client";

import { useState, useRef } from "react";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "working", label: "Working On" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export default function AddProjectPage() {
  const [startColor, setStartColor] = useState("#007ee1");
  const [endColor, setEndColor] = useState("#00b4d8");
  const [status, setStatus] = useState("new");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const handleColorClick = async (e: React.MouseEvent<HTMLInputElement>, setColor: (color: string) => void) => {
    if ('EyeDropper' in window) {
      e.preventDefault();
      try {
        // @ts-ignore
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        setColor(result.sRGBHex);
      } catch (err) {
        // User canceled the eyedropper
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Add New Project</h1>
          <p className="text-[#888888] mt-2">Create a new project portfolio entry to display on the public website.</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Text Inputs */}
          <div className="lg:col-span-2 space-y-6 bg-[#111111] rounded-[24px] border border-[#222222] p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-[#888888]">Project Title</label>
                <input type="text" id="title" className="w-full px-4 py-3 rounded-xl border border-[#222222] bg-[#0a0a0a] text-white focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-shadow placeholder:text-[#444444]" placeholder="e.g. Modern E-Commerce Platform" />
              </div>

              <div className="space-y-2">
                <label htmlFor="tags" className="block text-sm font-medium text-[#888888]">Project Tags</label>
                <div className="w-full min-h-[52px] p-2 rounded-xl border border-[#222222] bg-[#0a0a0a] focus-within:ring-2 focus-within:ring-[#007ee1] transition-shadow flex flex-wrap gap-2 items-center">
                  {tags.map((tag) => (
                    <span key={tag} className="bg-[#222222] text-[#888888] px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-[#333333]">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        className="hover:text-white transition-colors ml-1 focus:outline-none"
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
                    className="flex-1 min-w-[120px] bg-transparent text-white focus:outline-none px-2 py-1 placeholder:text-[#444444]" 
                    placeholder={tags.length === 0 ? "Type and press Enter..." : ""} 
                  />
                </div>
                <p className="text-xs text-[#555555]">Press Enter or comma to add a tag.</p>
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-[#888888]">Project Status</label>
                <div className="relative">
                  <button 
                    type="button"
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className="w-full px-4 py-3 rounded-xl border border-[#222222] bg-[#0a0a0a] text-white focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-shadow flex items-center justify-between"
                  >
                    <span>{statusOptions.find(o => o.value === status)?.label}</span>
                    <svg className={`w-5 h-5 text-[#888888] transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  
                  {isStatusOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#111111] border border-[#222222] rounded-xl shadow-xl overflow-hidden z-50">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setStatus(option.value);
                            setIsStatusOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-[#1a1a1a] transition-colors flex items-center justify-between ${status === option.value ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-white'}`}
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
                <label htmlFor="description" className="block text-sm font-medium text-[#888888]">Description</label>
                <textarea id="description" rows={5} className="w-full px-4 py-3 rounded-xl border border-[#222222] bg-[#0a0a0a] text-white focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-shadow resize-none placeholder:text-[#444444]" placeholder="Describe the project goals and achievements..."></textarea>
              </div>

              {/* Form Actions */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-4 pt-6 mt-4 border-t border-[#222222]">
                <button type="button" className="px-6 py-2.5 rounded-full text-[#888888] font-medium hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="button" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#007ee1] to-[#00b4d8] text-white font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-all">
                  Publish Project
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Visual Media & Theming */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Image Upload Area */}
            <div className="bg-[#111111] rounded-[24px] border border-[#222222] p-6 shadow-xl space-y-4">
              <label className="block text-sm font-medium text-[#888888]">Project Image (4:3)</label>
              <div 
                className="border-2 border-dashed border-[#333333] hover:border-[#007ee1] rounded-[16px] flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#0a0a0a] group aspect-[4/3] relative overflow-hidden"
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
                      <div className="bg-gradient-to-r from-[#007ee1] to-[#00b4d8] text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        Change Image
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#007ee1]/20 transition-colors mb-4">
                      <svg className="w-8 h-8 text-[#555555] group-hover:text-[#007ee1] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <p className="text-white font-medium mb-1">Click to upload</p>
                    <p className="text-[#555555] text-xs">or drag and drop</p>
                  </>
                )}
              </div>
            </div>

            {/* Custom Gradient Selector */}
            <div className="bg-[#111111] rounded-[24px] border border-[#222222] p-6 shadow-xl space-y-4">
              <label className="block text-sm font-medium text-[#888888]">Card Gradient Design</label>
              
              {/* Preview Block */}
              <div 
                className="w-full h-24 rounded-[16px] shadow-inner mb-4 transition-all"
                style={{ backgroundImage: `linear-gradient(to right, ${startColor}, ${endColor})` }}
              ></div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startColor" className="block text-xs font-medium text-[#555555]">Start Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      id="startColor" 
                      value={startColor}
                      onChange={(e) => setStartColor(e.target.value)}
                      onClick={(e) => handleColorClick(e, setStartColor)}
                      className="w-10 h-10 rounded-full border-2 border-[#222222] bg-transparent cursor-pointer p-0 appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none shrink-0" 
                    />
                    <span className="text-white text-sm uppercase flex-1">{startColor}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="endColor" className="block text-xs font-medium text-[#555555]">End Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      id="endColor" 
                      value={endColor}
                      onChange={(e) => setEndColor(e.target.value)}
                      onClick={(e) => handleColorClick(e, setEndColor)}
                      className="w-10 h-10 rounded-full border-2 border-[#222222] bg-transparent cursor-pointer p-0 appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none shrink-0" 
                    />
                    <span className="text-white text-sm uppercase flex-1">{endColor}</span>
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
