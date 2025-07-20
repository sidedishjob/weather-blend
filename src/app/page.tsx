"use client"

import { useState, useEffect } from "react"
import { LocationSearch } from "@/components/location-search"
import { WeatherCard } from "@/components/weather-card"
import { WeatherSources } from "@/components/weather-sources"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sparkles, TrendingUp, Zap, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  },
  "青森": {
    jma: { temperature: 5, weather: "雪", precipitation: 90, source: "気象庁", humidity: 88, windSpeed: 22 },
    yahoo: { temperature: 6, weather: "雪時々曇り", precipitation: 85, source: "Yahoo!天気", humidity: 85, windSpeed: 25 }
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

// 天気に応じた背景クラスを取得
function getWeatherBackgroundClass(weather: string) {
  const weatherLower = weather.toLowerCase()
  if (weatherLower.includes('晴') || weatherLower.includes('sunny')) {
    return 'weather-sunny'
  }
  if (weatherLower.includes('雨') || weatherLower.includes('rain')) {
    return 'weather-rainy'
  }
  if (weatherLower.includes('雪') || weatherLower.includes('snow')) {
    return 'weather-snowy'
  }
  if (weatherLower.includes('曇') || weatherLower.includes('cloud')) {
    return 'weather-cloudy'
  }
  return ''
}

// 雨滴を生成するコンポーネント
function RainDrops() {
  const drops = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="rain-drop"
      style={{
        left: `${Math.random() * 100}%`,
        animationDuration: `${0.5 + Math.random() * 0.5}s`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    />
  ))
  return <>{drops}</>
}

// 雪片を生成するコンポーネント
function SnowFlakes() {
  const flakes = Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="snow-flake"
      style={{
        left: `${Math.random() * 100}%`,
        animationDuration: `${3 + Math.random() * 2}s`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    />
  ))
  return <>{flakes}</>
}

// 雲を生成するコンポーネント
function CloudElements() {
  const clouds = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      className="cloud-element"
      style={{
        width: `${80 + Math.random() * 40}px`,
        height: `${40 + Math.random() * 20}px`,
        top: `${10 + Math.random() * 60}%`,
        animationDuration: `${20 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 10}s`,
      }}
    />
  ))
  return <>{clouds}</>
}
export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [weatherData, setWeatherData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLocationSelect = async (location: string) => {
    setIsLoading(true)
    setSelectedLocation(location)
    setIsMobileMenuOpen(false) // モバイルメニューを閉じる
    
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 relative overflow-hidden flex">
      {/* 動的背景エフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-300/20 via-transparent to-transparent"></div>
      
      {/* 浮遊する装飾要素 */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/60 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-sky-600/70 rounded-full animate-ping"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400/50 rounded-full animate-bounce"></div>

      {/* 左側サイドバー - 検索エリア */}
      <aside className="w-80 bg-white/80 backdrop-blur-xl border-r border-blue-300/50 shadow-lg relative z-10">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900 flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>地点検索</span>
            </h2>
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </div>
          
          {/* ロゴ・時間情報エリア */}
          <div className="p-6 space-y-6">
            {/* ロゴ */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <Cloud className="w-8 h-8 text-blue-700" />
                  <Sparkles className="w-4 h-4 text-sky-600 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">WeatherBlend</h1>
                </div>
              </div>
              <p className="text-sm text-blue-700 font-medium">複数の天気予報をブレンド</p>
            </div>
            
            {/* 時間表示 */}
            <div className="text-center space-y-2 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-300/40">
              <div className="text-2xl font-bold text-blue-900">{currentTime}</div>
              <div className="text-blue-700 text-sm">{today}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 右側メインエリア - 検索結果 */}
      <main className={`flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto relative z-10 ${
        weatherData ? getWeatherBackgroundClass(weatherData.blended.weather) : ''
      }`}>
        {/* 天気アニメーション要素 */}
        {weatherData && (
          <>
            {getWeatherBackgroundClass(weatherData.blended.weather) === 'weather-rainy' && <RainDrops />}
            {getWeatherBackgroundClass(weatherData.blended.weather) === 'weather-snowy' && <SnowFlakes />}
            {getWeatherBackgroundClass(weatherData.blended.weather) === 'weather-cloudy' && <CloudElements />}
          </>
        )}
        
        {/* ローディング状態 */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-6">
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
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
                WeatherBlend予報
              </h2>
              <p className="text-blue-800 text-lg md:text-xl">
                {selectedLocation}
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
            <div className="max-w-2xl mx-auto">
              <WeatherSources sources={weatherData.sources} />
            </div>
          </div>
        )}

        {/* 初期状態のメッセージ */}
        {!weatherData && !isLoading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-sky-500/40 rounded-full animate-pulse"></div>
                <Cloud className="w-16 h-16 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-blue-900">
                  地点を選択してください
                </h2>
                <p className="text-blue-800 leading-relaxed">
                  左側の検索エリアから都市を選択すると、統合された天気予報が表示されます
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

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