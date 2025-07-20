import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Sparkles, TrendingUp, Clock } from "lucide-react"

interface LocationSearchProps {
  onLocationSelect: (location: string) => void
}

const popularLocations = [
  { name: "東京", trend: "up", temp: 22 },
  { name: "大阪", trend: "stable", temp: 25 },
  { name: "名古屋", trend: "down", temp: 20 },
  { name: "札幌", trend: "up", temp: 15 },
  { name: "福岡", trend: "stable", temp: 24 },
  { name: "仙台", trend: "up", temp: 18 },
  { name: "広島", trend: "down", temp: 23 },
  { name: "京都", trend: "stable", temp: 21 }
]

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [location, setLocation] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (location.trim()) {
      setIsSearching(true)
      await new Promise(resolve => setTimeout(resolve, 300))
      onLocationSelect(location.trim())
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleLocationClick = async (locationName: string) => {
    setIsSearching(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    onLocationSelect(locationName)
    setIsSearching(false)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-400" />
      case "down":
        return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
      default:
        return <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-700" />
            <Input
              placeholder="都市名を入力"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-2 bg-white/90 backdrop-blur-xl border-blue-400/60 text-blue-900 placeholder:text-blue-700 focus:bg-white/95 focus:border-blue-500/80 transition-all duration-300"
            />
            {location && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Sparkles className="w-3 h-3 text-sky-600 animate-pulse" />
              </div>
            )}
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Clock className="w-3 h-3 text-blue-700" />
          <span className="text-blue-800 text-xs font-medium">人気の都市</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {popularLocations.map((loc) => (
            <Button
              key={loc.name}
              variant="outline"
              onClick={() => handleLocationClick(loc.name)}
              disabled={isSearching}
              className="group relative bg-white/80 backdrop-blur-sm border-blue-300/60 text-blue-900 hover:bg-white/90 hover:border-blue-400/80 transition-all duration-300 p-2 h-auto justify-between disabled:opacity-50 text-xs"
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium">{loc.name}</span>
                {getTrendIcon(loc.trend)}
              </div>
              <div className="text-xs text-blue-700 group-hover:text-blue-800 transition-colors text-xs">
                {loc.temp}°C
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-sky-500/0 group-hover:from-blue-500/20 group-hover:to-sky-500/20 rounded-md transition-all duration-300"></div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}