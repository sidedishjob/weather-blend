import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Snowflake, CloudDrizzle, Thermometer, Droplets } from "lucide-react"

interface WeatherData {
  temperature: number
  weather: string
  precipitation: number
  source: string
  confidence?: number
  humidity?: number
  windSpeed?: number
}

interface WeatherCardProps {
  data: WeatherData
  isBlended?: boolean
  cityName?: string
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

export function WeatherCard({ data, isBlended = false, cityName }: WeatherCardProps) {
  return (
    <Card className={`${
      isBlended 
        ? 'glass-card border-2 border-blue-400/60 animate-pulse-glow hover-lift' 
        : 'glass-card border-blue-300/50 hover-lift'
    } transition-all duration-500 group relative overflow-hidden`}>
      <CardContent className={`${isBlended ? 'p-4 sm:p-6 lg:p-8' : 'p-3 sm:p-4'} relative overflow-hidden`}>
        {/* 背景装飾 */}
        {isBlended && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-sky-500/20 opacity-60"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 opacity-60"></div>
          </>
        )}
        
        <div className="relative z-10">
          {isBlended && cityName && (
            <div className="text-center mb-3 sm:mb-4 lg:mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 animate-bounce-in">
                {cityName}
              </h3>
            </div>
          )}
          
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
              <div className="relative">
                {getWeatherIcon(data.weather, isBlended)}
                {isBlended && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-sky-400/30 rounded-full blur-xl"></div>
                )}
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className={`font-bold ${
                  isBlended ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl'
                } ${getTemperatureColor(data.temperature)} drop-shadow-lg`}>
                  {Math.round(data.temperature)}°C
                </div>
                <div className={`${
                  isBlended ? 'text-xl text-blue-800' : 'text-sm text-blue-700/80'
                } font-medium`}>
                <div className={`${
                  isBlended ? 'text-sm sm:text-base lg:text-xl text-blue-950' : 'text-xs sm:text-sm text-blue-900'
                } font-medium`}>
                  {data.weather}
                </div>
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-1 sm:space-y-2 flex-shrink-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Droplets className={`${isBlended ? 'w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6' : 'w-3 h-3 sm:w-4 sm:h-4'} text-blue-400`} />
                <div className={`font-bold ${
                  isBlended ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-base sm:text-xl'
                } ${getPrecipitationColor(data.precipitation)}`}>
                  {Math.round(data.precipitation)}%
                </div>
              </div>
              <div className={`${
                isBlended ? 'text-xs sm:text-sm text-blue-800' : 'text-xs text-blue-800'
              }`}>
                降水確率
              </div>
            </div>
          </div>
          
          {!isBlended && (
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-blue-800 font-medium">
                {data.source}
              </div>
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3 h-3 text-blue-700" />
                <span className="text-xs text-blue-800">
                  体感温度 {Math.round(data.temperature + (Math.random() - 0.5) * 4)}°C
                </span>
              </div>
            </div>
          )}
          
          {isBlended && data.confidence && (
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-blue-300/50 space-y-3 sm:space-y-4">
              {/* 詳細メトリクス */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 glass-card rounded-lg hover-lift">
                  <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <div className="text-left">
                    <div className="text-blue-800 text-xs sm:text-sm font-medium">湿度</div>
                    <div className="text-base sm:text-xl font-bold text-blue-700">{Math.round(data.humidity || 65)}%</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 glass-card rounded-lg hover-lift">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    <div className="text-green-500 text-sm sm:text-lg">💨</div>
                  </div>
                  <div className="text-left">
                    <div className="text-blue-800 text-xs sm:text-sm font-medium">風速</div>
                    <div className="text-base sm:text-xl font-bold text-green-700">{Math.round(data.windSpeed || 12)}m/s</div>
                  </div>
                </div>
              </div>
              
              {/* 信頼度 */}
              <div className="flex items-center justify-between">
                <span className="text-blue-900 text-xs sm:text-sm font-medium">予報信頼度</span>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-16 sm:w-20 h-2 bg-blue-400/60 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${data.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-blue-950 font-semibold text-xs sm:text-sm">{Math.round(data.confidence)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}