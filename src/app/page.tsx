"use client"

import { useState } from "react"
import { LocationSearch } from "@/components/location-search"
import { WeatherCard } from "@/components/weather-card"
import { WeatherSources } from "@/components/weather-sources"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud } from "lucide-react"

// モックデータ（実際のAPIと接続時に置き換え）
const mockWeatherData = {
  "東京": {
    jma: { temperature: 22, weather: "晴れ", precipitation: 10, source: "気象庁" },
    yahoo: { temperature: 24, weather: "晴れ時々曇り", precipitation: 20, source: "Yahoo!天気" }
  },
  "大阪": {
    jma: { temperature: 25, weather: "曇り", precipitation: 30, source: "気象庁" },
    yahoo: { temperature: 26, weather: "曇り時々晴れ", precipitation: 25, source: "Yahoo!天気" }
  },
  "札幌": {
    jma: { temperature: 15, weather: "雨", precipitation: 80, source: "気象庁" },
    yahoo: { temperature: 16, weather: "小雨", precipitation: 70, source: "Yahoo!天気" }
  }
}

function calculateBlendedWeather(sources: any[]) {
  const avgTemp = sources.reduce((sum, s) => sum + s.temperature, 0) / sources.length
  const avgPrecipitation = sources.reduce((sum, s) => sum + s.precipitation, 0) / sources.length
  
  // 天気の決定ロジック（簡易版）
  let weather = "晴れ"
  if (avgPrecipitation > 60) weather = "雨"
  else if (avgPrecipitation > 30) weather = "曇り"
  else if (avgPrecipitation > 10) weather = "晴れ時々曇り"
  
  return {
    temperature: avgTemp,
    weather,
    precipitation: avgPrecipitation,
    source: "WeatherBlend"
  }
}

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [weatherData, setWeatherData] = useState<any>(null)

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
    
    // モックデータから取得（実際のAPIと接続時に置き換え）
    const locationData = mockWeatherData[location as keyof typeof mockWeatherData]
    if (locationData) {
      const sources = [locationData.jma, locationData.yahoo]
      const blended = calculateBlendedWeather(sources)
      setWeatherData({ blended, sources })
    } else {
      // デフォルトデータ
      const sources = [
        { temperature: 20, weather: "晴れ", precipitation: 15, source: "気象庁" },
        { temperature: 22, weather: "晴れ時々曇り", precipitation: 25, source: "Yahoo!天気" }
      ]
      const blended = calculateBlendedWeather(sources)
      setWeatherData({ blended, sources })
    }
  }

  const today = new Date().toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              WeatherBlend
            </h1>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* 地点選択 */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-lg">地点を選択</CardTitle>
          </CardHeader>
          <CardContent>
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </CardContent>
        </Card>

        {/* WeatherBlend予報 */}
        {weatherData && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WeatherBlend予報
              </h2>
              <p className="text-muted-foreground">
                {selectedLocation} • {today}
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <WeatherCard data={weatherData.blended} isBlended={true} />
            </div>

            {/* 各情報源の詳細 */}
            <div className="max-w-md mx-auto">
              <WeatherSources sources={weatherData.sources} />
            </div>
          </div>
        )}

        {/* 初期状態のメッセージ */}
        {!weatherData && (
          <div className="text-center py-16 space-y-4">
            <Cloud className="w-16 h-16 text-blue-300 mx-auto" />
            <h2 className="text-xl font-semibold text-muted-foreground">
              地点を選択して天気予報を確認
            </h2>
            <p className="text-muted-foreground">
              複数の情報源から最適な予報をお届けします
            </p>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 WeatherBlend. 複数の天気予報をブレンドして最適な予報を提供
          </p>
        </div>
      </footer>
    </div>
  )
}