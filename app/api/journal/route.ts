import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Journal from "@/models/Journal";
import { NextResponse } from "next/server";


export async function GET(){

    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        
        await connectDB();

        const journals = await Journal.find(
            {userId: session.user.id}
        ).sort({
            createdAt: -1,
        }).limit(5)

        return NextResponse.json(journals);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { messages: "Failed to fetch journals" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request){
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        await connectDB();

        const journal = await Journal.create({
            title: body.title,
            content: body.content,
            userId: session.user.id,
        });

        return NextResponse.json(
            journal,
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to create journal" },
            { status: 500 }
        )
    }
};