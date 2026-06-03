"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#007ee1',
      backgroundImage: 'linear-gradient(to top right, #007ee1 0%, #00b4d8 100%)', // Brand gradient from bottom-left to top-right
      padding: '1.5rem',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      
      {/* Main Card Container */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        width: '100%',
        maxWidth: '1100px',
        aspectRatio: isMobile ? 'auto' : '16/9', // Locks proportions so width scales perfectly with height
        maxHeight: '100%',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        
        {/* Left Side: Form */}
        <div style={{
          flex: '4',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          position: 'relative'
        }}>
          
          <div style={{ maxWidth: '340px', margin: '0 auto', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <img src="/images/logos/unity11-logo.gif" alt="Unity11 Logo" style={{ width: '64px', height: '64px', objectFit: 'contain', margin: '0 auto 1.25rem auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />
              <h1 style={{ 
                fontSize: '1.875rem', 
                fontWeight: 'bold', 
                color: '#111827', 
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-comfortaa), sans-serif'
              }}>Admin Portal</h1>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                Secure access for Unity11 administrators.
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Email Input */}
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 2.5rem 0.875rem 1.25rem',
                    borderRadius: '9999px',
                    border: '1px solid #e5e7eb',
                    fontSize: '0.875rem',
                    outline: 'none',
                    color: '#111827',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#007ee1'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
                />
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
              </div>

              {/* Password Input */}
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 2.5rem 0.875rem 1.25rem',
                    borderRadius: '9999px',
                    border: '1px solid #e5e7eb',
                    fontSize: '0.875rem',
                    outline: 'none',
                    color: '#111827',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#007ee1'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
                />
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer' }}>
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '500', marginTop: '0.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <div style={{ width: '1rem', height: '1rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <input type="checkbox" style={{ display: 'none' }} />
                  </div>
                  <span style={{ color: '#4b5563' }}>Remember for 30 days</span>
                </label>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#007ee1'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                style={{ 
                  width: '100%', 
                  padding: '0.875rem', 
                  borderRadius: '9999px', 
                  color: '#ffffff', 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  backgroundColor: '#007ee1',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  boxShadow: '0 4px 14px 0 rgba(0, 126, 225, 0.39)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Login
              </button>

            </form>
          </div>

        </div>

        {/* Right Side: Artwork */}
        {!isMobile && (
          <div style={{ flex: '3', padding: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img 
                src="/admin-login-bg.jpg" 
                alt="Login Background"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  borderRadius: '32px',
                  backgroundColor: '#00b4d8'
                }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
