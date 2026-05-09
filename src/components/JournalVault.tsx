"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Save, Trash2 } from "lucide-react";

type Entry = {
  id: string;
  date: string;
  content: string;
  mood: string;
};

const moods = ["🔥", "⚡️", "🌊", "☁️", "🥀"];

export default function JournalVault() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState("⚡️");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nexus_journal");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;
    
    const newEntry: Entry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      content: currentEntry,
      mood: selectedMood
    };
    
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("nexus_journal", JSON.stringify(updated));
    setCurrentEntry("");
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem("nexus_journal", JSON.stringify(updated));
  };

  if (!isLoaded) return <div className="animate-pulse h-[600px] w-full" />;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Editor Section */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="glass-panel bg-[#0a0a0a] p-0 flex flex-col h-[600px] border border-[#ffffff10] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />
          
          <div className="p-6 border-b border-[#ffffff0a] flex justify-between items-center bg-[#111111]/50 backdrop-blur-md">
            <div>
              <p className="text-[10px] text-[#a1a1aa] tracking-widest uppercase font-bold mb-1">Today's Entry</p>
              <h2 className="text-xl font-medium text-white">{today}</h2>
            </div>
            <div className="flex items-center gap-2">
              {moods.map(m => (
                <button 
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedMood === m ? 'bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 scale-110' : 'hover:bg-[#ffffff10] border border-transparent grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <textarea 
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="What is on your mind? Did you encounter any obstacles today? What did you learn?"
            className="flex-1 w-full bg-transparent p-6 text-white text-lg font-light leading-relaxed resize-none focus:outline-none placeholder-[#ffffff30] custom-scrollbar"
          />

          <div className="p-4 border-t border-[#ffffff0a] flex justify-end bg-[#111111]/50 backdrop-blur-md">
            <button 
              onClick={saveEntry}
              disabled={!currentEntry.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} /> Seal Memory
            </button>
          </div>
        </div>
      </div>

      {/* History Vault */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <h3 className="text-sm font-medium text-white tracking-wide uppercase px-2">The Vault</h3>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 max-h-[600px]">
          {entries.length === 0 && (
            <div className="glass-panel p-6 bg-[#0a0a0a] text-center text-[#a1a1aa] text-sm">
              Your vault is empty. Seal your first memory.
            </div>
          )}
          {entries.map(entry => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={entry.id}
              className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] hover:border-[var(--color-accent)]/30 transition-colors group relative"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[var(--color-accent)]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-[#a1a1aa]">{entry.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">{entry.mood}</span>
                  <button 
                    onClick={() => deleteEntry(entry.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-400 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-white font-light leading-relaxed line-clamp-4">
                {entry.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
