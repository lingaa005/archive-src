/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface WaxSealProps {
  broken?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function WaxSeal({
  broken = false,
  onClick,
  size = 'md',
  text = "SIGILLUM",
  className = ""
}: WaxSealProps) {
  const sizeClasses = {
    sm: 'w-14 h-14 text-[8px]',
    md: 'w-20 h-20 text-[10px]',
    lg: 'w-28 h-28 text-[12px]'
  };

  return (
    <div 
      className={`relative cursor-pointer select-none filter drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)] ${className}`}
      onClick={onClick}
    >
      <motion.div
        animate={broken ? {
          scale: [1, 0.9, 0],
          opacity: 0,
          rotate: broken ? -15 : 0,
          x: -20,
          transition: { duration: 0.8, ease: "easeIn" }
        } : {
          scale: 1,
          opacity: 1
        }}
        whileHover={{ scale: broken ? 0 : 1.05, rotate: 3 }}
        className={`relative rounded-full font-mono flex items-center justify-center text-center font-bold tracking-widest text-[#eedda0] ${sizeClasses[size]}`}
        style={{
          background: 'radial-gradient(circle, #a11414 0%, #801010 60%, #4a0303 100%)',
          boxShadow: 'inset 0 4px 6px rgba(255,100,100,0.4), inset 0 -4px 8px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.4)',
          border: '3px solid #630505',
        }}
      >
        {/* Organic wax ripples */}
        <div 
          className="absolute inset-[4px] rounded-full opacity-40 mix-blend-overlay border border-[#ffffff] pointer-events-none"
          style={{ clipPath: 'polygon(10% 20%, 90% 15%, 85% 85%, 20% 90%)' }}
        />
        <div 
          className="absolute inset-[8px] rounded-full opacity-35 mix-blend-overlay border border-[#000000] pointer-events-none"
          style={{ clipPath: 'polygon(15% 10%, 80% 25%, 95% 80%, 5% 75%)' }}
        />

        {/* Inner Stamped Circle */}
        <div className="absolute inset-2.5 rounded-full border border-dashed border-[#b32b2b] flex flex-col items-center justify-center px-1 overflow-hidden">
          <span className="text-[6px] tracking-widest text-red-300 font-sans uppercase mb-0.5 select-none opacity-60">ARCHIVE</span>
          <span className="font-display font-black text-center text-[10px] sm:text-xs leading-none tracking-normal drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">KM</span>
          <span className="text-[5px] uppercase mt-0.5 scale-90 tracking-widest font-mono opacity-50">{text}</span>
        </div>

        {/* Wax Shimmer Highlight */}
        <div className="absolute top-1 left-2 w-1/3 h-1/4 bg-white opacity-20 rounded-full blur-[2px] transform -rotate-12 pointer-events-none" />
      </motion.div>

      {/* Cracked seal fragments if broken */}
      {broken && (
        <>
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ x: -60, y: -20, rotate: -35, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`absolute top-0 left-0 rounded-full ${sizeClasses[size]} pointer-events-none`}
            style={{
              background: 'radial-gradient(circle, #a11414 0%, #801010 70%, #4a0303 100%)',
              clipPath: 'polygon(0% 0%, 55% 0%, 35% 80%, 0% 100%)',
              boxShadow: 'inset 2px 2px 5px rgba(255,100,100,0.3)',
            }}
          />
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ x: 60, y: 30, rotate: 45, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`absolute top-0 left-0 rounded-full ${sizeClasses[size]} pointer-events-none`}
            style={{
              background: 'radial-gradient(circle, #a11414 0%, #801010 70%, #4a0303 100%)',
              clipPath: 'polygon(55% 0%, 100% 0%, 100% 100%, 35% 80%)',
              boxShadow: 'inset -2px -2px 5px rgba(255,100,100,0.2)',
            }}
          />
        </>
      )}
    </div>
  );
}
