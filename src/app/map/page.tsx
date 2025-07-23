"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Sun, CloudRain, Snowflake, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"

// 主要都市のデータ
const majorCities = [
  { id: 'sapporo', name: '札幌', x: 55, y: 12, temp: 15, weather: '雨', icon: CloudRain },
  { id: 'sendai', name: '仙台', x: 65, y: 32, temp: 18, weather: '曇り', icon: Cloud },
  { id: 'tokyo', name: '東京', x: 68, y: 42, temp: 22, weather: '晴れ', icon: Sun },
  { id: 'nagoya', name: '名古屋', x: 58, y: 48, temp: 20, weather: '曇り', icon: Cloud },
  { id: 'osaka', name: '大阪', x: 55, y: 52, temp: 25, weather: '晴れ', icon: Sun },
  { id: 'hiroshima', name: '広島', x: 48, y: 58, temp: 23, weather: '晴れ時々曇り', icon: Sun },
  { id: 'fukuoka', name: '福岡', x: 38, y: 68, temp: 24, weather: '曇り', icon: Cloud },
  { id: 'kagoshima', name: '鹿児島', x: 42, y: 78, temp: 26, weather: '晴れ', icon: Sun },
  { id: 'naha', name: '那覇', x: 28, y: 88, temp: 28, weather: '晴れ', icon: Sun },
]

const getTemperatureColor = (temp: number) => {
  if (temp >= 30) return "text-red-500"
  if (temp >= 25) return "text-orange-500"
  if (temp >= 20) return "text-yellow-500"
  if (temp >= 15) return "text-green-500"
  if (temp >= 10) return "text-blue-500"
  return "text-purple-500"
}

