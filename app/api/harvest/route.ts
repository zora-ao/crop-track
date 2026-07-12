import Harvest from "@/models/Harvest";
import { NextResponse } from "next/server";
import { requireUser, dbConnect, handleError } from "@/lib/api";

export async function GET() {
    try {
        const session = await requireUser();

        await dbConnect();

        const harvests = await Harvest.find({
            userId: session.user.id,
        })
            .populate("cropId", "cropName")
            .sort({
                harvestDate: -1,
            });

        return NextResponse.json(harvests);
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(req: Request) {
  try {
    const session = await requireUser();

    const body = await req.json();

    await dbConnect();

    const harvest = await Harvest.create({
      userId: session.user.id,
      cropId: body.cropId,
      quantity: body.quantity,
      unit: body.unit,
      sellingPrice: body.sellingPrice,
      totalRevenue: body.quantity * body.sellingPrice,
      harvestDate: body.harvestDate,
      notes: body.notes,
    });

    return NextResponse.json(harvest, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}