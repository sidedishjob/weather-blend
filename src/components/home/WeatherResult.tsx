"use client";

import { Cloud } from "lucide-react";
import { WeatherCard } from "@/components/weather-card";
import { WeatherSources } from "@/components/weather-sources";

interface WeatherResultProps {
  weatherData: {
    blended: any;
    sources: any[];
  } | null;
  isLoading: boolean;
  selectedLocation: string;
  animationKey: number;
}

export const WeatherResult = ({
  weatherData,
  isLoading,
  selectedLocation,
  animationKey,
}: WeatherResultProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh]">
        <div className="text-center space-y-4 sm:space-y-6 px-4">
          <div className="relative mx-auto w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
            <div className="absolute inset-0 rounded-full border-4 border-blue-300/40"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
            <Cloud className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-blue-900">
              データ解析中...
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-blue-800 font-medium">
              複数の気象データを統合しています
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (weatherData) {
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8" key={animationKey}>
        <div className="text-center space-y-2 sm:space-y-4 animate-card-fade-in px-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-950 animate-stagger-fade-in stagger-1">
            WeatherBlend予報
          </h2>
        </div>

        <div className="max-w-full sm:max-w-sm lg:max-w-md mx-auto animate-card-slide-up px-2 sm:px-0">
          <WeatherCard
            data={weatherData.blended}
            isBlended={true}
            cityName={selectedLocation}
          />
        </div>

        {/* 各情報源の詳細 */}
        <div className="max-w-full lg:max-w-2xl mx-auto animate-stagger-fade-in stagger-3 px-2 sm:px-0">
          <WeatherSources sources={weatherData.sources} />
        </div>
      </div>
    );
  }

  // 初期状態
  return (
    <div className="flex items-center justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh]">
      <div className="text-center space-y-4 sm:space-y-6 max-w-sm sm:max-w-md mx-auto px-4">
        <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-sky-500/40 rounded-full animate-pulse"></div>
          <Cloud className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-950">
            地点を選択してください
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-blue-900 font-medium leading-relaxed">
            <span className="lg:hidden">
              上部の検索から都市を選択すると、統合された天気予報が表示されます
            </span>
            <span className="hidden lg:inline">
              左側の検索エリアから都市を選択すると、統合された天気予報が表示されます
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
