"use client";

import { Crop } from "@/types/crop";
import { useEffect, useState } from "react";
import CropCard from "./CropCard";

const CropList = () => {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCrops() {
        try {
            const response =
            await fetch("/api/crops");

            const data =
            await response.json();

            setCrops(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        }

        fetchCrops();
    }, []);

    if (loading) {
        return <p>Loading crops...</p>;
    }

    if (crops.length === 0) {
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
