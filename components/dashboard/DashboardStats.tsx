"use client";

import { useDashboardStats } from "@/hooks/useDashboardStats";
import StatCard from "./StatCard";
import { Card } from "@/components/ui/card";

export default function DashboardStats() {
  const { data, isLoading } = useDashboardStats();

  // Premium Skeleton Loading State
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="h-[105px] w-full border border-border/60 bg-card p-6 flex flex-col justify-between animate-pulse">
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-7 bg-muted rounded w-1/3 mt-2" />
          </Card>
        ))}
      </div>
    );
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