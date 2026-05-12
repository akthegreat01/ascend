"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Plus, Trash2, GripVertical } from "lucide-react";

type TimeBlock = {
  id: string;
  hour: number; // 0-23
  title: string;
  color: string;
};

const COLORS = [
  "bg-blue-500", "bg-emerald-500", "bg-rose-500", "bg-purple-500", "bg-amber-500", "bg-zinc-700"
];

export default function TimeBlocker() {
  const [blocks, setBlocks] = useState<TimeBlock[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingHour, setEditingHour] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_time_blocks");
    if (saved) {
      setBlocks(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_time_blocks", JSON.stringify(blocks));
    }
  }, [blocks, isLoaded]);

  // Working hours 6 AM to 10 PM
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);

  const saveBlock = (hour: number) => {
    if (!newTitle.trim()) {
      setEditingHour(null);
      return;
    }
    
    const newBlock: TimeBlock = {
      id: Date.now().toString(),
      hour,
      title: newTitle,
      color: selectedColor
    };
    
    // Remove existing block for this hour if any
    const updated = blocks.filter(b => b.hour !== hour);
    setBlocks([...updated, newBlock]);
    setEditingHour(null);
    setNewTitle("");
  };

  const deleteBlock = (hour: number) => {
    setBlocks(blocks.filter(b => b.hour !== hour));
  };

  const formatHour = (h: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:00 ${ampm}`;
  };

  if (!isLoaded) return <div className="h-[600px] bg-[#0a0a0a] rounded-2xl animate-pulse" />;

  const currentHour = new Date().getHours();

  return (
    <div className="glass-panel p-8 flex flex-col h-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/[0.03] blur-[100px] pointer-events-none rounded-full group-hover:scale-150 transition-transform duration-1000" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:scale-110 transition-transform duration-500">
            <Clock size={20} />
          </div>
          <h3 className="text-[11px] font-black text-white tracking-[0.2em] uppercase">Temporal Alignment</h3>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[9px] font-black text-[#a1a1aa] tracking-[0.2em] uppercase">
          Daily Chronos
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 relative z-10 space-y-1 pb-12">
        {hours.map(hour => {
          const block = blocks.find(b => b.hour === hour);
          const isCurrentHour = hour === currentHour;
          const isEditing = editingHour === hour;

          return (
            <div key={hour} className="flex items-stretch gap-5 group/row relative">
              
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <span className={`w-14 text-right text-[10px] font-black pt-4 tabular-nums tracking-widest uppercase transition-colors duration-500 ${isCurrentHour ? 'text-purple-400' : 'text-[#a1a1aa] opacity-30'}`}>
                  {formatHour(hour).split(' ')[0]}
                  <span className="block text-[8px] opacity-60">{formatHour(hour).split(' ')[1]}</span>
                </span>
              </div>

              {/* Connector */}
              <div className="relative flex flex-col items-center">
                <div className={`w-3.5 h-3.5 rounded-full border-2 mt-4 z-10 bg-[#050505] transition-all duration-500 ${isCurrentHour ? 'border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-125' : 'border-white/10 group-hover/row:border-white/30'}`} />
                <div className="w-[1px] h-full bg-gradient-to-b from-white/10 via-white/5 to-white/10 absolute top-7 -bottom-7" />
              </div>

              {/* Block Content */}
              <div className="flex-1 pb-6 pt-1.5">
                {isEditing ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/[0.03] border border-purple-500/50 rounded-2xl p-5 shadow-2xl backdrop-blur-xl"
                  >
                    <input 
                      type="text" 
                      autoFocus
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveBlock(hour)}
                      placeholder="Define Focus..."
                      className="w-full bg-transparent text-[15px] font-medium text-white placeholder-white/20 focus:outline-none mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {COLORS.map(c => (
                          <button 
                            key={c}
                            onClick={() => setSelectedColor(c)}
                            className={`w-6 h-6 rounded-lg ${c} transition-all duration-300 ${selectedColor === c ? 'scale-110 ring-2 ring-white shadow-lg' : 'opacity-30 hover:opacity-100 hover:scale-105'}`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => setEditingHour(null)} className="text-[10px] font-black uppercase tracking-widest text-[#a1a1aa] hover:text-white transition-colors">Cancel</button>
                        <button onClick={() => saveBlock(hour)} className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-white transition-colors">Apply</button>
                      </div>
                    </div>
                  </motion.div>
                ) : block ? (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-2xl p-4 border border-white/[0.05] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 group/block relative overflow-hidden flex items-center justify-between shadow-sm hover:-translate-y-0.5 hover:shadow-xl`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${block.color} opacity-80`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover/block:opacity-100 transition-opacity duration-700" />
                    
                    <span className="text-[14px] font-bold text-white pl-3 relative z-10 tracking-tight">{block.title}</span>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover/block:opacity-100 transition-all duration-500 transform translate-x-2 group-hover/block:translate-x-0 relative z-10">
                      <button onClick={() => {
                        setEditingHour(hour);
                        setNewTitle(block.title);
                        setSelectedColor(block.color);
                      }} className="p-2 text-[#a1a1aa] hover:text-white rounded-xl hover:bg-white/5 transition-all">
                        <GripVertical size={16} />
                      </button>
                      <button onClick={() => deleteBlock(hour)} className="p-2 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <button 
                    onClick={() => {
                      setEditingHour(hour);
                      setNewTitle("");
                      setSelectedColor(COLORS[0]);
                    }}
                    className="w-full text-left p-4 rounded-2xl border border-dashed border-white/5 hover:border-white/20 hover:bg-white/[0.03] text-white/20 hover:text-white/40 text-[13px] font-medium transition-all duration-500 flex items-center gap-3 group/add"
                  >
                    <Plus size={16} className="opacity-0 group-hover/add:opacity-100 transition-all duration-500 transform scale-50 group-hover/add:scale-100" />
                    Neural Slot Available...
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Fade overlay for scrolling */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </div>
  );
}
