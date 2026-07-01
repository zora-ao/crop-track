import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useCreateJournal = (
    onSuccess?: () => void
) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(data: {
            title: string,
            content: string
        }) => {
            const res = await fetch("/api/journal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if(!res.ok){
                throw new Error("Failed to create journal");
            }

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["journals"]
            });

            toast.success("Journal created");

            onSuccess?.();
        },

        onError: () => {
            toast.error('Failed to create journal');
        }

    })

}