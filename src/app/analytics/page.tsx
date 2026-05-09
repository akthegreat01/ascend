import ProductivityCharts from "@/components/ProductivityCharts";
import DeepAnalytics from "@/components/DeepAnalytics";
import YearMap from "@/components/YearMap";
import AdSlot from "@/components/AdSlot";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Deep Analytics
        </h1>
        <p className="text-[#a1a1aa] text-sm">
          Review your performance trends and time allocation.
        </p>
      </header>

      <section className="mb-2">
        <DeepAnalytics />
      </section>

      <section className="mb-6">
        <YearMap />
      </section>

      <section className="h-[600px]">
        <ProductivityCharts />
      </section>

      <AdSlot format="horizontal" />
    </div>
  );
}
