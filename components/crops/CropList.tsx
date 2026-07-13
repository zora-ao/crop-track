"use client";

import { Crop } from "@/types/crop";
import { useEffect, useState } from "react";
import CropCard from "./CropCard";
import { useCrops } from "@/hooks/useCrops";
import { CardSkeleton } from "@/components/ui/loading-skeleton";

const CropList = () => {
    
    const {
        data: crops,
        error,
        isLoading
    } = useCrops();

    if (isLoading) {
        return <CardSkeleton count={3} />;
    }

    if (error) {
        return (
        <p className="text-red-500">
            Failed to load crops.
        </p>
        );
    }

    if (!crops?.length) {
        return (
        <p className="text-muted-foreground">
            No crops yet.
        </p>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
                <CropCard
                key={crop._id}
                crop={crop}
                />
            ))}
        </div>
    );
}

export default CropList
