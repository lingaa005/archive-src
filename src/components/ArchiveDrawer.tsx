/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectDossier } from '../data/projects';
import ManuscriptPage from './ManuscriptPage';
import WaxSeal from './WaxSeal';
import { X, ShieldAlert, KeyRound, ArrowRight, FolderClosed, BookOpen } from 'lucide-react';

interface ArchiveDrawerProps {
  dossier: ProjectDossier | null;
  onClose: () => void;
}

type DrawerStep = 'sliding_drawer' | 'unsealing_ledger' | 'unfolding_manuscript' | 'resolved';

export default function ArchiveDrawer({ dossier, onClose }: ArchiveDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('sliding_drawer');
  const [waxBroken, setWaxBroken] = useState(false);

  // Reset steps and unsealing triggers when a new dossier is opened
  useEffect(() => {
    if (dossier) {
      setStep('sliding_drawer');
      setWaxBroken(false);
      
      // Auto-progress sliding drawer stage to unsealing stage after 1200ms
      const timer = setTimeout(() => {
        setStep('unsealing_ledger');
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [dossier]);

  if (!dossier) return null;

  const handleBreakSeal = () => {
    setWaxBroken(true);
    // Break the wax seal, wait for splitting animation, then unfold the manuscript
    setTimeout(() => {
      setStep('unfolding_manuscript');
      
      // Complete the unfold sequence to let the user read
      setTimeout(() => {
        setStep('resolved');
      }, 1200);
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex flex-col justify-start items-center py-16 px-4 md:px-8">
        
        {/* Floating escape controls */}
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={onClose}
            className="group flex items-center gap-2 px-3 py-1.5 border border-red-900/40 bg-black text-[#eedda0] font-mono text-[10px] tracking-widest hover:bg-red-950 transition-colors uppercase rounded-sm cursor-pointer shadow-lg"
          >
            <span className="text-red-500 group-hover:rotate-90 transition-transform"><X className="w-4 h-4" /></span>
            CLOSE REPOSITORY // SEC_X_7
          </button>
        </div>

        <div className="w-full max-w-4xl relative flex flex-col items-center justify-start">

          {/* STEP 1: SLIDING DRAWER SEQUENCE */}
          {step === 'sliding_drawer' && (
            <motion.div 
              key="sliding-drawer"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#130f0a] border-4 border-[#623f14] p-8 text-center rounded shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9), 0 30px 60px rgba(0,0,0,0.9)',
                backgroundImage: 'radial-gradient(circle at center, #26190e 0%, #0c0805 100%)'
              }}
            >
              {/* Metallic Vault Details */}
              <div className="absolute top-2 left-2 right-2 h-1 border-t border-dashed border-[#b8862b]/30" />
              <div className="absolute bottom-2 left-2 right-2 h-1 border-b border-dashed border-[#b8862b]/30" />
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="mx-auto w-12 h-12 text-[#b8862b] mb-4 opacity-70"
              >
                <KeyRound className="w-full h-full" />
              </motion.div>

              <span className="font-mono text-[9px] tracking-[0.3em] font-black text-[#801010] uppercase block">
                VAULT LOCK ENGAGED
              </span>
              <h2 className="font-display font-bold text-lg text-white mt-2 tracking-widest uppercase">
                RETRIEVING RECORD DOSSIER_{dossier.dossierNo}
              </h2>
              
              {/* Simulated mechanical lock rods slide animation */}
              <div className="mt-8 relative h-10 w-full flex items-center justify-between">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '40%' }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-1 bg-gradient-to-r from-stone-700 via-[#eedda0] to-stone-800 rounded shadow-xl"
                />
                <FolderClosed className="w-5 h-5 text-stone-500 animate-pulse col-span-1" />
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '40%' }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-1 bg-gradient-to-l from-stone-700 via-[#eedda0] to-stone-800 rounded shadow-xl"
                />
              </div>

              <p className="font-serif text-[11px] text-gray-400 italic mt-6">
                "Retrieving mechanical dossier lock indices. Preparing parchment ledger parameters."
              </p>
            </motion.div>
          )}

          {/* STEP 2: BREAKING WAX SEAL STAGE */}
          {step === 'unsealing_ledger' && (
            <motion.div 
              key="unsealing-ledger"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#22140a] border-[4px] border-[#623f14] p-8 text-center rounded relative shadow-[0_30px_70px_rgba(0,0,0,0.9)]"
              style={{
                boxShadow: 'inset 0 0 35px rgba(0,0,0,0.8), 0 30px 60px rgba(0,0,0,0.8)',
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#b8862b] rounded-tl-sm opacity-60" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#b8862b] rounded-tr-sm opacity-60" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#b8862b] rounded-bl-sm opacity-60" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#b8862b] rounded-br-sm opacity-60" />

              <span className="font-mono text-[9px] tracking-[0.35em] text-[#b8862b] font-bold uppercase block mb-1">
                CLASSIFIED DOSSIER ENCLOSURE
              </span>
              <h3 className="font-display font-extrabold text-xl text-white tracking-widest uppercase mb-6">
                {dossier.title}
              </h3>

              {/* Central Wax stamp resting on horizontal band ribbon */}
              <div className="my-10 relative flex justify-center items-center">
                {/* Horizontal parchment ribbon */}
                <div className="absolute left-0 right-0 h-10 bg-[#ece2cb] border-y border-[#623f14]/20 shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-0" 
                     style={{ clipPath: 'polygon(0% 12%, 100% 0%, 100% 88%, 0% 100%)' }} />
                
                {/* Real-time Wax stamp */}
                <div className="z-10 relative">
                  <WaxSeal 
                    broken={waxBroken} 
                    onClick={handleBreakSeal} 
                    size="lg" 
                    text="KM REGISTER" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-red-950/40 border border-red-900/30 rounded text-left flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#801010] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-mono text-[10px] font-black text-red-400 uppercase tracking-widest">SECURITY VERIFICATION MANDATED</h5>
                    <p className="font-serif text-[11px] text-gray-300 italic mt-0.5">
                      "To unfold details, break the crimson seal. This action stamps a permanent verification log inside the timeline registry."
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleBreakSeal}
                  className="w-full py-3 bg-[#801010] text-[#eedda0] hover:bg-[#a11414] transition-colors font-mono text-xs uppercase font-extrabold tracking-[0.25em] flex items-center justify-center gap-2 cursor-pointer border border-[#eedda0]/20 rounded-sm shadow-md"
                >
                  BREAK WAX SEAL TO INSPECT <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: MANUSCRIPT UNFOLDING INTERMEDIARY */}
          {step === 'unfolding_manuscript' && (
            <motion.div 
              key="unfolding"
              className="text-center font-mono py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scaleY: [1, 1.4, 1],
                    rotateX: [0, 180, 360],
                  }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                  className="w-24 h-16 bg-[#fbf7eb] border-y-2 border-[#b8862b] relative"
                >
                  <div className="absolute top-1 left-2 text-[#801010] text-[6px]">UNROLLING...</div>
                </motion.div>
                <span className="text-[10px] uppercase font-black text-[#eedda0] tracking-[0.3em] block mt-8 animate-pulse">
                  UNFOLDING PRESERVED MANUSCRIPT...
                </span>
                <span className="text-[7.5px] uppercase font-bold text-gray-500 tracking-widest mt-1.5 block">
                  INTEGRATING BLUEPRINTS & LEDGERS
                </span>
              </div>
            </motion.div>
          )}

          {/* STEP 4: COMPLETED MANUSCRIPT STUDY */}
          {step === 'resolved' && (
            <motion.div 
              key="manuscript-reading"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="w-full relative py-4"
            >
              <ManuscriptPage dossier={dossier} />
            </motion.div>
          )}

        </div>

      </div>
    </AnimatePresence>
  );
}
