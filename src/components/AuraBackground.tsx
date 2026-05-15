"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════
   TIME-ADAPTIVE AURA BACKGROUND
   Changes color temperature and mood throughout the day:
   - Morning: Warm gold/amber
   - Afternoon: Cool blue/teal
   - Evening: Rich rose/violet  
   - Night: Deep indigo/purple
   ═══════════════════════════════════════════════════════ */

function getTimeTheme() {
  const hour = new Date().getHours();
  
  // The user requested a specific "really light" mix of red, blue, and purple.
  return { 
    primary: "#ffb3c6",   // Light Pastel Red/Pink
    secondary: "#c8b6ff", // Light Pastel Purple
    ambient: "#a0c4ff",   // Light Pastel Blue
    name: "light-pastel" 
  };
}

export default function AuraBackground() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState(getTimeTheme());
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    setMounted(true);
    setTheme(getTimeTheme());

    // Update theme every 10 minutes
    const themeInterval = setInterval(() => {
      setTheme(getTimeTheme());
    }, 600000);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    // Generate firefly particles
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(themeInterval);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Right Orb — Primary */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen opacity-60 filter blur-[100px]"
        style={{ background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)` }}
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

      {/* Bottom Left Orb — Secondary */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[80vw] h-[80vw] rounded-full mix-blend-screen opacity-50 filter blur-[120px]"
        style={{ background: `radial-gradient(circle, ${theme.secondary} 0%, transparent 70%)` }}
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
      
      {/* Center ambient breathing glow */}
      <motion.div
        className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[90px]"
        style={{ background: `radial-gradient(circle, ${theme.ambient} 0%, transparent 70%)` }}
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Interactive Mouse Aura */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none mix-blend-screen opacity-8 filter blur-[100px]"
        style={{ background: `radial-gradient(circle, ${theme.primary} 0%, transparent 50%)` }}
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

      {/* Floating Bokeh Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full mix-blend-screen"
          style={{ 
            left: `${p.x}vw`, 
            top: `${p.y}vh`,
            width: p.size,
            height: p.size,
            background: i % 3 === 0 ? theme.primary : i % 3 === 1 ? theme.secondary : theme.ambient,
            boxShadow: `0 0 ${p.size * 3}px ${theme.primary}80` 
          }}
          animate={{
            y: [0, -150, -300],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Light Mesh Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-20 pointer-events-none" />
    </div>
  );
}
