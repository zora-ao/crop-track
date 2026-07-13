"use client";

import { useWeather } from "@/hooks/useWeather";
import { getWeatherRecommendations } from "@/lib/weather-recommendations";
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/loading-skeleton";

export default function WeatherRecommendations() {
  const { data, isLoading } = useWeather();

  if (isLoading) {
    return (
      <div className="space-y-3 w-full">
        <Skeleton height={48} className="rounded-xl" />
        <Skeleton height={48} className="rounded-xl" />
        <Skeleton height={48} className="rounded-xl" />
      </div>
    );
  }

  if (!data || !data.locationSet) {
    return (
      <div className="flex items-center gap-4 p-4 border border-dashed rounded-xl bg-stone-50/50 w-full">
        <div className="p-2.5 bg-stone-100 rounded-full text-stone-400 shrink-0">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-xs text-stone-700">No recommendations available</p>
          <p className="text-[11px] text-stone-400 mt-0.5">
            Please map out or authorize your farm location setup first to compile advisory lists.
          </p>
        </div>
      </div>
    );
  }

  const recommendations = getWeatherRecommendations(
    data.weather?.temperature_2m ?? 0,
    data.weather?.relative_humidity_2m ?? 0,
    data.weather?.precipitation ?? 0
  );

  return (
    <div className="w-full">
      {/* Subtitle context flag header */}
      <div className="flex items-center gap-1.5 mb-4 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
        <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
        <span>Real-Time Condition Advisory</span>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-stone-200 rounded-xl bg-stone-50/30">
          <p className="text-xs font-medium text-stone-400">
            Microclimate is currently stable. No operational field changes are flagged for today.
          </p>
        </div>
      ) : (
        /* Switched to a multi-column flex layout map to utilize width on large viewports */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3.5 rounded-xl border border-stone-100 bg-stone-50/40 hover:bg-stone-50 hover:border-stone-200/80 transition-all duration-200"
            >
              <div className="mt-0.5 bg-emerald-50 text-emerald-600 rounded-full p-0.5 shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-medium text-stone-700 leading-normal">
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}