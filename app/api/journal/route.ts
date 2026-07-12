import Journal from "@/models/Journal";
import { NextResponse } from "next/server";
import { requireUser, dbConnect, handleError } from "@/lib/api";

export async function GET() {
    try {
        const session = await requireUser();

        await dbConnect();

        const journals = await Journal.find({ userId: session.user.id })
            .sort({ createdAt: -1 })
            .limit(5);

        return NextResponse.json(journals);
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(req: Request) {
    try {
        const session = await requireUser();

        const body = await req.json();

        await dbConnect();

        const journal = await Journal.create({
            title: body.title,
            content: body.content,
            userId: session.user.id,
        });

        return NextResponse.json(journal, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}