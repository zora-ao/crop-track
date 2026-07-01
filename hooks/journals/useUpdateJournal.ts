import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

interface UpdateJournalProps {
    id: string,
    data: {
        title: string,
        content: string
    }
}

export const useUpdateJournal = (
    onSuccess?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(
            {id, data}: UpdateJournalProps
        ) => {
            const res = await fetch(`/api/journal/${id}`, {
                method: "PATCH",
                headers:  {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if(!res.ok){
                throw new Error();
            }

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['journals'],
            });

            toast.success("Journal Updated");

            onSuccess?.();
        },

        onError: () => {
            toast.error("Failed to update journal");
        }
    })
}