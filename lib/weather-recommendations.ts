export function getWeatherRecommendations(
  temperature: number,
  humidity: number,
  rain: number
) {
  const recommendations: string[] = [];

  if (rain > 10) {
    recommendations.push(
      "Heavy rainfall expected. Check drainage systems."
    );
  } else if (rain > 0) {
    recommendations.push(
      "Light rain expected. Irrigation requirements may be reduced."
    );
  }

  if (humidity > 80) {
    recommendations.push(
      "High humidity may increase fungal disease risk."
    );
  }

  if (temperature > 35) {
    recommendations.push(
      "High temperatures detected. Monitor soil moisture."
    );
  } else if (temperature >= 25 && temperature <= 35) {
    recommendations.push(
      "Temperature conditions are suitable for most crops."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Weather conditions appear stable today."
    );
  }

  return recommendations;
}