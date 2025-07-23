import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { WeatherCard } from "@/components/weather-card"
import { ChevronDown, ChevronUp, BarChart3, Database } from "lucide-react"

interface WeatherData {
  temperature: number
  weather: string
  precipitation: number
  source: string
  humidity?: number
  windSpeed?: number
}

interface WeatherSourcesProps {
  sources: WeatherData[]
}

export function WeatherSources({ sources }: WeatherSourcesProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 sm:p-4 lg:p-6 h-auto glass-card hover-lift transition-all duration-300 group"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700 group-hover:text-blue-800 transition-colors" />
              <div className="text-left">
                <div className="text-blue-950 text-sm sm:text-base font-semibold">データソース詳細</div>
                <div className="text-blue-800 text-xs sm:text-sm font-medium">各情報源の個別予報を確認</div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-800" />
                <span className="text-blue-800 text-xs sm:text-sm font-medium">{sources.length}件</span>
              </div>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-800 group-hover:text-blue-900 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-800 group-hover:text-blue-900 transition-colors" />
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid gap-4">
            {sources.map((source, index) => (
              <div key={index} className={`animate-stagger-fade-in stagger-${index + 1}`}>
                <WeatherCard data={source} />
              </div>
            ))}
          </div>
          
          {/* 比較統計 */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 glass-card rounded-lg hover-lift animate-stagger-fade-in stagger-3">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-700" />
              <span className="text-blue-900 text-xs sm:text-sm font-semibold">データ比較</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-800 font-medium">気温差</span>
                  <span className="text-blue-950 font-semibold">
                    {Math.abs(sources[0]?.temperature - sources[1]?.temperature).toFixed(1)}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800 font-medium">降水確率差</span>
                  <span className="text-blue-950 font-semibold">
                    {Math.abs(sources[0]?.precipitation - sources[1]?.precipitation)}%
                  </span>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-800 font-medium">データ一致度</span>
                  <span className="text-green-700 font-semibold">
                    {Math.max(70, 100 - Math.abs(sources[0]?.temperature - sources[1]?.temperature) * 10)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800 font-medium">更新時刻</span>
                  <span className="text-blue-800 text-xs sm:text-xs font-medium">
                    {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}