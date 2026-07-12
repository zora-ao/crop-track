import Crop from "@/models/Crop";
import { NextResponse } from "next/server";
import { requireUser, dbConnect, handleError } from "@/lib/api";

interface ICrop {
  userId: string;
  status: "planned" | "planted" | "growing" | "harvested";
}

export async function GET() {
  try {
    const session = await requireUser();

    await dbConnect();

    const crops = (await Crop.find({ userId: session.user.id })) as ICrop[];

    const stats = {
      total: crops.length,

      planned: crops.filter((crop) => crop.status === "planned").length,

      planted: crops.filter((crop) => crop.status === "planted").length,

      growing: crops.filter((crop) => crop.status === "growing").length,

      harvested: crops.filter((crop) => crop.status === "harvested").length,
    };

    return NextResponse.json(stats);
  } catch (error) {
    return handleError(error);
  }
}