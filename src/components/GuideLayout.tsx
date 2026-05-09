"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";

interface GuideLayoutProps {
  title: string;
  subtitle: string;
  readTime: string;
  children: ReactNode;
}

export default function GuideLayout({ title, subtitle, readTime, children }: GuideLayoutProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <Link href="/learn" className="inline-flex items-center gap-2 text-xs text-[#a1a1aa] hover:text-white transition-colors mb-8 group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Guides
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight mb-3">{title}</h1>
        <p className="text-[#a1a1aa] text-sm mb-4">{subtitle}</p>
        <div className="flex items-center gap-4 text-[10px] text-[#a1a1aa] uppercase tracking-widest">
          <div className="flex items-center gap-1.5"><Clock size={12} /> {readTime}</div>
          <div className="flex items-center gap-1.5"><BookOpen size={12} /> Guide</div>
        </div>
      </header>

      <AdSlot format="horizontal" className="mb-10" />

      <div className="prose-dark space-y-6 text-[#d4d4d4] text-[15px] leading-[1.8] font-light">
        {children}
      </div>

      <AdSlot format="horizontal" className="mt-12 mb-8" />

      <div className="border-t border-[#ffffff08] pt-8 mt-12">
        <p className="text-xs text-[#a1a1aa] mb-4">Enjoyed this guide? Explore more:</p>
        <Link href="/learn" className="text-sm text-white hover:text-[var(--color-accent)] transition-colors font-medium">
          ← All Guides
        </Link>
      </div>
    </motion.article>
  );
}
