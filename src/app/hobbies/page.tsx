import HobbyTracker from "@/components/HobbyTracker";

export default function HobbiesPage() {
  return (
    <div className="flex flex-col gap-8 min-h-[calc(100vh-4rem)]">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Skill Foundry
        </h1>
        <p className="text-[#a1a1aa] text-sm max-w-2xl">
          Track the hours you invest into mastering new skills and hobbies. Every 10 hours of focused practice increases your mastery level.
        </p>
      </header>

      <section>
        <HobbyTracker />
      </section>
    </div>
  );
}
