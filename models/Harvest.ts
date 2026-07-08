import mongoose, {model, models, Schema, Document} from "mongoose";

export interface IHarvest extends Document {
    userId: mongoose.Types.ObjectId;
    cropId: mongoose.Types.ObjectId;
    quantity: number;
    unit: string;
    sellingPrice: number;
    totalRevenue: number;
    harvestDate: Date;
    notes?: string;
}

const HarvestSchema = new Schema<IHarvest>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cropId: {
            type: Schema.Types.ObjectId,
            ref: "Crop",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            default: "kg",
        },
        sellingPrice: {
            type: Number,
            required: true
        },
        totalRevenue: {
            type: Number,
            required: true
        },
        harvestDate: {
            type: Date,
            required: true,
        },
        notes: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

const Harvest = models.Harvest || model<IHarvest>("Harvest", HarvestSchema);

export default Harvest;