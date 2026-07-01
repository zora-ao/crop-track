"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useWeather } from "@/hooks/useWeather";
import { useState } from "react";
import { Button } from "../ui/button";
import { MapPin, Search, Droplets, CloudRain, Navigation } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LocationSearch from "./LocationSearch";
import { useLocation } from "@/hooks/useLocation";

export default function WeatherCard() {
  const { data, isLoading } = useWeather();
  const { getCurrentLocation } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);  

  if (isLoading) {
    return (
      <Card className="w-full max-w-md animate-pulse">
        <div className="h-48 bg-muted rounded-xl" />
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md overflow-hidden border border-border/60 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-semibold font-inter tracking-tight">
            Farm Weather
          </CardTitle>
          {data?.locationSet && (
            <CardDescription className="flex items-center gap-1 text-xs mt-0.5">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              Current Coordinates
            </CardDescription>
          )}
        </div>

        <div className="flex gap-1 bg-muted/60 p-1 rounded-lg">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"
            onClick={getCurrentLocation}
            title="Use current location"
          >
            <Navigation className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setSearchOpen(true)}
            title="Search address"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {!data?.locationSet ? (
          <div className="flex flex-col items-center justify-center text-center py-8 px-4 border border-dashed rounded-xl bg-muted/20">
            <div className="p-3 bg-muted rounded-full text-muted-foreground mb-3">
              <MapPin className="h-6 w-6" />
            </div>
            <p className="font-medium text-sm text-foreground">
              No farm location set
            </p>
            <p className="text-xs text-muted-foreground max-w-[240px] mt-1">
              Enable your location services or search for your address to track weather conditions.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Temp Hero Display */}
            <div className="flex items-baseline gap-2 justify-center py-2">
              <span className="text-5xl font-bold tracking-tighter">
                {Math.round(data.weather?.temperature_2m ?? 0)}
              </span>
              <span className="text-2xl font-medium text-muted-foreground">°C</span>
            </div>

            {/* Grid Metrics - Data moved directly below labels */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/60">
              
              {/* Humidity Metric Block */}
              <div className="flex gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                <div className="p-2 bg-blue-500/10 text-blue-500 dark:text-blue-400 rounded-lg shrink-0 h-9 w-9 flex items-center justify-center">
                  <Droplets className="h-4 w-4" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider leading-none mb-1">
                    Humidity
                  </p>
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {data.weather?.relative_humidity_2m}%
                  </p>
                </div>
              </div>

              {/* Rain/Precipitation Metric Block */}
              <div className="flex gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                <div className="p-2 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-lg shrink-0 h-9 w-9 flex items-center justify-center">
                  <CloudRain className="h-4 w-4" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider leading-none mb-1">
                    Rain
                  </p>
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {data.weather?.precipitation} mm
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </CardContent>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search Location</DialogTitle>
          </DialogHeader>
          <LocationSearch onSuccess={() => setSearchOpen(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}