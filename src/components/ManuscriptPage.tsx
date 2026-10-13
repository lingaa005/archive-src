/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProjectDossier } from '../data/projects';
import TechnologyLedger from './TechnologyLedger';
import BlueprintSection from './BlueprintSection';
import ArchiveStamp from './ArchiveStamp';
import WaxSeal from './WaxSeal';
import { Sparkles, Calendar, Award, FileSpreadsheet, Compass } from 'lucide-react';

interface ManuscriptPageProps {
  dossier: ProjectDossier;
}

export default function ManuscriptPage({ dossier }: ManuscriptPageProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto py-8 text-[#2c1f16] font-serif">
      {/* Decorative Satin Crimson Ribbons hanging behind the manuscript */}
      <div className="absolute top-0 left-12 w-3.5 h-full bg-[#801010] shadow-[1px_2px_4px_rgba(0,0,0,0.5)] z-0 origin-top opacity-90 hidden sm:block" 
           style={{ transform: 'skewY(-3deg)' }} />
      <div className="absolute top-0 right-16 w-1.5 h-[80%] bg-[#801010] shadow-[1px_1px_3px_rgba(0,0,0,0.4)] z-0 origin-top opacity-60 hidden sm:block" />

      {/* Main Manuscript Paper Sheet */}
      <div className="relative bg-parchment border-[6px] border-double border-[#623f14]/50 rounded-sm p-4 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-10 overflow-hidden">
        {/* Intricate Golden Corner Filigree elements */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#b8862b]/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#b8862b]/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#b8862b]/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#b8862b]/60 pointer-events-none" />

        {/* Paper texture and watermarks */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#2c1f16 1px, transparent 1px), radial-gradient(#2c1f16 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Big subtle watermark compass rose behind text */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full border border-[#b8862b]/5 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-[#b8862b]/5 border-dashed" />
        </div>

        {/* DOSSIER MANUSCRIPT COVER BANNER */}
        <div className="border-b border-[#2c1f16]/30 pb-6 mb-8 relative">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] font-extrabold uppercase text-[#801010] block mb-1">
                SYSTEM DESIGN DOSSIER // SEC_REG_{dossier.dossierNo}
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#2c1f16] tracking-[0.1em] uppercase">
                {dossier.title}
              </h1>
              <p className="font-sans text-xs font-black text-[#b8862b] uppercase tracking-widest mt-1">
                {dossier.subtitle}
              </p>
            </div>

            {/* Tactile Wax Seal and Ink stamp inside details */}
            <div className="flex items-center gap-4 sm:self-center">
              <WaxSeal broken={false} size="sm" text="LEDGER" className="scale-95" />
              <ArchiveStamp text={dossier.stamps[0] || "PRESERVED"} color="crimson" rotation={-5} size="sm" opacity={0.12} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-stone-600 border-t border-dashed border-[#2c1f16]/10 pt-3">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#801010]" /> RECORDING EPOCH: {dossier.date}</span>
            <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-[#b8862b]" /> CLASSIFICATION: {dossier.classification}</span>
            <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-stone-600 animate-spin-slow" /> HASH SEED: {dossier.id}_7B0X99</span>
          </div>
        </div>

        {/* TWO COLUMN CONTENT LAYOUT (Main story and Marginalia annotations) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Dossier Content Body */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* 1. MANUSCRIPT ABSTRACT */}
            <div className="relative p-5 bg-[#ece2cb]/40 border-l-4 border-[#801010] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#801010] font-black block mb-2">
                MANUSCRIPT ABSTRACT
              </span>
              <p className="font-serif text-sm sm:text-base leading-relaxed text-[#2c1f16] italic first-letter:text-3xl first-letter:font-black first-letter:text-[#801010] first-letter:float-left first-letter:mr-2.5 first-letter:font-display">
                {dossier.abstract}
              </p>
            </div>

            {/* 2. TECHNOLOGY LEDGER TABLE CONTAINER */}
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#623f14] font-black block mb-2">
                MATERIAL LOGISTICS & INTERFACING
              </span>
              <TechnologyLedger items={dossier.ledger} />
            </div>

            {/* 3. DETAILED ENGINEERING NARRATIVE SECTION */}
            <div className="space-y-6 pt-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#623f14] font-black block border-b border-[#2c1f16]/10 pb-1">
                ENGINEERING STORY & SYSTEM INTENT
              </span>
              
              {/* Intent */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#801010]">
                  SYSTEM PURPOSE & OBJECTIVE
                </h4>
                <p className="text-sm leading-relaxed text-[#2c1f16]/95">
                  {dossier.narrative.intent}
                </p>
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#801010]">
                  DESIGN ARCHITECTURE MOTIVATION
                </h4>
                <p className="text-sm leading-relaxed text-[#2c1f16]/95">
                  {dossier.narrative.designMotivation}
                </p>
              </div>

              {/* Significance */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#801010]">
                  SYSTEM SIGNIFICANCE & INTEGRITY
                </h4>
                <p className="text-sm leading-relaxed text-[#2c1f16]/95 border-l border-[#b8862b] pl-3 italic bg-white/20 py-2.5 rounded-r">
                  {dossier.narrative.significance}
                </p>
              </div>
            </div>

            {/* 4. SCHEMATIC INTEGRATOR */}
            <div className="pt-4">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#623f14] font-black block border-b border-[#2c1f16]/10 pb-1 mb-3">
                INTEGRATED blueprint SCHEMATICS
              </span>
              <BlueprintSection blueprint={dossier.blueprint} />
            </div>

          </div>

          {/* Marginalia Sidebar Annotations Column (Classified notes on the side) */}
          <div className="lg:col-span-1 space-y-6 border-t lg:border-t-0 lg:border-l border-dashed border-[#2c1f16]/20 pt-6 lg:pt-0 lg:pl-6">
            <div className="sticky top-4 space-y-6">
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#801010] font-black border-b-2 border-double border-[#801010] pb-1">
                SYSTEM STATUS OBSERVATIONS
              </div>

              {/* Key Capabilities mapped as historical margin records */}
              {dossier.capabilities.map((cap, capIdx) => (
                <div key={capIdx} className="bg-white/30 p-3 rounded-sm border border-[#623f14]/10 shadow-sm relative">
                  <span className="absolute top-2 right-2 font-mono text-[7px] text-[#b8862b] font-bold">
                    [#{cap.tag}]
                  </span>
                  <br/>
                  <span className="font-mono text-[7.5px] uppercase font-black text-gray-500 block mb-1">
                    ANNOTATION // {String(capIdx + 1).padStart(2, '0')}
                  </span>

                  <h5 className="font-display font-extrabold text-[10px] sm:text-xs text-[#2c1f16] tracking-wide uppercase leading-tight mb-1.5">
                    {cap.title}
                  </h5>
                  <p className="font-serif text-[11px] leading-relaxed italic text-stone-700">
                    "{cap.observation}"
                  </p>
                </div>
              ))}

              {/* Archival stamps & cert indicator */}
              <div className="pt-4 flex flex-col items-center gap-3 border-t border-[#2c1f16]/10">
                <ArchiveStamp text={dossier.stamps[1] || "VERIFIED"} color="sepia" rotation={-8} size="sm" opacity={0.15} />
                <ArchiveStamp text="SOVEREIGN RECORD" color="emerald" rotation={4} size="sm" opacity={0.12} />
                <div className="text-center font-mono text-[7.5px] text-gray-400 mt-2">
                  LEDGER ID: REG_0x00{(dossier.dossierNo)}A
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Manuscript Footer Signature Block */}
        <div className="border-t-4 border-double border-[#2c1f16]/30 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center bg-[#fbf7eb] px-4 py-3 rounded-b-sm">
          <div className="font-mono text-[9px] text-stone-500 text-center sm:text-left mb-3 sm:mb-0">
            <span className="font-sans text-[10px] font-black text-[#801010] block uppercase mb-0.5">SOVEREIGN VAULT REGISTERED DATA</span>
            AUTHENTICATION DIGEST: <strong className="font-extrabold text-[#2c1f16]">KM_MD5_7B0FA8{(dossier.dossierNo)}90A</strong>
          </div>
          <div className="text-center sm:text-right font-serif text-[#2c1f16]/80 text-xs">
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8862b] block">CURATOR SIGN-STAMP</span>
            <span className="font-bold underline italic text-sm">K. Maruthamuthu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
