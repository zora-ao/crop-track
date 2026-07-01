import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useDeleteJournal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(
            id: string
        ) => {
            const res = await fetch(`/api/journal/${id}`, {
                method: "DELETE",
            });

            if(!res.ok){
                throw new Error();
            }

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['journals']
            });

            toast.success("Journal Deleted")
        },

        onError: () => {
            toast.error("Failed to delete journal")
        }
    })
}