"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Brain, Timer, Sun, Smartphone, Dumbbell } from "lucide-react";
import AdSlot from "@/components/AdSlot";

const guides = [
  {
    slug: "deep-focus",
    title: "The Science of Deep Focus",
    desc: "How your brain enters flow state and the neuroscience behind sustained concentration.",
    readTime: "12 min",
    icon: Brain,
    color: "#a855f7",
  },
  {
    slug: "building-habits",
    title: "Building Habits That Actually Stick",
    desc: "The psychology of habit formation, the 2-minute rule, and designing your environment for success.",
    readTime: "15 min",
    icon: Dumbbell,
    color: "#f59e0b",
  },
  {
    slug: "pomodoro-guide",
    title: "The Pomodoro Technique: Complete Guide",
    desc: "Master time-boxing to eliminate procrastination and dramatically increase output.",
    readTime: "10 min",
    icon: Timer,
    color: "#ef4444",
  },
  {
    slug: "morning-routines",
    title: "Morning Routines of High Performers",
    desc: "How elite performers structure their first 90 minutes to dominate the rest of the day.",
    readTime: "14 min",
    icon: Sun,
    color: "#f97316",
  },
  {
    slug: "digital-minimalism",
    title: "Digital Minimalism & Defeating Distractions",
    desc: "Reclaim your attention from social media, notifications, and the attention economy.",
    readTime: "11 min",
    icon: Smartphone,
    color: "#06b6d4",
  },
];

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-light text-white tracking-tight mb-1">Learn</h1>
        <p className="text-sm text-[#a1a1aa]">In-depth guides to help you master productivity, focus, and self-improvement.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide, i) => (
          <motion.div
            key={guide.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              href={`/learn/${guide.slug}`}
              className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col gap-4 group hover:border-[#ffffff20] transition-all block h-full"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${guide.color}12` }}>
                  <guide.icon size={18} style={{ color: guide.color }} />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#a1a1aa] uppercase tracking-widest">
                  <Clock size={10} /> {guide.readTime}
                </div>
              </div>
              <div>
                <h2 className="text-base font-semibold text-white mb-1 group-hover:text-[var(--color-accent)] transition-colors">{guide.title}</h2>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">{guide.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#a1a1aa] group-hover:text-white transition-colors mt-auto">
                Read Guide <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <AdSlot format="horizontal" className="mt-4" />
    </div>
  );
}
