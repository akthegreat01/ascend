import TimeBlocker from "@/components/TimeBlocker";

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6 h-full">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tight font-['Outfit'] mb-2 uppercase tracking-[0.2em]">
          Focus Schedule
        </h1>
        <p className="text-gray-400 text-lg">
          Deep work orchestration and daily time-blocking.
        </p>
      </header>
      <div className="flex-1">
        <TimeBlocker />
      </div>
    </div>
  );
}
