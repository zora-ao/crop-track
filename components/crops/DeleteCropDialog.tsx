"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useDeleteCrop } from "@/hooks/seDeleteCrop";



interface Props {
    cropId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteCropDialog({
        cropId,
        open,
        onOpenChange
    }: Props) {
    const deleteCrop = useDeleteCrop();

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>
                    Delete Crop?
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
                    onClick={() =>
                    deleteCrop.mutate(cropId)
                }>
                    Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}