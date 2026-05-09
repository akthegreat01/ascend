import JournalVault from "@/components/JournalVault";

export default function JournalPage() {
  return (
    <div className="flex flex-col gap-8 min-h-[calc(100vh-4rem)]">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Memory & Reflection Vault
        </h1>
        <p className="text-[#a1a1aa] text-sm max-w-2xl">
          Document your evolution. Seal memories, milestones, and daily reflections into your permanent vault to track your emotional and cognitive journey over time.
        </p>
      </header>

      <section className="flex-1">
        <JournalVault />
      </section>
    </div>
  );
}