const getWeatherColor = (weather: string) => {
  if (weather.includes('晴')) return "text-yellow-500"
  if (weather.includes('雨')) return "text-blue-500"
  if (weather.includes('雪')) return "text-blue-300"
  return "text-gray-500"
}

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  const handleCityClick = (cityId: string) => {
    setSelectedCity(cityId === selectedCity ? null : cityId)
  }

  const selectedCityData = majorCities.find(city => city.id === selectedCity)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-300/20 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 py-6 lg:py-8 relative z-10">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" className="glass-button hover-lift p-2">
                <ArrowLeft className="w-5 h-5 text-blue-800" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-blue-700" />
              <h1 className="text-2xl lg:text-3xl font-bold text-blue-900">日本地図天気予報</h1>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-blue-900">
              {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-blue-700 text-xs">
              {new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 日本地図エリア */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-blue-300/50 shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-b from-sky-100 to-blue-100 rounded-lg overflow-hidden">
                  {/* 海の背景 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 via-blue-500/30 to-blue-600/40"></div>
                  
                  {/* 海の波紋効果 */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-[20%] left-[10%] w-32 h-32 border border-blue-300 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
                    <div className="absolute top-[60%] right-[15%] w-24 h-24 border border-blue-300 rounded-full animate-ping" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
                  </div>
                  
                  {/* 北海道 */}
                  <div className="absolute top-[8%] left-[45%] w-[20%] h-[18%] bg-gradient-to-br from-green-300/80 via-green-400/70 to-green-500/60 rounded-full transform rotate-12 shadow-lg">
                    <div className="absolute inset-2 bg-gradient-to-br from-green-200/60 to-green-300/40 rounded-full"></div>
                    {/* 山脈の表現 */}
                    <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-gray-400/60 rounded-full"></div>
                    <div className="absolute top-[25%] left-[35%] w-2 h-2 bg-gray-400/60 rounded-full"></div>
                  </div>
                  
                  {/* 本州 */}
                  <div className="absolute top-[25%] left-[35%] w-[32%] h-[40%] bg-gradient-to-br from-green-300/80 via-green-400/70 to-green-500/60 transform -rotate-6 shadow-lg" 
                       style={{borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'}}>
                    <div className="absolute inset-2 bg-gradient-to-br from-green-200/60 to-green-300/40" 
                         style={{borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'}}></div>
                    {/* 富士山 */}
                    <div className="absolute top-[60%] left-[70%] w-3 h-3 bg-gray-300 rounded-full shadow-sm"></div>
                    {/* 日本アルプス */}
                    <div className="absolute top-[45%] left-[40%] w-2 h-2 bg-gray-400/60 rounded-full"></div>
                    <div className="absolute top-[40%] left-[45%] w-2 h-2 bg-gray-400/60 rounded-full"></div>
                    <div className="absolute top-[50%] left-[35%] w-1 h-1 bg-gray-400/60 rounded-full"></div>
                  </div>
                  
                  {/* 四国 */}
                  <div className="absolute top-[58%] left-[40%] w-[14%] h-[12%] bg-gradient-to-br from-green-300/80 via-green-400/70 to-green-500/60 transform rotate-3 shadow-md"
                       style={{borderRadius: '50% 60% 40% 50% / 40% 60% 50% 40%'}}>
                    <div className="absolute inset-1 bg-gradient-to-br from-green-200/60 to-green-300/40"
                         style={{borderRadius: '50% 60% 40% 50% / 40% 60% 50% 40%'}}></div>
                  </div>
                  
                  {/* 九州 */}
                  <div className="absolute top-[65%] left-[28%] w-[18%] h-[18%] bg-gradient-to-br from-green-300/80 via-green-400/70 to-green-500/60 transform rotate-8 shadow-md"
                       style={{borderRadius: '40% 60% 50% 40% / 60% 40% 60% 50%'}}>
                    <div className="absolute inset-2 bg-gradient-to-br from-green-200/60 to-green-300/40"
                         style={{borderRadius: '40% 60% 50% 40% / 60% 40% 60% 50%'}}></div>
                    {/* 阿蘇山 */}
                    <div className="absolute top-[40%] left-[60%] w-2 h-2 bg-red-400/60 rounded-full"></div>
                  </div>
                  
                  {/* 沖縄諸島 */}
                  <div className="absolute top-[85%] left-[25%] w-[10%] h-[6%] bg-gradient-to-br from-green-300/80 to-green-400/70 rounded-full shadow-sm">
                    <div className="absolute inset-1 bg-gradient-to-br from-green-200/60 to-green-300/40 rounded-full"></div>
                  </div>
                  
                  {/* 小さな島々 */}
                  <div className="absolute top-[85%] left-[35%] w-2 h-2 bg-green-400/60 rounded-full shadow-sm"></div>
                  <div className="absolute top-[82%] left-[32%] w-1 h-1 bg-green-400/60 rounded-full"></div>
                  <div className="absolute top-[45%] left-[72%] w-1 h-1 bg-green-400/60 rounded-full"></div>
                  
                  {/* 雲の影 */}
                  <div className="absolute top-[15%] left-[20%] w-16 h-8 bg-gray-300/20 rounded-full blur-sm animate-pulse" style={{animationDuration: '8s'}}></div>
                  <div className="absolute top-[70%] right-[10%] w-12 h-6 bg-gray-300/20 rounded-full blur-sm animate-pulse" style={{animationDuration: '10s', animationDelay: '3s'}}></div>

                  {/* 都市マーカー */}
                  {majorCities.map((city) => {
                    const IconComponent = city.icon
                    const isSelected = selectedCity === city.id
                    const isHovered = hoveredCity === city.id
                    
                    return (
                      <div
                        key={city.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                          isSelected ? 'scale-125 z-20' : isHovered ? 'scale-110 z-10' : 'z-5'
                        }`}
                        style={{ left: `${city.x}%`, top: `${city.y}%` }}
                        onClick={() => handleCityClick(city.id)}
                        onMouseEnter={() => setHoveredCity(city.id)}
                        onMouseLeave={() => setHoveredCity(null)}
                      >
                        {/* 都市マーカーの背景 */}
                        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                          isSelected 
                            ? 'bg-blue-500/40 scale-150 animate-pulse' 
                            : isHovered 
                              ? 'bg-blue-400/30 scale-125' 
                              : 'bg-white/60 scale-100'
                        }`}></div>
                        
                        {/* 都市情報カード */}
                        <div className={`relative glass-card border-blue-300/60 p-1.5 lg:p-2 min-w-[70px] lg:min-w-[85px] transition-all duration-300 ${
                          isSelected ? 'border-blue-500/80 shadow-lg' : ''
                        }`}>
                          <div className="text-center space-y-1">
                            <div className="flex items-center justify-center">
                              <IconComponent className={`w-3 h-3 lg:w-4 lg:h-4 ${getWeatherColor(city.weather)}`} />
                            </div>
                            <div className="text-xs font-bold text-blue-900">{city.name}</div>
                            <div className={`text-xs lg:text-sm font-bold ${getTemperatureColor(city.temp)}`}>
                              {city.temp}°C
                            </div>
                          </div>
                        </div>
                        
                        {/* 選択時の波紋効果 */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-full border-2 border-blue-500/60 animate-ping scale-150"></div>
                        )}
                      </div>
                    )
                  })}
                </div>
                
                {/* 操作説明 */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-blue-800 font-medium">
                    都市をクリックして詳細な天気予報を確認
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 詳細情報エリア */}
          <div className="space-y-4 lg:space-y-6">
            {selectedCityData ? (
              <Card className="glass-card border-blue-400/60 shadow-lg animate-card-slide-up">
                <CardContent className="p-4 lg:p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-blue-900">
                      {selectedCityData.name}
                    </h3>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <selectedCityData.icon className={`w-12 h-12 lg:w-16 lg:h-16 ${getWeatherColor(selectedCityData.weather)}`} />
                      <div className="text-left">
                        <div className={`text-3xl lg:text-4xl font-bold ${getTemperatureColor(selectedCityData.temp)}`}>
                          {selectedCityData.temp}°C
                        </div>
                        <div className="text-blue-800 font-medium">
                          {selectedCityData.weather}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-blue-300/50">
                      <Link href={`/?city=${selectedCityData.name}`}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                          詳細な予報を見る
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-card border-blue-300/50">
                <CardContent className="p-4 lg:p-6 text-center">
                  <div className="space-y-3">
                    <Cloud className="w-12 h-12 lg:w-16 lg:h-16 text-blue-400 mx-auto" />
                    <h3 className="text-lg font-bold text-blue-900">都市を選択</h3>
                    <p className="text-sm text-blue-800">
                      地図上の都市をクリックして<br />
                      天気予報を確認してください
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 全国概況 */}
            <Card className="glass-card border-blue-300/50">
              <CardContent className="p-4 lg:p-6">
                <h4 className="text-lg font-bold text-blue-900 mb-3">全国概況</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>最高気温</span>
                    <span className="font-bold text-red-500">28°C (那覇)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>最低気温</span>
                    <span className="font-bold text-blue-500">15°C (札幌)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>晴れ</span>
                    <span className="font-bold text-yellow-600">5都市</span>
                  </div>
                  <div className="flex justify-between">
                    <span>曇り・雨</span>
                    <span className="font-bold text-gray-600">4都市</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}