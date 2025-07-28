"use client";

import { useState } from "react";
import { calculateBlendedWeather } from "@/lib/weather/calculateBlendedWeather";
import { WeatherEffects } from "@/components/home/WeatherEffects";
import { Sidebar } from "@/components/home/Sidebar";
import { MobileHeader } from "@/components/home/MobileHeader";
import { WeatherResult } from "@/components/home/WeatherResult";
import type { WeatherSource, BlendedWeather } from "@/types/weather";

type WeatherState = {
  blended: BlendedWeather;
  sources: WeatherSource[];
} | null;

// モックデータ（実際のAPIと接続時に置き換え）
const mockWeatherData: Record<
  string,
  { jma: WeatherSource; yahoo: WeatherSource }
> = {
  東京: {
    jma: {
      temperature: 22,
      weather: "晴れ",
      precipitation: 10,
      source: "jma",
      humidity: 65,
      windSpeed: 12,
    },
    yahoo: {
      temperature: 24,
      weather: "晴れ時々曇り",
      precipitation: 20,
      source: "yahoo",
      humidity: 68,
      windSpeed: 15,
    },
  },
  大阪: {
    jma: {
      temperature: 5,
      weather: "雪",
      precipitation: 90,
      source: "jma",
      humidity: 72,
      windSpeed: 8,
    },
    yahoo: {
      temperature: 2,
      weather: "曇り時々雪",
      precipitation: 85,
      source: "yahoo",
      humidity: 70,
      windSpeed: 10,
    },
  },
  札幌: {
    jma: {
      temperature: 15,
      weather: "雨",
      precipitation: 80,
      source: "jma",
      humidity: 85,
      windSpeed: 18,
    },
    yahoo: {
      temperature: 16,
      weather: "小雨",
      precipitation: 70,
      source: "yahoo",
      humidity: 82,
      windSpeed: 20,
    },
  },
  青森: {
    jma: {
      temperature: 5,
      weather: "雪",
      precipitation: 90,
      source: "jma",
      humidity: 88,
      windSpeed: 22,
    },
    yahoo: {
      temperature: 6,
      weather: "雪時々曇り",
      precipitation: 85,
      source: "yahoo",
      humidity: 85,
      windSpeed: 25,
    },
  },
};

// 天気に応じた背景クラスを取得
function getWeatherBackgroundClass(weather: string) {
  const weatherLower = weather.toLowerCase();
  if (weatherLower.includes("晴") || weatherLower.includes("sunny")) {
    return "weather-sunny";
  }
  if (weatherLower.includes("雨") || weatherLower.includes("rain")) {
    return "weather-rainy";
  }
  if (weatherLower.includes("雪") || weatherLower.includes("snow")) {
    return "weather-snowy";
  }
  if (weatherLower.includes("曇") || weatherLower.includes("cloud")) {
    return "weather-cloudy";
  }
  return "";
}

export const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherState>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleLocationSelect = async (location: string) => {
    setIsLoading(true);
    setSelectedLocation(location);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const locationData =
      mockWeatherData[location as keyof typeof mockWeatherData];

    const sources: WeatherSource[] = locationData
      ? [locationData.jma, locationData.yahoo]
      : [
          {
            temperature: 20,
            weather: "晴れ",
            precipitation: 15,
            source: "jma",
            humidity: 60,
            windSpeed: 10,
          },
          {
            temperature: 22,
            weather: "晴れ時々曇り",
            precipitation: 25,
            source: "yahoo",
            humidity: 65,
            windSpeed: 12,
          },
        ];

    const blended = calculateBlendedWeather(sources);
    setWeatherData({ blended, sources });

    setIsLoading(false);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 relative overflow-hidden">
      {/* 動的背景エフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-300/20 via-transparent to-transparent"></div>

      {/* 浮遊する装飾要素 */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/60 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-sky-600/70 rounded-full animate-ping"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400/50 rounded-full animate-bounce"></div>

      {/* モバイル用ヘッダー */}
      {/* モバイル用検索エリア */}
      <MobileHeader onLocationSelect={handleLocationSelect} />

      {/* デスクトップ・モバイル共通レイアウト */}
      <div className="flex flex-col lg:flex-row min-h-[70vh]">
        {/* デスクトップ用サイドバー */}
        <Sidebar onLocationSelect={handleLocationSelect} />

        {/* メインエリア - 検索結果 */}
        <main
          className={`flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10 min-h-[70vh] ${
            weatherData
              ? getWeatherBackgroundClass(weatherData.blended.weather)
              : ""
          }`}
        >
          {/* 天気アニメーション要素 */}
          {weatherData && (
            <WeatherEffects weather={weatherData.blended.weather} />
          )}

          {/* 検索結果エリア */}
          <WeatherResult
            weatherData={weatherData}
            isLoading={isLoading}
            selectedLocation={selectedLocation}
            animationKey={animationKey}
          />
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};
