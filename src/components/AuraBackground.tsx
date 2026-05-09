"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuraBackground() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Right Orb */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-20 filter blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Bottom Left Orb */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-10 filter blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Center ambient glow */}
      <motion.div
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full mix-blend-screen opacity-[0.03] filter blur-[80px]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        animate={{
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Interactive Mouse Aura */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none mix-blend-screen opacity-10 filter blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 50%)" }}
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.5
        }}
      />

      {/* Premium Dark Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
    </div>
  );
}
