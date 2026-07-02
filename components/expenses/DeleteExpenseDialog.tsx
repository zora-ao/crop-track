"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeleteExpense } from "@/hooks/expenses/useDeleteExpense";

type Props = {
    expenseId: string;
    open: boolean;
    onOpenChange: (
        open: boolean
    ) => void;
};

export default function
DeleteExpenseDialog({
    expenseId,
    open,
    onOpenChange,
}: Props) {

    const deleteExpense = useDeleteExpense(() => {
            onOpenChange(false);
        });

    return (
        <Dialog
            open={open}
            onOpenChange={
                onOpenChange
            }
            >
            <DialogContent>
                <DialogHeader>
                <DialogTitle>
                    Delete Expense
                </DialogTitle>
                </DialogHeader>

                <p>
                Are you sure you want
                to delete this expense?
                </p>

                <Button
                variant="destructive"
                onClick={() =>
                    deleteExpense.mutate(
                    expenseId
                    )
                }
                >
                Delete
                </Button>
            </DialogContent>
        </Dialog>
    );
}