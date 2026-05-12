import KPICards from "@/components/KPICards";
import CommandCenter from "@/components/CommandCenter";
import TodoList from "@/components/TodoList";
import AILifeAnalysis from "@/components/AILifeAnalysis";
import EnergyMonitor from "@/components/EnergyMonitor";
import DailyWisdom from "@/components/DailyWisdom";
import TimeBlocker from "@/components/TimeBlocker";
import MediaVault from "@/components/MediaVault";
import DashboardHeader from "@/components/DashboardHeader";
import VelocityGraph from "@/components/VelocityGraph";
import DistributionRadar from "@/components/DistributionRadar";
import WellnessWidget from "@/components/WellnessWidget";
import CountdownWidget from "@/components/CountdownWidget";
import ExpenseWidget from "@/components/ExpenseWidget";
import AffirmationCard from "@/components/AffirmationCard";
import StreakTracker from "@/components/StreakTracker";
import AdSlot from "@/components/AdSlot";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import StrategicRoadmap from "@/components/StrategicRoadmap";
import SystemActionFeed from "@/components/SystemActionFeed";
import DigitalEcosystem from "@/components/DigitalEcosystem";
import HealthTracker from "@/components/HealthTracker";


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
        {/* Grid Layer 1: Strategic & Action Hub */}
        <section>
          <h2 className="section-label">Strategic Overview</h2>
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

        {/* Grid Layer 2: Metrics & Digital Ecosystem */}
        <section>
          <h2 className="section-label">Performance Metrics</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1 flex flex-col gap-8">
              <VelocityGraph />
              <EnergyMonitor />
            </div>
            <div className="xl:col-span-1 flex flex-col gap-8">
              <DistributionRadar />
              <DigitalEcosystem />
            </div>
            <div className="xl:col-span-1 flex flex-col gap-8">
              <ActivityHeatmap />
              <div className="grid grid-cols-2 gap-4">
                <StreakTracker />
                <WellnessWidget />
              </div>
              <ExpenseWidget />
            </div>
          </div>
        </section>

        {/* Grid Layer 3: Health & Biometrics */}
        <section>
          <h2 className="section-label">Bio-Optimization</h2>
          <HealthTracker />
        </section>

        {/* Grid Layer 4: Execution & Sidebars */}
        <section>
          <h2 className="section-label">Execution Hub</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1 h-[650px]">
              <TodoList />
            </div>
            <div className="xl:col-span-1 flex flex-col gap-8">
              <div className="h-[400px]">
                <MediaVault />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AffirmationCard />
                <CountdownWidget />
              </div>
              <AdSlot format="square" />
            </div>
            <div className="xl:col-span-1 h-[650px]">
              <TimeBlocker />
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
