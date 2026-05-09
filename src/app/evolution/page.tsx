import EvolutionTree from "@/components/EvolutionTree";

export default function EvolutionPage() {
  return (
    <div className="flex flex-col gap-8 min-h-[calc(100vh-4rem)]">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Life Leveling System
        </h1>
        <p className="text-[#a1a1aa] text-sm max-w-2xl">
          Turn self-improvement into a progression system. Your interface visually evolves as you level up these eight core areas of your life.
        </p>
      </header>

      <section>
        <EvolutionTree />
      </section>
      
      <section className="mt-8 glass-panel p-8 bg-[#0a0a0a] border border-[#ffffff10] text-center max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-black mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_var(--color-accent)] opacity-80">
          <span className="text-white font-bold text-2xl font-['Outfit']">Lv.24</span>
        </div>
        <h2 className="text-xl font-medium text-white mb-2">Overall Ascension Level</h2>
        <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
          Your overall ascension is calculated by aggregating your discipline, focus, and habit completion across all categories. Continue logging deep work sessions to unlock the next atmospheric tier.
        </p>
        <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden border border-[#ffffff10]">
          <div className="w-[64%] h-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
        </div>
        <p className="text-xs text-[#a1a1aa] mt-3 uppercase tracking-widest font-bold">14,300 / 22,000 XP</p>
      </section>
    </div>
  );
}
