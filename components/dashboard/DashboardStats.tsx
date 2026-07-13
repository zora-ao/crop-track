"use client";

import { useDashboardStats } from "@/hooks/useDashboardStats";
import StatCard from "./StatCard";
import { StatCardSkeleton } from "@/components/ui/loading-skeleton";

export default function DashboardStats() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return <StatCardSkeleton count={4} />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Crops"
        value={data.total}
      />

      <StatCard
        title="Planned"
        value={data.planned}
      />

      <StatCard
        title="Growing"
        value={data.growing}
      />

      <StatCard
        title="Harvested"
        value={data.harvested}
      />
    </div>
  );
}