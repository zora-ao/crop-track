import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateExpense = (
  onSuccess?: () => void
) => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      data: {
        title: string;
        amount: number;
        category: string;
        expenseDate: string;
        notes?: string;
      }
    ) => {
      const res = await fetch(
        "/api/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            data
          ),
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

      toast.success(
        "Expense added"
      );

      onSuccess?.();
    },

    onError: () => {
      toast.error(
        "Failed to add expense"
      );
    },
  });
};