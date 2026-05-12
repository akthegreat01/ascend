"use client";

import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, CloudRain } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const MODES = {
  Pomodoro: 25 * 60,
  "Short Break": 5 * 60,
  "Long Break": 15 * 60,
};

export default function FocusTimer() {
  const [mode, setMode] = useState<keyof typeof MODES>("Pomodoro");
  const [timeLeft, setTimeLeft] = useState(MODES["Pomodoro"]);
  const [isActive, setIsActive] = useState(false);
  const [isPlayingNoise, setIsPlayingNoise] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);

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
        
        // Use ScriptProcessor for wide compatibility without loading external worklet files
        const node = ctx.createScriptProcessor(bufferSize, 1, 1);
        node.onaudioprocess = function(e) {
          const output = e.outputBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            // Brown noise approximation
            lastOut = (lastOut + (0.02 * white)) / 1.02;
            output[i] = lastOut * 3.5; 
          }
        };

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.5; // subtle volume
        
        node.connect(gainNode);
        gainNode.connect(ctx.destination);

        audioCtxRef.current = ctx;
        noiseNodeRef.current = node;
      } else {
        audioCtxRef.current.resume();
      }
      setIsPlayingNoise(true);
    } catch (e) {
      console.error("Audio API not supported");
    }
  }, [isPlayingNoise]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Play premium chime sound
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.1); // C6
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 1.5);
      } catch (e) {
        // Ignore audio errors
      }
      
      // Log the completed session to local storage
      const statsStr = localStorage.getItem("ascend_stats");
      const stats = statsStr ? JSON.parse(statsStr) : { workTime: 0, breakTime: 0 };
      
      if (mode === "Pomodoro") {
        stats.workTime += MODES["Pomodoro"];
        
        // Log the date for the streak feature
        const today = new Date().toISOString().split('T')[0];
        const datesStr = localStorage.getItem("ascend_focus_dates");
        const dates = datesStr ? JSON.parse(datesStr) : [];
        if (!dates.includes(today)) {
          dates.push(today);
          localStorage.setItem("ascend_focus_dates", JSON.stringify(dates));
        }

        // Fire Global Webhook Integration (Zapier / Discord)
        const webhookUrl = localStorage.getItem("ascend_webhook");
        if (webhookUrl && webhookUrl.trim().length > 10) {
          try {
            fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                content: `🚀 **Ascend Level Up!** Just completed a ${MODES["Pomodoro"]/60}-minute Deep Work session.`,
                username: localStorage.getItem("ascend_name") || "Ascend User",
                avatar_url: "https://i.imgur.com/AfFp7pu.png",
                event: "pomodoro_completed",
                duration: MODES["Pomodoro"]
              })
            }).catch(e => console.error("Webhook failed", e));
          } catch(e) {}
        }
      } else {
        stats.breakTime += MODES[mode];
      }
      
      localStorage.setItem("ascend_stats", JSON.stringify(stats));
      // Dispatch custom event to update other components
      window.dispatchEvent(new Event("ascend_stats_updated"));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, mode]);

  const [zenMode, setZenMode] = useState(false);

  // Esc key to exit zen mode
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZenMode(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleModeChange = (newMode: keyof typeof MODES) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode]);
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`transition-all duration-500 ${zenMode ? 'fixed inset-0 z-[200] bg-black flex items-center justify-center p-8' : 'relative w-full h-full'}`}>
      
      {/* Zen Mode Exit Button */}
      {zenMode && (
        <button 
          onClick={() => setZenMode(false)}
          className="absolute top-8 right-8 text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2"
        >
          Exit Zen Mode (Esc)
        </button>
      )}

      <div className={`relative flex flex-col items-center justify-center border border-white/10 shadow-2xl group transition-all duration-500 overflow-hidden ${zenMode ? 'w-full max-w-2xl h-[600px] rounded-[3rem]' : 'w-full h-[600px] rounded-2xl'}`}>
        <div className="absolute inset-0 z-0 bg-[#120524]" />
        
        <div className="absolute inset-0 z-0 opacity-80"
             style={{
               background: 'radial-gradient(circle at 80% 80%, var(--color-accent) 0%, transparent 50%), radial-gradient(circle at 20% 20%, #7c3aed 0%, transparent 50%)',
               filter: 'blur(60px)'
             }}
        />
        
        {/* Ambient Noise Control */}
        {!zenMode && (
          <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
            <button 
              onClick={() => setZenMode(true)}
              className="px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl bg-white/5 text-white hover:bg-white/20 border border-white/10 text-xs font-medium"
            >
              Zen Mode
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
          {/* Top Toggles */}
          <div className={`flex items-center gap-2 bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 transition-all duration-500 ${zenMode ? 'mb-12 scale-125' : 'mb-8'}`}>
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
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="46" 
                fill="none" 
                stroke="#ffffff0a" 
                strokeWidth="2"
              />
              <motion.circle 
                cx="50" cy="50" r="46" 
                fill="none" 
                stroke="var(--color-accent, #f43f5e)" 
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ strokeDasharray: "289 289", strokeDashoffset: 0 }}
                animate={{ 
                  strokeDashoffset: 289 - (289 * (timeLeft / MODES[mode]))
                }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>

            {/* Timer Display */}
            <div className="flex flex-col items-center relative z-10">
              <h1 className={`font-['Outfit'] font-light tracking-tighter text-white drop-shadow-2xl tabular-nums transition-all duration-500 ${zenMode ? 'text-8xl sm:text-9xl' : 'text-7xl sm:text-8xl'}`}>
                {formatTime(timeLeft)}
              </h1>
              {zenMode && isActive && (
                <div className="mt-6 text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest animate-pulse">
                  Deep Work Active
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className={`flex items-center gap-4 transition-all duration-500 ${zenMode ? 'scale-125 mt-4' : ''}`}>
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
                title="Toggle Ambient Brown Noise"
              >
                {isPlayingNoise ? <Volume2 size={18} /> : <CloudRain size={18} />}
              </button>
            )}
          </div>
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
