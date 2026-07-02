"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { expenseCategories } from "@/lib/expense-categories";

import { useCreateExpense } from "@/hooks/expenses/useCreateExpense";
import { useUpdateExpense } from "@/hooks/expenses/useUpdateExpense";

import { Expense } from "@/types/expense";

type ExpenseDialogProps = {
  mode?: "create" | "edit";
  expense?: Expense;
  open?: boolean;
  onOpenChange?: (
    open: boolean
  ) => void;
};

export default function ExpenseDialog({
  mode = "create",
  expense,
  open: controlledOpen,
  onOpenChange,
}: ExpenseDialogProps) {

  const [internalOpen, setInternalOpen] =
    useState(false);

  const open =
    controlledOpen ?? internalOpen;

  const setOpen =
    onOpenChange ?? setInternalOpen;

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Seeds");

  const [expenseDate, setExpenseDate] =
    useState("");

  const [notes, setNotes] =
    useState("");

  useEffect(() => {
    if (
      mode === "edit" &&
      expense
    ) {
      setTitle(expense.title);

      setAmount(
        expense.amount.toString()
      );

      setCategory(
        expense.category
      );

      setExpenseDate(
        expense.expenseDate
          ?.split("T")[0] ?? ""
      );

      setNotes(
        expense.notes ?? ""
      );
    }
  }, [expense, mode]);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("Seeds");
    setExpenseDate("");
    setNotes("");
  };

  const createExpense =
    useCreateExpense(() => {
      setOpen(false);
      resetForm();
    });

  const updateExpense =
    useUpdateExpense(() => {
      setOpen(false);
    });

  const handleSubmit = () => {
    if (mode === "edit") {
      updateExpense.mutate({
        id: expense!._id,
        title,
        amount:
          Number(amount),
        category,
        expenseDate,
        notes,
      });

      return;
    }

    createExpense.mutate({
      title,
      amount:
        Number(amount),
      category,
      expenseDate,
      notes,
    });
  };

  return (
    <>
      {mode === "create" && (
        <Button
          onClick={() =>
            setOpen(true)
          }
        >
          Add Expense
        </Button>
      )}

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit"
                ? "Edit Expense"
                : "New Expense"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <Input
              placeholder="Expense title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="w-full border rounded-md p-2"
            >
              {expenseCategories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>

            <Input
              type="date"
              value={expenseDate}
              onChange={(e) =>
                setExpenseDate(
                  e.target.value
                )
              }
            />

            <textarea
              rows={4}
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              placeholder="Notes"
              className="w-full border rounded-md p-2"
            />

            <Button
              className="w-full"
              onClick={handleSubmit}
            >
              {mode === "edit"
                ? "Update Expense"
                : "Save Expense"}
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}