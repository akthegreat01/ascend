"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Timer, CheckSquare, Activity, BarChart3, Settings, PenLine, DollarSign, FileText, Music, Globe, Sunrise, Grid3X3, BookOpen, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    const handleOpen = () => setOpen(true);
    
    document.addEventListener("keydown", down);
    window.addEventListener("ascend_open_command_menu", handleOpen);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("ascend_open_command_menu", handleOpen);
    };
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[10vh] md:pt-[15vh] p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="relative w-full max-w-[650px] overflow-hidden rounded-[20px] border border-white/10 bg-black/40 backdrop-blur-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col max-h-[70vh] md:max-h-none"
          >
            <Command
              className="w-full flex flex-col"
              loop
            >
              <div className="flex items-center border-b border-white/10 px-4 pt-2">
                <SearchIcon />
                <Command.Input 
                  placeholder="What do you want to do?" 
                  className="w-full bg-transparent p-5 text-white placeholder-white/30 outline-none border-none text-2xl font-light"
                  autoFocus
                />
              </div>

              <Command.List className="overflow-y-auto custom-scrollbar p-2 max-h-[50vh]">
                <Command.Empty className="py-6 text-center text-sm text-[#a1a1aa]">
                  No results found in your neural network.
                </Command.Empty>

                <Command.Group heading="Command Center" className="text-xs font-medium text-[#a1a1aa] px-2 py-1">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors mt-1 font-medium"
                  >
                    <LayoutDashboard size={16} /> Matrix Dashboard
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/briefing"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <Sunrise size={16} /> Daily Briefing
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/tasks"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <CheckSquare size={16} /> Tasks
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Intelligence" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">

                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/priority"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <Grid3X3 size={16} /> Priority Matrix
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/notes"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <FileText size={16} /> Notes
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Flow" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/focus"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors mt-1 font-medium"
                  >
                    <Zap size={16} /> Focus Forge
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/timer"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <Timer size={16} /> Focus Timer
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/focus-sounds"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <Music size={16} /> Focus Sounds
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Growth" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/habits"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors mt-1 font-medium"
                  >
                    <Activity size={16} /> Discipline Matrix
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/analytics"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <BarChart3 size={16} /> Analytics
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/learn"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <BookOpen size={16} /> Productivity Guides
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Assets" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/wealth"))}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors mt-1 font-medium"
                  >
                    <DollarSign size={16} /> Wealth Matrix
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Actions" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => {
                      const e = new KeyboardEvent('keydown', { key: 'j', metaKey: true });
                      window.dispatchEvent(e);
                    })}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors mt-1 font-medium"
                  >
                    <PenLine size={16} /> Open Scratchpad
                    <span className="ml-auto text-[10px] bg-[#ffffff10] px-2 py-0.5 rounded text-[#a1a1aa]">Cmd+J</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => {
                      window.dispatchEvent(new Event("ascend_open_settings"));
                    })}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm text-white/80 aria-selected:bg-[var(--color-accent)] aria-selected:text-white aria-selected:shadow-lg transition-colors font-medium"
                  >
                    <Settings size={16} /> Manage Settings & Data
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 ml-2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
