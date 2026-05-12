import KPICards from "@/components/KPICards";
import CommandCenter from "@/components/CommandCenter";
import AILifeAnalysis from "@/components/AILifeAnalysis";
import EnergyMonitor from "@/components/EnergyMonitor";
import DailyWisdom from "@/components/DailyWisdom";
import DashboardHeader from "@/components/DashboardHeader";
import VelocityGraph from "@/components/VelocityGraph";
import DistributionRadar from "@/components/DistributionRadar";
import WellnessWidget from "@/components/WellnessWidget";
import CountdownWidget from "@/components/CountdownWidget";
import AffirmationCard from "@/components/AffirmationCard";
import StreakTracker from "@/components/StreakTracker";
import AdSlot from "@/components/AdSlot";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import StrategicRoadmap from "@/components/StrategicRoadmap";
import SystemActionFeed from "@/components/SystemActionFeed";


export default function Home() {
  return (
    <div className="flex flex-col relative z-10 pb-20">
      
      {/* Header Section */}
      <div className="mb-10">
        <DashboardHeader />
      </div>

      {/* KPI Section */}
      <div className="mb-12">
        <KPICards />
      </div>

      <div className="space-y-12">
        {/* Row 1: Focus & Direction */}
        <section>
          <h2 className="section-label">Focus & Direction</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 flex flex-col gap-8">
              <CommandCenter />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StrategicRoadmap />
                <DailyWisdom />
              </div>
            </div>
            <div className="xl:col-span-1 flex flex-col gap-8">
              <SystemActionFeed />
              <AILifeAnalysis />
            </div>
          </div>
        </section>

        {/* Row 2: Performance Analytics */}
        <section>
          <h2 className="section-label">Performance Analytics</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1 flex flex-col gap-8">
              <VelocityGraph />
              <EnergyMonitor />
            </div>
            <div className="xl:col-span-1 flex flex-col gap-8">
              <DistributionRadar />
              <ActivityHeatmap />
            </div>
            <div className="xl:col-span-1 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <StreakTracker />
                <WellnessWidget />
              </div>
              <AffirmationCard />
              <CountdownWidget />
              <AdSlot format="square" />
            </div>
          </div>
        </section>
      </div>

      {/* Horizontal Ad Break */}
      <div className="mt-16">
        <AdSlot format="horizontal" />
      </div>
    </div>
  );
}
