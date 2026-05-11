"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Plus, Globe, Trash2, ShieldCheck, Zap } from "lucide-react";

type Service = {
  id: string;
  name: string;
  url: string;
  status: "active" | "standby";
  icon: string;
};

export default function ExternalServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ascend_services");
    if (saved) {
      setServices(JSON.parse(saved));
    } else {
      setServices([
        { id: "1", name: "Notion Architecture", url: "https://notion.so", status: "active", icon: "N" },
        { id: "2", name: "GitHub Ascend Repo", url: "https://github.com", status: "active", icon: "G" },
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_services", JSON.stringify(services));
    }
  }, [services, isLoaded]);

  const addService = () => {
    if (!newName || !newUrl) return;
    const newService: Service = {
      id: Date.now().toString(),
      name: newName,
      url: newUrl.startsWith("http") ? newUrl : `https://${newUrl}`,
      status: "active",
      icon: newName.charAt(0).toUpperCase()
    };
    setServices([...services, newService]);
    setNewName("");
    setNewUrl("");
    setIsAdding(false);
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  if (!isLoaded) return <div className="animate-pulse h-screen bg-[#050505]" />;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-light text-white tracking-tight mb-2">Organise Stuff</h1>
        <p className="text-[#a1a1aa] text-sm">Bridge your external nodes into the Ascend command center.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {services.map((service) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel p-6 bg-[#0a0a0a] border-[#ffffff10] hover:border-[var(--color-accent)]/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white">
                  {service.icon}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => deleteService(service.id)}
                    className="p-2 text-rose-500/0 group-hover:text-rose-500/50 hover:text-rose-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  <a 
                    href={service.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-white/50 hover:text-white bg-white/5 rounded-lg border border-white/5"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-white mb-1">{service.name}</h3>
              <p className="text-xs text-[#a1a1aa] truncate mb-4">{service.url}</p>
              
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Linked & Secure</span>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            onClick={() => setIsAdding(true)}
            className="glass-panel p-6 border-dashed border-2 border-white/10 bg-transparent flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/[0.02] hover:border-white/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-white/20 group-hover:text-white" />
            </div>
            <span className="text-xs font-bold text-white/20 group-hover:text-white uppercase tracking-widest">Connect New Node</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-panel p-8 bg-[#0e0e0e] border-[#ffffff20] max-w-md w-full"
            >
              <h2 className="text-xl font-medium text-white mb-6">Connect Service</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest mb-2">Service Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="e.g. My Portfolio"
                    className="w-full bg-[#050505] border border-[#ffffff10] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest mb-2">Endpoint URL</label>
                  <input 
                    type="text" 
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    placeholder="e.g. docs.google.com"
                    className="w-full bg-[#050505] border border-[#ffffff10] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm"
                >
                  Abort
                </button>
                <button 
                  onClick={addService}
                  className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all text-sm"
                >
                  Link Node
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
