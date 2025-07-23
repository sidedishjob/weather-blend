"use client";

import { Cloud, Sparkles } from "lucide-react";
import { LocationSearch } from "@/components/location-search";

interface MobileHeaderProps {
  currentTime: string;
  today: string;
  onLocationSelect: (location: string) => void;
}

export const MobileHeader = ({
  currentTime,
  today,
  onLocationSelect,
}: MobileHeaderProps) => {
  return (
    <div className="lg:hidden glass-header relative z-20 p-4">
      <div className="space-y-3">
        {/* ロゴ + 現在時刻 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Cloud className="w-5 h-5 text-blue-700" />
              <Sparkles className="w-2 h-2 text-sky-600 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <h1 className="text-base font-bold text-blue-900">WeatherBlend</h1>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-blue-900">{currentTime}</div>
            <div className="text-blue-700 text-xs">{today}</div>
          </div>
        </div>

        {/* 地点検索 */}
        <LocationSearch onLocationSelect={onLocationSelect} />
      </div>
    </div>
  );
};
