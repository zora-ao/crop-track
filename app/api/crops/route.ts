import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Crop from "@/models/Crop";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        await connectDB();

        const crop = await Crop.create({
            ...body,
            userId: session.user.id,
        });

        return NextResponse.json(crop);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const session = await auth();

        if (!session){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        await connectDB();

        const crops = await Crop.find({
            userId: session.user.id,
        }).sort({
            createdAt: -1
        });

        return NextResponse.json(crops)
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        )
    }
}