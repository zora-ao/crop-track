import { DashboardStats } from "@/types/dashboard"
import { useQuery } from "@tanstack/react-query"

export const useDashboardStats = () => {

    return useQuery<DashboardStats>({
        queryKey: ["dashboard-key"],

        queryFn: async() => {
            const res = await fetch("/api/stats");

            if(!res.ok){
                throw new Error("Failed to fetch stats")
            }

            return res.json();
        }
    })
}