"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

import ExpenseDialog from "./ExpenseDialog";
import DeleteExpenseDialog from "./DeleteExpenseDialog";

import { Expense } from "@/types/expense";

type ExpenseItemProps = {
  expense: Expense;
};

export default function ExpenseItem({
  expense,
}: ExpenseItemProps) {
  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  return (
    <>
      <div className="border rounded-lg p-4">
        <div className="flex justify-between gap-4">

          <div>
            <h4 className="font-medium">
              {expense.title}
            </h4>

            <p className="text-sm text-muted-foreground">
              {expense.category}
            </p>

            {expense.notes && (
              <p className="text-sm mt-2">
                {expense.notes}
              </p>
            )}

            <p className="text-xs text-muted-foreground mt-2">
              {new Date(
                expense.expenseDate
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <p className="font-semibold">
              ₱
              {expense.amount.toLocaleString()}
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    setEditOpen(true)
                  }
                >
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() =>
                    setDeleteOpen(true)
                  }
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </div>

      <ExpenseDialog
        mode="edit"
        expense={expense}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteExpenseDialog
        expenseId={expense._id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}