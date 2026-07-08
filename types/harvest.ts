export interface Harvest {
    _id: string;
    cropId: string;
    quantity: number;
    unit: string;
    sellingPrice: number;
    totalRevenue: number;
    harvestDate: string;
    notes?: string;
}