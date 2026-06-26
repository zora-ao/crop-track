"use client";

import { Crop } from "@/types/crop"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CropForm from "../forms/CropForm";
import { useState } from "react";

interface CropCardProps {
    crop: Crop;
}

const CropCard = ({ crop }: CropCardProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle>
                    {crop.cropName}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                <p>
                    <strong>Type:</strong>
                    {crop.cropType}
                </p>

                <p>
                    <strong>Area:</strong>
                    {crop.area} {crop.areaUnit}
                </p>

                <p>
                    <strong>Status:</strong>
                    {crop.status}
                </p>

                <p>
                    <strong>Planted:</strong>
                    {new Date(
                        crop.plantingDate
                    ).toLocaleDateString()}
                </p>

                <p>
                    <strong>Expected Harvest:</strong>
                    {new Date(
                        crop.expectedHarvestDate!
                    ).toLocaleDateString()}
                </p>

                <div className="flex gap-2 mt-4">
                    <Button 
                        onClick={() => setOpen(true)}
                        size="sm">
                        Update Status
                    </Button>

                    <Button
                        size="sm"   
                        variant="destructive"
                    >
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
            <DialogHeader>
                <DialogTitle>
                Edit Crop
                </DialogTitle>
            </DialogHeader>

            <CropForm
                mode="edit"
                cropId={crop._id}
                defaultValues={{
                    cropName: crop.cropName,
                    cropType: crop.cropType,
                    plantingDate: crop.plantingDate,
                    expectedHarvestDate:
                        crop.expectedHarvestDate,
                    area: crop.area,
                    areaUnit: crop.areaUnit,
                    notes: crop.notes,
                }}
                onSuccess={() =>
                    setOpen(false)
                }
            />
            </DialogContent>
        </Dialog>
        </>
    )
}

export default CropCard
