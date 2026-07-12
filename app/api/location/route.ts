import User from "@/models/User";
import { NextResponse } from "next/server";
import { requireUser, dbConnect, handleError } from "@/lib/api";

export async function PATCH(req: Request) {
  try {
    const session = await requireUser();

    const body = await req.json();

    await dbConnect();

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        farmLocation: {
          latitude: body.latitude,
          longitude: body.longitude,
          address: body.address,
        },
      },
      { new: true }
    );

    return NextResponse.json({ message: "Location saved", user: updatedUser });
  } catch (error) {
    return handleError(error);
  }
}