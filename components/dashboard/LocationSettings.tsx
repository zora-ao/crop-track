"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";

type LocationResult = {
  display_name: string;
  lat: string;
  lon: string;
};

export default function LocationSettings() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);

  const saveLocation = async (location: any) => {
    await fetch("/api/location", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: Number(location.lat),
longitude: Number(location.lon),
address: location.display_name,
      }),
    });

    toast.success("Location saved");
  };

  const searchLocation = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=jsonv2&limit=5`
);

      const data = await res.json();

      console.log("Testing", data)

      setResults(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await fetch("/api/location", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: "Current Location",
          }),
        });

        toast.success("Location saved");
      },

      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className="space-y-4">
      <Button onClick={getCurrentLocation}>
        Use My Location
      </Button>

      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location"
        />

        <Button
          onClick={searchLocation}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      <div className="space-y-2">
        {results.map((location) => (
          <button
            key={`${location.lat}-${location.lon}`}
            onClick={() => saveLocation(location)}
            className="w-full border p-2 rounded text-left hover:bg-muted"
          >
            {location.display_name}
          </button>
        ))}
      </div>
    </div>
  );
}