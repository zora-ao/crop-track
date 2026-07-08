import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateHarvestProps {
    id: string;
    cropId: string;
    quantity: number;
    unit: string;
    sellingPrice: number;
    harvestDate: string;
    notes?: string;
}

export const useUpdateHarvest = (
    onSuccess?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({
            id,
            cropId,
            quantity,
            unit,
            sellingPrice,
            harvestDate,
            notes,
        }: UpdateHarvestProps) => {
            const res = await fetch(`/api/harvest/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cropId,
                    quantity,
                    unit,
                    sellingPrice,
                    harvestDate,
                    notes,
                })
            });

            if(!res.ok){
                throw new Error("Failed to update harvest");
            }

            return res.json();
        },


        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["harvests"]
            });

            toast.success("Harvest updated successfully");
            onSuccess?.();
        },

        onError: () => {
            toast.error("Failed to update harvest");
        }
    })
    
}