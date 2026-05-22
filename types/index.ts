export interface Holiday {
  date: string
  name: string
  type: 'national' | 'state' | 'optional'
  day: string
}

export interface LongWeekend {
  id: string
  holiday: Holiday
  startDate: string
  endDate: string
  totalDays: number
  bridgeDay?: string
  destinations: Destination[]
  month: number
  season: Season
  vibeScore: number
}

export interface Destination {
  id: string
  name: string
  tagline: string
  country: string
  state?: string
  type: 'national' | 'international'
  category: DestinationCategory
  month_best: number[]
  image_url: string
  gradient: string
  coordinates: [number, number]
  distance_from_delhi_km?: number
  budget_per_day_inr: number
  highlights: string[]
  best_for: TravelerPersona[]
  hidden_gem_score: number
  visa_required?: boolean
  flight_hours?: number
  tags: string[]
  ideal_trip_days: number
  packing_tags: PackingTag[]
}

export type DestinationCategory = 'mountains'|'beach'|'heritage'|'wildlife'|'desert'|'forest'|'island'|'city'
export type Season = 'spring'|'summer'|'monsoon'|'autumn'|'winter'
export type TravelerPersona = 'adventurer'|'culture_vulture'|'beach_lover'|'mountain_junkie'|'foodie'|'photographer'|'digital_nomad'|'luxury_seeker'
export type PackingTag = 'trekking_gear'|'light_clothes'|'warm_layers'|'raincoat'|'camera'|'sunscreen'|'formal'|'swimwear'|'medicine'|'snacks'

export interface UserProfile {
  visited: string[]
  persona?: TravelerPersona
  budget?: 'budget'|'mid'|'luxury'
  travelMonth?: number
}

export interface PackingItem {
  name: string
  category: string
  emoji: string
  essential: boolean
}

export interface BudgetBreakdown {
  flights: number
  hotel: number
  food: number
  activities: number
  transport: number
  misc: number
  total: number
}
