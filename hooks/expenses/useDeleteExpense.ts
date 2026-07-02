import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

export const useDeleteExpense = (
        onSuccess?: () => void
    ) => {
    const queryClient = useQueryClient();

    return useMutation({
            mutationFn: async (
            id: string
        ) => {
            const res = await fetch(
                `/api/expenses/${id}`,
                {
                method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error();
            }

                return res.json();
            },

            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["expenses"],
            });

            toast.success("Expense deleted");

                onSuccess?.();
            },

            onError: () => {
                toast.error("Failed to delete expense");
        },
    });
};