import Crop from "@/models/Crop";
import { NextResponse } from "next/server";
import { requireUser, dbConnect, handleError } from "@/lib/api";

export async function POST(req: Request) {
    try {
        const session = await requireUser();

        const body = await req.json();

        await dbConnect();

        const crop = await Crop.create({
            ...body,
            userId: session.user.id,
        });

        return NextResponse.json(crop, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}

export async function GET() {
    try {
        const session = await requireUser();

        await dbConnect();

        const crops = await Crop.find({
            userId: session.user.id,
        }).sort({
            createdAt: -1,
        });

        return NextResponse.json(crops);
    } catch (error) {
        return handleError(error);
    }
}