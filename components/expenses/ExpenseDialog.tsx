"use client";

import { useState } from "react";

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


export default function ExpenseDialog() {
  const [open, setOpen] =
    useState(false);

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

  const createExpense =
    useCreateExpense(() => {
      setOpen(false);

      setTitle("");
      setAmount("");
      setCategory("Seeds");
      setExpenseDate("");
      setNotes("");
    });

  return (
    <>
      <Button
        onClick={() =>
          setOpen(true)
        }
      >
        Add Expense
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              New Expense
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
              onClick={() =>
                createExpense.mutate({
                  title,
                  amount:
                    Number(amount),
                  category,
                  expenseDate,
                  notes,
                })
              }
            >
              Save Expense
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}