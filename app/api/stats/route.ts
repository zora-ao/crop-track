import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Crop from "@/models/Crop";
import { NextResponse } from "next/server";

interface ICrop {
    userId: string;
    status: "planned" | "planted" | "growing" | "harvested";
}

export async function GET(){
    try {
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        await connectDB();

        const crops = await Crop.find({
            userId: session.user.id,
        }) as ICrop[];

        const stats = {
            total: crops.length,

            planned: crops.filter(
                crop => crop.status === "planned"
            ).length,

            planted: crops.filter(
                crop => crop.status === "planted"
            ).length,

            growing: crops.filter(
                crop => crop.status === "growing"
            ).length,

            harvested: crops.filter(
                crop => crop.status === "harvested"
            ).length,
        };

        return NextResponse.json(stats);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}