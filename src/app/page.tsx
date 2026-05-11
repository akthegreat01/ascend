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
    <div className="flex flex-col relative z-10 pb-12">
      
      {/* Header Section */}
      <div className="mb-6">
        <DashboardHeader />
      </div>

      {/* KPI Section */}
      <div className="mb-8">
        <KPICards />
      </div>

      {/* Grid Layer 1: Strategic & Action Hub */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <CommandCenter />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StrategicRoadmap />
            <DailyWisdom />
          </div>
        </div>
        <div className="xl:col-span-1 flex flex-col gap-6">
          <SystemActionFeed />
          <AILifeAnalysis />
        </div>
      </div>

      {/* Grid Layer 2: Metrics & Digital Ecosystem */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-1 flex flex-col gap-6">
          <VelocityGraph />
          <EnergyMonitor />
        </div>
        <div className="xl:col-span-1 flex flex-col gap-6">
          <DistributionRadar />
          <DigitalEcosystem />
        </div>
        <div className="xl:col-span-1 flex flex-col gap-6">
          <ActivityHeatmap />
          <div className="grid grid-cols-2 gap-4">
            <StreakTracker />
            <WellnessWidget />
          </div>
          <ExpenseWidget />
        </div>
      </div>

      {/* Grid Layer 3: Health & Biometrics */}
      <div className="mb-8">
        <HealthTracker />
      </div>

      {/* Grid Layer 4: Execution & Sidebars */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 h-[600px]">
          <TodoList />
        </div>
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="h-[350px]">
            <MediaVault />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AffirmationCard />
            <CountdownWidget />
          </div>
          <AdSlot format="square" />
        </div>
        <div className="xl:col-span-1 h-[600px]">
          <TimeBlocker />
        </div>
      </div>

      {/* Horizontal Ad Break */}
      <div className="mt-8">
        <AdSlot format="horizontal" />
      </div>
    </div>
  );
}
