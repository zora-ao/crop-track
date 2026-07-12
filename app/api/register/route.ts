import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { dbConnect, handleError } from "@/lib/api";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already existing" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "Account created" }, { status: 201 });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return handleError(error);
  }
}