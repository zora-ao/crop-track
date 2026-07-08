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
import { useDeleteHarvest } from "@/hooks/harvest/useDeleteHarvest";



type DeleteHarvestDialogProps = {
harvestId: string;

open: boolean;

onOpenChange: (
open: boolean
) => void;
};

export default function DeleteHarvestDialog({
harvestId,
open,
onOpenChange,
}: DeleteHarvestDialogProps) {
const deleteHarvest =
useDeleteHarvest(() => {
onOpenChange(false);
});

const handleDelete = () => {
deleteHarvest.mutate(harvestId);
};

return (
<AlertDialog
open={open}
onOpenChange={
onOpenChange
}
> <AlertDialogContent> <AlertDialogHeader> <AlertDialogTitle>
Delete Harvest </AlertDialogTitle>

      <AlertDialogDescription>
        This action cannot be
        undone. This will
        permanently delete
        this harvest record.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>
        Cancel
      </AlertDialogCancel>

      <AlertDialogAction
        onClick={handleDelete}
        disabled={
          deleteHarvest.isPending
        }
      >
        {deleteHarvest.isPending
          ? "Deleting..."
          : "Delete"}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


);
}
