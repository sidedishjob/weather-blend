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
  const [isFocused, setIsFocused] = useState(false)

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
    <div className="space-y-3">
      <div className="relative">
        <div className="flex space-x-2">
          <div className={`relative flex-1 transition-all duration-300 ${
            isFocused ? 'transform scale-[1.02]' : ''
          }`}>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-700" />
            <Input
              placeholder="都市名を入力"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`pl-10 pr-4 py-2 text-sm glass-card text-blue-900 placeholder:text-blue-700 
                transition-all duration-300 hover-lift
                ${isFocused 
                  ? 'border-blue-600/90 shadow-lg shadow-blue-500/25 bg-white/40' 
                  : 'border-blue-500/70 bg-white/30'
                }
                `}
            />
            {location && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-pulse">
                <Sparkles className="w-3 h-3 text-sky-600 animate-pulse" />
              </div>
            )}
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
            className={`px-4 py-2 border-0 transition-all duration-300 hover-lift
              ${isSearching 
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed shadow-md' 
                : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
              }
              ${location.trim() 
                ? 'shadow-blue-600/50 animate-pulse-glow ring-2 ring-blue-500/40' 
                : 'shadow-blue-600/30'
              }`}
          >
            {isSearching ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                <span className="text-xs text-white font-medium">検索中</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Search className="w-4 h-4 text-white" />
                {location.trim() && (
                  <span className="text-xs font-semibold text-white">検索</span>
                )}
              </div>
            )}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-1.5">
          {popularLocations.map((loc) => (
            <Button
              key={loc.name}
              variant="outline"
              onClick={() => handleLocationClick(loc.name)}
              disabled={isSearching}
              className={`group relative glass-button border-blue-300/60 text-blue-900 transition-all duration-300 p-1.5 h-auto justify-center text-xs hover-lift
                ${isSearching 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:border-blue-600/80 hover:bg-white/40 hover:scale-105 active:scale-95'
                }`}
            >
              <div className="flex flex-col items-center space-y-0.5">
                <span className="font-medium text-xs">{loc.name}</span>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(loc.trend)}
                  <span className="text-xs text-blue-800 font-medium">{loc.temp}°</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}