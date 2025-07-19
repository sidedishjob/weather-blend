import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

interface LocationSearchProps {
  onLocationSelect: (location: string) => void
}

const popularLocations = [
  "東京", "大阪", "名古屋", "札幌", "福岡", "仙台", "広島", "京都"
]

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    if (location.trim()) {
      onLocationSelect(location.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="地点を入力（例：東京）"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {popularLocations.map((loc) => (
          <Button
            key={loc}
            variant="outline"
            size="sm"
            onClick={() => onLocationSelect(loc)}
            className="text-xs"
          >
            {loc}
          </Button>
        ))}
      </div>
    </div>
  )
}