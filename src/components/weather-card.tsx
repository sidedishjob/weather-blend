import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Snowflake, CloudDrizzle, Thermometer, Droplets } from "lucide-react"

interface WeatherData {
  temperature: number
  weather: string
  precipitation: number
  source: string
  confidence?: number
}

interface WeatherCardProps {
  data: WeatherData
  isBlended?: boolean
}

const getWeatherIcon = (weather: string, isBlended = false) => {
  const weatherLower = weather.toLowerCase()
  const iconSize = isBlended ? "w-16 h-16" : "w-8 h-8"
  
  if (weatherLower.includes('晴') || weatherLower.includes('sunny')) {
    return <Sun className={`${iconSize} text-yellow-400 drop-shadow-lg`} />
  }
  if (weatherLower.includes('雨') || weatherLower.includes('rain')) {
    return <CloudRain className={`${iconSize} text-blue-400 drop-shadow-lg`} />
  }
  if (weatherLower.includes('雪') || weatherLower.includes('snow')) {
    return <Snowflake className={`${iconSize} text-blue-300 drop-shadow-lg`} />
  }
  if (weatherLower.includes('曇') || weatherLower.includes('cloud')) {
    return <Cloud className={`${iconSize} text-gray-400 drop-shadow-lg`} />
  }
  if (weatherLower.includes('小雨') || weatherLower.includes('drizzle')) {
    return <CloudDrizzle className={`${iconSize} text-blue-400 drop-shadow-lg`} />
  }
  return <Cloud className={`${iconSize} text-gray-400 drop-shadow-lg`} />
}

const getTemperatureColor = (temp: number) => {
  if (temp >= 30) return "text-red-400"
  if (temp >= 25) return "text-orange-400"
  if (temp >= 20) return "text-yellow-400"
  if (temp >= 15) return "text-green-400"
  if (temp >= 10) return "text-blue-400"
  return "text-purple-400"
}

const getPrecipitationColor = (precipitation: number) => {
  if (precipitation >= 70) return "text-red-400"
  if (precipitation >= 50) return "text-orange-400"
  if (precipitation >= 30) return "text-yellow-400"
  return "text-blue-400"
}

export function WeatherCard({ data, isBlended = false }: WeatherCardProps) {
  return (
    <Card className={`${
      isBlended 
        ? 'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border-2 border-white/30 shadow-2xl hover:shadow-purple-500/20' 
        : 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15'
    } transition-all duration-500 group`}>
      <CardContent className={`${isBlended ? 'p-8' : 'p-4'} relative overflow-hidden`}>
        {/* 背景装飾 */}
        {isBlended && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-50"></div>
        )}
        
        <div className="relative z-10">
          {isBlended && (
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm rounded-full px-4 py-1 border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">AI統合予報</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {getWeatherIcon(data.weather, isBlended)}
                {isBlended && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl"></div>
                )}
              </div>
              <div className="space-y-2">
                <div className={`font-bold ${
                  isBlended ? 'text-5xl' : 'text-2xl'
                } ${getTemperatureColor(data.temperature)} drop-shadow-lg`}>
                  {Math.round(data.temperature)}°C
                </div>
                <div className={`${
                  isBlended ? 'text-xl text-white/90' : 'text-sm text-white/70'
                } font-medium`}>
                  {data.weather}
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-2">
              <div className="flex items-center space-x-2">
                <Droplets className={`${isBlended ? 'w-6 h-6' : 'w-4 h-4'} text-blue-400`} />
                <div className={`font-bold ${
                  isBlended ? 'text-3xl' : 'text-xl'
                } ${getPrecipitationColor(data.precipitation)}`}>
                  {Math.round(data.precipitation)}%
                </div>
              </div>
              <div className={`${
                isBlended ? 'text-sm text-white/70' : 'text-xs text-white/60'
              }`}>
                降水確率
              </div>
            </div>
          </div>
          
          {!isBlended && (
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-white/50 font-medium">
                {data.source}
              </div>
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3 h-3 text-white/40" />
                <span className="text-xs text-white/50">
                  体感温度 {Math.round(data.temperature + (Math.random() - 0.5) * 4)}°C
                </span>
              </div>
            </div>
          )}
          
          {isBlended && data.confidence && (
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">予報信頼度</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-1000"
                      style={{ width: `${data.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium text-sm">{Math.round(data.confidence)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}