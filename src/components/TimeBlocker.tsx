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
    const saved = localStorage.getItem("nexus_time_blocks");
    if (saved) {
      setBlocks(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("nexus_time_blocks", JSON.stringify(blocks));
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
    <div className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col h-full relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[var(--color-accent)]" />
          <h3 className="text-xl font-medium text-white tracking-wide font-['Outfit']">Time Blocker</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#111] border border-[#ffffff10] text-xs font-bold text-[#a1a1aa] tracking-widest uppercase">
          Daily Schedule
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative z-10 space-y-2 pb-10">
        {hours.map(hour => {
          const block = blocks.find(b => b.hour === hour);
          const isCurrentHour = hour === currentHour;
          const isEditing = editingHour === hour;

          return (
            <div key={hour} className="flex items-stretch gap-3 group relative">
              
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <span className={`w-16 text-right text-xs font-bold pt-3 tabular-nums ${isCurrentHour ? 'text-[var(--color-accent)]' : 'text-[#a1a1aa]/50'}`}>
                  {formatHour(hour)}
                </span>
              </div>

              {/* Connector */}
              <div className="relative flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full border-[2px] mt-3 z-10 bg-[#0a0a0a] ${isCurrentHour ? 'border-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]' : 'border-[#ffffff20]'}`} />
                <div className="w-px h-full bg-[#ffffff10] absolute top-6 -bottom-6" />
              </div>

              {/* Block Content */}
              <div className="flex-1 pb-4 pt-1">
                {isEditing ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#111] border border-[var(--color-accent)] rounded-xl p-3 shadow-lg"
                  >
                    <input 
                      type="text" 
                      autoFocus
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveBlock(hour)}
                      placeholder="What are you focusing on?"
                      className="w-full bg-transparent text-sm text-white focus:outline-none mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {COLORS.map(c => (
                          <button 
                            key={c}
                            onClick={() => setSelectedColor(c)}
                            className={`w-5 h-5 rounded-full ${c} ${selectedColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#111]' : 'opacity-50 hover:opacity-100'}`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingHour(null)} className="text-xs text-[#a1a1aa] hover:text-white">Cancel</button>
                        <button onClick={() => saveBlock(hour)} className="text-xs font-medium text-[var(--color-accent)] hover:text-white">Save</button>
                      </div>
                    </div>
                  </motion.div>
                ) : block ? (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-xl p-3 border border-transparent hover:border-[#ffffff20] transition-colors group/block relative overflow-hidden flex items-center justify-between shadow-sm`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${block.color}`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover/block:opacity-100 transition-opacity" />
                    
                    <span className="text-sm font-medium text-white pl-2 relative z-10">{block.title}</span>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity relative z-10">
                      <button onClick={() => {
                        setEditingHour(hour);
                        setNewTitle(block.title);
                        setSelectedColor(block.color);
                      }} className="p-1.5 text-[#a1a1aa] hover:text-white rounded-md hover:bg-[#ffffff10]">
                        <GripVertical size={14} />
                      </button>
                      <button onClick={() => deleteBlock(hour)} className="p-1.5 text-rose-400 hover:bg-rose-400/10 rounded-md">
                        <Trash2 size={14} />
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
                    className="w-full text-left p-3 rounded-xl border border-dashed border-[#ffffff10] hover:border-[#ffffff30] hover:bg-[#ffffff05] text-[#a1a1aa]/50 hover:text-[#a1a1aa] text-sm transition-all flex items-center gap-2 group/add"
                  >
                    <Plus size={14} className="opacity-0 group-hover/add:opacity-100 transition-opacity" />
                    Block this time...
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Fade overlay for scrolling */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-20" />
    </div>
  );
}
