/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BlueprintData, BlueprintNode, BlueprintConnection } from '../data/projects';

interface BlueprintSectionProps {
  blueprint: BlueprintData;
}

export default function BlueprintSection({ blueprint }: BlueprintSectionProps) {
  const [hoverNode, setHoverNode] = useState<BlueprintNode | null>(null);
  const [hoverConn, setHoverConn] = useState<BlueprintConnection | null>(null);

  // Responsive viewBox size
  const width = 420;
  const height = 300;

  return (
    <div className="relative my-7 bg-[#0b1015] border-2 border-[#b8862b]/40 rounded p-6 shadow-2xl overflow-hidden font-mono">
      {/* Blueprint Grid Overlay background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #eedda0 1px, transparent 1px),
            linear-gradient(to bottom, #eedda0 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Interlinked concentric crosshair markers in corner */}
      <div className="absolute top-3 left-3 w-8 h-8 border border-dashed border-[#eedda0]/20 rounded-full flex items-center justify-center pointer-events-none">
        <div className="w-4 h-4 border border-dotted border-[#eedda0]/20 rounded-full" />
      </div>

      {/* Schematic Header */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#eedda0]/20">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#eedda0]/70 block">SCHEMATIC REGISTER NO. BL_0{(blueprint.nodes.length)}</span>
          <span className="text-xs sm:text-sm font-black text-white tracking-widest uppercase">{blueprint.title}</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider blink">
            LIVE TELEMETRY
          </span>
        </div>
      </div>

      {/* SVG Canvas Drawing connections and nodes */}
      <div className="relative w-full aspect-[4/3] max-w-lg mx-auto bg-[#080d12]/95 border border-[#eedda0]/10 rounded shadow-inner p-2">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full"
        >
          {/* Defined glow markers and markers in SVG defs */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowing-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="#b8862b" />
            </marker>
          </defs>

          {/* Coordinate Marks */}
          <text x="10" y="15" fill="#eedda0" opacity="0.3" fontSize="8">X: {width} / Y: {height}</text>
          <text x="360" y="15" fill="#eedda0" opacity="0.3" fontSize="8" textAnchor="end">GRID_SCALE: 1:10</text>

          {/* Drawing CONCURRENT connections */}
          {blueprint.connections.map((conn, idx) => {
            const start = blueprint.nodes.find(n => n.id === conn.from);
            const end = blueprint.nodes.find(n => n.id === conn.to);
            if (!start || !end) return null;

            const isHovered = hoverConn === conn || hoverNode?.id === conn.from || hoverNode?.id === conn.to;

            return (
              <g 
                key={`conn-${idx}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoverConn(conn)}
                onMouseLeave={() => setHoverConn(null)}
              >
                {/* Structural path backline */}
                <path
                  d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                  stroke={isHovered ? '#eedda0' : '#b8862b'}
                  strokeWidth={isHovered ? 2.5 : 1.2}
                  strokeOpacity={isHovered ? 0.9 : 0.45}
                  fill="none"
                  markerEnd="url(#arrow)"
                  className="transition-all duration-300"
                />

                {/* ANIMATED PULSE FLOWLINE Current */}
                <motion.path
                  d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                  stroke={isHovered ? '#fff' : '#eedda0'}
                  strokeWidth={1.5}
                  strokeOpacity={0.8}
                  fill="none"
                  strokeDasharray="6, 12"
                  animate={{
                    strokeDashoffset: [-60, 0]
                  }}
                  transition={{
                    duration: conn.pulseSpeed ? 30 / conn.pulseSpeed : 2.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Interactive labels trigger midway through lines */}
                {isHovered && (
                  <g transform={`translate(${(start.x + end.x)/2}, ${(start.y + end.y)/2 - 8})`}>
                    <rect 
                      x="-55" 
                      y="-7" 
                      width="110" 
                      height="14" 
                      fill="#0b1015" 
                      stroke="#eedda0" 
                      strokeWidth="0.8" 
                      rx="2"
                    />
                    <text 
                      fill="#eedda0" 
                      fontSize="7" 
                      textAnchor="middle" 
                      y="2" 
                      className="font-mono font-bold"
                    >
                      {conn.label.toUpperCase()}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Drawing NODES/Junctions */}
          {blueprint.nodes.map((node) => {
            const isHovered = hoverNode === node;
            
            // Render shapes depending on node type
            const isCore = node.type === 'core';
            const isBus = node.type === 'bus';
            const isInterface = node.type === 'interface';

            return (
              <g 
                key={node.id} 
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoverNode(node)}
                onMouseLeave={() => setHoverNode(null)}
              >
                {/* Node Outer halo ring */}
                <motion.circle
                  r={isCore ? 14 : 9}
                  fill="none"
                  stroke={isCore ? '#801010' : '#b8862b'}
                  strokeWidth="0.8"
                  strokeDasharray={isCore ? "4, 2" : "2, 2"}
                  animate={{ rotate: 360 }}
                  transition={{ duration: isCore ? 12 : 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Hover ring bloom */}
                <motion.circle
                  r={isCore ? 18 : 13}
                  fill="none"
                  stroke="#eedda0"
                  strokeWidth="1.2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isHovered ? { scale: 1.1, opacity: 0.7 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Node Solid center */}
                <circle
                  r={isCore ? 7 : isBus ? 4 : 5}
                  fill={isCore ? '#801010' : isBus ? '#b8862b' : '#eedda0'}
                  className="transition-colors duration-200 group-hover:fill-white"
                  filter="url(#glow)"
                />

                {/* Absolute nested node label details */}
                <g transform={`translate(0, ${isCore ? 25 : 18})`}>
                  {/* Backdrop rectangle */}
                  <rect
                    x={-(node.name.length * 3) - 4}
                    y="-7"
                    width={node.name.length * 6 + 8}
                    height="13"
                    fill="#080d12"
                    stroke={isHovered ? '#eedda0' : '#b8862b'}
                    strokeWidth="0.6"
                    strokeOpacity={isHovered ? 0.9 : 0.25}
                    rx="1.5"
                  />
                  <text
                    fontSize="7"
                    fill={isHovered ? '#fff' : '#eedda0'}
                    fillOpacity={isHovered ? 1 : 0.7}
                    textAnchor="middle"
                    className="font-mono font-bold tracking-tight select-none"
                    y="1.5"
                  >
                    {node.name.toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Floating Callout box on hover */}
        {hoverNode && (
          <div className="absolute top-2 left-2 right-2 bg-slate-950/90 border border-[#eedda0]/40 rounded p-2 text-[10px] md:text-xs z-10 grid grid-cols-2 gap-2 text-[#eedda0] backdrop-blur transition-all duration-300">
            <div>
              <span className="text-gray-500 block text-[8px] tracking-wider uppercase font-mono">OBJECT ID:</span>
              <strong className="text-white font-mono">{hoverNode.id.toUpperCase()}</strong>
            </div>
            <div>
              <span className="text-gray-500 block text-[8px] tracking-wider uppercase font-mono">NODE ROLE:</span>
              <strong className="text-white font-mono">{hoverNode.type.toUpperCase()}</strong>
            </div>
            {hoverNode.latency && (
              <div className="col-span-2 border-t border-[#eedda0]/10 pt-1 flex justify-between">
                <span className="text-gray-500 text-[8px] tracking-wide uppercase font-mono">CALCULATED TRANSFER DEVIATION:</span>
                <strong className="text-[#801010] font-mono">{hoverNode.latency}</strong>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#eedda0]/10 pt-3 text-[10px] text-gray-400 font-mono">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#801010] inline-block animate-pulse" /> CORE ENGINE UNIT</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#b8862b] inline-block" /> ROUTE EDGE JUNCTION</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white inline-block" /> INTERFACE BUS</span>
      </div>
    </div>
  );
}
