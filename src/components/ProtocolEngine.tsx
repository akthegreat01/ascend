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
        localStorage.setItem("nexus_active_sound", "neural_static");
        window.dispatchEvent(new Event("nexus_sound_change"));
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
      className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col group hover:border-[var(--color-accent)]/30 transition-colors"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
          <Workflow size={18} />
        </div>
        <div>
          <h3 className="font-medium text-white">Execution Protocols</h3>
          <p className="text-xs text-[#a1a1aa]">Automated workflow macros</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {protocols.map(p => (
          <button
            key={p.id}
            onClick={() => executeProtocol(p.id)}
            disabled={activeProtocol !== null}
            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${p.color} ${activeProtocol === p.id ? "animate-pulse scale-[0.98] opacity-80" : ""} ${activeProtocol && activeProtocol !== p.id ? "opacity-30" : ""}`}
          >
            <div className="mt-0.5">{p.icon}</div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">{activeProtocol === p.id ? "Executing..." : p.name}</h4>
              <p className="text-[10px] opacity-80 mt-1">{p.description}</p>
            </div>
            {activeProtocol === p.id ? (
               <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin mt-1" />
            ) : (
               <Play size={14} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 text-white" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
