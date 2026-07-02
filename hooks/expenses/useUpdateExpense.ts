import { Expense } from "@/types/expense";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

interface useUpdateProps {
    id: string;
    title: string;
    amount: number;
    category: string;
    expenseDate: string;
    notes?: string;
}

export const useUpdateExpense = (
    onSuccess?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(
            {
                id,
                title,
                amount,
                category,
                expenseDate,
                notes
            }: useUpdateProps
        ) => {
            const res = await fetch(`/api/expenses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    amount,
                    category,
                    expenseDate,
                    notes,
                }),
            })

            if(!res.ok){
                throw new Error();
            }

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["expenses"],
            });

            toast.success("Expense updated");

            onSuccess?.();
        },

        onError: () => {
            toast.error("Failed to update expense");
        }
    });
}