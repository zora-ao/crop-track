import { Crop } from "@/types/crop";
import { useQuery } from "@tanstack/react-query"

export const useCrops = () => {

    return useQuery<Crop[]>({
        queryKey: ["crops"],
        queryFn: async() => {
            const res = await fetch("/api/crops");

            if (!res.ok){
                throw new Error(
                    "Failed to fetch crops"
                );
            }

            return res.json();
        },
    });
}