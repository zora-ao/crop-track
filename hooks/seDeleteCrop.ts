import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useDeleteCrop = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(id: string) => {
            const res = await fetch(`/api/crops/${id}`, {
                method: "DELETE"
            });

            if (!res.ok){
                throw new Error("Failed to delete crop")
            }

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["crops"]
            });

            toast.success("Crop deleted successfully");
        },

        onError: () => {
            toast.error("Failed to delete crop")
        },
    });
};