"use client";

interface AdSlotProps {
  format?: "horizontal" | "square" | "vertical" | "sidebar";
  className?: string;
}

export default function AdSlot({ format = "horizontal", className = "" }: AdSlotProps) {
  const sizeClasses = {
    horizontal: "w-full h-[90px]",
    square: "w-full h-[250px]",
    vertical: "w-full h-[600px]",
    sidebar: "w-full h-[300px]",
  };

  return (
    <div className={`${sizeClasses[format]} ${className} rounded-2xl border border-[#ffffff06] bg-[#080808] flex items-center justify-center overflow-hidden relative group`}>
      {/* This is where AdSense will inject. For now show a minimal placeholder */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client="ca-pub-9046932302377091"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {/* Subtle fallback when no ad is served */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <span className="text-[10px] text-white uppercase tracking-[0.3em] font-light">Ascend</span>
      </div>
    </div>
  );
}
