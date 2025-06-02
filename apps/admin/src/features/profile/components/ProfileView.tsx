"use client";

import React, { useState } from 'react';

export function ProfileView() {
  const [formData, setFormData] = useState({
    name: 'Admin User',
  });
  
  const email = 'admin@unity11.com';
  const role = 'Lead Architect';

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full px-6 lg:px-8 h-[calc(100vh-5rem)] overflow-hidden pt-4">
      
      {/* Profile Card */}
      <div className="w-full rounded-2xl overflow-hidden shadow-lg flex-1 flex flex-col" style={{ backgroundColor: '#141824' }}>
        
        {/* Gradient Banner */}
        <div className="h-[200px] relative" style={{ background: 'linear-gradient(135deg, #007ee1 0%, #00b4d8 100%)' }}>
        </div>
        
        {/* Info Strip - distinct dark navy */}
        <div className="px-8 pb-8 flex-1" style={{ backgroundColor: '#1a1f2e' }}>
          <div className="flex items-end gap-8">
            
            {/* Avatar - 30% overlay into banner */}
            <div 
              className="shrink-0 rounded-2xl overflow-hidden shadow-2xl z-10 flex items-center justify-center"
              style={{ 
                width: '180px', 
                height: '180px', 
                marginTop: '-70px',
                backgroundColor: '#007ee1',
                border: '6px solid #1a1f2e'
              }}
            >
              <span className="text-[64px] font-bold text-white select-none">AU</span>
            </div>
            
            {/* Name + Badges */}
            <div className="flex-1 min-w-0 pb-1" style={{ marginTop: '20px' }}>
              {isEditing ? (
                <form onSubmit={handleSave} className="flex items-center gap-4 mb-3">
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    autoFocus
                    className="font-bold font-[family-name:var(--font-comfortaa)] rounded-lg focus:outline-none"
                    style={{ 
                      fontSize: '38px', 
                      color: '#ffffff',
                      backgroundColor: '#141824',
                      border: '2px solid #007ee1',
                      padding: '4px 16px',
                      width: '100%',
                      maxWidth: '500px'
                    }}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="font-mono font-bold tracking-wider rounded-lg transition-all shrink-0"
                    style={{ 
                      padding: '10px 24px',
                      fontSize: '13px',
                      color: '#ffffff',
                      backgroundColor: '#007ee1'
                    }}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </form>
              ) : (
                <h2 
                  className="font-bold leading-tight mb-3 font-[family-name:var(--font-comfortaa)]"
                  style={{ fontSize: '38px', color: '#ffffff' }}
                >
                  {formData.name}
                </h2>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                <span 
                  className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-wider px-3 py-1.5 rounded"
                  style={{ backgroundColor: 'rgba(0,126,225,0.15)', color: '#00b4d8', border: '1px solid rgba(0,180,216,0.25)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {role}
                </span>
                <span 
                  className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-wider px-3 py-1.5 rounded"
                  style={{ backgroundColor: '#252a3a', color: '#94a3b8', border: '1px solid #2e3446' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {email}
                </span>
              </div>
            </div>
            
            {/* Edit Button - solid blue bg */}
            <div className="shrink-0 pb-1">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="font-mono font-bold tracking-wider rounded-lg transition-all"
                style={{ 
                  padding: '10px 24px',
                  fontSize: '13px',
                  color: '#ffffff',
                  backgroundColor: '#007ee1',
                  border: '2px solid #007ee1',
                  boxShadow: '0 0 12px rgba(0,126,225,0.3)'
                }}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
            
          </div>
        </div>
      </div>


      
    </div>
  );
}
