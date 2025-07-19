import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Snowflake, CloudDrizzle } from "lucide-react"

interface WeatherData {
  temperature: number
  weather: string
  precipitation: number
  source: string
}

interface WeatherCardProps {
  data: WeatherData
  isBlended?: boolean
}

const getWeatherIcon = (weather: string) => {
  const weatherLower = weather.toLowerCase()
  if (weatherLower.includes('晴') || weatherLower.includes('sunny')) {
    return <Sun className="w-8 h-8 text-yellow-500" />
  }
  if (weatherLower.includes('雨') || weatherLower.includes('rain')) {
    return <CloudRain className="w-8 h-8 text-blue-500" />
  }
  if (weatherLower.includes('雪') || weatherLower.includes('snow')) {
    return <Snowflake className="w-8 h-8 text-blue-300" />
  }
  if (weatherLower.includes('曇') || weatherLower.includes('cloud')) {
    return <Cloud className="w-8 h-8 text-gray-500" />
  }
  if (weatherLower.includes('小雨') || weatherLower.includes('drizzle')) {
    return <CloudDrizzle className="w-8 h-8 text-blue-400" />
  }
  return <Cloud className="w-8 h-8 text-gray-500" />
}

export function WeatherCard({ data, isBlended = false }: WeatherCardProps) {
  return (
    <Card className={`${isBlended ? 'border-2 border-primary shadow-lg' : ''}`}>
      <CardContent className={`${isBlended ? 'p-8' : 'p-4'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(data.weather)}
            <div>
              <div className={`font-bold ${isBlended ? 'text-3xl' : 'text-xl'}`}>
                {Math.round(data.temperature)}°C
              </div>
              <div className={`text-muted-foreground ${isBlended ? 'text-lg' : 'text-sm'}`}>
                {data.weather}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-semibold ${isBlended ? 'text-xl' : 'text-lg'} text-blue-600`}>
              {data.precipitation}%
            </div>
            <div className={`text-muted-foreground ${isBlended ? 'text-sm' : 'text-xs'}`}>
              降水確率
            </div>
          </div>
        </div>
        {!isBlended && (
          <div className="mt-2 text-xs text-muted-foreground text-right">
            {data.source}
          </div>
        )}
      </CardContent>
    </Card>
  )
}