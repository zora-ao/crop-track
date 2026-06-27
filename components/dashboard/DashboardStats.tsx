"use client";

import { useDashboardStats }
from "@/hooks/useDashboardStats";

import StatCard
from "./StatCard";

export default function DashboardStats() {
    const {
        data,
        isLoading,
    } = useDashboardStats();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data) {
        return null;
    }

    return (
        <div className="
            grid
            gap-4
            md:grid-cols-2
            lg:grid-cols-4
        ">
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