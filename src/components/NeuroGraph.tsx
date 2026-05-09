"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Zap, Target, Flame, CheckCircle2, Search } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "goal" | "habit" | "task" | "vision";
  x: number;
  y: number;
  connections: string[];
}

export default function NeuroGraph() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = () => {
      const goals = JSON.parse(localStorage.getItem("nexus_goals") || "[]");
      const habits = JSON.parse(localStorage.getItem("nexus_habits") || "[]");
      const tasks = JSON.parse(localStorage.getItem("nexus_premium_tasks") || "[]");
      
      const newNodes: Node[] = [];
      const width = 800;
      const height = 500;

      // Add Goals (Center)
      goals.forEach((g: any, i: number) => {
        newNodes.push({
          id: `goal-${g.id}`,
          label: g.title,
          type: "goal",
          x: width / 2 + Math.cos((i / goals.length) * 2 * Math.PI) * 150,
          y: height / 2 + Math.sin((i / goals.length) * 2 * Math.PI) * 150,
          connections: []
        });
      });

      // Add Habits (Orbiting Goals)
      habits.forEach((h: any, i: number) => {
        const goalId = goals[i % goals.length]?.id;
        newNodes.push({
          id: `habit-${h.id}`,
          label: h.name,
          type: "habit",
          x: width / 2 + Math.cos((i / habits.length) * 2 * Math.PI) * 250,
          y: height / 2 + Math.sin((i / habits.length) * 2 * Math.PI) * 250,
          connections: goalId ? [`goal-${goalId}`] : []
        });
      });

      // Add Tasks (Outer Ring)
      tasks.slice(0, 10).forEach((t: any, i: number) => {
        newNodes.push({
          id: `task-${t.id}`,
          label: t.title,
          type: "task",
          x: width / 2 + Math.cos((i / 10) * 2 * Math.PI) * 350,
          y: height / 2 + Math.sin((i / 10) * 2 * Math.PI) * 350,
          connections: []
        });
      });

      setNodes(newNodes);
    };

    loadData();
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const iconMap = {
    goal: <Target size={14} className="text-blue-400" />,
    habit: <Flame size={14} className="text-amber-400" />,
    task: <CheckCircle2 size={14} className="text-emerald-400" />,
    vision: <Zap size={14} className="text-rose-400" />
  };

  const colors = {
    goal: "border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    habit: "border-amber-500/50 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    task: "border-emerald-500/50 bg-emerald-400/10 shadow-[0_0_15px_rgba(52,211,153,0.3)]",
    vision: "border-rose-500/50 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
  };

  return (
    <div className="flex flex-col gap-8 h-full min-h-[700px]">
      <header>
        <h1 className="text-2xl font-light text-white tracking-tight mb-1 flex items-center gap-3">
          Neural Map
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest">
            Knowledge Visualization
          </span>
        </h1>
        <p className="text-sm text-[#a1a1aa]">Visualize the interconnected synaptic pathways of your life operating system.</p>
      </header>

      <div className="relative flex-1 bg-[#050505] rounded-3xl border border-[#ffffff08] overflow-hidden group cursor-crosshair">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(#ffffff05 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }} />

        {/* SVG Connections Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {nodes.map(node => 
            node.connections.map(targetId => {
              const target = nodes.find(n => n.id === targetId);
              if (!target) return null;
              return (
                <line 
                  key={`${node.id}-${targetId}`}
                  x1={node.x} y1={node.y}
                  x2={target.x} y2={target.y}
                  stroke="white" strokeWidth="0.5" strokeDasharray="4 4"
                />
              );
            })
          )}
        </svg>

        {/* Nodes Layer */}
        <div className="relative w-full h-full" ref={containerRef}>
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragConstraints={containerRef}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x: node.x - 60, y: node.y - 30 }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              onPointerDown={() => setSelectedNode(node)}
              className={`absolute w-32 p-3 rounded-2xl border backdrop-blur-md cursor-grab active:cursor-grabbing transition-all ${colors[node.type]} ${selectedNode?.id === node.id ? 'ring-2 ring-white/20' : ''}`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-1.5 rounded-lg bg-black/40">
                  {iconMap[node.type]}
                </div>
                <span className="text-[9px] text-white font-medium text-center leading-tight truncate w-full">
                  {node.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-8 right-8 w-64 glass-panel p-6 bg-black/80 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-white/5">
                  {iconMap[selectedNode.type]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest">{selectedNode.type}</h4>
                  <p className="text-[10px] text-[#a1a1aa]">Neural Node Active</p>
                </div>
              </div>
              <h3 className="text-lg font-light text-white mb-4 leading-tight">{selectedNode.label}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-black text-[#a1a1aa]">
                    <span>Connections</span>
                    <span>{selectedNode.connections.length}</span>
                </div>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-widest"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="absolute bottom-8 left-8 flex gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl">
           {Object.entries(iconMap).map(([type, icon]) => (
             <div key={type} className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full" style={{ 
                 backgroundColor: type === "goal" ? "#3b82f6" : type === "habit" ? "#f59e0b" : type === "task" ? "#10b981" : "#f43f5e" 
               }} />
               <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest font-bold">{type}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
