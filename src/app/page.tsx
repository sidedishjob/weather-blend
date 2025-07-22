"use client"

import { useState, useEffect } from "react"
import { LocationSearch } from "@/components/location-search"
import { WeatherCard } from "@/components/weather-card"
import { WeatherSources } from "@/components/weather-sources"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sparkles, TrendingUp, Zap, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  const drops = Array.from({ length: 80 }, (_, i) => {
    const left = Math.random() * 100
    const duration = 0.3 + Math.random() * 0.4
    const delay = Math.random() * 2
    
    return (
      <div key={`rain-${i}`}>
        <div
          className="rain-drop"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
        {/* 雨滴の跳ね返り効果 */}
        {i % 8 === 0 && (
          <div
            className="rain-splash"
            style={{
              left: `${left}%`,
              animationDuration: `0.3s`,
              animationDelay: `${delay + duration}s`,
            }}
          />
        )}
        {/* 水たまりの波紋効果 */}
        {i % 12 === 0 && (
          <div
            className="puddle-ripple"
            style={{
              left: `${left - 1}%`,
              animationDuration: `2s`,
              animationDelay: `${delay + duration + 0.1}s`,
            }}
          />
        )}
      </div>
    )
  })
  return (
    <>
      {drops}
      {/* 雨の音を表現する背景効果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-600/10 pointer-events-none"></div>
    </>
  )
}

// 雪片を生成するコンポーネント
function SnowFlakes() {
  const flakes = Array.from({ length: 40 }, (_, i) => {
    const size = 3 + Math.random() * 3
    return (
      <div
        key={`snow-${i}`}
        className="snow-flake"
        style={{
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${4 + Math.random() * 3}s`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      />
    )
  })
  return (
    <>
      {flakes}
      {/* 雪の積もり効果 */}
      <div className="snow-accumulation"></div>
      {/* 冷たい空気の表現 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/10 via-transparent to-blue-200/15 pointer-events-none"></div>
    </>
  )
}

// 雲を生成するコンポーネント
function CloudElements() {
  const clouds = Array.from({ length: 4 }, (_, i) => (
    <div
      key={`cloud-${i}`}
      className="cloud-element"
      style={{
        width: `${100 + Math.random() * 60}px`,
        height: `${50 + Math.random() * 30}px`,
        top: `${5 + Math.random() * 70}%`,
        animationDuration: `${25 + Math.random() * 15}s`,
        animationDelay: `${Math.random() * 15}s`,
        opacity: 0.3 + Math.random() * 0.3,
      }}
    />
  ))
  return (
    <>
      {clouds}
      {/* 曇り空の重い雰囲気 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-400/8 via-gray-500/5 to-gray-600/10 pointer-events-none"></div>
    </>
  )
}

// 晴れの太陽効果を生成するコンポーネント
function SunnyEffects() {
  return (
    <>
      {/* 太陽の光線 */}
      <div className="sun-rays"></div>
      {/* 暖かい空気の表現 */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 via-orange-200/5 to-red-200/8 pointer-events-none"></div>
      {/* キラキラ効果 */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse pointer-events-none"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </>
  )
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

      {/* モバイル用ヘッダー */}
      {/* モバイル用検索エリア */}
      <div className="lg:hidden glass-header relative z-20 p-4">
        <div className="space-y-3">
          {/* コンパクトヘッダー */}
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
          
          {/* ミニマム地点検索 */}
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>
      </div>

      {/* デスクトップ・モバイル共通レイアウト */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* デスクトップ用サイドバー */}
        <aside className="hidden lg:block w-80 glass-sidebar relative z-10 min-h-screen">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-900 flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>地点検索</span>
              </h2>
              <LocationSearch onLocationSelect={handleLocationSelect} />
            </div>
            
            {/* ロゴ・時間情報エリア */}
            <div className="space-y-6">
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
              <div className="text-center space-y-2 p-4 glass-card rounded-lg hover-lift">
                <div className="text-2xl font-bold text-blue-900">{currentTime}</div>
                <div className="text-blue-700 text-sm">{today}</div>
              </div>
            </div>
            
            {/* ナビゲーションリンク */}
            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="flex flex-col space-y-2">
                <Link href="/about">
                  <Button variant="ghost" className="w-full justify-start text-blue-700 hover:text-blue-900 glass-button transition-all duration-300">
                    <span className="text-sm">WeatherBlendについて</span>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" className="w-full justify-start text-blue-700 hover:text-blue-900 glass-button transition-all duration-300">
                    <span className="text-sm">お問い合わせ</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* メインエリア - 検索結果 */}
        <main className={`flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10 min-h-screen ${
          weatherData ? getWeatherBackgroundClass(weatherData.blended.weather) : ''
        }`}>
        {/* 天気アニメーション要素 */}
        {weatherData && (
          <>
            {getWeatherBackgroundClass(weatherData.blended.weather) === 'weather-sunny' && <SunnyEffects />}
            {getWeatherBackgroundClass(weatherData.blended.weather) === 'weather-rainy' && <RainDrops />}
            {getWeatherBackgroundClass(weatherData.blended.weather) === 'weather-snowy' && <SnowFlakes />}
            {getWeatherBackgroundClass(weatherData.blended.weather) === 'weather-cloudy' && <CloudElements />}
          </>
        )}
        
        {/* ローディング状態 */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[50vh] lg:min-h-[60vh]">
            <div className="text-center space-y-6">
              <div className="relative mx-auto w-16 h-16 lg:w-20 lg:h-20">
                <div className="absolute inset-0 rounded-full border-4 border-blue-300/40"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
                <Cloud className="w-6 h-6 lg:w-8 lg:h-8 text-blue-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg lg:text-xl font-semibold text-blue-900">データ解析中...</h3>
                <p className="text-sm lg:text-base text-blue-700">複数の気象データを統合しています</p>
              </div>
            </div>
          </div>
        )}

        {/* WeatherBlend予報 */}
        {weatherData && !isLoading && (
          <div className="space-y-6 lg:space-y-8" key={animationKey}>
            <div className="text-center space-y-4 animate-card-fade-in">
              <div className="inline-flex items-center space-x-2 glass-button rounded-full px-6 py-2 animate-bounce-in">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-blue-800 text-sm font-medium">信頼度 {Math.round(weatherData.blended.confidence)}%</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 animate-stagger-fade-in stagger-1">
                WeatherBlend予報
              </h2>
              <p className="text-blue-800 text-base md:text-lg lg:text-xl animate-stagger-fade-in stagger-2">
                {selectedLocation}
              </p>
            </div>
            
            <div className="max-w-sm lg:max-w-md mx-auto animate-card-slide-up">
              <WeatherCard data={weatherData.blended} isBlended={true} cityName={selectedLocation} />
            </div>

            {/* 各情報源の詳細 */}
            <div className="max-w-full lg:max-w-2xl mx-auto animate-stagger-fade-in stagger-3">
              <WeatherSources sources={weatherData.sources} />
            </div>
          </div>
        )}

        {/* 初期状態のメッセージ */}
        {!weatherData && !isLoading && (
          <div className="flex items-center justify-center min-h-[50vh] lg:min-h-[60vh]">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div className="relative mx-auto w-20 h-20 lg:w-24 lg:h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-sky-500/40 rounded-full animate-pulse"></div>
                <Cloud className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl lg:text-2xl font-bold text-blue-900">
                  地点を選択してください
                </h2>
                <p className="text-sm lg:text-base text-blue-800 leading-relaxed px-4">
                  <span className="lg:hidden">上部から都市を選択すると、統合された天気予報が表示されます</span>
                  <span className="hidden lg:inline">左側の検索エリアから都市を選択すると、統合された天気予報が表示されます</span>
                </p>
              </div>
            </div>
          </div>
        )}
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
  )
}