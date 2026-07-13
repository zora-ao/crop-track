"use client";

import { useWeather } from "@/hooks/useWeather";
import { useState } from "react";
import { Button } from "../ui/button";
import { MapPin, Search, Droplets, CloudRain, Navigation } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LocationSearch from "./LocationSearch";
import { useLocation } from "@/hooks/useLocation";
import { Skeleton } from "@/components/ui/loading-skeleton";

export default function WeatherCard() {
  const { data, isLoading } = useWeather();
  const { getCurrentLocation } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);  

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full h-24">
        <Skeleton height={40} width="120px" />
        <div className="flex gap-4 w-full sm:w-auto">
          <Skeleton height={48} width="140px" className="rounded-xl" />
          <Skeleton height={48} width="140px" className="rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Action Controller Strip */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-stone-700">Farm Location</span>
          {data?.locationSet && (
            <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
              <MapPin className="h-3 w-3 text-stone-400" />
              Active Coordinates
            </span>
          )}
        </div>

        <div className="flex gap-1 bg-stone-50 p-0.5 rounded-lg border border-stone-100">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-100"
            onClick={getCurrentLocation}
            title="Use current location"
          >
            <Navigation className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-100"
            onClick={() => setSearchOpen(true)}
            title="Search address"
          >
            <Search className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Stats Display Matrix */}
      {!data?.locationSet ? (
        <div className="flex items-center gap-4 p-4 border border-dashed rounded-xl bg-stone-50/50">
          <div className="p-2.5 bg-stone-100 rounded-full text-stone-400 shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-xs text-stone-800">No farm location tracked</p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Enable positioning features or enter an address to pull localized telemetry.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Temperature Node */}
          <div className="flex items-baseline gap-1.5 shrink-0 bg-stone-50/60 px-4 py-2 rounded-xl border border-stone-100">
            <span className="text-4xl font-bold tracking-tight text-stone-900">
              {Math.round(data.weather?.temperature_2m ?? 0)}
            </span>
            <span className="text-lg font-medium text-stone-400">°C</span>
          </div>

          {/* Secondary Metric Grid Column Block */}
          <div className="grid grid-cols-2 gap-3 flex-1 max-w-xl">
            
            {/* Humidity Item */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50/40 border border-stone-100">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-lg shrink-0 h-8 w-8 flex items-center justify-center">
                <Droplets className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider leading-none mb-1">
                  Humidity
                </p>
                <p className="text-sm font-bold tracking-tight text-stone-800">
                  {data.weather?.relative_humidity_2m}%
                </p>
              </div>
            </div>

            {/* Precipitation Item */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50/40 border border-stone-100">
              <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg shrink-0 h-8 w-8 flex items-center justify-center">
                <CloudRain className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider leading-none mb-1">
                  Precipitation
                </p>
                <p className="text-sm font-bold tracking-tight text-stone-800">
                  {data.weather?.precipitation} mm
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search Location</DialogTitle>
          </DialogHeader>
          <LocationSearch onSuccess={() => setSearchOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}