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
            className="w-full justify-between p-6 h-auto bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="text-left">
                <div className="text-white font-medium">データソース詳細</div>
                <div className="text-white/60 text-sm">各情報源の個別予報を確認</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-sm">{sources.length}件</span>
              </div>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid gap-4">
            {sources.map((source, index) => (
              <div key={index} className="transform hover:scale-105 transition-all duration-300">
                <WeatherCard data={source} />
              </div>
            ))}
          </div>
          
          {/* 比較統計 */}
          <div className="mt-6 p-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-white/80 text-sm font-medium">データ比較</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">気温差</span>
                  <span className="text-white font-medium">
                    {Math.abs(sources[0]?.temperature - sources[1]?.temperature).toFixed(1)}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">降水確率差</span>
                  <span className="text-white font-medium">
                    {Math.abs(sources[0]?.precipitation - sources[1]?.precipitation)}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">データ一致度</span>
                  <span className="text-green-400 font-medium">
                    {Math.max(70, 100 - Math.abs(sources[0]?.temperature - sources[1]?.temperature) * 10)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">更新時刻</span>
                  <span className="text-white/60 text-xs">
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