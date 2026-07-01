import mongoose, { Schema, Document, models, model, Types } from "mongoose";

export interface IExpense extends Document {
    userId: Types.ObjectId;
    title: string;
    amount: number;
    category: string;
    expenseDate: Date;
    notes?: string;
}

const ExpenseSchema = new Schema<IExpense>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        expenseDate: {
            type: Date,
            required: true
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const Expense = models.Expense || model<IExpense>("Expense", ExpenseSchema);

export default Expense;