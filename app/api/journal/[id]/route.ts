import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Journal from "@/models/Journal";
import { NextResponse } from "next/server";


export async function PATCH(
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
        }

        const { id } = await params;
        
        const body = await req.json();

        await connectDB();

        const journal = await Journal.findOneAndUpdate(
            {
                _id: id,
                userId: session.user.id
            },
            {
                title: body.title,
                content: body.content
            },
            { new: true }
        );

        return NextResponse.json(journal);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update journal" },
            { status: 500 }
        );
    }
}

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
            )
        }

        const { id } = await params;

        await connectDB();

        await Journal.findOneAndDelete({
            _id: id,
            userId: session.user.id
        });
        
        return NextResponse.json({
            message: "Journal deleted"
        })
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to delete journal" },
            { status: 500 }
        );
    }
}