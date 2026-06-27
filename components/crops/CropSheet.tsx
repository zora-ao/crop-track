"use client";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import CropForm from "../forms/CropForm";
import { Crop } from "@/types/crop";

type CropSheetProps = {
  mode: "create" | "edit";
  crop?: Crop;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function CropSheet({
  mode,
  crop,
  trigger,
  open, 
  onOpenChange
}: CropSheetProps) {

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <SheetTrigger asChild>
          {trigger}
        </SheetTrigger>
      )}

      <SheetContent className="overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {mode === "create"
              ? "Add Crop"
              : "Edit Crop"}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-0">
          <CropForm
            mode={mode}
            cropId={crop?._id}
            defaultValues={
              mode === "edit" && crop
                ? {
                    cropName: crop.cropName,
                    cropType: crop.cropType,

                    plantingDate:
                      new Date(crop.plantingDate)
                        .toISOString()
                        .split("T")[0],

                    expectedHarvestDate:
                      crop.expectedHarvestDate
                        ? new Date(
                            crop.expectedHarvestDate
                          )
                            .toISOString()
                            .split("T")[0]
                        : "",

                    area: crop.area,
                    areaUnit: crop.areaUnit,
                    notes: crop.notes,
                  }
                : undefined
            }
            onSuccess={() => onOpenChange?.(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}