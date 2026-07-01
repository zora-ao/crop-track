import { Journal } from "@/types/journal"
import { useQuery } from "@tanstack/react-query"


export const useJournals = () => {

    return useQuery<Journal[]>({
        queryKey: ['journals'],

        queryFn: async() => {
            const res = await fetch("/api/journal");

            if(!res.ok){
                throw new Error("Failed to fetch journals");
            }

            return res.json();
        }
    })
}