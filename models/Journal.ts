import mongoose, { Schema, Document, model, models, Types } from "mongoose";

export interface IJournal extends Document {
    title: string;
    content: string;
    userId: Types.ObjectId;
    createdAt: Date;
}

const JournalSchema = new Schema<IJournal>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Journal = models.Journal || model<IJournal>("Journal", JournalSchema);

export default Journal;
