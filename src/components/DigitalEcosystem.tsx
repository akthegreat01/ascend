"use client";

import { motion } from "framer-motion";
import { FileText, Link2, Download, ExternalLink, Globe } from "lucide-react";

export default function DigitalEcosystem() {
  const items: any[] = [];

  return (
    <div className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col h-full group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <Globe size={16} className="text-purple-400" />
          Digital Assets
        </h3>
        <span className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-widest">Sync Active</span>
      </div>

      <div className="space-y-2 flex-1">
        {items.map((item, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group/item"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple-400 group-hover/item:scale-110 transition-transform">
                {item.type === 'file' ? <FileText size={14} /> : <Link2 size={14} />}
              </div>
              <div className="overflow-hidden">
                <p className="text-[12px] font-medium text-white truncate">{item.name}</p>
                <p className="text-[10px] text-[#a1a1aa] uppercase tracking-tighter">{item.size}</p>
              </div>
            </div>
            <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
              {item.type === 'file' ? <Download size={12} className="text-[#a1a1aa] hover:text-white" /> : <ExternalLink size={12} className="text-[#a1a1aa] hover:text-white" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-[#a1a1aa] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">Upload</button>
        <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-[#a1a1aa] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">Configure</button>
      </div>
    </div>
  );
}
