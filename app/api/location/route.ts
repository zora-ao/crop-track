import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    console.log("Session:", session);

    const body = await req.json();

    console.log("Location Body:", body);

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      session?.user?.id,
      {
        farmLocation: {
          latitude: body.latitude,
          longitude: body.longitude,
          address: body.address,
        },
      },
      { new: true }
    );

    console.log("Updated User:", updatedUser);

    return NextResponse.json({
      message: "Location saved",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}