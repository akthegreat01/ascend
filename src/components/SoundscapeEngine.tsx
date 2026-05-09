"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Wind, CloudRain, Zap, Radio } from "lucide-react";

type Soundscape = {
  id: string;
  name: string;
  category: "Focus" | "Relax" | "Energy";
  color: string;
  url: string; // Placeholder for actual audio logic
  description: string;
  icon: any;
};

const SOUNDSCAPES: Soundscape[] = [
  { id: "1", name: "Cyberpunk Rain", category: "Focus", color: "from-blue-500 to-indigo-600", url: "", description: "Heavy rain hitting neon-lit glass. Perfect for deep coding.", icon: CloudRain },
  { id: "2", name: "Neural Static", category: "Focus", color: "from-slate-500 to-slate-800", url: "", description: "Calibrated brown noise for absolute cognitive isolation.", icon: Radio },
  { id: "3", name: "Forest of Echoes", category: "Relax", color: "from-emerald-500 to-teal-700", url: "", description: "Distant bird calls and rustling leaves from a digital forest.", icon: Wind },
  { id: "4", name: "Solar Wind", category: "Energy", color: "from-orange-400 to-rose-600", url: "", description: "Low-frequency cosmic vibrations to stimulate creativity.", icon: Zap },
];

export default function SoundscapeEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  // Simple Web Audio API "Synthesized" noise for demo
  const startNoise = async () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioContext.current.state === "suspended") {
      await audioContext.current.resume();
    }
    
    if (oscillator.current) {
      try {
        oscillator.current.stop();
        oscillator.current.disconnect();
      } catch (e) {
        // ignore
      }
    }
    
    if (gainNode.current) {
      gainNode.current.disconnect();
    }

    gainNode.current = audioContext.current.createGain();
    gainNode.current.gain.value = volume / 1000;

    oscillator.current = audioContext.current.createOscillator();
    
    // Basic distinct tones for the demo
    switch(activeId) {
      case "1":
        oscillator.current.type = 'sawtooth';
        oscillator.current.frequency.setValueAtTime(200, audioContext.current.currentTime);
        break;
      case "2":
        oscillator.current.type = 'triangle';
        oscillator.current.frequency.setValueAtTime(150, audioContext.current.currentTime);
        break;
      case "3":
        oscillator.current.type = 'sine';
        oscillator.current.frequency.setValueAtTime(600, audioContext.current.currentTime);
        break;
      case "4":
        oscillator.current.type = 'sine';
        oscillator.current.frequency.setValueAtTime(100, audioContext.current.currentTime);
        break;
      default:
        oscillator.current.type = 'sine';
        oscillator.current.frequency.setValueAtTime(440, audioContext.current.currentTime);
    }
    
    oscillator.current.connect(gainNode.current);
    gainNode.current.connect(audioContext.current.destination);
    
    try {
      oscillator.current.start();
    } catch (e) {
      // ignore if already started
    }
    setIsPlaying(true);
  };

  const stopNoise = () => {
    if (oscillator.current) {
      try {
        oscillator.current.stop();
        oscillator.current.disconnect();
      } catch (e) {
        // ignore
      }
      oscillator.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = (id: string) => {
    if (activeId === id && isPlaying) {
      stopNoise();
    } else {
      setActiveId(id);
      startNoise();
    }
  };

  useEffect(() => {
    if (isPlaying && gainNode.current) {
      gainNode.current.gain.value = volume / 1000;
    }
  }, [volume, isPlaying]);

  const activeSound = SOUNDSCAPES.find(s => s.id === activeId);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-light text-white tracking-tight mb-2">Aural Environments</h1>
        <p className="text-[#a1a1aa] text-sm">Synthetic soundscapes for neuro-synchronization.</p>
      </header>

      {/* Main Player UI */}
      <div className="glass-panel p-8 bg-[#0a0a0a] border-[#ffffff10] relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSound?.color || "from-gray-900 to-black"} opacity-10 transition-all duration-1000`} />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Visualizer Circle */}
          <div className="relative">
            <motion.div 
              animate={{ 
                scale: isPlaying ? [1, 1.1, 1] : 1,
                rotate: isPlaying ? 360 : 0
              }}
              transition={{ 
                duration: isPlaying ? 10 : 0, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className={`w-48 h-48 rounded-full border-2 border-dashed ${isPlaying ? 'border-[var(--color-accent)]' : 'border-white/10'} flex items-center justify-center p-4`}
            >
              <div className={`w-full h-full rounded-full bg-gradient-to-br ${activeSound?.color || "from-white/5 to-white/10"} flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)]`}>
                {activeSound ? <activeSound.icon size={48} className="text-white" /> : <Music size={48} className="text-white/20" />}
              </div>
            </motion.div>
            
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                    className="absolute w-48 h-48 rounded-full border border-[var(--color-accent)]"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-medium text-white mb-2">{activeSound?.name || "Ready to Sync"}</h2>
              <p className="text-sm text-[#a1a1aa] max-w-sm">
                {activeSound?.description || "Select an environment from the matrix below to begin your focus session."}
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-8">
              <button className="p-2 text-[#a1a1aa] hover:text-white transition-colors">
                <SkipBack size={24} />
              </button>
              <button 
                onClick={() => activeId && togglePlay(activeId)}
                disabled={!activeId}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${!activeId ? 'bg-white/5 text-white/20' : 'bg-white text-black hover:scale-110 active:scale-95 shadow-xl shadow-white/10'}`}
              >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
              </button>
              <button className="p-2 text-[#a1a1aa] hover:text-white transition-colors">
                <SkipForward size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <Volume2 size={16} className="text-[#a1a1aa]" />
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume}
                onChange={e => setVolume(parseInt(e.target.value))}
                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Soundscapes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SOUNDSCAPES.map((sound) => (
          <motion.div
            key={sound.id}
            whileHover={{ y: -5 }}
            onClick={() => togglePlay(sound.id)}
            className={`glass-panel p-6 cursor-pointer border-t-2 transition-all ${activeId === sound.id ? 'bg-[#111] border-[var(--color-accent)]' : 'bg-[#0a0a0a] border-transparent hover:border-white/10'}`}
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br ${sound.color} w-fit mb-4 shadow-lg`}>
              <sound.icon size={20} className="text-white" />
            </div>
            <h3 className="font-medium text-white mb-1">{sound.name}</h3>
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">{sound.category}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
