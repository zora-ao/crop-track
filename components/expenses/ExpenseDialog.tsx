"use client";

import { FormEvent, useEffect, useState } from "react";
import { CalendarIcon, DollarSign, Tag, FileText } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { expenseCategories } from "@/lib/expense-categories";
import { useCreateExpense } from "@/hooks/expenses/useCreateExpense";
import { useUpdateExpense } from "@/hooks/expenses/useUpdateExpense";
import { Expense } from "@/types/expense";

type ExpenseDialogProps = {
  mode?: "create" | "edit";
  expense?: Expense;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ExpenseDialog({
  mode = "create",
  expense,
  open: controlledOpen,
  onOpenChange,
}: ExpenseDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Seeds");
  const [expenseDate, setExpenseDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (mode === "edit" && expense) {
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setExpenseDate(expense.expenseDate?.split("T")[0] ?? "");
      setNotes(expense.notes ?? "");
    }
  }, [expense, mode]);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("Seeds");
    setExpenseDate("");
    setNotes("");
  };

  const createExpense = useCreateExpense(() => {
    setOpen(false);
    resetForm();
  });

  const updateExpense = useUpdateExpense(() => {
    setOpen(false);
  });

  const handleSubmit = () => {
    const payload = {
      title,
      amount: Number(amount),
      category,
      expenseDate,
      notes,
    };

    if (mode === "edit" && expense) {
      updateExpense.mutate({ id: expense._id, ...payload });
    } else {
      createExpense.mutate(payload);
    }
  };

  const isSubmitting = createExpense.isPending || updateExpense.isPending;

  return (
    <>
      {mode === "create" && !controlledOpen && (
        <Button onClick={() => setOpen(true)} className="shadow-sm">
          Add Expense
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight text-zinc-900">
              {mode === "edit" ? "Edit Expense Details" : "Track New Expense"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-zinc-700 font-medium">Description</Label>
              <div className="relative">
                <Input
                  id="title"
                  placeholder="e.g., Fertilizer purchase, equipment repair"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white"
                />
              </div>
            </div>

            {/* Amount & Category Wrapper */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="amount" className="text-zinc-700 font-medium">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-9 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-zinc-700 font-medium">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((item) => (
                      <SelectItem key={item} value={item} className="capitalize">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-zinc-700 font-medium">Transaction Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="bg-white block [color-scheme:light]"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-zinc-700 font-medium">Additional Notes</Label>
              <Textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e: any) => setNotes(e.target.value)}
                placeholder="Add contextual details here..."
                className="bg-white resize-none"
              />
            </div>

            {/* Actions Submit */}
            <Button
              className="w-full mt-2"
              onClick={handleSubmit}
              disabled={isSubmitting || !title || !amount}
            >
              {isSubmitting 
                ? "Saving changes..." 
                : mode === "edit" 
                  ? "Update Expense" 
                  : "Save Expense Entry"
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}