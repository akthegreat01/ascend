"use client";

import { motion } from "framer-motion";
import { Link2, GitBranch, PenTool, MessageSquare, Code, LayoutTemplate, Video, FileText, Mail, Music, BookOpen, Globe, Zap, ExternalLink } from "lucide-react";

const links = [
  { name: "ChatGPT", icon: MessageSquare, color: "#10b981", url: "https://chat.openai.com" },
  { name: "GitHub", icon: GitBranch, color: "#ffffff", url: "https://github.com" },
  { name: "Figma", icon: PenTool, color: "#f472b6", url: "https://figma.com" },
  { name: "Notion", icon: LayoutTemplate, color: "#e5e5e5", url: "https://notion.so" },
  { name: "YouTube", icon: Video, color: "#ef4444", url: "https://youtube.com" },
  { name: "VS Code", icon: Code, color: "#3b82f6", url: "vscode://" },
  { name: "Docs", icon: FileText, color: "#60a5fa", url: "https://docs.google.com" },
  { name: "Gmail", icon: Mail, color: "#f87171", url: "https://mail.google.com" },
  { name: "Spotify", icon: Music, color: "#34d399", url: "https://open.spotify.com" },
  { name: "Medium", icon: BookOpen, color: "#d4d4d4", url: "https://medium.com" },
  { name: "LinkedIn", icon: Globe, color: "#60a5fa", url: "https://linkedin.com" },
  { name: "Vercel", icon: Zap, color: "#ffffff", url: "https://vercel.com/dashboard" },
];

export default function QuickLinks() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col group hover:border-[var(--color-accent)]/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <Link2 size={18} />
          </div>
          <div>
            <h3 className="font-medium text-white text-sm">Quick Portals</h3>
            <p className="text-[10px] text-[#a1a1aa]">Launch external tools</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 flex-1 content-start max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
        {links.map((link, idx) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#111] border border-[#ffffff06] hover:border-[#ffffff20] hover:bg-[#1a1a1a] transition-all duration-200 hover:-translate-y-0.5 group/link cursor-pointer"
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover/link:scale-110"
              style={{ backgroundColor: `${link.color}10` }}
            >
              <link.icon size={15} style={{ color: link.color }} className="opacity-80 group-hover/link:opacity-100 transition-opacity" />
            </div>
            <span className="text-[11px] font-medium text-[#a1a1aa] group-hover/link:text-white transition-colors text-center leading-tight">
              {link.name}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
