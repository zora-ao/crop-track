"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherRecommendations } from "@/lib/weather-recommendations";
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function WeatherRecommendations() {
  const { data, isLoading } = useWeather();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md animate-pulse">
        <div className="h-40 bg-muted rounded-xl" />
      </Card>
    );
  }

  // Handle either no data or data without actual weather parameters set yet
  if (!data || !data.locationSet) {
    return (
      <Card className="w-full max-w-md border border-border/60 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center text-center py-6 px-4">
          <AlertCircle className="h-5 w-5 text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-muted-foreground">
            No recommendations available
          </p>
          <p className="text-xs text-muted-foreground/80 mt-0.5">
            Please set a farm location first to generate smart insights.
          </p>
        </CardContent>
      </Card>
    );
  }

  const recommendations = getWeatherRecommendations(
    data.weather?.temperature_2m,
    data.weather?.relative_humidity_2m,
    data.weather?.precipitation
  );

  return (
    <Card className="w-full max-w-md border border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">
              Smart Actions
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              AI-generated farm tasks based on current metrics
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {recommendations.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2 text-center">
            Conditions are stable. No urgent actions needed today.
          </p>
        ) : (
          <div className="space-y-2.5">
            {recommendations.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] hover:bg-emerald-500/[0.04] transition-colors"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-foreground/90 leading-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}