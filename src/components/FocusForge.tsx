"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap, X, CheckCircle2, Music, Wind, CloudRain, Volume2 } from "lucide-react";

export default function FocusForge() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [task, setTask] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [ambient, setAmbient] = useState<"none" | "rain" | "wind">("none");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
      // Play chime logic here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startFocus = () => {
    if (task.trim()) setIsActive(true);
  };

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8 mx-auto border border-emerald-500/50">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h1 className="text-4xl font-light text-white mb-4 tracking-tight">Mission Accomplished</h1>
          <p className="text-[#a1a1aa] mb-12 max-w-sm mx-auto leading-relaxed">
            Your neural focus session is complete. The task <span className="text-white italic">"{task}"</span> has been forged.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-12 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
          >
            Return to Matrix
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[1000] transition-colors duration-1000 ${isActive ? 'bg-[#050505]' : 'bg-black/80 backdrop-blur-3xl'}`}>
      <div className="absolute top-8 right-8">
        <button 
          onClick={() => isActive ? confirm("Abort focus session?") && window.history.back() : window.history.back()}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-[#a1a1aa] hover:text-white transition-all border border-white/5"
        >
          <X size={24} />
        </button>
      </div>

      <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto p-6 text-center">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-8 border border-[var(--color-accent)]/30">
                <Zap size={32} className="text-[var(--color-accent)]" />
              </div>
              <h1 className="text-5xl font-light text-white mb-4 tracking-tighter">Deep Focus Forge</h1>
              <p className="text-[#a1a1aa] mb-12 max-w-sm">Declare your objective. Silence the world. Forge results.</p>
              
              <div className="w-full space-y-6">
                <input 
                  type="text" 
                  placeholder="WHAT ARE WE FORGING?"
                  value={task}
                  onChange={e => setTask(e.target.value.toUpperCase())}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-3xl font-light text-white text-center focus:outline-none focus:border-[var(--color-accent)] transition-all placeholder:text-white/5 tracking-widest"
                />
                
                <div className="flex gap-4 justify-center">
                  {[25, 50, 90].map(m => (
                    <button 
                      key={m}
                      onClick={() => setTimeLeft(m * 60)}
                      className={`px-6 py-2 rounded-full border text-xs font-bold transition-all uppercase tracking-widest ${timeLeft === m * 60 ? 'bg-white text-black border-white' : 'text-[#a1a1aa] border-white/10 hover:border-white/30'}`}
                    >
                      {m} Min
                    </button>
                  ))}
                </div>

                <div className="pt-8">
                  <button 
                    onClick={startFocus}
                    disabled={!task}
                    className="group relative px-20 py-6 bg-gradient-to-r from-white to-gray-300 text-black font-black rounded-[2rem] hover:from-white hover:to-white transition-all duration-150 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 disabled:opacity-20 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-3 text-xl uppercase tracking-[0.3em] drop-shadow-md">
                      Ignite Forge
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="active"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              className="flex flex-col items-center w-full"
            >
              <div className="mb-12">
                <p className="text-[10px] font-black text-[var(--color-accent)] uppercase tracking-[0.4em] mb-4 glow-text">Neural Core Active</p>
                <h2 className="text-2xl font-light text-[#e4e4e7] tracking-widest opacity-40 uppercase">{task}</h2>
              </div>

              <div className="relative mb-12 flex justify-center items-center">
                <span className="text-[12rem] md:text-[16rem] font-thin text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 leading-none font-['Outfit'] tabular-nums tracking-tighter opacity-90 relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  {formatTime(timeLeft)}
                </span>
                
                {/* Visualizer Pulse */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[var(--color-accent)] rounded-full blur-[120px] -z-10 animate-pulse-slow"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-[var(--color-accent)]/20 rounded-full w-[120%] h-[120%] -ml-[10%] -mt-[10%] border-dashed pointer-events-none"
                />
              </div>

              <div className="flex gap-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setAmbient(ambient === "rain" ? "none" : "rain")}
                      className={`p-4 rounded-2xl transition-all ${ambient === "rain" ? 'bg-white text-black' : 'bg-white/5 text-[#a1a1aa] hover:text-white'}`}
                    >
                      <CloudRain size={20} />
                    </button>
                    <button 
                      onClick={() => setAmbient(ambient === "wind" ? "none" : "wind")}
                      className={`p-4 rounded-2xl transition-all ${ambient === "wind" ? 'bg-white text-black' : 'bg-white/5 text-[#a1a1aa] hover:text-white'}`}
                    >
                      <Wind size={20} />
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Ambient Shield</span>
                </div>
              </div>

              <button 
                onClick={() => setIsActive(false)}
                className="mt-20 text-[10px] font-black text-[#a1a1aa] hover:text-white uppercase tracking-[0.3em] transition-colors border-b border-transparent hover:border-white/20 pb-1"
              >
                Abort Session
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Overlays */}
      {isActive && (
        <>
          <div className="fixed inset-0 pointer-events-none border-[40px] border-black/80 z-[-1]" />
          <div className="fixed inset-0 noise-overlay opacity-20 pointer-events-none" />
        </>
      )}
    </div>
  );
}
