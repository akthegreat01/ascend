"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PenLine } from "lucide-react";

export default function Scratchpad() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_scratchpad");
    if (saved) setContent(saved);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_scratchpad", content);
    }
  }, [content, isLoaded]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "j") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-4 right-4 left-4 md:left-auto md:bottom-6 md:right-6 md:w-96 h-[500px] max-h-[70vh] z-[100] glass-panel bg-[#0a0a0a]/95 backdrop-blur-2xl border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-2 text-white">
                <PenLine size={16} className="text-[var(--color-accent)]" />
                <span className="font-bold text-xs uppercase tracking-widest">Scratchpad</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#a1a1aa] hover:text-white transition-all bg-white/5 p-1.5 rounded-lg"
              >
                <X size={16} />
              </button>
            </div>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Dump your thoughts here..."
              className="flex-1 w-full bg-transparent p-6 text-white text-[15px] leading-relaxed resize-none focus:outline-none placeholder-white/20 custom-scrollbar font-light"
              spellCheck={false}
            />
            <div className="px-4 py-3 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-[#a1a1aa]/50 flex justify-between bg-black/40">
              <span>Cloud Sync: Active</span>
              <span className="hidden md:block">Press Cmd+J to toggle</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
