import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Harvest from "@/models/Harvest";
import { NextResponse } from "next/server";


export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        };

        const { id } = await params;
        const body = await req.json();

        await connectDB();

        // Calculate totalRevenue if not provided (for backward compatibility)
        const totalRevenue = body.totalRevenue ?? (body.quantity * body.sellingPrice);

        const harvest = await Harvest.findOneAndUpdate(
            {
                _id: id,
                userId: session.user.id
            },
            {
                cropId: body.cropId,
                quantity: body.quantity,
                unit: body.unit,
                sellingPrice: body.sellingPrice,
                totalRevenue,
                harvestDate: body.harvestDate,
                notes: body.notes
            },
            {
                new: true
            }
        );

        if(!harvest){
            return NextResponse.json(
                { message: "Harvest not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(harvest)

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update harvest" },
            { status: 500 }
        )
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
){
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        };

        const { id } = await params;
        
        await connectDB();

        const harvest = await Harvest.findOneAndDelete({
            _id: id,
            userId: session.user.id
        });

        if(!harvest){
            return NextResponse.json(
                { message: "Harvest not found" },
                { status: 404 }
            )
        };

        return NextResponse.json({
            message: "Harvest deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to delete harvest" },
            { status: 500 }
        )
    }
};