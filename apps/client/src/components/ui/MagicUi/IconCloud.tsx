"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { renderToString } from "react-dom/server";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({ icons, images }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);
  const animationFrameRef = useRef<number>(0);
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);

  // 📐 Configuration Constants (Based on a 500x500 reference frame)
  const ROTATION_RADIUS_REF = 160; 
  const FINAL_ICON_SIZE_REF = 160; 
  const HITBOX_RADIUS_REF = 50;    
  const PERSPECTIVE_OFFSET = 250;
  const PERSPECTIVE_DIVISOR = 400;

  // Calculate dynamic size factors
  const sizeFactor = canvasSize.width / 500;
  const ROTATION_RADIUS = ROTATION_RADIUS_REF * sizeFactor;
  const FINAL_ICON_SIZE = FINAL_ICON_SIZE_REF * sizeFactor;
  const HITBOX_RADIUS = HITBOX_RADIUS_REF * sizeFactor;
  
  // 🔄 Handle Responsiveness
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      // Use the smaller of width or height for square canvas, ensuring it fits
      const size = Math.min(container.offsetWidth, container.offsetHeight || container.offsetWidth);
      // Ensure a minimum size to prevent division by zero or tiny canvas
      const safeSize = Math.max(300, size);
      setCanvasSize({ width: safeSize, height: safeSize });
    };

    updateSize();

    // Use ResizeObserver for full responsiveness
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, []);


  // Create icon canvases once when icons/images change
  useEffect(() => {
    if (!icons && !images) return;

    const items = icons || images || [];
    imagesLoadedRef.current = new Array(items.length).fill(false);

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 200;
      offscreen.height = 200;

      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        if (images) {
          // Handle image URLs directly
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index] as string;
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);

            const targetSize = 100;

            // Create circular clipping path
            offCtx.beginPath();
            offCtx.arc(targetSize / 2, targetSize / 2, targetSize / 2, 0, Math.PI * 2);
            offCtx.closePath();
            offCtx.clip();

            // Draw the image
            offCtx.drawImage(img, 0, 0, targetSize, targetSize);

            imagesLoadedRef.current[index] = true;
          };
        } else {
          // Handle SVG icons
          offCtx.scale(1, 1)
          const svgString = renderToString(item as React.ReactElement);
          const img = new Image();
          img.src = "data:image/svg+xml;base64," + btoa(svgString);
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.scale(3, 3);
            offCtx.drawImage(img, 0, 0);
            imagesLoadedRef.current[index] = true;
          };
        }
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const items = icons || images || [];
    const newIcons: Icon[] = [];
    const numIcons = items.length || 20;

    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      newIcons.push({
        x: x * ROTATION_RADIUS_REF, 
        y: y * ROTATION_RADIUS_REF,
        z: z * ROTATION_RADIUS_REF,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icons, images]);

  // Handle mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      // 3D Rotation
      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      // FIX: Apply sizeFactor to the rotated coordinates for screen projection
      const screenX = canvasRef.current!.width / 2 + rotatedX * sizeFactor;
      const screenY = canvasRef.current!.height / 2 + rotatedY * sizeFactor;
      
      const scale = (rotatedZ + PERSPECTIVE_OFFSET) / PERSPECTIVE_DIVISOR;
      const radius = HITBOX_RADIUS * scale; // Use dynamic hitbox radius
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );

        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    });

    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [iconPositions, sizeFactor, HITBOX_RADIUS]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, lastMousePos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) {
          setTargetRotation(null);
        }
      } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        };
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        // 3D Rotation (based on reference positions)
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        // Perspective scaling (independent of size factor)
        const scale = (rotatedZ + PERSPECTIVE_OFFSET) / PERSPECTIVE_DIVISOR; 
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + ROTATION_RADIUS) / (ROTATION_RADIUS * 1.5))); 

        // FIX: Final screen position (scaled by size factor)
        const screenX = centerX + rotatedX * sizeFactor;
        const screenY = centerY + rotatedY * sizeFactor;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        if (icons || images) {
          if (
            iconCanvasesRef.current[index] &&
            imagesLoadedRef.current[index]
          ) {
            // Draw the icon using the dynamic FINAL_ICON_SIZE
            ctx.drawImage(
              iconCanvasesRef.current[index],
              -FINAL_ICON_SIZE / 2, 
              -FINAL_ICON_SIZE / 2, 
              FINAL_ICON_SIZE,
              FINAL_ICON_SIZE
            );
          }
        } else {
          // Fallback circles for numbered icons
          const circleRadius = 30 * sizeFactor;
          ctx.beginPath();
          ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
          ctx.fillStyle = "#4444ff";
          ctx.fill();
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const fontSize = 24 * sizeFactor;
          ctx.font = `${fontSize}px Arial`;
          ctx.fillText(`${icon.id + 1}`, 0, 0);
        }

        ctx.restore();
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    icons, 
    images, 
    iconPositions, 
    isDragging, 
    mousePos, 
    targetRotation,
    canvasSize,
    sizeFactor,
    ROTATION_RADIUS,
    FINAL_ICON_SIZE
  ]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] min-w-[300px]" // Use full size of parent container
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        // Setting canvas style width/height to 100% ensures it stretches visually
        // to fill the container, while the `width` and `height` props manage the resolution.
        style={{ width: '100%', height: '100%' }}
        className="rounded-xl"
        aria-label="Interactive 3D Icon Cloud"
        role="img"
      />
    </div>
  );
}