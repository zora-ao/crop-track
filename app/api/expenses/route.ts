import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                {message:"Unauthorized"},
                {status: 401}
            )
        }

        const body = await req.json();

        await connectDB();

        const expense = await Expense.create({
            userId: session.user.id,
            title: body.title,
            amount: body.amount,
            category: body.category,
            expenseDate: body.expenseDate,
            notes: body.notes,
        });

        return NextResponse.json(
            expense,
            {status: 201}
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {message: "Failed to create expense"},
            {status: 500}
        );
    }
}

export async function GET(){
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                {message:"Unauthorized"},
                {status: 401}
            )
        }

        await connectDB();

        const expenses = await Expense.find({
            userId: session.user.id
        }).sort({
            expenseDate: -1,
        });

        return NextResponse.json(expenses);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {message: "Failed to fetch expenses"},
            {status: 500}
        )
    }
}