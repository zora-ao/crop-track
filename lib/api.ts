import { auth } from "./auth";
import { connectDB } from "./mongodb";
import { NextResponse } from "next/server";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export async function requireUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new ApiError("Unauthorized", 401);
  }

  return session;
}

export async function dbConnect() {
  await connectDB();
}

export function handleError(err: unknown) {
  console.error(err);

  if (err instanceof ApiError) {
    return NextResponse.json({ message: err.message }, { status: err.status });
  }

  return NextResponse.json({ message: "Server Error" }, { status: 500 });
}
