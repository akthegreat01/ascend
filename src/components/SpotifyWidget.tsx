"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, SkipForward, SkipBack, ExternalLink, RefreshCw, Layout } from "lucide-react";
import { useState, useEffect } from "react";

export default function SpotifyWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<"cinematic" | "embed">("cinematic");
  const [spotifyUrl, setSpotifyUrl] = useState("https://open.spotify.com/embed/playlist/37i9dQZF1DX8Ueb9CidYvC");

  useEffect(() => {
    const saved = localStorage.getItem("nexus_spotify_url");
    if (saved) setSpotifyUrl(saved.includes('embed') ? saved : saved.replace('open.spotify.com/', 'open.spotify.com/embed/'));
    
    const savedMode = localStorage.getItem("nexus_spotify_mode") as any;
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleMode = () => {
    const newMode = mode === "cinematic" ? "embed" : "cinematic";
    setMode(newMode);
    localStorage.setItem("nexus_spotify_mode", newMode);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel bg-[#1db954]/5 border-[#1db954]/20 relative overflow-hidden group h-full flex flex-col min-h-[220px]"
    >
      {/* Background Logo */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#1db954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.241 1.2zM20.4 9c-3.96-2.4-10.44-2.64-14.28-1.44-.6.18-1.2-.12-1.38-.72-.18-.6.12-1.2.72-1.38 4.44-1.32 11.52-1.02 15.96 1.68.54.3.72 1.02.42 1.56-.24.48-.9.72-1.44.3z"/>
        </svg>
      </div>

      {/* Header */}
      <div className="px-6 pt-6 mb-4 flex justify-between items-start relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Music size={14} className="text-[#1db954]" />
            <h3 className="text-sm font-bold text-white tracking-widest uppercase">Neural Audio</h3>
          </div>
          <p className="text-[9px] text-[#a1a1aa] uppercase tracking-widest font-black opacity-50">Active Session</p>
        </div>
        <button 
          onClick={toggleMode}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-[#a1a1aa] hover:text-white transition-all border border-white/5"
          title="Switch Player Mode"
        >
          {mode === "cinematic" ? <Layout size={14} /> : <RefreshCw size={14} />}
        </button>
      </div>

      <div className="flex-1 px-6 pb-6 relative z-10">
        <AnimatePresence mode="wait">
          {mode === "cinematic" ? (
            <motion.div 
              key="cinematic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col justify-center gap-6 h-full"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" 
                    alt="Album Art"
                    className="w-full h-full object-cover"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex gap-1 items-end h-4">
                        {[0.4, 0.8, 0.6, 0.9].map((h, i) => (
                          <motion.div 
                            key={i}
                            animate={{ height: [`${h*100}%`, "20%", `${h*100}%`] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1 bg-[#1db954] rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">Lo-Fi Beats</p>
                  <p className="text-xs text-[#a1a1aa] truncate">Ascend Audio Stream</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "45%" }}
                    animate={{ width: isPlaying ? "100%" : "45%" }}
                    transition={{ duration: isPlaying ? 180 : 0, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-[#1db954] to-emerald-400"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <button className="text-[#a1a1aa] hover:text-white transition-colors"><SkipBack size={18} /></button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/10"
                    >
                      {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>
                    <button className="text-[#a1a1aa] hover:text-white transition-colors"><SkipForward size={18} /></button>
                  </div>
                  <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="p-2 text-[#a1a1aa] hover:text-[#1db954] transition-colors">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="embed"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
            >
              <iframe 
                src={spotifyUrl}
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="bg-black"
              ></iframe>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Hint */}
      <div className="px-6 pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[8px] text-[#a1a1aa] text-center uppercase tracking-[0.2em] font-black">
          {mode === "cinematic" ? "Cinematic Mock Player" : "Official Spotify Embed"}
        </p>
      </div>
    </motion.div>
  );
}
