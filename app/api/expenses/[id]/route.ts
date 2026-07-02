import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{id:string}> }
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
        const body = await req.json();

        await connectDB();

        const expense = await Expense.findOneAndUpdate(
            {
                _id: id,
                userId: session.user.id
            },
            {
                title: body.title,
                amount: body.amount,
                category: body.category,
                expenseDate: body.expenseDate,
                notes: body.notes
            },
            {
                new: true
            }
        );

        return NextResponse.json(expense);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update expense" },
            { status: 500 }
        )
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    
    try {
        const session = await auth();

        if (!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const { id } = await params;

        await connectDB();

        await Expense.findOneAndDelete({
            _id: id,
            userId: session.user.id
        });

        return NextResponse.json({
            message: "Expense deleted",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to delete expense" },
            { status: 500 }
        )
    }
};