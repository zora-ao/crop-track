export interface Crop {
    _id: string;

    cropName: string;
    cropType: string;

    plantingDate: string;
    expectedHarvestDate?: string;

    area: number;

    areaUnit: "sqm" | "hectare" | "acre";

    status:
        | "planned"
        | "planted"
        | "growing"
        | "harvested";

    notes?: string;

    createdAt: string;
    updatedAt: string;
}