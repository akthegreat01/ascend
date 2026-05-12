"use client";

import { motion } from "framer-motion";
import { Terminal, Play, CheckCircle2, Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProtocolEngine() {
  const router = useRouter();
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  const executeProtocol = (protocol: string) => {
    setActiveProtocol(protocol);
    
    // Simulate complex protocol execution
    setTimeout(() => {
      if (protocol === "deep_work") {
        // Example: Turn on DND, set soundscape, open focus forge
        localStorage.setItem("ascend_active_sound", "neural_static");
        window.dispatchEvent(new Event("ascend_sound_change"));
        router.push("/focus");
      } else if (protocol === "end_of_day") {
        router.push("/briefing");
      } else if (protocol === "morning_brief") {
        router.push("/tasks");
      }
      setActiveProtocol(null);
    }, 1500);
  };

  const protocols = [
    {
      id: "deep_work",
      name: "Deep Work Protocol",
      description: "Init Focus Forge + Neural Static Audio",
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20 hover:border-emerald-400/40 hover:bg-emerald-400/20",
      icon: <Terminal size={14} className="text-emerald-400" />
    },
    {
      id: "morning_brief",
      name: "Morning Briefing",
      description: "Review Master Task List & Align Goals",
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20 hover:border-amber-400/40 hover:bg-amber-400/20",
      icon: <CheckCircle2 size={14} className="text-amber-400" />
    },
    {
      id: "end_of_day",
      name: "End of Day Shutdown",
      description: "Log Journal Entry & Clear Workspace",
      color: "text-rose-400 bg-rose-400/10 border-rose-400/20 hover:border-rose-400/40 hover:bg-rose-400/20",
      icon: <Workflow size={14} className="text-rose-400" />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass-panel p-8 flex flex-col group relative overflow-hidden"
    >
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-2.5 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] shadow-[0_0_20px_rgba(244,63,94,0.15)] group-hover:scale-110 transition-transform duration-500">
          <Workflow size={20} />
        </div>
        <div>
          <h3 className="text-[11px] font-black text-white tracking-[0.2em] uppercase">Execution Protocols</h3>
          <p className="text-[10px] text-[#a1a1aa] font-bold tracking-widest uppercase opacity-60">Workflow Macros</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {protocols.map(p => (
          <button
            key={p.id}
            onClick={() => executeProtocol(p.id)}
            disabled={activeProtocol !== null}
            className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-500 ${p.color} ${activeProtocol === p.id ? "animate-pulse scale-[0.98] opacity-80" : ""} ${activeProtocol && activeProtocol !== p.id ? "opacity-30" : ""}`}
          >
            <div className="mt-0.5 p-2 rounded-lg bg-black/20 group-hover:bg-black/40 transition-colors">{p.icon}</div>
            <div className="flex-1">
              <h4 className="text-[13px] font-black tracking-wide text-white uppercase">{activeProtocol === p.id ? "Executing..." : p.name}</h4>
              <p className="text-[10px] font-medium opacity-60 mt-1.5 leading-relaxed tracking-tight">{p.description}</p>
            </div>
            {activeProtocol === p.id ? (
               <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin mt-1" />
            ) : (
               <div className="mt-1 p-1.5 rounded-lg bg-white/5 group-hover:bg-white/20 transition-all">
                <Play size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-white fill-white" />
               </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
