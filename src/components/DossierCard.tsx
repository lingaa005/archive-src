/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ProjectDossier } from '../data/projects';
import ArchiveStamp from './ArchiveStamp';

interface DossierCardProps {
  dossier: ProjectDossier;
  onOpen: (dossier: ProjectDossier) => void;
  key?: React.Key;
}

export default function DossierCard({ dossier, onOpen }: DossierCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      className="relative select-none w-full max-w-sm rounded p-6 shadow-[0_12px_30px_rgba(0,0,0,0.7)] transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)] group cursor-pointer border border-[#623f14]/20"
      style={{
        background: 'linear-gradient(135deg, #22140a 0%, #150d06 100%)', // organic leather backing
      }}
      onClick={() => onOpen(dossier)}
    >
      {/* Visual Brass Corners */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#b8862b] rounded-tl-sm opacity-80 group-hover:border-[#eedda0] transition-colors" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#b8862b] rounded-tr-sm opacity-80 group-hover:border-[#eedda0] transition-colors" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#b8862b] rounded-bl-sm opacity-80 group-hover:border-[#eedda0] transition-colors" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#b8862b] rounded-br-sm opacity-80 group-hover:border-[#eedda0] transition-colors" />

      {/* Decorative Leather stitching seams */}
      <div className="absolute inset-1.5 border border-dashed border-[#614022]/30 rounded pointer-events-none" />

      {/* physical Folder Tab rising out of the top left */}
      <div 
        className="absolute -top-6 left-4 h-6 px-3 bg-[#1d1108] border-t border-l border-r border-[#623f14]/40 text-[#eedda0] font-mono text-[8.5px] uppercase tracking-[0.2em] flex items-center shadow-lg transition-transform duration-300 group-hover:-translate-y-1 rounded-t-sm"
        style={{
          clipPath: 'polygon(0% 0%, 82% 0%, 100% 100%, 0% 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
      >
        DOSSIER // ARC_{dossier.dossierNo}
      </div>

      {/* Inside Paper Sheets (Parchment surfaces peeking from folder) */}
      <div className="relative mt-2 p-5 bg-parchment text-[#2c1f16] rounded-sm shadow-inner min-h-[220px] flex flex-col justify-between overflow-hidden">
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-45 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ece2cb 1px, transparent 1px), radial-gradient(#ece2cb 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 8px 8px',
          }}
        />

        {/* Vintage ink marks and stains (simulated via gradients) */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#ece2cb]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-[#b8862b]/5 rounded-full blur-xl pointer-events-none" />

        {/* Ink Stamps system */}
        <div className="absolute top-16 right-4 rotate-12 z-0 scale-90">
          <ArchiveStamp text={dossier.stamps[0] || "ARCHIVED"} color="crimson" rotation={15} opacity={0.07} />
        </div>

        {/* Metadata grid */}
        <div className="z-10 flex justify-between items-center border-b border-[#2c1f16]/10 pb-2 mb-3">
          <span className="font-mono text-[8px] bg-[#2c1f16] text-[#fbf7eb] px-1.5 py-0.5 tracking-wider font-extrabold uppercase">
            {dossier.classification}
          </span>
          <span className="font-mono text-[8.5px] text-[#623f14] tracking-widest uppercase font-bold">
            {dossier.date}
          </span>
        </div>

        {/* Headings */}
        <div className="z-10 mb-4 flex-grow">
          <span className="font-mono text-[7px] text-[#801010] font-black tracking-widest uppercase block mb-0.5">
            ENGINEERING MANUSCRIPT RECORD
          </span>
          <h4 className="font-display font-extrabold text-lg leading-tight tracking-[0.1em] text-[#2c1f16] group-hover:text-[#801010] transition-colors">
            {dossier.title}
          </h4>
          <p className="font-mono text-[8.5px] font-bold text-[#b8862b] uppercase tracking-wider mt-1 border-b border-[#2c1f16]/5 pb-2">
            {dossier.subtitle}
          </p>

          <p className="font-serif text-xs text-[#2c1f16]/90 line-clamp-4 leading-relaxed italic mt-3 bg-white/10 p-2 border-l-2 border-[#801010]/30">
            "{dossier.abstract}"
          </p>
        </div>

        {/* Bottom controls */}
        <div className="z-10 border-t border-dashed border-[#2c1f16]/20 pt-3 mt-auto flex justify-between items-center text-[10px] font-mono tracking-widest font-black uppercase">
          <span className="text-stone-500 text-[8px]">RVD // KM_NO.{(dossier.dossierNo)}7B</span>
          <span className="text-[#801010] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            OPEN REGISTER <span className="text-xs">✺</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
