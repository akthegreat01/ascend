import FocusTimer from "@/components/FocusTimer";

export default function TimerPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Focus Timer
        </h1>
        <p className="text-[#a1a1aa] text-sm">
          Deep work sessions. Eliminate distractions.
        </p>
      </header>

      {/* Timer Container */}
      <div className="flex-1 flex flex-col xl:flex-row gap-8 items-center justify-center w-full max-w-[1400px] mx-auto">
        <div className="w-full xl:w-2/3 aspect-[16/9] min-h-[500px]">
          <FocusTimer />
        </div>
        
        {/* Spotify Premium Embed */}
        <div className="w-full xl:w-1/3 h-[500px] glass-panel overflow-hidden border-[#ffffff15] p-2 bg-[#0a0a0a]">
          <iframe 
            style={{ borderRadius: '16px' }} 
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen={false} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
