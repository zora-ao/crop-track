"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { useSaveLocation } from "@/hooks/useSaveLocation";

type LocationResult = {
  display_name: string;
  lat: string;
  lon: string;
};

type LocationSearchProps = {
  onSuccess?: () => void;
};

export default function LocationSearch({
  onSuccess
}: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LocationResult[]>([]);

  const saveLocationMutation = useSaveLocation();

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

      setResults(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    searchLocation();
  }

  return (
    <div className="space-y-4">

      <form
        onSubmit={handleSubmit}
        className="flex gap-2"
      >
        <Input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search location"
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Searching..."
            : "Search"}
        </Button>
      </form>

      <div className="space-y-2">
        {results.map((location) => (
          <button
            key={`${location.lat}-${location.lon}`}
            onClick={() => {
              saveLocationMutation.mutate({
                latitude: Number(location.lat),
                longitude: Number(location.lon),
                address: location.display_name,
              }, {
                onSuccess: () => {
                  setQuery("");
                  setResults([]);
                  onSuccess?.();
                },
              }
            )}
            }
            className="w-full border p-2 rounded text-left hover:bg-muted"
          >
            {location.display_name}
          </button>
        ))}
      </div>
    </div>
  );
}