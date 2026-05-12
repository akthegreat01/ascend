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
      className="glass-panel p-8 flex flex-col group relative overflow-hidden h-full"
    >
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-500">
            <Link2 size={20} />
          </div>
          <div>
            <h3 className="text-[11px] font-black text-white tracking-[0.2em] uppercase">Quick Portals</h3>
            <p className="text-[10px] text-[#a1a1aa] font-bold tracking-widest uppercase opacity-60">Neural Shortcuts</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 flex-1 content-start overflow-y-auto custom-scrollbar pr-2 relative z-10">
        {links.map((link, idx) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 group/link cursor-pointer"
          >
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/link:scale-110 group-hover/link:shadow-lg"
              style={{ backgroundColor: `${link.color}15` }}
            >
              <link.icon size={16} style={{ color: link.color }} className="opacity-80 group-hover/link:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] font-black text-[#a1a1aa] group-hover/link:text-white transition-colors text-center leading-tight uppercase tracking-widest">
              {link.name}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
