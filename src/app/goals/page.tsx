import GoalSystem from "@/components/GoalSystem";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-8 min-h-[calc(100vh-4rem)]">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Goal Achievement System
        </h1>
        <p className="text-[#a1a1aa] text-sm max-w-2xl">
          Break down your macro vision into actionable micro-milestones. Track momentum, estimate timelines, and visualize your progress toward long-term ascension.
        </p>
      </header>

      <section>
        <GoalSystem />
      </section>
    </div>
  );
}
