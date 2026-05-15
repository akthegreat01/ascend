import KPICards from "@/components/KPICards";
import CommandCenter from "@/components/CommandCenter";
import AILifeAnalysis from "@/components/AILifeAnalysis";
import DashboardHeader from "@/components/DashboardHeader";
import VelocityGraph from "@/components/VelocityGraph";
import DistributionRadar from "@/components/DistributionRadar";
import WellnessWidget from "@/components/WellnessWidget";
import CountdownWidget from "@/components/CountdownWidget";
import AffirmationCard from "@/components/AffirmationCard";
import StreakTracker from "@/components/StreakTracker";
import AdSlot from "@/components/AdSlot";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import SystemActionFeed from "@/components/SystemActionFeed";
import XPEngine from "@/components/XPEngine";
import AICoach from "@/components/AICoach";
import MomentumScore from "@/components/MomentumScore";
import LifeDashboard from "@/components/LifeDashboard";


import TodoList from "@/components/TodoList";
import TimeBlocker from "@/components/TimeBlocker";

export default function Home() {
  return (
    <div className="flex flex-col relative z-10 pb-12 gap-4">
      
      {/* ═══ TOP BAR: Header + KPIs ═══ */}
      <DashboardHeader />
      <KPICards />

      {/* ═══ ROW 1: Core Terminal — 2/3 + 1/3 ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* LEFT — Main Work Area */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <CommandCenter />
          
          {/* Action Hub */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
            <TodoList />
            <TimeBlocker />
          </div>
          
          {/* Intelligence Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <XPEngine />
            <AICoach />
            <MomentumScore />
          </div>
        </div>

        {/* RIGHT — Activity Feed + AI Analysis */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <SystemActionFeed />
          <AILifeAnalysis />
        </div>
      </div>

      {/* ═══ ROW 2: Life Systems Matrix ═══ */}
      <LifeDashboard />

      {/* ═══ ROW 3: Analytics + Utilities ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <VelocityGraph />
        <DistributionRadar />
        <ActivityHeatmap />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <StreakTracker />
            <WellnessWidget />
          </div>
          <AffirmationCard />
          <CountdownWidget />
        </div>
      </div>

      {/* Ad */}
      <AdSlot format="horizontal" />
    </div>
  );
}
