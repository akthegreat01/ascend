import HealthTracker from "@/components/HealthTracker";

export default function HealthPage() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tight font-['Outfit'] mb-2 uppercase tracking-[0.2em]">
          Health Tracker
        </h1>
        <p className="text-gray-400 text-lg">
          Monitor your physical vitals, weight trajectory, and caloric intake.
        </p>
      </header>
      <HealthTracker />
    </div>
  );
}
