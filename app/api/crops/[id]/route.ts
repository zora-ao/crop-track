import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb";
import Crop from "@/models/Crop";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function PATCH(
    req: Request,
    { params }: {
        params: Promise<{ id: string }>
    }
) {
    try {
        const session = await auth();

        if(!session?.user?.id){
            NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        const body = await req.json();

        await connectDB();

        const crop = await Crop.findOneAndUpdate(
            {
                _id: id,
                userId: session?.user.id,
            },
            body,
            { new: true }
        );

        return NextResponse.json(crop)

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: {
        params: Promise<{ id: string }>
    }
) {
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        await connectDB();

        await Crop.findOneAndDelete(
            {
                _id: id,
                userId: session.user.id
            }
        );

        return NextResponse.json(
            { success: true }
        );

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        )

    }
}