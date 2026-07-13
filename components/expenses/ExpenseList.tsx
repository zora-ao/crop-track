"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileText, Calendar } from "lucide-react";

import { useExpenses } from "@/hooks/expenses/useExpenses";
import ExpenseDialog from "./ExpenseDialog";
import DeleteExpenseDialog from "./DeleteExpenseDialog";
import { Expense } from "@/types/expense";
import { TableSkeleton } from "@/components/ui/loading-skeleton";

type SelectedExpense = Expense | null;

export default function ExpenseList() {
  const { data = [], isLoading } = useExpenses();
  const [selected, setSelected] = useState<SelectedExpense>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const totalExpenses = data.reduce((sum, expense) => sum + expense.amount, 0);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <TableSkeleton rows={4} columns={5} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="border-b bg-zinc-50/80 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Total expenses
            </p>
            <p className="text-2xl font-semibold text-zinc-900">₱{totalExpenses.toLocaleString()}</p>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="p-4 text-sm text-zinc-500">No expenses yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-zinc-50 text-xs font-semibold text-zinc-500 uppercase">
                  <th className="py-3.5 px-6">Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y text-sm text-zinc-700">
                {data.map((expense) => (
                  <tr key={expense._id} className="hover:bg-zinc-50/50 group">
                    <td className="py-4 px-6 font-medium text-zinc-900">
                      <div className="flex flex-col">
                        <span>{expense.title}</span>
                        {expense.notes && (
                          <p className="text-xs text-zinc-400 truncate max-w-75" title={expense.notes}>
                            {expense.notes}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-zinc-600">{expense.category}</td>

                    <td className="py-4 px-4 font-mono text-zinc-700">₱{expense.amount.toLocaleString()}</td>

                    <td className="py-4 px-4 text-zinc-500 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                        {new Date(expense.expenseDate).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <ActionMenu
                        expense={expense}
                        onEdit={() => {
                          setSelected(expense);
                          setEditOpen(true);
                        }}
                        onDelete={() => {
                          setSelected(expense);
                          setDeleteOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      {selected && (
        <>
          <ExpenseDialog mode="edit" expense={selected} open={editOpen} onOpenChange={setEditOpen} />
          <DeleteExpenseDialog expenseId={selected._id} open={deleteOpen} onOpenChange={setDeleteOpen} />
        </>
      )}
    </Card>
  );
}

function ActionMenu({
  expense,
  onEdit,
  onDelete,
}: {
  expense: Expense;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <MoreVertical className="h-4 w-4 text-zinc-500" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-600" onClick={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}