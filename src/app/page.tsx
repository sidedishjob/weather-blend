"use client"

import { useState, useEffect } from "react"
import { LocationSearch } from "@/components/location-search"
import { WeatherCard } from "@/components/weather-card"
import { WeatherSources } from "@/components/weather-sources"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sparkles, TrendingUp, Zap } from "lucide-react"

// モックデータ（実際のAPIと接続時に置き換え）
const mockWeatherData = {
  "東京": {
    jma: { temperature: 22, weather: "晴れ", precipitation: 10, source: "気象庁", humidity: 65, windSpeed: 12 },
    yahoo: { temperature: 24, weather: "晴れ時々曇り", precipitation: 20, source: "Yahoo!天気", humidity: 68, windSpeed: 15 }
  },
  "大阪": {
    jma: { temperature: 25, weather: "曇り", precipitation: 30, source: "気象庁", humidity: 72, windSpeed: 8 },
    yahoo: { temperature: 26, weather: "曇り時々晴れ", precipitation: 25, source: "Yahoo!天気", humidity: 70, windSpeed: 10 }
  },
  "札幌": {
    jma: { temperature: 15, weather: "雨", precipitation: 80, source: "気象庁", humidity: 85, windSpeed: 18 },
    yahoo: { temperature: 16, weather: "小雨", precipitation: 70, source: "Yahoo!天気", humidity: 82, windSpeed: 20 }
  }
}

function calculateBlendedWeather(sources: any[]) {
  const avgTemp = sources.reduce((sum, s) => sum + s.temperature, 0) / sources.length
  const avgPrecipitation = sources.reduce((sum, s) => sum + s.precipitation, 0) / sources.length
  const avgHumidity = sources.reduce((sum, s) => sum + s.humidity, 0) / sources.length
  const avgWindSpeed = sources.reduce((sum, s) => sum + s.windSpeed, 0) / sources.length
  
  // 天気の決定ロジック（簡易版）
  let weather = "晴れ"
  if (avgPrecipitation > 60) weather = "雨"
  else if (avgPrecipitation > 30) weather = "曇り"
  else if (avgPrecipitation > 10) weather = "晴れ時々曇り"
  
  return {
    temperature: avgTemp,
    weather,
    precipitation: avgPrecipitation,
    humidity: avgHumidity,
    windSpeed: avgWindSpeed,
    source: "WeatherBlend",
    confidence: Math.max(85, 100 - Math.abs(sources[0].temperature - sources[1].temperature) * 5)
  }
}

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [weatherData, setWeatherData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const handleLocationSelect = async (location: string) => {
    setIsLoading(true)
    setSelectedLocation(location)
    
    // アニメーション効果のための遅延
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // モックデータから取得（実際のAPIと接続時に置き換え）
    const locationData = mockWeatherData[location as keyof typeof mockWeatherData]
    if (locationData) {
      const sources = [locationData.jma, locationData.yahoo]
      const blended = calculateBlendedWeather(sources)
      setWeatherData({ blended, sources })
    } else {
      // デフォルトデータ
      const sources = [
        { temperature: 20, weather: "晴れ", precipitation: 15, source: "気象庁", humidity: 60, windSpeed: 10 },
        { temperature: 22, weather: "晴れ時々曇り", precipitation: 25, source: "Yahoo!天気", humidity: 65, windSpeed: 12 }
      ]
      const blended = calculateBlendedWeather(sources)
      setWeatherData({ blended, sources })
    }
    
    setIsLoading(false)
    setAnimationKey(prev => prev + 1)
  }

  const today = new Date().toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  })

  const currentTime = new Date().toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 relative overflow-hidden">
      {/* 動的背景エフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-300/20 via-transparent to-transparent"></div>
      
      {/* 浮遊する装飾要素 */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/60 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-sky-600/70 rounded-full animate-ping"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400/50 rounded-full animate-bounce"></div>
      
      {/* ヘッダー */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-blue-300/50 sticky top-0 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Cloud className="w-10 h-10 text-blue-700" />
                <Sparkles className="w-4 h-4 text-sky-600 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-900">
                  WeatherBlend
                </h1>
                <p className="text-xs text-blue-700 font-medium">複数の天気予報をブレンド</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-blue-800 text-sm font-medium">{currentTime}</div>
              <div className="text-blue-700 text-xs">{today}</div>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* 地点選択 */}
        <Card className="bg-white/85 backdrop-blur-xl border-blue-300/60 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-blue-900 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-sky-600" />
              <span>スマート地点検索</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </CardContent>
        </Card>

        {/* ローディング状態 */}
        {isLoading && (
          <div className="text-center py-16 space-y-6">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-blue-300/40"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
              <Cloud className="w-8 h-8 text-blue-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-900">データ解析中...</h3>
              <p className="text-blue-700">複数の気象データを統合しています</p>
            </div>
          </div>
        )}

        {/* WeatherBlend予報 */}
        {weatherData && !isLoading && (
          <div className="space-y-8" key={animationKey}>
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/30 to-sky-500/30 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-400/50">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-blue-800 text-sm font-medium">信頼度 {Math.round(weatherData.blended.confidence)}%</span>
              </div>
              <h2 className="text-4xl font-bold text-blue-900">
                WeatherBlend予報
              </h2>
              <p className="text-blue-800 text-lg">
                {selectedLocation} • {today}
              </p>
            </div>
            
            <div className="max-w-md mx-auto transform hover:scale-105 transition-all duration-500">
              <WeatherCard data={weatherData.blended} isBlended={true} />
            </div>

            {/* 詳細メトリクス */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <Card className="bg-white/80 backdrop-blur-xl border-blue-300/50 hover:bg-white/90 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{Math.round(weatherData.blended.humidity)}%</div>
                  <div className="text-blue-700 text-sm">湿度</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-xl border-blue-300/50 hover:bg-white/90 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{Math.round(weatherData.blended.windSpeed)}m/s</div>
                  <div className="text-blue-700 text-sm">風速</div>
                </CardContent>
              </Card>
            </div>

            {/* 各情報源の詳細 */}
            <div className="max-w-md mx-auto">
              <WeatherSources sources={weatherData.sources} />
            </div>
          </div>
        )}

        {/* 初期状態のメッセージ */}
        {!weatherData && !isLoading && (
          <div className="text-center py-20 space-y-6">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-sky-500/40 rounded-full animate-pulse"></div>
              <Cloud className="w-16 h-16 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-blue-900">
                次世代天気予報体験
              </h2>
              <p className="text-blue-800 max-w-md mx-auto leading-relaxed">
                複数の気象データを統合し、最も信頼性の高い予報をお届けします
              </p>
            </div>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-blue-300/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="text-blue-800 text-sm font-medium">複数データ統合システム</span>
            </div>
            <p className="text-blue-700 text-xs">
              © 2025 WeatherBlend. 革新的な気象予報プラットフォーム
            </p>
          </div>
        </div>
      </footer>

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
  )
}