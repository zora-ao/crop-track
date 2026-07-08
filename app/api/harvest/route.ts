import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Harvest from "@/models/Harvest";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        };

        await connectDB();

        const harvests = await Harvest.find({
            userId: session.user.id
        }).populate(
            "cropId",
            "cropName"
        ).sort({
            harvestDate: -1
        });

        return NextResponse.json(harvests);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to get harvest" },
            { status: 500 }
        )
    }
}

export async function POST(
    req: Request
) {
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        };

        const body = await req.json();

        await connectDB();

        const harvest = await Harvest.create(
            {
                userId: session.user.id,
                cropId: body.cropId,
                quantity: body.quantity,
                unit: body.unit,
                sellingPrice: body.sellingPrice,
                totalRevenue: body.quantity * body.sellingPrice,
                harvestDate: body.harvestDate,
                notes: body.notes,
            }
        );

        return NextResponse.json(harvest);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to create harvest" },
            { status: 500 }
        );
    }
}