import { Harvest } from "@/types/harvest"
import { useQuery } from "@tanstack/react-query"


export const useHarvest = () => {

    return useQuery<Harvest[]>({
        queryKey: ["harvests"],
        queryFn: async() => {
            const res = await fetch("/api/harvest");

            if(!res.ok){
                throw new Error("Failed to fetch harvests");
            }

            return res.json();
        }
    })
};