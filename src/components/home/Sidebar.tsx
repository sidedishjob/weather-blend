"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cloud, Sparkles } from "lucide-react";
import { LocationSearch } from "@/components/location-search";

interface SidebarProps {
  currentTime: string;
  today: string;
  onLocationSelect: (location: string) => void;
}

export const Sidebar = ({
  currentTime,
  today,
  onLocationSelect,
}: SidebarProps) => {
  return (
    <aside className="hidden lg:block w-80 glass-sidebar relative z-10 min-h-screen">
      <div className="p-6 space-y-6">
        {/* 地点検索 */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-900 flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>地点検索</span>
          </h2>
          <LocationSearch onLocationSelect={onLocationSelect} />
        </div>

        {/* ロゴと説明 */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <div className="relative">
                <Cloud className="w-8 h-8 text-blue-700" />
                <Sparkles className="w-4 h-4 text-sky-600 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900">WeatherBlend</h1>
            </div>
            <p className="text-sm text-blue-700 font-medium">
              複数の天気予報をブレンド
            </p>
          </div>

          {/* 時間表示 */}
          <div className="text-center space-y-2 p-4 glass-card rounded-lg hover-lift">
            <div className="text-2xl font-bold text-blue-900">
              {currentTime}
            </div>
            <div className="text-blue-700 text-sm">{today}</div>
          </div>
        </div>

        {/* ナビゲーションリンク */}
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="flex flex-col space-y-2">
            <Link href="/about">
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-700 hover:text-blue-900 glass-button transition-all duration-300"
              >
                <span className="text-sm">WeatherBlendについて</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-700 hover:text-blue-900 glass-button transition-all duration-300"
              >
                <span className="text-sm">お問い合わせ</span>
              </Button>
            </Link>
            <Link href="/map">
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-700 hover:text-blue-900 glass-button transition-all duration-300"
              >
                <span className="text-sm">日本地図で確認</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
