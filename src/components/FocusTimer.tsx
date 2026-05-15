"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, CloudRain, X, Maximize2, Trees, Coffee, Orbit, Music, Wind, Waves } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   IMMERSIVE FOCUS MODE — Signature Feature
   A cinematic, full-screen focus environment with
   ambient themes, breathing effects, and session analytics.
   ═══════════════════════════════════════════════════════ */

const MODES = {
  Pomodoro: 25 * 60,
  "Short Break": 5 * 60,
  "Long Break": 15 * 60,
  "Deep Work": 50 * 60,
};

const AMBIENCES = [
  { id: "rain", name: "Rain", icon: CloudRain, color: "#60a5fa", gradient: "from-blue-900 via-slate-900 to-indigo-950", particleColor: "rgba(96,165,250,0.3)" },
  { id: "forest", name: "Forest", icon: Trees, color: "#34d399", gradient: "from-emerald-950 via-green-950 to-teal-950", particleColor: "rgba(52,211,153,0.3)" },
  { id: "cafe", name: "Café", icon: Coffee, color: "#d97706", gradient: "from-amber-950 via-orange-950 to-yellow-950", particleColor: "rgba(217,119,6,0.2)" },
  { id: "space", name: "Deep Space", icon: Orbit, color: "#818cf8", gradient: "from-violet-950 via-indigo-950 to-purple-950", particleColor: "rgba(129,140,248,0.2)" },
  { id: "lofi", name: "Lo-fi", icon: Music, color: "#f472b6", gradient: "from-pink-950 via-rose-950 to-fuchsia-950", particleColor: "rgba(244,114,182,0.2)" },
  { id: "ocean", name: "Ocean", icon: Waves, color: "#22d3ee", gradient: "from-cyan-950 via-sky-950 to-blue-950", particleColor: "rgba(34,211,238,0.2)" },
];

type NoiseType = "brown" | "white" | "pink";

