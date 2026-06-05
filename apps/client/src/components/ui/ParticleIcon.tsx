"use client";

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  scatterX: number;
  scatterY: number;
  radius: number;
  theta: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  angle: number;
}

export const ParticleIcon = ({ 
  icon: Icon, 
  color = "#3b82f6", 
  size = 300 
}: { 
  icon: any, 
  color?: string, 
  size?: number 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Make canvas 2x larger than the icon to give particles room to fly
  const canvasSize = size * 2;
  const offset = size / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const svgElement = svgContainerRef.current?.querySelector('svg');
    if (!canvas || !svgElement) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    svgElement.setAttribute('width', size.toString());
    svgElement.setAttribute('height', size.toString());
    svgElement.setAttribute('stroke', color);
    
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    let particles: Particle[] = [];
    let animationFrameId: number;
    let observer: IntersectionObserver;
    
    let mouseX = -9999;
    let mouseY = -9999;
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovered = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        isHovered = true;
      }
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      isHovered = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Add touch support for mobile
    canvas.addEventListener('touchstart', handleTouchMove, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleMouseLeave);

    img.onload = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      
      // Draw image in the center to sample pixels
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.drawImage(img, offset, offset, size, size);
      
      const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
      const data = imageData.data;
      
      const step = 3; // Lower step means significantly more particles
      for (let y = 0; y < canvasSize; y += step) {
        for (let x = 0; x < canvasSize; x += step) {
          const index = (y * canvasSize + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 50) {
             // Come from different sides (top, right, bottom, left)
             const side = Math.floor(Math.random() * 4);
             let sx = 0, sy = 0;
             const margin = 200; // start far off canvas
             if (side === 0) { sx = Math.random() * canvasSize; sy = -margin; }
             else if (side === 1) { sx = canvasSize + margin; sy = Math.random() * canvasSize; }
             else if (side === 2) { sx = Math.random() * canvasSize; sy = canvasSize + margin; }
             else { sx = -margin; sy = Math.random() * canvasSize; }
             
             particles.push({
               x: sx,
               y: sy,
               originX: x,
               originY: y,
               scatterX: sx,
               scatterY: sy,
               radius: 0,
               theta: 0,
               vx: 0,
               vy: 0,
               color: color,
               size: Math.random() * 1.2 + 0.5, // slightly larger particles
               angle: Math.random() * Math.PI * 2
             });
          }
        }
      }

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      let isInView = false;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            isInView = entry.isIntersecting;
          });
        },
        { threshold: 0.1 } 
      );

      if (canvas) observer.observe(canvas);

      const animate = () => {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        ctx.globalCompositeOperation = "source-over"; // Changed from lighter to reduce extreme brightness

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          const dxMouse = mouseX - p.x;
          const dyMouse = mouseY - p.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          let tx = isInView ? p.originX : p.scatterX;
          let ty = isInView ? p.originY : p.scatterY;

          // Quick distance check to optimize out idle particles
          const distToTarget = Math.abs(tx - p.x) + Math.abs(ty - p.y);
          const isHovered = mouseX !== -9999;
          if (!isInView && distToTarget < 2 && !isHovered) {
             continue; // Skip physics if it's out of view and has reached its scatter position
          }

          // Direct position easing (NO SPRING BOUNCE)
          p.x += (tx - p.x) * 0.15;
          p.y += (ty - p.y) * 0.15;

          // Elegant, fluid-like mouse interaction (Ripple effect)
          const maxDist = 100; // Increased spread radius
          if (distMouse < maxDist && isInView) {
            const force = Math.pow((maxDist - distMouse) / maxDist, 2); 
            // Add momentum only for mouse push
            p.vx -= (dxMouse / distMouse) * force * 5; // Stronger push
            p.vy -= (dyMouse / distMouse) * force * 5;
          }

          // Apply mouse momentum to position
          p.x += p.vx;
          p.y += p.vy;

          // High friction on momentum so it doesn't wobble
          p.vx *= 0.8;
          p.vy *= 0.8;

          // Organic float
          if (isInView && distMouse >= maxDist) {
            p.angle += 0.05;
            p.x += Math.sin(p.angle) * 0.3;
            p.y += Math.cos(p.angle) * 0.3;
          }

          // Color transition based on cursor proximity
          const colorEffectRadius = 150; 
          let colorRatio = 0;
          if (distMouse < colorEffectRadius && isInView) {
            colorRatio = 1 - Math.pow(distMouse / colorEffectRadius, 1.5);
          }

          // Color 1: Standard Blue (#3b82f6)
          const r1 = 59, g1 = 130, b1 = 246;  
          // Color 2: Light Blue (hovered)
          const r2 = 147, g2 = 197, b2 = 253; 

          const r = Math.floor(r1 + (r2 - r1) * colorRatio);
          const g = Math.floor(g1 + (g2 - g1) * colorRatio);
          const b = Math.floor(b1 + (b2 - b1) * colorRatio);

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.globalAlpha = 0.8; // Reduced brightness from 1.0
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); 
          ctx.fill();
        }
        
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
      URL.revokeObjectURL(url);
    };

    img.src = url;

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (observer) observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [Icon, color, size, canvasSize, offset]);

  return (
    <div className="relative flex justify-center items-center overflow-visible">
      <div ref={svgContainerRef} className="hidden">
        <Icon strokeWidth={1.5} /> 
      </div>
      <canvas 
        ref={canvasRef} 
        style={{ width: canvasSize, height: canvasSize, marginTop: -offset, marginBottom: -offset }} 
        className="cursor-crosshair transition-all duration-300"
      />
    </div>
  );
};
