"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";

export default function DashboardHeader() {
  const [greeting, setGreeting] = useState("Welcome back");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Dynamic greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Get name from storage
    const savedName = localStorage.getItem("ascend_name");
    if (savedName) setUserName(savedName);

    // Listen for name updates
    const handleProfileUpdate = () => {
      const updatedName = localStorage.getItem("ascend_name");
      if (updatedName) setUserName(updatedName);
    };
    window.addEventListener("ascend_profile_updated", handleProfileUpdate);
    return () => window.removeEventListener("ascend_profile_updated", handleProfileUpdate);
  }, []);

  const openSettings = () => {
    window.dispatchEvent(new Event("ascend_open_settings"));
  };

  const openCommandMenu = () => {
    window.dispatchEvent(new Event("ascend_open_command_menu"));
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-light text-white tracking-tighter mb-3 flex items-center gap-3">
          {greeting}, <span 
            onClick={openSettings}
            className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-rose-400 cursor-pointer hover:drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] transition-all duration-500 font-['Outfit']"
            title="Click to change name"
          >{userName}.</span>
        </h1>
        <p className="text-[#a1a1aa] text-sm md:text-base font-medium flex items-center gap-2.5 opacity-80">
          <Sparkles size={16} className="text-amber-400 animate-pulse" />
          The system is optimized. Current focus: <span className="text-white font-bold">Peak Performance</span>
        </p>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={openCommandMenu}
        className="relative group overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_25px_50px_rgba(255,255,255,0.2)] transition-all font-black text-sm tracking-widest uppercase"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
        <Plus size={18} strokeWidth={3} className="relative z-10" />
        <span className="relative z-10">New Objective</span>
      </motion.button>
    </motion.header>
  );
}
