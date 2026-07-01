"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteJournal } from "@/hooks/journals/useDeleteJournal";

type DeleteJournalDialogProps = {
    journalId: string;
    open: boolean;
    onOpenChange: (
        open: boolean
    ) => void;
};

export default function DeleteJournalDialog({
        journalId,
        open,
        onOpenChange,
    }: DeleteJournalDialogProps) {
    const deleteJournal = useDeleteJournal();

    const handleDelete = () => {
        deleteJournal.mutate(journalId, {
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };

    return (
        <AlertDialog
        open={open}
        onOpenChange={onOpenChange}
        >
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>
                Delete Journal?
            </AlertDialogTitle>

            <AlertDialogDescription>
                This action cannot be
                undone.
            </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
            <AlertDialogCancel>
                Cancel
            </AlertDialogCancel>

            <AlertDialogAction
                onClick={handleDelete}
                disabled={
                deleteJournal.isPending
                }
            >
                {deleteJournal.isPending
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    );
}