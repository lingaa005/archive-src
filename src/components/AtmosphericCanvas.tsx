/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  type: 'dust' | 'fiber';
  length?: number;
  angle?: number;
  spin?: number;
}

export default function AtmosphericCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track particles
    const particles: Particle[] = [];
    const maxParticles = 60;

    // Create initial state
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(randomStart = false): Particle {
      const type = Math.random() > 0.85 ? 'fiber' : 'dust';
      return {
        x: Math.random() * width,
        y: randomStart ? Math.random() * height : height + 10,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.4 + 0.1), // general drift upward
        size: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.45 + 0.1,
        type,
        length: type === 'fiber' ? Math.random() * 8 + 4 : undefined,
        angle: type === 'fiber' ? Math.random() * Math.PI * 2 : undefined,
        spin: type === 'fiber' ? (Math.random() - 0.5) * 0.015 : undefined,
      };
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    // Draw the ambient watermarks once to cache, or draw per frame in canvas context
    function drawArchivalWatermark(c: CanvasRenderingContext2D, w: number, h: number) {
      c.save();
      c.strokeStyle = '#b8862b';
      c.fillStyle = '#b8862b';
      
      // Let's draw a beautiful compass rose or grid at the center-right of screen
      const centerX = w * 0.8;
      const centerY = h * 0.45;
      const radius = 140;

      c.globalAlpha = 0.025; // 2.5% opacity as specified by watermark rules (3-5%)
      c.lineWidth = 0.8;

      // Draw concentric coordinate circles
      c.beginPath();
      c.arc(centerX, centerY, radius, 0, Math.PI * 2);
      c.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
      c.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
      c.stroke();

      // Crosshairs
      c.beginPath();
      c.moveTo(centerX - radius - 30, centerY);
      c.lineTo(centerX + radius + 30, centerY);
      c.moveTo(centerX, centerY - radius - 30);
      c.lineTo(centerX, centerY + radius + 30);
      c.stroke();

      // Mini compass ticks
      for (let degree = 0; degree < 360; degree += 15) {
        const rad = (degree * Math.PI) / 180;
        const outerX = centerX + Math.cos(rad) * radius;
        const outerY = centerY + Math.sin(rad) * radius;
        const innerX = centerX + Math.cos(rad) * (radius - (degree % 45 === 0 ? 12 : 6));
        const innerY = centerY + Math.sin(rad) * (radius - (degree % 45 === 0 ? 12 : 6));
        
        c.beginPath();
        c.moveTo(innerX, innerY);
        c.lineTo(outerX, outerY);
        c.stroke();
      }

      // Compass spikes (north, south, east, west)
      const starDirections = [0, Math.PI/2, Math.PI, (3*Math.PI)/2];
      starDirections.forEach((dir) => {
        const dX = Math.cos(dir);
        const dY = Math.sin(dir);
        
        c.beginPath();
        c.moveTo(centerX, centerY);
        const tipX = centerX + dX * (radius + 20);
        const tipY = centerY + dY * (radius + 20);
        
        // draw triangle side
        const sideX = centerX + Math.cos(dir + 0.1) * (radius * 0.3);
        const sideY = centerY + Math.sin(dir + 0.1) * (radius * 0.3);
        
        c.moveTo(centerX, centerY);
        c.lineTo(sideX, sideY);
        c.lineTo(tipX, tipY);
        c.closePath();
        c.fill();
      });

      // Simple grid overlays at top left
      c.strokeStyle = '#b8862b';
      c.globalAlpha = 0.015;
      const step = 80;
      c.beginPath();
      // vertical grid lines in corner
      for (let gx = 0; gx < 400; gx += step) {
        c.moveTo(gx, 0);
        c.lineTo(gx, h);
      }
      // horizontal grid lines
      for (let gy = 0; gy < h; gy += step) {
        c.moveTo(0, gy);
        c.lineTo(w, gy);
      }
      c.stroke();

      // Technical markings text
      c.font = '8px "JetBrains Mono", monospace';
      c.fillStyle = '#b8862b';
      c.globalAlpha = 0.035;
      c.fillText("LATITUDE // 40.7128° N", 30, 40);
      c.fillText("LONGITUDE // 74.0060° W", 30, 55);
      c.fillText("SOVEREIGN ARCHIVAL VAULT // KM_099", 30, 70);
      c.fillText("SYSTEM CODE: AUTH_LEDGER_A", w - 190, h - 30);

      c.restore();
    }

    function renderLoop() {
      // Background base
      ctx.fillStyle = '#0f0e0c';
      ctx.fillRect(0, 0, width, height);

      // Render fixed watermark systems
      drawArchivalWatermark(ctx, width, height);

      // Draw Vignette and desk candle soft highlights
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.1,
        width / 2, height / 2, Math.max(width, height) * 0.9
      );
      gradient.addColorStop(0, 'rgba(44, 31, 22, 0.45)'); // Warm center brass/ebony glow
      gradient.addColorStop(0.5, 'rgba(15, 14, 12, 0)');
      gradient.addColorStop(1, 'rgba(5, 4, 3, 0.95)'); // Dark vignette corners
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.005 + p.alpha) * 0.12; // wave sway

        if (p.angle !== undefined && p.spin !== undefined) {
          p.angle += p.spin;
        }

        // Loop when boundary is hit
        if (p.y < -15 || p.x < -15 || p.x > width + 15) {
          particles[i] = createParticle();
          continue;
        }

        ctx.save();
        ctx.fillStyle = '#eedda0';
        ctx.strokeStyle = '#eedda0';
        ctx.globalAlpha = p.alpha;
        
        if (p.type === 'dust') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          // subtle shimmer using alpha modulation
          ctx.globalAlpha = p.alpha * (0.8 + Math.sin(p.y * 0.05) * 0.2);
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#b8862b';
          ctx.fill();
        } else if (p.type === 'fiber' && p.length && p.angle !== undefined) {
          ctx.beginPath();
          const halfLen = p.length / 2;
          const x1 = p.x - Math.cos(p.angle) * halfLen;
          const y1 = p.y - Math.sin(p.angle) * halfLen;
          const x2 = p.x + Math.cos(p.angle) * halfLen;
          const y2 = p.y + Math.sin(p.angle) * halfLen;
          ctx.lineWidth = 0.6;
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(p.x + Math.sin(p.angle) * 2, p.y + Math.cos(p.angle) * 2, x2, y2);
          ctx.stroke();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
