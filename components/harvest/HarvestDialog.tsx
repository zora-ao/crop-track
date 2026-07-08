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

import { useCreateHarvest } from "@/hooks/harvest/useCreateHarvest";
import { useUpdateHarvest } from "@/hooks/harvest/useUpdateHarvest";
import { useCrops } from "@/hooks/useCrops";


type Harvest = {
  _id: string;
  cropId: string;
  quantity: number;
  unit: string;
  sellingPrice: number;
  harvestDate: string;
  notes?: string;
};

type Props = {
  mode?: "create" | "edit";

  harvest?: Harvest;

  open?: boolean;

  onOpenChange?: (
    open: boolean
  ) => void;
};

export default function HarvestDialog({
  mode = "create",
  harvest,
  open,
  onOpenChange,
}: Props) {
  const { data: crops = [] } = useCrops();

  const [internalOpen, setInternalOpen] =
    useState(false);

  const dialogOpen =
    open ?? internalOpen;

  const setDialogOpen =
    onOpenChange ??
    setInternalOpen;

  const [cropId, setCropId] =
    useState(
      harvest?.cropId ?? ""
    );

  const [quantity, setQuantity] =
    useState(
      harvest?.quantity?.toString() ??
        ""
    );

  const [unit, setUnit] =
    useState(
      harvest?.unit ?? "kg"
    );

  const [
    sellingPrice,
    setSellingPrice,
  ] = useState(
    harvest?.sellingPrice?.toString() ??
      ""
  );

  const [
    harvestDate,
    setHarvestDate,
  ] = useState(
    harvest?.harvestDate
      ? harvest.harvestDate.slice(
          0,
          10
        )
      : ""
  );

  const [notes, setNotes] =
    useState(
      harvest?.notes ?? ""
    );

  const createHarvest =
    useCreateHarvest(() => {
      setDialogOpen(false);

      setCropId("");
      setQuantity("");
      setUnit("kg");
      setSellingPrice("");
      setHarvestDate("");
      setNotes("");
    });

  const updateHarvest =
    useUpdateHarvest(() => {
      setDialogOpen(false);
    });

  const handleSubmit = () => {
    const payload = {
      cropId,
      quantity:
        Number(quantity),
      unit,
      sellingPrice:
        Number(
          sellingPrice
        ),
      harvestDate,
      notes,
    };

    if (
      mode === "edit" &&
      harvest
    ) {
      updateHarvest.mutate({
        id: harvest._id,
        ...payload,
      });

      return;
    }

    createHarvest.mutate(
      payload
    );
  };

  return (
    <>
      {mode === "create" && (
        <Button
          onClick={() =>
            setDialogOpen(
              true
            )
          }
        >
          Add Harvest
        </Button>
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={
          setDialogOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode ===
              "edit"
                ? "Edit Harvest"
                : "New Harvest"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <select
              value={cropId}
              onChange={(e) =>
                setCropId(
                  e.target.value
                )
              }
              className="w-full border rounded-md p-2"
            >
              <option value="">
                Select Crop
              </option>

              {crops.map(
                (crop) => (
                  <option
                    key={
                      crop._id
                    }
                    value={
                      crop._id
                    }
                  >
                    {
                      crop.cropName
                    }
                  </option>
                )
              )}
            </select>

            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }
            />

            <Input
              placeholder="Unit"
              value={unit}
              onChange={(e) =>
                setUnit(
                  e.target.value
                )
              }
            />

            <Input
              type="number"
              placeholder="Selling Price"
              value={
                sellingPrice
              }
              onChange={(e) =>
                setSellingPrice(
                  e.target.value
                )
              }
            />

            <Input
              type="date"
              value={
                harvestDate
              }
              onChange={(e) =>
                setHarvestDate(
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
              className="w-full border rounded-md p-2"
              placeholder="Notes"
            />

            <Button
              className="w-full"
              onClick={
                handleSubmit
              }
              disabled={
                createHarvest.isPending ||
                updateHarvest.isPending
              }
            >
              {createHarvest.isPending ||
              updateHarvest.isPending
                ? mode ===
                  "edit"
                  ? "Updating..."
                  : "Saving..."
                : mode ===
                  "edit"
                ? "Update Harvest"
                : "Save Harvest"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}