import Expense from "@/models/Expense";
import { NextResponse } from "next/server";
import { requireUser, dbConnect, handleError } from "@/lib/api";


export async function POST(req: Request) {
    try {
        const session = await requireUser();

        const body = await req.json();

        await dbConnect();

        const expense = await Expense.create({
            userId: session.user.id,
            title: body.title,
            amount: body.amount,
            category: body.category,
            expenseDate: body.expenseDate,
            notes: body.notes,
        });

        return NextResponse.json(expense, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}

export async function GET() {
    try {
        const session = await requireUser();

        await dbConnect();

        const expenses = await Expense.find({
            userId: session.user.id,
        }).sort({
            expenseDate: -1,
        });

        return NextResponse.json(expenses);
    } catch (error) {
        return handleError(error);
    }
}