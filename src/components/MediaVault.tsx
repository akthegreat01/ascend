"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Link as LinkIcon, Plus, Trash2, Video, Smartphone } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  title: string;
  type: "youtube" | "reel" | "link";
  addedAt: string;
}

export default function MediaVault() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_media_vault");
    if (saved) setItems(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_media_vault", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const detectMediaType = (url: string): { type: "youtube" | "reel" | "link", title: string } => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return { type: "youtube", title: "YouTube Video" };
    } else if (url.includes("instagram.com/reel")) {
      return { type: "reel", title: "Instagram Reel" };
    }
    return { type: "link", title: "Inspiration Link" };
  };

  const addMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    
    const { type, title } = detectMediaType(newUrl);
    
    const newItem: MediaItem = {
      id: Date.now().toString(),
      url: newUrl,
      title: title,
      type: type,
      addedAt: new Date().toISOString()
    };
    
    setItems([newItem, ...items]);
    setNewUrl("");
  };

  const deleteMedia = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  if (!isLoaded) return <div className="glass-panel p-6 animate-pulse h-[300px]" />;

  return (
    <div className="glass-panel p-6 flex flex-col h-full relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
      {/* Background glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Play size={18} />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white tracking-wide font-['Outfit']">Media Vault</h3>
          <p className="text-xs text-[#a1a1aa]">Save productivity videos & reels</p>
        </div>
      </div>

      <form onSubmit={addMedia} className="mb-4 relative z-10 flex gap-2">
        <div className="relative flex-1">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Paste YouTube or Reel URL..."
            className="w-full bg-[#0a0a0a] border border-[#ffffff15] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-[#a1a1aa]/50 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all shadow-inner"
            required
          />
          <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1a1aa]/50" />
        </div>
        <button
          type="submit"
          disabled={!newUrl.trim()}
          className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-400 hover:to-purple-400 disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3 relative z-10">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center opacity-50"
            >
              <Video size={32} className="mb-2 text-[#a1a1aa]" />
              <p className="text-sm text-[#a1a1aa]">Vault is empty.<br/>Drop some knowledge here.</p>
            </motion.div>
          ) : (
            items.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="group/item flex items-center justify-between p-3.5 rounded-xl bg-[#111111] border border-[#ffffff10] hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                onClick={() => openLink(item.url)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    item.type === 'youtube' ? 'bg-red-500/10 text-red-500' :
                    item.type === 'reel' ? 'bg-pink-500/10 text-pink-500' :
                    'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {item.type === 'youtube' ? <Video size={16} /> :
                     item.type === 'reel' ? <Smartphone size={16} /> :
                     <LinkIcon size={16} />}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium text-white truncate group-hover/item:text-indigo-300 transition-colors">{item.title}</span>
                    <span className="text-[10px] text-[#a1a1aa] truncate">{item.url}</span>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMedia(item.id);
                  }}
                  className="opacity-0 group-hover/item:opacity-100 p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
