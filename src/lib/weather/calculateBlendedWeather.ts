import type { WeatherSource, BlendedWeather } from "@/types/weather";

// WeatherSource のうち数値型のキーを抽出
type AvgKeys = "temperature" | "precipitation" | "humidity" | "windSpeed";

export function calculateBlendedWeather(
  sources: WeatherSource[]
): BlendedWeather {
  const avg = (key: AvgKeys): number => {
    const values = sources.map((s) => s[key]);

    if (values.length === 0) {
      throw new Error(`No values for key "${key}".`);
    }

    return values.reduce((sum, val) => sum + val, 0) / values.length;
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

  const confidence =
    sources.length >= 2
      ? Math.max(
          85,
          100 - Math.abs(sources[0].temperature - sources[1].temperature) * 5
        )
      : 90;

  return {
    temperature: avgTemp,
    weather,
    precipitation: avgPrecip,
    humidity: avgHumidity,
    windSpeed: avgWind,
    confidence,
  };
}
