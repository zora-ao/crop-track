import Journal from "@/models/Journal";
import { NextResponse } from "next/server";
import { requireUser, dbConnect, handleError } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireUser();

    const { id } = await params;
    const body = await req.json();

    await dbConnect();

    const journal = await Journal.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { title: body.title, content: body.content },
      { new: true }
    );

    return NextResponse.json(journal);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireUser();

    const { id } = await params;

    await dbConnect();

    await Journal.findOneAndDelete({ _id: id, userId: session.user.id });

    return NextResponse.json({ message: "Journal deleted" });
  } catch (error) {
    return handleError(error);
  }
}