/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LedgerItem } from '../data/projects';

interface TechnologyLedgerProps {
  items: LedgerItem[];
}

export default function TechnologyLedger({ items }: TechnologyLedgerProps) {
  return (
    <div className="relative my-6 px-1 py-1 bg-parchment text-[#2c1f16] border border-[#623f14]/30 shadow-[inset_0_0_15px_rgba(44,31,22,0.1)] rounded-sm">
      {/* Ledger Header Double Line */}
      <div className="border-b-4 border-double border-[#2c1f16]/60 px-4 py-2 flex justify-between items-center bg-[#fbf7eb]">
        <span className="font-display text-sm tracking-widest font-black text-[#2c1f16]">ENGINEERING INVENTORY LEDGER</span>
        <span className="font-mono text-[9px] text-[#b8862b] font-bold">SEC_REG // TR_91</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-serif text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#2c1f16]/30 font-mono text-[10px] uppercase tracking-wider text-[#623f14]/80">
              <th className="py-2.5 px-4 font-bold">COMPONENT</th>
              <th className="py-2.5 px-4 font-bold">CATEGORY</th>
              <th className="py-2.5 px-4 font-bold">APPLICATION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr 
                key={idx}
                className={`border-b border-[#2c1f16]/10 text-[#2c1f16] transition-colors duration-200 hover:bg-[#ece2cb]/40 ${
                  idx % 2 === 1 ? 'bg-[#ece2cb]/20' : 'bg-transparent'
                }`}
              >
                <td className="py-3 px-4 font-bold tracking-tight text-[#801010] font-mono text-xs">
                  {item.component.toUpperCase()}
                </td>
                <td className="py-3 px-4 font-sans text-xs uppercase tracking-wide text-gray-700">
                  {item.category}
                </td>
                <td className="py-3 px-4 italic opacity-95 text-xs sm:text-sm">
                  {item.application}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ledger Footer Segment */}
      <div className="border-t border-dashed border-[#2c1f16]/20 mt-1 px-4 py-1.5 flex justify-between items-center text-[9px] font-mono tracking-widest text-[#2c1f16]/50 bg-[#fbf7eb]">
        <span>ALL RECORDS SIGNED AND CERTIFIED</span>
        <span>INDEX_PG_01</span>
      </div>
    </div>
  );
}
