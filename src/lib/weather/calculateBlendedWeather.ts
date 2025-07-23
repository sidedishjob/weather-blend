import type { WeatherSource, BlendedWeather } from "@/types/weather";

export function calculateBlendedWeather(
  sources: WeatherSource[]
): BlendedWeather {
  const avg = <K extends keyof WeatherSource>(key: K): number => {
    const values = sources.map((s) => s[key]);

    if (typeof values[0] !== "number") {
      throw new Error(`Invalid key "${String(key)}" - expected number.`);
    }

    return (
      (values as number[]).reduce((sum, val) => sum + val, 0) / values.length
    );
  };

  const avgTemp = avg("temperature");
  const avgPrecip = avg("precipitation");
  const avgHumidity = avg("humidity");
  const avgWind = avg("windSpeed");

  let weather = "晴れ";
  if (avgPrecip > 80) weather = "雪";
  else if (avgPrecip > 60) weather = "雨";
  else if (avgPrecip > 30) weather = "曇り";
  else if (avgPrecip > 10) weather = "晴れ時々曇り";

  const confidence = Math.max(
    85,
    100 - Math.abs(sources[0].temperature - sources[1].temperature) * 5
  );

  return {
    temperature: avgTemp,
    weather,
    precipitation: avgPrecip,
    humidity: avgHumidity,
    windSpeed: avgWind,
    source: "WeatherBlend",
    confidence,
  };
}
