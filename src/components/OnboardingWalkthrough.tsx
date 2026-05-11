"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Command, CheckCircle2, ChevronRight, Play } from "lucide-react";

const steps = [
  {
    title: "Welcome to Ascend",
    description: "Your comprehensive Life Operating System. Designed for peak execution, habit tracking, and deep focus.",
    icon: Play,
  },
  {
    title: "The Dashboard Hub",
    description: "Your control center. View your Neural Energy levels, Daily Discipline snapshot, and AI-driven life insights at a glance.",
    icon: Sparkles,
  },
  {
    title: "AI Smart Capture",
    description: "Use the Brain Dump box. Start your sentence with 'Task:' to add to your Todo list, or 'Goal:' to add to your Strategic Vision. Everything else goes to the Journal.",
    icon: Brain,
  },
  {
    title: "Deep Focus Forge",
    description: "Eliminate distractions. Use the Focus Timer and integrated ambient Focus Sounds to achieve prolonged states of flow.",
    icon: CheckCircle2,
  },
  {
    title: "Evolution & Analytics",
    description: "Every task completed earns you XP. Level up your skills in the Evolution Tree, track Hobbies, and view your Activity Heatmap.",
    icon: Command,
  },
  {
    title: "Command Instantly",
    description: "Press Cmd+K anywhere in the app to open the Global Command Menu. Navigate your entire ecosystem without touching the mouse.",
    icon: ChevronRight,
  }
];

export default function OnboardingWalkthrough() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasCompleted = localStorage.getItem("ascend_onboarding_completed");
    if (!hasCompleted) {
      setIsOpen(true);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem("ascend_onboarding_completed", "true");
    setIsOpen(false);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[#0a0a0a] border border-[#ffffff20] rounded-3xl p-8 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-accent)] opacity-20 blur-[100px] pointer-events-none rounded-full" />
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-[var(--color-accent)]' : 'w-2 bg-[#ffffff20]'}`} 
                  />
                ))}
              </div>
              <button onClick={completeOnboarding} className="text-xs text-[#a1a1aa] hover:text-white transition-colors">
                Skip
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ffffff10] to-transparent border border-[#ffffff20] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  {(() => {
                    const StepIcon = steps[currentStep].icon;
                    return <StepIcon size={32} className="text-white" />;
                  })()}
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">{steps[currentStep].title}</h2>
                <p className="text-[#a1a1aa] leading-relaxed mb-8">{steps[currentStep].description}</p>
                
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={nextStep}
              className="w-full py-4 bg-gradient-to-r from-white to-gray-300 text-black font-bold rounded-xl hover:from-white hover:to-white transition-all duration-150 flex items-center justify-center gap-2 active:scale-95 relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {currentStep === steps.length - 1 ? (
                <>Initialize Ascend <CheckCircle2 size={18} /></>
              ) : (
                <>Next Step <ChevronRight size={18} /></>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
