import { auth } from "@/lib/auth";
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

    const user = await User.findById(
      session.user.id
    );

    console.log("User:", user);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    console.log(
      "Farm Location:",
      user.farmLocation
    );

    if (!user.farmLocation) {
      return NextResponse.json(
        { message: "Location not set" },
        { status: 400 }
      );
    }

    const lat = Number(
      user.farmLocation.latitude
    );

    const long = Number(
      user.farmLocation.longitude
    );

    console.log("Latitude:", lat);
    console.log("Longitude:", long);

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

    console.log(
      "Weather URL:",
      weatherUrl
    );

    const res = await fetch(weatherUrl);

    console.log(
      "Weather Status:",
      res.status
    );

    const data = await res.json();

    console.log(
      "Full Weather Response:",
      JSON.stringify(data, null, 2)
    );

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

    console.log(
      "Returning:",
      currentWeather
    );

    return NextResponse.json(
      currentWeather
    );
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