"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/* ═══════════════════════════════════════════════════════
   CINEMATIC PAGE TRANSITION
   Smooth blur + fade + scale with spring physics
   ═══════════════════════════════════════════════════════ */

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12, filter: "blur(8px)", scale: 0.995 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, y: -8, filter: "blur(6px)", scale: 0.998 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1],
        scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      {children}
    </motion.div>
  );
}
