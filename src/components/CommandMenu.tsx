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
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh]">
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
            className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-[#ffffff20] bg-[#0e0e0e] shadow-2xl"
          >
            <Command
              className="w-full flex flex-col h-full"
              loop
            >
              <div className="flex items-center border-b border-[#ffffff10] px-3">
                <SearchIcon />
                <Command.Input 
                  placeholder="Quick Search (Cmd+K)..." 
                  className="w-full bg-transparent p-4 text-white placeholder-[#ffffff40] outline-none border-none text-base"
                  autoFocus
                />
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                <Command.Empty className="py-6 text-center text-sm text-[#a1a1aa]">
                  No results found in your neural network.
                </Command.Empty>

                <Command.Group heading="Command Center" className="text-xs font-medium text-[#a1a1aa] px-2 py-1">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors mt-1"
                  >
                    <LayoutDashboard size={16} /> Matrix Dashboard
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/briefing"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
                  >
                    <Sunrise size={16} /> Daily Briefing
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/tasks"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
                  >
                    <CheckSquare size={16} /> Tasks
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Intelligence" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">

                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/priority"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
                  >
                    <Grid3X3 size={16} /> Priority Matrix
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/notes"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
                  >
                    <FileText size={16} /> Notes
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Flow" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/focus"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors mt-1"
                  >
                    <Zap size={16} /> Focus Forge
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/timer"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
                  >
                    <Timer size={16} /> Focus Timer
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/focus-sounds"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
                  >
                    <Music size={16} /> Focus Sounds
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Growth" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/habits"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors mt-1"
                  >
                    <Activity size={16} /> Discipline Matrix
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/analytics"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
                  >
                    <BarChart3 size={16} /> Analytics
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/learn"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
                  >
                    <BookOpen size={16} /> Productivity Guides
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Assets" className="text-xs font-medium text-[#a1a1aa] px-2 py-1 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/wealth"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors mt-1"
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
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors mt-1"
                  >
                    <PenLine size={16} /> Open Scratchpad
                    <span className="ml-auto text-[10px] bg-[#ffffff10] px-2 py-0.5 rounded text-[#a1a1aa]">Cmd+J</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => {
                      window.dispatchEvent(new Event("ascend_open_settings"));
                    })}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-white aria-selected:bg-[#ffffff15] transition-colors"
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 ml-1">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
