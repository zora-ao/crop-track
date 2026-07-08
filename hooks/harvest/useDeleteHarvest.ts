import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useDeleteHarvest = (
    onSuccess?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(
            harvestId: string
        ) => {
            const res = await fetch(`/api/harvest/${harvestId}`, {
                method: "DELETE"
            });

            if(!res.ok){
                throw new Error("Failed to delete harvest");
            }

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["harvests"]
            });

            toast.success("Harvest deleted successfully");

            onSuccess?.();
        },

        onError: () => {
            toast.error("Failed to delete harvest");
        }
    })
}