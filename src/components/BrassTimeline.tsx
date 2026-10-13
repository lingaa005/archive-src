/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ProjectDossier } from '../data/projects';
import ArchiveStamp from './ArchiveStamp';

interface BrassTimelineProps {
  dossiers: ProjectDossier[];
  onSelectDossier: (dossier: ProjectDossier) => void;
}

export default function BrassTimeline({ dossiers, onSelectDossier }: BrassTimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use natural window scroll monitoring to light up the spine
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far down the timeline container is in the viewport
      const totalDist = rect.height;
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (totalDist + viewportHeight * 0.4)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial trigger
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* Decorative timeline subtitle block */}
      <div className="text-center mb-16 select-none font-mono">
        <div className="inline-block px-3 py-1 border border-[#b8862b]/20 bg-[#2c1f16]/30 text-[#eedda0] text-[9px] uppercase tracking-[0.35em]">
          CHRONOLOGICAL SPINE REGISTER
        </div>
        <h3 className="font-display text-lg mt-3 text-white tracking-[0.2em] uppercase font-bold">
          THE BRASS SPINE
        </h3>
        <p className="font-serif text-xs text-gray-400 italic max-w-md mx-auto mt-2">
          "A continuous forged rod of historic accomplishments, rivets bound forever in structural integrity."
        </p>
      </div>

      <div className="relative min-h-[600px] flex flex-col items-center">
        {/* The Central BRASS ROD */}
        <div 
          className="absolute h-full w-2 top-0 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #150f09 0%, #3a2512 15%, #2a1b0d 85%, #150f09 100%)',
            boxShadow: 'inset -2px 0 3px rgba(0,0,0,0.8), inset 1px 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.5)'
          }}
        />

        {/* Illuminated Spine Tracker moving down the spine on scroll */}
        <div 
          className="absolute w-2 rounded-full transition-all duration-300 pointer-events-none"
          style={{
            height: '140px',
            top: `${scrollProgress * 90}%`,
            background: 'linear-gradient(to bottom, rgba(238,221,160,0) 0%, rgba(238,221,160,0.9) 50%, rgba(184,134,43,0) 100%)',
            boxShadow: '0 0 15px #eedda0, 0 0 30px #b8862b',
            mixBlendMode: 'screen',
            opacity: 0.85
          }}
        />

        {/* Dynamic Milestones alternating sides */}
        <div className="relative w-full space-y-24">
          {dossiers.map((dossier, idx) => {
            const isLeft = idx % 2 === 0;
            // check closeness to active light
            const rivetProgress = (idx + 0.5) / dossiers.length;
            const isActive = Math.abs(scrollProgress - rivetProgress) < 0.25;

            return (
              <div 
                key={dossier.id} 
                className="relative flex flex-col md:flex-row items-center justify-center w-full"
              >
                {/* Visual Rivet on the Brass Spine */}
                <div 
                  className="absolute z-10 w-6 h-6 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 border border-black"
                  style={{
                    background: isActive 
                      ? 'radial-gradient(circle, #ffeeb3 0%, #b8862b 55%, #1d1206 100%)' 
                      : 'radial-gradient(circle, #93681b 0%, #52370c 60%, #150e04 100%)',
                    boxShadow: isActive 
                      ? '0 0 12px #eedda0, inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.7)' 
                      : 'inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.8)',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                  onClick={() => onSelectDossier(dossier)}
                >
                  {/* Miniature center pin hole */}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#181109] border border-stone-800" />
                </div>

                {/* Left Side Content Container */}
                <div className={`w-full md:w-1/2 flex px-4 md:px-8 ${isLeft ? 'justify-end order-1' : 'justify-start order-2 md:order-1 opacity-0 pointer-events-none hidden md:block'}`}>
                  {isLeft && (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-5 w-full max-w-sm bg-parchment border-2 border-[#b8862b]/30 shadow-2xl rounded cursor-pointer relative font-serif text-[#2c1f16] hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all duration-300 group"
                      onClick={() => onSelectDossier(dossier)}
                    >
                      {/* Ribbon indicator tag */}
                      <div className="absolute top-0 right-4 w-7 h-10 bg-[#801010] shadow pointer-events-none flex flex-col items-center pt-1" 
                           style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)' }}>
                        <span className="font-mono text-[6px] tracking-tighter text-[#eedda0] font-black">{dossier.dossierNo}</span>
                      </div>

                      <div className="font-mono text-[8px] tracking-widest text-[#801010] font-black border-b border-[#2c1f16]/10 pb-1.5 mb-2 flex items-center justify-between">
                        <span>DOSSIER RECORD STATE</span>
                        <span className="opacity-70">{dossier.date.toUpperCase()}</span>
                      </div>
                      
                      <h4 className="font-display font-black text-sm tracking-widest text-[#2c1f16] group-hover:text-[#801010] transition-colors duration-200">
                        {dossier.title}
                      </h4>
                      <p className="font-sans text-[10px] text-[#b8862b] tracking-wider uppercase font-bold mt-1 leading-none">
                        {dossier.subtitle}
                      </p>
                      
                      <p className="text-xs text-gray-700 mt-2 line-clamp-2 leading-relaxed italic border-t border-[#2c1f16]/5 pt-2">
                        "{dossier.abstract}"
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#2c1f16]/20 pt-2 font-mono text-[8px] uppercase tracking-wide">
                        <span className="text-gray-500">SIGN: KM_{dossier.dossierNo}7B</span>
                        <span className="text-[#801010] font-bold group-hover:underline">OPEN DOSSIER ✺</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Side Content Container */}
                <div className={`w-full md:w-1/2 flex px-4 md:px-8 ${!isLeft ? 'justify-start order-2 md:order-2' : 'justify-end order-1 md:order-2 md:opacity-0 md:pointer-events-none md:hidden'}`}>
                  {!isLeft && (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-5 w-full max-w-sm bg-parchment border-2 border-[#b8862b]/30 shadow-2xl rounded cursor-pointer relative font-serif text-[#2c1f16] hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all duration-300 group"
                      onClick={() => onSelectDossier(dossier)}
                    >
                      {/* Ribbon indicator tag */}
                      <div className="absolute top-0 right-4 w-7 h-10 bg-[#801010] shadow pointer-events-none flex flex-col items-center pt-1" 
                           style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)' }}>
                        <span className="font-mono text-[6px] tracking-tighter text-[#eedda0] font-black">{dossier.dossierNo}</span>
                      </div>

                      <div className="font-mono text-[8px] tracking-widest text-[#801010] font-black border-b border-[#2c1f16]/10 pb-1.5 mb-2 flex items-center justify-between">
                        <span>DOSSIER RECORD STATE</span>
                        <span className="opacity-70">{dossier.date.toUpperCase()}</span>
                      </div>
                      
                      <h4 className="font-display font-black text-sm tracking-widest text-[#2c1f16] group-hover:text-[#801010] transition-colors duration-200">
                        {dossier.title}
                      </h4>
                      <p className="font-sans text-[10px] text-[#b8862b] tracking-wider uppercase font-bold mt-1 leading-none">
                        {dossier.subtitle}
                      </p>
                      
                      <p className="text-xs text-gray-700 mt-2 line-clamp-2 leading-relaxed italic border-t border-[#2c1f16]/5 pt-2">
                        "{dossier.abstract}"
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#2c1f16]/20 pt-2 font-mono text-[8px] uppercase tracking-wide">
                        <span className="text-gray-500">SIGN: KM_{dossier.dossierNo}7B</span>
                        <span className="text-[#801010] font-bold group-hover:underline">OPEN DOSSIER ✺</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
