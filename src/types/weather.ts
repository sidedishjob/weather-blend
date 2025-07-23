export interface WeatherSource {
  temperature: number;
  weather: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  source: string;
}

export interface BlendedWeather {
  temperature: number;
  weather: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  source: string;
  confidence: number;
}
