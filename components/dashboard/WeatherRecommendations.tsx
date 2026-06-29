"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherRecommendations } from "@/lib/weather-recommendations";

export default function WeatherRecommendations() {
  const { data, isLoading } = useWeather();

  if (isLoading) {
    return <p>Loading recommendations...</p>;
  }

  if (!data) {
    return <p>No weather data available.</p>;
  }

  console.log(data)

  const recommendations =
    getWeatherRecommendations(
      data.temperature_2m,
      data.relative_humidity_2m,
      data.precipitation
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Weather Recommendations
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((item) => (
            <li key={item}>
              ✓ {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}