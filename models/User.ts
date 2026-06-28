import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    farmLocation?: {
        latitude: number;
        longitude: number;
        address: string;
    };
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        farmLocation: {
            latitude: Number,
            longitude: Number,
            address: String,
        },
    }, {
        timestamps: true,
    }
)

const User = models.User || model<IUser>("User", UserSchema);

export default User