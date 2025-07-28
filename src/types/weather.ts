export type WeatherSourceType = "yahoo" | "jma";

export interface WeatherSource {
  // 個別の提供元（YahooやJMA）の気象データ
  source: WeatherSourceType;
  temperature: number;
  weather: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface BlendedWeather {
  temperature: number;
  weather: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  confidence: number; // ブレンドの信頼度（例: 0.0〜1.0）
}
