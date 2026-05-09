import VisionBoard from "@/components/VisionBoard";

export default function VisionPage() {
  return (
    <div className="flex flex-col gap-8 min-h-[calc(100vh-4rem)]">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Vision Board
        </h1>
        <p className="text-[#a1a1aa] text-sm max-w-2xl">
          A visual representation of your ultimate reality. Curate images that represent the environment, wealth, physics, and freedom you are working towards.
        </p>
      </header>

      <section>
        <VisionBoard />
      </section>
    </div>
  );
}
