import mongoose, { Schema, Document, models, model, Types } from "mongoose";

export interface ICrop extends Document {
    userId: Types.ObjectId;
    cropName: string;
    cropType: string;
    plantingDate: Date;
    expectedHarvestDate?: Date;
    area: number;
    areaUnit: "sqm" | "hectare" | "acre";
    status: "planned" | "planted" | "growing" | "harvested";
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CropSchema = new Schema<ICrop>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        cropName: {
            type: String,
            required: true
        },
        cropType: {
            type: String,
            required: true
        },
        plantingDate: {
            type: Date,
            required: true
        },
        expectedHarvestDate: {
            type: Date
        },
        area: {
            type: Number,
            required: true
        },
        areaUnit: {
            type: String,
            default: "sqm"
        },
        status: {
            type: String,
            enum: [
                "planned",
                "planted",
                "growing",
                "harvested",
            ],
            default: "planned"
        },
        notes: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

const Crop = models.Crop || model<ICrop>("Crop", CropSchema);

export default Crop;