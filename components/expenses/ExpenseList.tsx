"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useExpenses } from "@/hooks/expenses/useExpenses";

export default function ExpenseList() {
  const {
    data = [],
    isLoading,
  } = useExpenses();

  if (isLoading) {
    return (
      <p>
        Loading expenses...
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Expenses
        </CardTitle>
      </CardHeader>

      <CardContent>

        {data.length === 0 ? (
          <p>
            No expenses yet.
          </p>
        ) : (
          <div className="space-y-4">

            {data.map(
              (expense) => (
                <div
                  key={expense._id}
                  className="border rounded-lg p-4"
                >

                  <div className="flex justify-between">

                    <div>
                      <h4 className="font-medium">
                        {
                          expense.title
                        }
                      </h4>

                      <p className="text-sm text-muted-foreground">
                        {
                          expense.category
                        }
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₱
                      {expense.amount.toLocaleString()}
                    </p>

                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(
                      expense.expenseDate
                    ).toLocaleDateString()}
                  </p>

                  {expense.notes && (
                    <p className="text-sm mt-2">
                      {
                        expense.notes
                      }
                    </p>
                  )}

                </div>
              )
            )}

          </div>
        )}

      </CardContent>
    </Card>
  );
}