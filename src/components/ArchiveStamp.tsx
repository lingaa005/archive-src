/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ArchiveStampProps {
  text: string;
  rotation?: number; // degrees
  color?: 'crimson' | 'sepia' | 'emerald' | 'blue';
  opacity?: number;  // override, default 5-10% (0.05 to 0.1)
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ArchiveStamp({
  text,
  rotation = -8,
  color = 'crimson',
  opacity = 0.08,
  className = "",
  size = 'md'
}: ArchiveStampProps) {
  const colorMap = {
    crimson: 'border-red-900 text-red-900',
    sepia: 'border-[#623f14] text-[#623f14]',
    emerald: 'border-emerald-900 text-emerald-900',
    blue: 'border-blue-900 text-blue-900'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[9px] border',
    md: 'px-4 py-1.5 text-xs tracking-[0.25em] border-2',
    lg: 'px-6 py-2.5 text-sm tracking-[0.3em] border-3'
  };

  return (
    <div 
      className={`font-mono font-bold select-none text-center inline-block pointer-events-none ${colorMap[color]} ${sizeClasses[size]} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity: opacity,
        borderRadius: '3px',
        borderStyle: 'double',
        boxShadow: 'inset 0 0 2px rgba(100,0,0,0.2)',
        clipPath: 'polygon(0% 0%, 98% 2%, 100% 95%, 2% 100%, 0% 50%)', // rough hand-cut edge
        textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)',
        backgroundImage: 'radial-gradient(ellipse at center, transparent 30%, currentColor 150%)',
      }}
    >
      <div className="flex flex-col items-center">
        <span className="text-[6px] tracking-widest uppercase opacity-75 mb-0.5">STATE RECORD</span>
        <span className="font-bold uppercase whitespace-nowrap">{text}</span>
      </div>
    </div>
  );
}
