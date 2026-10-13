/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectDossiers, ProjectDossier } from './data/projects';
import AtmosphericCanvas from './components/AtmosphericCanvas';
import WaxSeal from './components/WaxSeal';
import ArchiveStamp from './components/ArchiveStamp';
import DossierCard from './components/DossierCard';
import ArchiveDrawer from './components/ArchiveDrawer';
import BrassTimeline from './components/BrassTimeline';
import TechnologyLedger from './components/TechnologyLedger';
import BlueprintSection from './components/BlueprintSection';
import { 
  FolderClosed, 
  BookOpen, 
  FileSpreadsheet, 
  History, 
  Layers, 
  Award,
  ExternalLink, 
  ShieldAlert, 
  Terminal,
  FileText,
  Bookmark,
  Users,
  Compass
} from 'lucide-react';

type TabID = 'LOBBY' | 'DOSSIERS' | 'BLUEPRINTS' | 'TIMELINE' | 'LEDGER_INDEX';

export default function App() {
  // Cinematic Envelope Portal state
  const [accessApproved, setAccessApproved] = useState(false);
  const [sealActive, setSealActive] = useState(true);
  const [stampRevealed, setStampRevealed] = useState(false);
  const [envelopeUnfolded, setEnvelopeUnfolded] = useState(false);

  // Archive System state
  const [activeTab, setActiveTab] = useState<TabID>('LOBBY');
  const [selectedDossier, setSelectedDossier] = useState<ProjectDossier | null>(null);
  
  // Search query state for the Ledger index
  const [ledgerSearch, setLedgerSearch] = useState('');

  // Handle Breaking Wax Seal on Entry Envelope
  const handleBreakLandingSeal = () => {
    setSealActive(false);
    setTimeout(() => {
      setStampRevealed(true);
      setEnvelopeUnfolded(true);
    }, 700);
  };

  const handleEnterArchive = () => {
    setAccessApproved(true);
  };

  // Aggregated material ledger items for the searchable Index
  const allLedgerItems = projectDossiers.flatMap(dossier => 
    dossier.ledger.map(item => ({
      ...item,
      projectTitle: dossier.title,
      projectId: dossier.id,
      projectNo: dossier.dossierNo,
      projectRef: dossier
    }))
  ).filter(item => 
    item.component.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
    item.application.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
    item.projectTitle.toLowerCase().includes(ledgerSearch.toLowerCase())
  );

  return (
    <div className="relative min-h-screen text-stone-200 overflow-x-hidden font-serif bg-ebony selection:bg-crimson-ribbon selection:text-parchment">
      
      {/* Immersive Background Simulations */}
      <AtmosphericCanvas />

      <AnimatePresence>
        {/* CINEMATIC LANDING PORTAL: EXTREMELY HIGH DETAIL */}
        {!accessApproved && (
          <motion.div 
            key="portal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
            style={{
              background: 'radial-gradient(circle, #1a120b 0%, #080503 100%)', // Wood desktop shadow
              boxShadow: 'inset 0 0 100px rgba(0,0,0,1)'
            }}
          >
            {/* Wooden grain ambient texture mask */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 10px)'
              }}
            />

            <div className="w-full max-w-2xl relative py-12 flex flex-col items-center">
              {/* Envelope Container */}
              <motion.div 
                whileHover={!envelopeUnfolded ? { y: -8, scale: 1.01 } : {}}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="relative w-full max-w-xl bg-parchment text-stone-900 border-4 border-double border-[#623f14]/50 rounded shadow-[0_30px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 select-none overflow-hidden"
              >
                {/* Envelope fold diagonal overlay if not unfolded */}
                {!envelopeUnfolded && (
                  <div 
                    className="absolute top-0 inset-x-0 h-[60%] bg-[#f3edd9] border-b-2 border-dashed border-[#623f14]/20 z-10 opacity-70 pointer-events-none"
                    style={{ clipPath: 'polygon(0% 0%, 50% 85%, 100% 0%)' }}
                  />
                )}

                {/* Left/Right envelope triangular flaps */}
                {!envelopeUnfolded && (
                  <>
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-[#ece2cb]/40 z-10 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                    <div className="absolute inset-y-0 right-0 w-1/3 bg-[#ece2cb]/40 z-10 pointer-events-none" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                  </>
                )}

                {/* SENSORY DESK LIGHT FLASHLIGHT */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#eedda0]/20 rounded-full blur-3xl pointer-events-none" />

                {/* INNK SEAL FLAG */}
                <div className="flex flex-col items-center justify-between min-h-[300px] relative z-20">
                  <div className="text-center w-full px-2">
                    <span className="font-mono text-[9px] bg-[#623f14]/10 text-[#801010] font-black border border-[#801010]/30 px-3 py-0.5 uppercase tracking-[0.3em]">
                      SOVEREIGN OFFICE OF ORIGIN
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#2c1f16] mt-4 tracking-wide leading-snug uppercase">
                      Welcome to Project Archive of <span className="text-[#801010] block sm:inline">Kasilingam Maruthamuthu</span>
                    </h3>
                  </div>

                  {/* Envelope wax seal triggers fold when broken */}
                  <div className="my-5 relative flex justify-center items-center h-24 w-full">
                    <WaxSeal 
                      broken={!sealActive} 
                      onClick={handleBreakLandingSeal} 
                      size="lg" 
                      text="BREAK TO UNSEAL" 
                      className="z-30"
                    />

                    {stampRevealed && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.7, rotate: -25 }}
                        animate={{ opacity: 1, scale: 1, rotate: -15 }}
                        transition={{ type: 'spring', damping: 10 }}
                        className="absolute right-6 rotate-[-15deg] z-20"
                      >
                        <ArchiveStamp text="ACCESS_GRANTED" color="emerald" rotation={-14} size="sm" opacity={0.6} />
                      </motion.div>
                    )}
                  </div>

                  <AnimatePresence>
                    {/* Access manuscript emerging from envelope once seal broken */}
                    {!envelopeUnfolded ? (
                      <div className="text-center space-y-1 mt-2">
                        <span className="font-display font-black text-xl sm:text-2xl text-[#801010] animate-pulse uppercase tracking-[0.2em] block">
                          BREAK THE SEAL
                        </span>
                        <p className="font-mono italic text-[9.5px] text-stone-600 max-w-sm mx-auto leading-relaxed uppercase tracking-wider">
                          Click or tap the crimson wax seal above to open
                        </p>
                      </div>
                    ) : (
                      <motion.div
                        key="letter-emerged"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full text-center space-y-4 pt-2 border-t border-[#623f14]/20"
                      >
                        <div className="bg-[#ece2cb]/40 p-4 border-l-4 border-[#801010] text-left">
                          <span className="font-mono text-[8px] font-black tracking-widest text-[#801010] uppercase">
                            ARCHIVE ACCESS NOTICE
                          </span>
                          <p className="font-serif text-xs leading-relaxed text-[#2c1f16] italic mt-1.5">
                            "This sovereign directory contains certified blueprints, preserved engineering calculations, matrix ledgers, and tactical chronologies. By proceeding, you register your index trace under the curator certification."
                          </p>
                        </div>

                        <div className="flex flex-col items-center pt-2">
                          <button 
                            onClick={handleEnterArchive}
                            className="px-8 py-3 bg-[#801010] hover:bg-[#a11414] text-[#eedda0] font-mono text-xs uppercase font-extrabold tracking-[0.3em] transition-colors border border-[#eedda0]/30 rounded-sm shadow-lg hover:shadow-2xl cursor-pointer"
                          >
                            ENTER THE ARCHIVE
                          </button>
                          <span className="font-mono text-[7px] text- पत्थर-500 text-stone-500 uppercase tracking-widest mt-2 block">
                            MANDATE ID // KM_SOVEREIGN_REG_994A
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE Vault Interface (Lobby room) */}
      {accessApproved && (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
          
          {/* SECURED VAULT HERO LOGO & TITLE */}
          <header className="relative py-8 border-b-2 border-double border-[#b8862b]/30 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 select-none animate-fade-in">
            {/* Compass overlay behind title */}
            <div className="absolute top-0 left-0 w-24 h-24 opacity-10 pointer-events-none">
              <Compass className="w-full h-full text-[#b8862b] animate-spin-slow" />
            </div>

            <div className="z-10">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.45em] font-extrabold text-[#eedda0] uppercase block">
                ENGINEERING PORTFOLIO & REPOSITORY OF
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-[0.05em] uppercase mt-3 hover:text-[#eedda0] transition-colors duration-300">
                KASILINGAM MARUTHAMUTHU
              </h1>
              <p className="font-serif text-sm text-gray-400 italic mt-2">
                Systems & Software Engineer • Cybersecurity Enthusiast • Backend & DevOps Architect
              </p>
            </div>

            {/* Curator profile status card */}
            <div className="z-10 bg-black/60 border border-[#b8862b]/20 p-4 rounded-sm flex items-center gap-3 backdrop-blur max-w-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="font-mono leading-none">
                <span className="text-[7.5px] uppercase text-stone-500 block">ARCHIVAL STATUS</span>
                <span className="text-xs font-bold text-emerald-400 block mt-0.5 uppercase tracking-wide">
                  ONLINE SECURE
                </span>
                <span className="text-[8.5px] text-stone-400 block mt-1 uppercase tracking-tight">
                  Tiruvannamalai, Tamil Nadu
                </span>
                <a 
                  href="https://lingaa005.github.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-[8.5px] text-[#eedda0] hover:text-[#eedda0]/80 hover:underline mt-1.5 flex items-center gap-1 uppercase tracking-wider"
                >
                  PORTFOLIO ACCESS <ExternalLink className="w-3 h-3 text-[8px]" />
                </a>
              </div>
            </div>
          </header>

          {/* TAB ARCHIVE FILING FOLDER NAVIGATION BAR */}
          <nav className="flex flex-wrap items-end gap-x-1 sm:gap-x-2 gap-y-1 mb-8 border-b border-[#b8862b]/20 select-none z-20 relative">
            {(['LOBBY', 'DOSSIERS', 'BLUEPRINTS', 'TIMELINE', 'LEDGER_INDEX'] as TabID[]).map((tab) => {
              const isActive = activeTab === tab;
              const names: Record<TabID, string> = {
                LOBBY: 'SUMMARY OVERVIEW',
                DOSSIERS: 'PROJECT DOSSIERS',
                BLUEPRINTS: 'SYSTEM BLUEPRINTS',
                TIMELINE: 'SPINE CHRONOLOGY',
                LEDGER_INDEX: 'TECHNOLOGY LEDGER'
              };

              const icons: Record<TabID, any> = {
                LOBBY: BookOpen,
                DOSSIERS: FolderClosed,
                BLUEPRINTS: Layers,
                TIMELINE: History,
                LEDGER_INDEX: FileSpreadsheet
              };

              const TabIcon = icons[tab];

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 py-2.5 sm:py-3.5 font-mono text-[9px] sm:text-[10.5px] tracking-widest font-extrabold uppercase transition-all rounded-t-md cursor-pointer border-t border-l border-r ${
                    isActive
                      ? 'bg-parchment text-[#2c1f16] border-[#eedda0] z-10 translate-y-[1px] shadow-lg font-black'
                      : 'bg-[#17130f] hover:bg-[#251e18] text-gray-400 border-transparent hover:text-[#eedda0]'
                  }`}
                  style={{
                    clipPath: 'polygon(0% 12%, 91% 12%, 100% 100%, 0% 100%)',
                  }}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-[#801010]' : 'text-gray-500'}`} />
                  {names[tab]}
                </button>
              );
            })}
          </nav>

          {/* MAIN PAGE SECTIONS INTERPOLATED BY VIEW STATE */}
          <main className="min-h-[50vh] pb-16">
            
            {/* VIEW 1: VAULT OVERVIEW LOBBY */}
            {activeTab === 'LOBBY' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                {/* Lobby welcome banner */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left big bulletin parchment */}
                  <div className="lg:col-span-2 bg-[#fbf7eb] text-[#2c1f16] border-[5px] border-double border-[#623f14]/50 rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8 animate-fade-in">
                    {/* Overlay stamp watermark */}
                    <div className="absolute top-12 right-12 scale-110 select-none pointer-events-none opacity-[0.05] rotate-12">
                      <Compass className="w-62 h-62 text-[#801010]" />
                    </div>

                    <div>
                      <span className="font-mono text-[9px] tracking-widest font-black text-[#801010] uppercase block">
                        SOVEREIGN ENGINEERING LEDGER & REPOSITORY
                      </span>
                      <h2 className="font-display font-black text-2xl tracking-wide uppercase text-[#2c1f16] mt-2 mb-4 border-b border-[#2c1f16]/10 pb-3">
                        CERTIFIED REPOSITORY GUIDE
                      </h2>
                    </div>

                    {/* Section 1: Overview of the Archive */}
                    <div className="space-y-3 font-serif text-sm">
                      <h3 className="font-mono text-[10px] font-black text-[#801010] tracking-widest uppercase">
                        I. THE ARCHIVAL MISSION
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed text-[#2c1f16] italic pl-4 border-l-2 border-[#801010]/65 bg-[#ece2cb]/20 py-2.5 rounded-r">
                        "Welcome to the central project repository. This vault serves as a certified digital archive preserving functional system blueprints, software invariant logs, and cryptographic execution flows. Every item detailed inside this vault represents a physical or logical design deployed to ensure structural stability and reliable technical execution."
                      </p>
                      <p className="leading-relaxed pt-2">
                        Unlike ephemeral portals or basic galleries, this sovereign ledger represents systems with exact data paths, low-level mechanics (ranging from raw C/Rust wiping engines to active EVM Solidity contracts), and containerized pipelines. These records are designed to provide complete structural transparency to any accredited observer.
                      </p>
                    </div>

                    {/* Section 2: Core Engineering Domains */}
                    <div className="space-y-3 font-serif">
                      <h3 className="font-mono text-[10px] font-black text-[#801010] tracking-widest uppercase">
                        II. ACTIVE RESEARCH SECTORS
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                        <div className="bg-[#ece2cb]/40 border border-[#623f14]/15 p-4 rounded-sm space-y-2">
                          <span className="font-mono font-extrabold text-[#801010] block uppercase tracking-wider">
                            A. DECENTRALIZED BLUEPRINTS & CRYPTO
                          </span>
                          <p className="leading-relaxed text-[#2c1f16]/90">
                            Immutable database schemas, commit-reveal consensus systems, Ethereum Solidity smart contracts, and simulated physical thermodynamic quantum ciphers used to harden symmetric keys.
                          </p>
                        </div>
                        <div className="bg-[#ece2cb]/40 border border-[#623f14]/15 p-4 rounded-sm space-y-2">
                          <span className="font-mono font-extrabold text-[#801010] block uppercase tracking-wider">
                            B. SYSTEM UTILITIES, AUTOMATION & INTERFACES
                          </span>
                          <p className="leading-relaxed text-[#2c1f16]/90">
                            Microsecond low-level data erasure binaries in C/Rust, real-time telemetry dashboards, localized Gemma inference loops, and container orchestration engines with Jenkins/Docker bindings.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Navigation Protocol */}
                    <div className="space-y-3 font-serif text-sm">
                      <h3 className="font-mono text-[10px] font-black text-[#801010] tracking-widest uppercase">
                        III. REPOSITORY NAVIGATIONAL DIRECTIONS
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-[#2c1f16]/90 bg-white/20 p-4 border border-[#623f14]/15 rounded-sm">
                        <li>
                          <strong>Project Dossiers Tab</strong>: Access leather-bound historical folders containing in-depth architectural narratives, observation logs, and verified capability badges.
                        </li>
                        <li>
                          <strong>System Blueprints Tab</strong>: Render live, interactive vector flow diagrams showing exact low-level data paths, telemetry loops, and inter-service connection lines.
                        </li>
                        <li>
                          <strong>Timeline and Chronology Tab</strong>: View the sequential timeline of engineering projects, showing a continuous development process over various epochs.
                        </li>
                        <li>
                          <strong>Technology Ledger Tab</strong>: Query the comprehensive inventory of software architectures, backend frameworks, and specialized microservices in use.
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-dashed border-[#2c1f16]/20 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#2c1f16]/60">
                      <span>STATUS: RECORD CERTIFIED</span>
                      <span>MEMBER_REGIST // KM_94</span>
                    </div>
                  </div>

                  {/* Right side Index quick statistics ledger */}
                  <div className="lg:col-span-1 bg-[#15110d] border border-[#b8862b]/30 rounded p-6 shadow-2xl flex flex-col justify-between font-mono">
                    <div className="space-y-6">
                      <div className="border-b border-[#b8862b]/20 pb-2 mb-4">
                        <span className="text-[8px] text-stone-500 uppercase block tracking-wider">LEDGER INVENTORY</span>
                        <h4 className="text-sm font-bold text-[#eedda0] uppercase tracking-widest">RECORD INDEX SUMMARY</h4>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-[#eedda0]/10 text-xs text-gray-300">
                          <span className="flex items-center gap-2"><FolderClosed className="w-4 h-4 text-[#801010]" /> PRESERVED DOSSIERS</span>
                          <strong className="text-white">{String(projectDossiers.length).padStart(2, '0')} UNITS</strong>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[#eedda0]/10 text-xs text-gray-300">
                          <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#eedda0]" /> SCHEMATIC BLUEPRINTS</span>
                          <strong className="text-white">{String(projectDossiers.filter(d => d.blueprint).length).padStart(2, '0')} SCHEMES</strong>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[#eedda0]/10 text-xs text-gray-300">
                          <span className="flex items-center gap-2"><FileSpreadsheet className="w-4 h-4 text-emerald-500" /> UNIQUE COMPONENTS</span>
                          <strong className="text-white">{projectDossiers.reduce((acc, d) => acc + d.ledger.length, 0)} ELEMENTS</strong>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[#eedda0]/10 text-xs text-gray-300">
                          <span className="flex items-center gap-2"><History className="w-4 h-4 text-stone-500" /> CHRONOLOGY YEARS</span>
                          <strong className="text-white">2024 - 2026</strong>
                        </div>
                      </div>

                      <div className="p-3 bg-red-950/20 border border-[#801010]/30 rounded text-[10px] text-stone-400">
                        <span className="font-bold text-red-400 uppercase tracking-widest block mb-1">CURATOR’S MANDATE:</span>
                        "Code is not mere utility; it is mathematical architecture designed to persevere."
                      </div>
                    </div>

                    <div className="mt-8 border-t border-[#eedda0]/10 pt-4 flex justify-between items-center text-[10px] text-[#eedda0]/75">
                      <span>SEC_CLASS // CLEAR</span>
                      <span>KM_VERIFIED ✓</span>
                    </div>
                  </div>

                </div>

                {/* ARCHIVE COMPROMISES - SHORT GRID ROW */}
                <div>
                  <div className="border-b border-[#b8862b]/20 pb-2 mb-6 flex justify-between items-end">
                    <div>
                      <span className="font-mono text-[9px] text-[#eedda0] uppercase block tracking-wider">FEATURED RECORD ARCHIVES</span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-widest uppercase">ENGINEERING PROJECTS</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('DOSSIERS')} 
                      className="font-mono text-[9px] text-[#801010] hover:text-red-400 uppercase font-black tracking-widest cursor-pointer hover:underline"
                    >
                      BROWSE ALL DIRECTS ✺
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
                    {projectDossiers.slice(0, 4).map((dossier) => (
                      <DossierCard 
                        key={dossier.id} 
                        dossier={dossier} 
                        onOpen={setSelectedDossier} 
                      />
                    ))}
                  </div>
                </div>

                {/* CREATIVE PHILOSOPHY / TIMELINE SHORT ENTRY */}
                <div className="bg-[#100c08] border border-[#b8862b]/15 p-8 rounded text-center select-none shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-12 w-1 h-full bg-gradient-to-b from-[#b8862b]/20 to-transparent pointer-events-none" />
                  <span className="font-mono text-[8px] tracking-[0.3em] text-[#801010] font-black uppercase">CHRONOLOGICAL ROADMAP</span>
                  <h3 className="font-display font-medium text-lg text-[#eedda0] tracking-[0.15em] uppercase mt-1">THE ENGINEERING TIMELINE</h3>
                  <p className="font-serif text-xs text-gray-400 italic max-w-xl mx-auto mt-2 leading-relaxed">
                    Trace the timeline of projects, academic achievements, and professional experiences chronologically, demonstrating the evolution of engineering skills over time.
                  </p>
                  <button 
                    onClick={() => setActiveTab('TIMELINE')}
                    className="mt-5 px-6 py-2 border border-[#b8862b]/30 hover:border-[#eedda0] bg-[#2c1f16]/30 text-xs font-mono text-[#eedda0] uppercase tracking-widest cursor-pointer hover:bg-black/80 transition-colors rounded-sm"
                  >
                    EXPOSE SPINE TIMELINE
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: COMPLETE SYSTEM DOSSIERS */}
            {activeTab === 'DOSSIERS' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto mb-12 select-none font-mono">
                  <span className="text-[9px] bg-[#623f14]/30 text-[#eedda0] px-3 py-1 border border-[#b8862b]/10 uppercase tracking-[0.3em]">
                    DOSSIER RECORD STATION
                  </span>
                  <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-[0.06em] mt-3 uppercase">
                    ENGINEERING PROJECTS
                  </h2>
                  <p className="font-serif text-xs text-stone-400 italic mt-2 leading-relaxed">
                    "Select any portfolio folder to unpack certified design parameters, technical capabilities, and interactive operational blueprints."
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 justify-items-center pt-6">
                  {projectDossiers.map((dossier) => (
                    <DossierCard 
                      key={dossier.id} 
                      dossier={dossier} 
                      onOpen={setSelectedDossier} 
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* VIEW 3: ARCHITECTURE BLUEPRINTS ROOM */}
            {activeTab === 'BLUEPRINTS' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <div className="text-center max-w-xl mx-auto mb-8 select-none font-mono">
                  <span className="text-[8px] bg-[#2a1d12] text-[#eedda0] border border-[#623f14] px-3 py-1 uppercase tracking-[0.3em]">
                    SCHEMATIC PARCHMENT CHAMBER
                  </span>
                  <h2 className="font-display font-bold text-xl text-white tracking-[0.15em] mt-3 uppercase">
                    SYSTEM STRUCTURE BLUEPRINTS
                  </h2>
                  <p className="font-serif text-xs text-stone-400 italic mt-1 pb-4 border-b border-[#b8862b]/10">
                    "A collective direct-inspection room exposing raw vector connections, pipeline currents, and boundary transfer latencies."
                  </p>
                </div>

                {/* Grid layout of all active blueprints */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {projectDossiers.map((dossier) => (
                    <div key={dossier.id} className="bg-black/60 border border-[#b8862b]/15 rounded p-4 shadow-2xl relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-[9px] bg-[#801010] text-[#fbf7eb] px-2 py-0.5 uppercase tracking-wider font-extrabold">
                          DOSSIER {dossier.dossierNo}
                        </span>
                        <span className="font-mono text-[8.5px] text-[#eedda0] uppercase font-bold tracking-widest cursor-pointer hover:underline" onClick={() => setSelectedDossier(dossier)}>
                          OPEN DOSSIER MANUSCRIPT ✺
                        </span>
                      </div>
                      <BlueprintSection blueprint={dossier.blueprint} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VIEW 4: SPHERAL BRASS SPINE CHRONOLOGY */}
            {activeTab === 'TIMELINE' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <BrassTimeline dossiers={projectDossiers} onSelectDossier={setSelectedDossier} />
              </motion.div>
            )}

            {/* VIEW 5: RESEARCH INVENTORY LEDGER INDEX */}
            {activeTab === 'LEDGER_INDEX' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="text-center max-w-xl mx-auto mb-8 select-none font-mono">
                  <span className="text-[8px] bg-[#1a120a] text-[#eedda0] border border-[#623f14] px-3 py-1 uppercase tracking-[0.3em]">
                    MASTER SEARCH INDEX STATION
                  </span>
                  <h2 className="font-display font-bold text-xl text-white tracking-[0.15em] mt-3 uppercase">
                    GLOBAL INVENTORY MATRIX
                  </h2>
                  <p className="font-serif text-xs text-stone-400 italic mt-1">
                    "Alphabetically query specific software components, libraries, application modes, or target architectures."
                  </p>
                </div>

                {/* Filter and query controller panel */}
                <div className="max-w-md mx-auto bg-[#17120e] border border-[#b8862b]/20 p-4 rounded shadow-xl flex items-center font-mono text-xs gap-3">
                  <span className="text-[#801010] font-black uppercase tracking-wider shrink-0">FILTER LEDGER:</span>
                  <input 
                    type="text" 
                    value={ledgerSearch} 
                    onChange={(e) => setLedgerSearch(e.target.value)} 
                    placeholder="Search by component, category, narrative..." 
                    className="w-full bg-black/80 border border-[#b8862b]/30 px-3 py-2 text-[#eedda0] focus:outline-none focus:border-[#eedda0] rounded-sm uppercase tracking-widest placeholder:text-stone-700"
                  />
                </div>

                {/* Complete aggregated search results ledger */}
                <div className="bg-parchment text-[#2c1f16] border-[5px] border-double border-[#623f14]/50 rounded p-4 sm:p-6 shadow-2xl relative col-span-1">
                  <div className="border-b-4 border-double border-[#2c1f16]/60 pb-3 mb-4 flex justify-between items-center">
                    <span className="font-display text-base tracking-widest font-black uppercase">AGGREGATED TECHNOLOGY COHORT REGISTER</span>
                    <span className="font-mono text-[9px] text-gray-500 font-extrabold">{allLedgerItems.length} ENTRIES FOUND</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-serif text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-[#2c1f16]/30 font-mono text-[9.5px] uppercase tracking-wider text-[#623f14]/80">
                          <th className="py-2.5 px-3">COMPONENT</th>
                          <th className="py-2.5 px-3">RECORD SOURCE</th>
                          <th className="py-2.5 px-3">CATEGORY</th>
                          <th className="py-2.5 px-3">APPLICATION STUDY</th>
                          <th className="py-2.5 px-3 text-right">MANDATE LINK</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allLedgerItems.length > 0 ? (
                          allLedgerItems.map((item, idx) => (
                            <tr 
                              key={idx}
                              className={`border-b border-[#2c1f16]/10 text-[#2c1f16] transition-colors duration-200 hover:bg-[#ece2cb]/50 ${
                                idx % 2 === 1 ? 'bg-[#ece2cb]/20' : 'bg-transparent'
                              }`}
                            >
                              <td className="py-3 px-3 font-mono text-xs font-black text-[#801010]">
                                {item.component.toUpperCase()}
                              </td>
                              <td className="py-3 px-3">
                                <span className="font-mono text-[8px] bg-[#2c1f16] text-[#fbf7eb] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                  {item.projectId}
                                </span>
                                <span className="font-sans text-[11px] font-bold text-[#623f14] block mt-0.5 uppercase tracking-tight">
                                  {item.projectTitle}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-sans text-xs uppercase tracking-wide text-gray-700">
                                {item.category}
                              </td>
                              <td className="py-3 px-3 italic opacity-95 text-xs">
                                {item.application}
                              </td>
                              <td className="py-3 px-3 text-right">
                                <button 
                                  onClick={() => setSelectedDossier(item.projectRef)}
                                  className="font-mono text-[8px] text-[#801010] font-black border border-[#801010]/30 hover:bg-[#801010] hover:text-white transition-colors duration-150 px-2 py-1 uppercase tracking-widest cursor-pointer rounded-sm shadow"
                                >
                                  RETRIEVE ✺
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-12 text-center font-mono text-xs text-stone-500 uppercase tracking-widest italic bg-white/20">
                              "No matching archival components detected in registered ledgers."
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t border-dashed border-[#2c1f16]/20 mt-4 pt-3 flex justify-between items-center text-[8px] font-mono tracking-widest text-[#2c1f16]/50">
                    <span>INDEX EXPOSURE COMPELLED BY VAULT DIRECTIVE</span>
                    <span>REGISTER_PG_99A</span>
                  </div>
                </div>

              </motion.div>
            )}

          </main>

          {/* DYNAMIC DOSSIER FULL-SCREEN RETRIEVAL RETRO DRAWER */}
          <ArchiveDrawer 
            dossier={selectedDossier} 
            onClose={() => setSelectedDossier(null)} 
          />

          {/* VAULT CLOSING ARCHIVE RECORD FOOTER PANEL */}
          <footer className="mt-16 border-t-4 border-double border-[#b8862b]/30 pt-10 pb-16 relative select-none">
            
            {/* Compass decorative graphic at corner */}
            <div className="absolute right-0 top-6 w-32 h-32 opacity-5 pointer-events-none">
              <Compass className="w-full h-full text-[#eedda0] animate-spin-slow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Left curator and address */}
              <div className="space-y-3 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#801010]" />
                  <span className="text-[10px] uppercase font-black tracking-[0.25em] text-[#eedda0]">
                    REPOSITORY MAINTAINED BY
                  </span>
                </div>
                <h4 className="font-display font-black text-xl text-white tracking-widest">
                  {/* Linked Portfolio page is dynamic */}
                  <a 
                    href="https://lingaa005.github.io/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#801010] hover:underline flex items-center gap-1.5"
                  >
                    KASILINGAM MARUTHAMUTHU <ExternalLink className="w-4 h-4 text-xs inline" />
                  </a>
                </h4>
                <div className="space-y-1 block text-stone-400 text-[9px] uppercase tracking-wide">
                  <span className="block">Systems and Software Engineer</span>
                  <span className="block">Software Developer // AI Enthusiast</span>
                  <span className="block italic text-stone-600">Established Aet. 2024</span>
                </div>
              </div>

              {/* Central Ledger certification summary */}
              <div className="space-y-3 font-serif">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#801010] font-black block uppercase">
                  SOVEREIGN VALIDATION DECREE
                </span>
                <p className="text-[11px] leading-relaxed text-stone-400 italic bg-black/40 border-l-2 border-[#b8862b]/30 p-3 rounded-r">
                  "This ledger certifies the mathematical safety coordinates, compiling loops, and low-latency clustering engines researched between Epochs 2024 and 2026. Data verified against state invariants."
                </p>
              </div>

              {/* Right wax stamp seal visual layout */}
              <div className="flex flex-col items-center md:items-end justify-center">
                <div className="flex items-center gap-2">
                  <div className="font-mono text-right text-[8.5px] uppercase tracking-widest leading-none hidden sm:block">
                    <span className="text-[#801010] font-black block">LEDGER SEAL</span>
                    <span className="text-stone-500 block mt-1">KM_LEDGER_A</span>
                  </div>
                  <WaxSeal broken={false} size="sm" text="CLOSED" />
                </div>
                <span className="font-mono text-[7px] text-stone-600 uppercase tracking-widest mt-2 block">
                  REPOSITORY INDEX: No. 7128-7400-60W
                </span>
              </div>

            </div>

            <div className="mt-12 pt-6 border-t border-dashed border-[#b8862b]/15 text-center text-[8.5px] font-mono tracking-widest text-[#eedda0]/45 uppercase flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <span>ALL RIGHTS RESERVED TO THE CURATOR DESIGNER // AUTH_SEC_7</span>
              <span>SIGNED IN INTEGRITY BY KASILINGAM MARUTHAMUTHU</span>
            </div>
          </footer>

        </div>
      )}

    </div>
  );
}
