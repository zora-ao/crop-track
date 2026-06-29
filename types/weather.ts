export interface Weather {
  locationSet: boolean;
  weather: {
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
  } | null;
  
}