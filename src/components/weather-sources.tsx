import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { WeatherCard } from "@/components/weather-card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface WeatherData {
  temperature: number
  weather: string
  precipitation: number
  source: string
}

interface WeatherSourcesProps {
  sources: WeatherData[]
}

export function WeatherSources({ sources }: WeatherSourcesProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-4 h-auto">
          <span className="text-sm font-medium">各情報源の詳細を見る</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 mt-2">
        {sources.map((source, index) => (
          <WeatherCard key={index} data={source} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}