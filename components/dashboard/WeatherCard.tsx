"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeather } from "@/hooks/useWeather";

export default function WeatherCard() {
  const { data, isLoading } = useWeather();

  if (isLoading) {
    return <p>Loading weather...</p>;
  }

  if (!data) {
    return <p>No weather data.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Today's Weather
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p>
          🌡 Temperature:
          {" "}
          {data.temperature_2m}°C
        </p>

        <p>
          💧 Humidity:
          {" "}
          {data.relative_humidity_2m}%
        </p>

        <p>
          🌧 Rain:
          {" "}
          {data.precipitation} mm
        </p>
      </CardContent>
    </Card>
  );
}