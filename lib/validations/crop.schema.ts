import { z } from "zod";

export const CropSchema = z.object({
    cropName: z.string().min(1, "Crop name is required"),
    cropType: z.string().min(1, "Crop type is required"),
    plantingDate: z.string().min(1, "Planting date is required"),
    expectedHarvestDate: z.string().optional(),
    
    area: z.number()
        .min(0.1, "Area must be greater than 0"),
    
    areaUnit: z.enum(["sqm", "hectare", "acre"]),
    notes: z.string().optional(),
});

export type CropInput = z.infer<typeof CropSchema>;