export default function FocusTimer() {
  const [mode, setMode] = useState<keyof typeof MODES>("Pomodoro");
  const [timeLeft, setTimeLeft] = useState(MODES["Pomodoro"]);
  const [isActive, setIsActive] = useState(false);
  const [isPlayingNoise, setIsPlayingNoise] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [ambience, setAmbience] = useState(AMBIENCES[0]);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<ScriptProcessorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // ─── AMBIENT NOISE ENGINE ───
  const toggleNoise = useCallback(() => {
    if (isPlayingNoise) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlayingNoise(false);
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const bufferSize = 4096;
        let lastOut = 0;
        
        const node = ctx.createScriptProcessor(bufferSize, 1, 1);
        node.onaudioprocess = function(e) {
          const output = e.outputBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            lastOut = (lastOut + (0.02 * white)) / 1.02;
            output[i] = lastOut * 3.5; 
          }
        };

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.4;
        
        node.connect(gainNode);
        gainNode.connect(ctx.destination);

        audioCtxRef.current = ctx;
        noiseNodeRef.current = node;
        gainNodeRef.current = gainNode;
      } else {
        audioCtxRef.current.resume();
      }
      setIsPlayingNoise(true);
    } catch (e) {
      console.error("Audio API not supported");
    }
  }, [isPlayingNoise]);

  // ─── BREATHING CYCLE ───
  useEffect(() => {
    if (!isActive || !zenMode) return;
    
    const cycle = () => {
      setBreathPhase("inhale");
      setTimeout(() => setBreathPhase("hold"), 4000);
      setTimeout(() => setBreathPhase("exhale"), 5500);
    };
    
    cycle();
    const interval = setInterval(cycle, 10000);
    return () => clearInterval(interval);
  }, [isActive, zenMode]);

  // ─── TIMER ENGINE ───
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setSessionComplete(true);
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Play completion chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.15);
          gain.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.15);
          gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + i * 0.15 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.15 + 1);
          osc.start(audioCtx.currentTime + i * 0.15);
          osc.stop(audioCtx.currentTime + i * 0.15 + 1);
        });
      } catch (e) {}
      
      // Log session
      const statsStr = localStorage.getItem("ascend_stats");
      const stats = statsStr ? JSON.parse(statsStr) : { workTime: 0, breakTime: 0 };
      
      if (mode === "Pomodoro" || mode === "Deep Work") {
        stats.workTime += MODES[mode];
        
        const today = new Date().toISOString().split('T')[0];
        const datesStr = localStorage.getItem("ascend_focus_dates");
        const dates = datesStr ? JSON.parse(datesStr) : [];
        if (!dates.includes(today)) {
          dates.push(today);
          localStorage.setItem("ascend_focus_dates", JSON.stringify(dates));
        }

        // Webhook
        const webhookUrl = localStorage.getItem("ascend_webhook");
        if (webhookUrl && webhookUrl.trim().length > 10) {
          try {
            fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                content: `🚀 **Ascend Level Up!** Just completed a ${MODES[mode]/60}-minute Deep Work session.`,
                username: localStorage.getItem("ascend_name") || "Ascend User",
                avatar_url: "https://i.imgur.com/AfFp7pu.png",
                event: "pomodoro_completed",
                duration: MODES[mode]
              })
            }).catch(e => console.error("Webhook failed", e));
          } catch(e) {}
        }
      } else {
        stats.breakTime += MODES[mode];
      }
      
      localStorage.setItem("ascend_stats", JSON.stringify(stats));
      window.dispatchEvent(new Event("ascend_stats_updated"));
      window.dispatchEvent(new Event("ascend_xp_recalculate"));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, mode]);

  // ─── ESC to exit ───
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZenMode(false);
    };
    // Space to toggle timer
    const handleSpace = (e: KeyboardEvent) => {
      if (zenMode && e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        setIsActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleSpace);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleSpace);
    };
  }, [zenMode]);

  const handleModeChange = (newMode: keyof typeof MODES) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode]);
    setIsActive(false);
    setSessionComplete(false);
    setSessionSeconds(0);
  };

  const toggleTimer = () => {
    setSessionComplete(false);
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode]);
    setSessionComplete(false);
    setSessionSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progress = timeLeft / MODES[mode];

  return (
    <div className={`transition-all duration-700 ${zenMode ? 'fixed inset-0 z-[200] flex items-center justify-center' : 'relative w-full h-full'}`}>
      
      {/* ═══ ZEN MODE BACKGROUND ═══ */}
      {zenMode && (
        <div className={`absolute inset-0 bg-gradient-to-br ${ambience.gradient} transition-all duration-1000`}>
          {/* Breathing ambient orbs */}
          <motion.div
            className="absolute w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-20"
            style={{ background: ambience.color, left: "20%", top: "10%" }}
            animate={{
              scale: breathPhase === "inhale" ? [1, 1.3] : breathPhase === "hold" ? 1.3 : [1.3, 1],
              opacity: breathPhase === "inhale" ? [0.1, 0.25] : breathPhase === "hold" ? 0.25 : [0.25, 0.1],
            }}
            transition={{ duration: breathPhase === "hold" ? 1.5 : 4, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-10"
            style={{ background: ambience.color, right: "10%", bottom: "20%" }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ 
                background: ambience.particleColor,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -30 - Math.random() * 60, 0],
                x: [0, (Math.random() - 0.5) * 40, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1 + Math.random(), 0],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Grain overlay */}
          <div className="absolute inset-0 noise-overlay mix-blend-overlay opacity-30" />
        </div>
      )}

      {/* ═══ ZEN MODE CONTROLS ═══ */}
      {zenMode && (
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          {/* Ambience selector */}
          <div className="flex items-center gap-2">
            {AMBIENCES.map((a) => (
              <button
                key={a.id}
                onClick={() => setAmbience(a)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  ambience.id === a.id 
                    ? "bg-white/15 border border-white/20 scale-110 shadow-lg" 
                    : "bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10"
                }`}
                title={a.name}
              >
                <a.icon size={16} style={{ color: ambience.id === a.id ? a.color : "#a1a1aa" }} />
              </button>
            ))}
          </div>
          
          {/* Exit */}
          <button 
            onClick={() => setZenMode(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/10 border border-white/10 transition-all text-xs font-medium"
          >
            <X size={14} />
            Exit <span className="text-white/30 ml-1">(Esc)</span>
          </button>
        </div>
      )}

      {/* ═══ SESSION COMPLETE CELEBRATION ═══ */}
      <AnimatePresence>
        {sessionComplete && zenMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center z-30 bg-black/60 backdrop-blur-xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="text-7xl mb-6"
              >
                🎯
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-black text-white font-['Outfit'] mb-3"
              >
                Session Complete
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-white/60 mb-2"
              >
                {Math.floor(MODES[mode] / 60)} minutes of pure focus
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm font-bold text-[var(--color-accent)]"
              >
                +{Math.floor(MODES[mode] / 300)} XP earned
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={() => { setSessionComplete(false); resetTimer(); }}
                className="mt-8 px-8 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Start Another
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ TIMER CORE ═══ */}
      <div className={`relative flex flex-col items-center justify-center border border-white/10 shadow-2xl group transition-all duration-700 overflow-hidden ${
        zenMode ? 'w-full max-w-2xl h-[600px] rounded-[3rem] z-10' : 'w-full h-[600px] rounded-2xl'
      }`}>
        {!zenMode && (
          <>
            <div className="absolute inset-0 z-0 bg-[#120524]" />
            <div className="absolute inset-0 z-0 opacity-80"
                 style={{
                   background: 'radial-gradient(circle at 80% 80%, var(--color-accent) 0%, transparent 50%), radial-gradient(circle at 20% 20%, #7c3aed 0%, transparent 50%)',
                   filter: 'blur(60px)'
                 }}
            />
          </>
        )}
        
        {/* Top Controls (non-zen) */}
        {!zenMode && (
          <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
            <button 
              onClick={() => setZenMode(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl bg-white/5 text-white hover:bg-white/20 border border-white/10 text-xs font-medium"
            >
              <Maximize2 size={12} />
              Immersive Mode
            </button>
            <button 
              onClick={toggleNoise}
              className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl ${isPlayingNoise ? 'bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-white/5 text-white hover:bg-white/20'}`}
              title="Toggle Ambient Brown Noise"
            >
              {isPlayingNoise ? <Volume2 size={20} /> : <CloudRain size={20} />}
            </button>
          </div>
        )}
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Mode Toggle */}
          <div className={`flex items-center gap-1 bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 transition-all duration-500 ${zenMode ? 'mb-12' : 'mb-8'}`}>
            {(Object.keys(MODES) as Array<keyof typeof MODES>).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  mode === m
                    ? "bg-white text-black shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Circular Progress Ring */}
          <div className={`relative flex items-center justify-center mb-10 transition-all duration-500 ${zenMode ? 'w-80 h-80 sm:w-96 sm:h-96' : 'w-64 h-64 sm:w-80 sm:h-80'}`}>
            {/* Breathing glow behind ring */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(circle, ${ambience.color}15 0%, transparent 70%)` }}
                animate={{
                  scale: breathPhase === "inhale" ? [1, 1.15] : breathPhase === "hold" ? 1.15 : [1.15, 1],
                  opacity: breathPhase === "inhale" ? [0.3, 0.7] : breathPhase === "hold" ? 0.7 : [0.7, 0.3],
                }}
                transition={{ duration: breathPhase === "hold" ? 1.5 : 4, ease: "easeInOut" }}
              />
            )}

            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="46" 
                fill="none" 
                stroke="#ffffff0a" 
                strokeWidth="2"
              />
              {/* Secondary track */}
              <circle 
                cx="50" cy="50" r="46" 
                fill="none" 
                stroke="#ffffff05" 
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <motion.circle 
                cx="50" cy="50" r="46" 
                fill="none" 
                stroke={zenMode ? ambience.color : "var(--color-accent, #f43f5e)"}
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ strokeDasharray: "289 289", strokeDashoffset: 0 }}
                animate={{ 
                  strokeDashoffset: 289 - (289 * progress)
                }}
                transition={{ duration: 1, ease: "linear" }}
                style={{ filter: `drop-shadow(0 0 8px ${zenMode ? ambience.color : 'var(--color-accent)'}50)` }}
              />
            </svg>

            {/* Timer Display */}
            <div className="flex flex-col items-center relative z-10">
              <h1 className={`font-['Outfit'] font-light tracking-tighter text-white drop-shadow-2xl tabular-nums transition-all duration-500 ${zenMode ? 'text-8xl sm:text-9xl' : 'text-7xl sm:text-8xl'}`}>
                {formatTime(timeLeft)}
              </h1>
              {zenMode && isActive && (
                <motion.div 
                  className="mt-4 flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" style={{ background: ambience.color }} />
                  <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: ambience.color }}>
                    {mode === "Deep Work" ? "Deep Work" : mode === "Pomodoro" ? "Focused" : "Resting"}
                  </span>
                </motion.div>
              )}
              {zenMode && !isActive && !sessionComplete && (
                <p className="mt-4 text-white/30 text-xs font-medium">Press Space to start</p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className={`flex items-center gap-4 transition-all duration-500 ${zenMode ? 'scale-110' : ''}`}>
            <button 
              onClick={toggleTimer}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors shadow-lg shadow-white/20 w-32 justify-center"
            >
              {isActive ? (
                <><Pause size={16} fill="currentColor" /> Pause</>
              ) : (
                <><Play size={16} fill="currentColor" /> Start</>
              )}
            </button>
            <button 
              onClick={resetTimer}
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
            >
              <RotateCcw size={18} />
            </button>
            {zenMode && (
              <button 
                onClick={toggleNoise}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl ${isPlayingNoise ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                title="Toggle Ambient Noise"
              >
                {isPlayingNoise ? <Volume2 size={18} /> : <Wind size={18} />}
              </button>
            )}
          </div>

          {/* Breathing guide (zen mode only) */}
          {zenMode && isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
                {breathPhase === "inhale" ? "Breathe in..." : breathPhase === "hold" ? "Hold..." : "Breathe out..."}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Spotify Embed (Hidden in Zen Mode) */}
      {!zenMode && (
        <div className="w-full mt-6 glass-panel p-0 bg-[#0a0a0a] border border-[#ffffff10] overflow-hidden rounded-2xl">
          <iframe 
            style={{ borderRadius: '0' }} 
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0" 
            width="100%" 
            height="80" 
            frameBorder="0" 
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
