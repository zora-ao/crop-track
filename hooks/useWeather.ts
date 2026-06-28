import { Weather } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";

export const useWeather = () => {
  return useQuery<Weather>({
    queryKey: ["weather"],

    queryFn: async () => {
      const res = await fetch("/api/weather");

      if (!res.ok) {
        throw new Error(
          "Failed to fetch weather"
        );
      }

      return res.json();
    },
  });
};