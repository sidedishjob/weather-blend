import { WeatherSource } from "@/types/weather";

export const WEATHER_SOURCE_LABELS: Record<WeatherSource["source"], string> = {
  jma: "気象庁",
  yahoo: "Yahoo!天気",
};
