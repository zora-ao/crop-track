"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useExpenses } from "@/hooks/expenses/useExpenses";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
  const {
    data = [],
    isLoading,
  } = useExpenses();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Expenses
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p>Loading expenses...</p>
        </CardContent>
      </Card>
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
            {data.map((expense) => (
              <ExpenseItem
                key={expense._id}
                expense={expense}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}