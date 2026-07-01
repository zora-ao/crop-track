import { Expense } from "@/types/expense"
import { useQuery } from "@tanstack/react-query"

export const useExpenses = () => {

    return useQuery<Expense[]>({
        queryKey: ["expenses"],
        queryFn: async() => {
            const res = await fetch("/api/expenses");

            if(!res.ok){
                throw new Error("Failed to fetch expenses");
            }

            return res.json();
        }
    })
}