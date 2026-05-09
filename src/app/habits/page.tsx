import HabitSheet from "@/components/HabitSheet";

export default function HabitsPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Discipline Matrix
        </h1>
        <p className="text-[#a1a1aa] text-sm">
          Track your daily protocols. Build unbreakable streaks.
        </p>
      </header>

      <div className="flex-1 w-full max-w-[1200px]">
        <HabitSheet />
      </div>
    </div>
  );
}
