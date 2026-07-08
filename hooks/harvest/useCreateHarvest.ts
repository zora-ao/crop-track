import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

type CreateHarvestInput = {
    cropId: string;
    quantity: number;
    unit: string;
    sellingPrice: number;
    harvestDate: string;
    notes?: string;
};

export const useCreateHarvest = (
    onSuccess?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(
            data: CreateHarvestInput
        ) => {
            const res = await fetch("/api/harvest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(data)
            });

            if(!res.ok){
                throw new Error("Failed to create Harvest")
            };

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["harvests"]
            });

            toast.success("Harvest saved");
            onSuccess?.();
        },

        onError: () => {
            toast.error("Failed to save harvest");
        }
    })
}