import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(
      session.user.id
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.farmLocation) {
      return NextResponse.json({
        locationSet: false,
        weather: null
      });
    }

    const lat = Number(
      user.farmLocation.latitude
    );

    const long = Number(
      user.farmLocation.longitude
    );

    if (
      Number.isNaN(lat) ||
      Number.isNaN(long)
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid latitude or longitude",
        },
        { status: 400 }
      );
    }

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code`;

    const res = await fetch(weatherUrl);

    const data = await res.json();

    if (!data.current) {
      return NextResponse.json(
        {
          message:
            "Weather API returned no current data",
          data,
        },
        { status: 500 }
      );
    }

    const currentWeather = {
      temperature_2m:
        data.current.temperature_2m,
      relative_humidity_2m:
        data.current.relative_humidity_2m,
      precipitation:
        data.current.precipitation,
      weather_code:
        data.current.weather_code,
    };

    return NextResponse.json({
      locationSet: true,
      weather: currentWeather,
      address: user.farmLocation.address,
    });
  } catch (error) {
    console.error(
      "Weather API Error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch weather",
      },
      { status: 500 }
    );
  }
}