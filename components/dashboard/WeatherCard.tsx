"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeather } from "@/hooks/useWeather";
import { useState } from "react";
import { Button } from "../ui/button";
import { MapPin, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LocationSearch from "./LocationSearch";
import { useLocation } from "@/hooks/useLocation";

export default function WeatherCard() {
  const { data, isLoading } = useWeather();
  const { getCurrentLocation } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);  

  if (isLoading) {
    return <p>Loading weather...</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Today's Weather
        </CardTitle>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={getCurrentLocation}
          >
            <MapPin className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {!data?.locationSet ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              No farm location set.
            </p>

            <p className="text-sm text-muted-foreground mt-2">
              Click 📍 or 🔍 to choose a location.
            </p>
          </div>
        ) : (
          <>
            <p>
              🌡 Temperature:
              {data.weather?.temperature_2m}°C
            </p>

            <p>
              💧 Humidity:
              {data.weather?.relative_humidity_2m}%
            </p>

            <p>
              🌧 Rain:
              {data.weather?.precipitation} mm
            </p>
          </>
        )}
      </CardContent>

      <Dialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Search Location
            </DialogTitle>
          </DialogHeader>

          <LocationSearch onSuccess={() => setSearchOpen(false)} />
        </DialogContent>
      </Dialog>

    </Card>
  );
}