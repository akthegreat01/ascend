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
    const saved = localStorage.getItem("nexus_scratchpad");
    if (saved) setContent(saved);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("nexus_scratchpad", content);
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
            className="fixed bottom-6 right-6 w-96 h-[500px] z-[100] glass-panel bg-[#0a0a0a]/90 backdrop-blur-2xl border-[#ffffff20] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#ffffff10] bg-[#111111]/50">
              <div className="flex items-center gap-2 text-white">
                <PenLine size={16} />
                <span className="font-medium text-sm tracking-wide">Journal Scratchpad</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#a1a1aa] hover:text-white transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Dump your thoughts here... (Markdown supported)"
              className="flex-1 w-full bg-transparent p-4 text-white text-sm resize-none focus:outline-none placeholder-[#ffffff30] custom-scrollbar"
              spellCheck={false}
            />
            <div className="p-2 border-t border-[#ffffff10] text-[10px] text-[#a1a1aa] flex justify-between bg-[#050505]">
              <span>Autosaved locally</span>
              <span>Press Cmd+J to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
