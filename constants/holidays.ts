import type { Holiday, Destination, LongWeekend, Season, TravelerPersona } from '@/types'
import { addDays, format, getDay, getMonth, parseISO } from 'date-fns'

// ─── 2026 INDIAN PUBLIC HOLIDAYS ─────────────────────────────────────────────
export const INDIAN_HOLIDAYS_2026: Holiday[] = [
  { date: '2026-01-01', name: "New Year's Day",        type: 'optional',  day: 'Thursday' },
  { date: '2026-01-14', name: 'Makar Sankranti',       type: 'national',  day: 'Wednesday' },
  { date: '2026-01-26', name: 'Republic Day',          type: 'national',  day: 'Monday' },
  { date: '2026-02-17', name: 'Maha Shivratri',        type: 'national',  day: 'Tuesday' },
  { date: '2026-03-03', name: 'Holi',                  type: 'national',  day: 'Tuesday' },
  { date: '2026-03-29', name: 'Id-ul-Fitr (Eid)',      type: 'national',  day: 'Sunday' },
  { date: '2026-04-02', name: 'Ram Navami',            type: 'national',  day: 'Thursday' },
  { date: '2026-04-03', name: 'Good Friday',           type: 'national',  day: 'Friday' },
  { date: '2026-04-14', name: 'Dr. Ambedkar Jayanti', type: 'national',  day: 'Tuesday' },
  { date: '2026-04-30', name: 'Buddha Purnima',        type: 'national',  day: 'Thursday' },
  { date: '2026-06-07', name: 'Bakrid (Eid ul-Adha)',  type: 'national',  day: 'Sunday' },
  { date: '2026-08-15', name: 'Independence Day',      type: 'national',  day: 'Saturday' },
  { date: '2026-09-11', name: 'Onam',                  type: 'national',  day: 'Friday' },
  { date: '2026-10-02', name: 'Gandhi Jayanti',        type: 'national',  day: 'Friday' },
  { date: '2026-10-11', name: 'Dussehra',              type: 'national',  day: 'Sunday' },
  { date: '2026-10-20', name: 'Diwali',                type: 'national',  day: 'Tuesday' },
  { date: '2026-10-22', name: 'Govardhan Puja',        type: 'national',  day: 'Thursday' },
  { date: '2026-11-05', name: 'Guru Nanak Jayanti',    type: 'national',  day: 'Thursday' },
  { date: '2026-11-19', name: 'Chhath Puja',           type: 'state',     day: 'Thursday' },
  { date: '2026-12-25', name: 'Christmas Day',         type: 'national',  day: 'Friday' },
]

// ─── DESTINATIONS ─────────────────────────────────────────────────────────────
// image_url: uses Unsplash CDN (works in all real browsers)
// gradient: always-visible CSS gradient base shown instantly + as fallback
export const DESTINATIONS: Destination[] = [
  // ── NATIONAL ──
  {
    id: 'chakrata',
    name: 'Chakrata',
    tagline: 'The Last Quiet Hill Station',
    country: 'India', state: 'Uttarakhand',
    type: 'national', category: 'mountains',
    month_best: [3,4,5,9,10,11],
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#0d2818 0%,#1a4d2e 45%,#2d7a4a 100%)',
    coordinates: [30.8735, 77.8762],
    distance_from_delhi_km: 320, budget_per_day_inr: 2500,
    highlights: ['Tiger Falls','Deoban Forest','Chilmiri Neck','Snow peaks'],
    best_for: ['adventurer','photographer','mountain_junkie'],
    hidden_gem_score: 9.2, ideal_trip_days: 3,
    packing_tags: ['warm_layers','trekking_gear','camera'],
    tags: ['offbeat','himalayas','forests','waterfalls','no-crowds'],
  },
  {
    id: 'majuli',
    name: 'Majuli',
    tagline: "World's Largest River Island",
    country: 'India', state: 'Assam',
    type: 'national', category: 'island',
    month_best: [10,11,12,1,2,3],
    image_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#0d2d3d 0%,#0e5f7a 45%,#1a9bbd 100%)',
    coordinates: [26.9453, 94.1688],
    distance_from_delhi_km: 1950, budget_per_day_inr: 1800,
    highlights: ['Satras monasteries','Mask making','Migratory birds','Mishing tribe'],
    best_for: ['culture_vulture','photographer','digital_nomad'],
    hidden_gem_score: 9.5, ideal_trip_days: 3,
    packing_tags: ['light_clothes','camera','raincoat'],
    tags: ['river-island','tribes','monasteries','birdwatching'],
  },
  {
    id: 'gurez',
    name: 'Gurez Valley',
    tagline: 'Beyond the Last Checkpoint',
    country: 'India', state: 'Jammu & Kashmir',
    type: 'national', category: 'mountains',
    month_best: [6,7,8,9],
    image_url: 'https://images.unsplash.com/photo-1596401100919-b86cc3e63555?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#0a1628 0%,#1c3f6e 45%,#2563a8 100%)',
    coordinates: [34.6320, 74.8420],
    distance_from_delhi_km: 880, budget_per_day_inr: 3000,
    highlights: ['Kishanganga River','Razdan Pass','Habba Khatoon Peak','Dard villages'],
    best_for: ['adventurer','mountain_junkie','photographer'],
    hidden_gem_score: 9.8, ideal_trip_days: 4,
    packing_tags: ['warm_layers','trekking_gear','camera','medicine'],
    tags: ['restricted-zone','kashmir','alpine','untouched'],
  },
  {
    id: 'dzukou',
    name: 'Dzukou Valley',
    tagline: "Nagaland's Flower-Carpeted Heaven",
    country: 'India', state: 'Nagaland',
    type: 'national', category: 'mountains',
    month_best: [6,7,8,9,10],
    image_url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#052e16 0%,#0d6b30 45%,#22c55e 100%)',
    coordinates: [25.5400, 94.1100],
    distance_from_delhi_km: 2500, budget_per_day_inr: 2200,
    highlights: ['Dzukou lily blooms','Ridge camping','Kohima cemetery','Viswema village'],
    best_for: ['adventurer','photographer','mountain_junkie'],
    hidden_gem_score: 9.6, ideal_trip_days: 3,
    packing_tags: ['trekking_gear','warm_layers','camera','raincoat'],
    tags: ['trekking','wildflowers','northeast','camping'],
  },
  {
    id: 'mawlynnong',
    name: 'Mawlynnong',
    tagline: "Asia's Cleanest Village + Living Roots",
    country: 'India', state: 'Meghalaya',
    type: 'national', category: 'forest',
    month_best: [10,11,12,1,2,3,4],
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#021a0a 0%,#064e2c 45%,#15803d 100%)',
    coordinates: [25.2017, 91.9222],
    distance_from_delhi_km: 2100, budget_per_day_inr: 2000,
    highlights: ['Living root bridges','Sky walk','Dawki river','Bangladesh view'],
    best_for: ['culture_vulture','photographer','foodie'],
    hidden_gem_score: 8.8, ideal_trip_days: 3,
    packing_tags: ['light_clothes','camera','raincoat'],
    tags: ['cleanest-village','root-bridges','northeast'],
  },
  {
    id: 'chopta',
    name: 'Chopta',
    tagline: "Uttarakhand's Mini Switzerland",
    country: 'India', state: 'Uttarakhand',
    type: 'national', category: 'mountains',
    month_best: [3,4,5,9,10,11,12],
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#0c1e3d 0%,#1e4d8c 45%,#60a5fa 100%)',
    coordinates: [30.5042, 79.2065],
    distance_from_delhi_km: 450, budget_per_day_inr: 2200,
    highlights: ['Tungnath temple','Chandrashila summit','Deoria Tal','Bugyals meadows'],
    best_for: ['mountain_junkie','adventurer','photographer'],
    hidden_gem_score: 8.5, ideal_trip_days: 3,
    packing_tags: ['warm_layers','trekking_gear','camera'],
    tags: ['trekking','temples','meadows','himalayas'],
  },
  {
    id: 'dholavira',
    name: 'Dholavira',
    tagline: 'An Ancient City That Predates Rome',
    country: 'India', state: 'Gujarat',
    type: 'national', category: 'heritage',
    month_best: [10,11,12,1,2,3],
    image_url: 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#3d1a0a 0%,#92400e 45%,#c9a44e 100%)',
    coordinates: [23.8877, 70.2156],
    distance_from_delhi_km: 1200, budget_per_day_inr: 2500,
    highlights: ['5000-year-old city','UNESCO Heritage','White Rann nearby','Harappan artefacts'],
    best_for: ['culture_vulture','photographer','digital_nomad'],
    hidden_gem_score: 9.0, ideal_trip_days: 3,
    packing_tags: ['light_clothes','camera','sunscreen'],
    tags: ['UNESCO','archaeological','harappan','gujarat'],
  },
  {
    id: 'sandakphu',
    name: 'Sandakphu',
    tagline: 'Where 4 Himalayan Giants Watch You',
    country: 'India', state: 'West Bengal',
    type: 'national', category: 'mountains',
    month_best: [3,4,5,10,11,12],
    image_url: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#050d1a 0%,#0f2744 45%,#1e4580 100%)',
    coordinates: [27.1052, 88.0039],
    distance_from_delhi_km: 1600, budget_per_day_inr: 3000,
    highlights: ['View of Everest+Kangchenjunga','Land Rover safari','Rhododendron forest','Phalut ridge'],
    best_for: ['mountain_junkie','adventurer','photographer'],
    hidden_gem_score: 9.1, ideal_trip_days: 4,
    packing_tags: ['warm_layers','trekking_gear','camera'],
    tags: ['himalayas','trekking','sunrise','darjeeling'],
  },
  {
    id: 'hampi',
    name: 'Hampi',
    tagline: 'Ruins Draped in Emerald',
    country: 'India', state: 'Karnataka',
    type: 'national', category: 'heritage',
    month_best: [7,8,9,10,11],
    image_url: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#3b1c08 0%,#7c3c10 45%,#c2763a 100%)',
    coordinates: [15.3350, 76.4600],
    distance_from_delhi_km: 1730, budget_per_day_inr: 2000,
    highlights: ['Virupaksha Temple','Boulder hopping','Tungabhadra ghats','Hippie Island'],
    best_for: ['culture_vulture','photographer','adventurer'],
    hidden_gem_score: 7.8, ideal_trip_days: 3,
    packing_tags: ['light_clothes','camera','sunscreen'],
    tags: ['ruins','heritage','boulders','history'],
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    tagline: "Goa's Peaceful Spiritual Sibling",
    country: 'India', state: 'Karnataka',
    type: 'national', category: 'beach',
    month_best: [10,11,12,1,2,3],
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#003d5c 0%,#005f8a 45%,#0096c7 100%)',
    coordinates: [14.5479, 74.3188],
    distance_from_delhi_km: 1850, budget_per_day_inr: 2800,
    highlights: ['Om Beach','Half Moon Beach','Mahabaleshwar Temple','Cliff treks'],
    best_for: ['beach_lover','digital_nomad','adventurer'],
    hidden_gem_score: 7.5, ideal_trip_days: 3,
    packing_tags: ['swimwear','sunscreen','light_clothes','camera'],
    tags: ['beaches','cliffs','temples','backpacker','sunsets'],
  },
  // ── INTERNATIONAL ──
  {
    id: 'almaty',
    name: 'Almaty',
    tagline: 'The Silicon Valley of Central Asia',
    country: 'Kazakhstan',
    type: 'international', category: 'mountains',
    month_best: [4,5,6,9,10],
    image_url: 'https://images.unsplash.com/photo-1586878341523-7f5c7dc1a7fd?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#0d0d2b 0%,#1a1a4e 45%,#2d2d7a 100%)',
    coordinates: [43.2220, 76.8512],
    budget_per_day_inr: 4500,
    highlights: ['Shymbulak Ski Resort','Big Almaty Lake','Kok-Tobe Hill','Green Bazaar'],
    best_for: ['adventurer','foodie','mountain_junkie'],
    hidden_gem_score: 8.7, ideal_trip_days: 4,
    visa_required: false, flight_hours: 5,
    packing_tags: ['warm_layers','camera','snacks'],
    tags: ['central-asia','visa-free','skiing','mountains','affordable'],
  },
  {
    id: 'da-nang',
    name: 'Da Nang',
    tagline: "Vietnam's Secret Coastal Gem",
    country: 'Vietnam',
    type: 'international', category: 'beach',
    month_best: [1,2,3,4,5,8,9],
    image_url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#003366 0%,#004080 45%,#0066cc 100%)',
    coordinates: [16.0544, 108.2022],
    budget_per_day_inr: 3800,
    highlights: ['My Khe Beach','Dragon Bridge','Marble Mountains','Hoi An day trip'],
    best_for: ['beach_lover','foodie','photographer'],
    hidden_gem_score: 8.2, ideal_trip_days: 4,
    visa_required: false, flight_hours: 4,
    packing_tags: ['swimwear','sunscreen','light_clothes','camera'],
    tags: ['vietnam','beach','affordable','food','history'],
  },
  {
    id: 'salalah',
    name: 'Salalah',
    tagline: "Arabia's Monsoon Miracle",
    country: 'Oman',
    type: 'international', category: 'mountains',
    month_best: [7,8,9],
    image_url: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#0a2e1a 0%,#1a5c35 45%,#2d9e5f 100%)',
    coordinates: [17.0150, 54.0924],
    budget_per_day_inr: 6000,
    highlights: ['Khareef waterfalls','Frankincense trails','Al Mughsail blowholes','Wadi Darbat'],
    best_for: ['adventurer','photographer','luxury_seeker'],
    hidden_gem_score: 9.3, ideal_trip_days: 4,
    visa_required: true, flight_hours: 4,
    packing_tags: ['light_clothes','camera','medicine'],
    tags: ['oman','khareef','monsoon','waterfalls','luxury'],
  },
  {
    id: 'tbilisi',
    name: 'Tbilisi',
    tagline: 'Where Wine Was Born',
    country: 'Georgia',
    type: 'international', category: 'city',
    month_best: [3,4,5,9,10,11],
    image_url: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#2d0a1a 0%,#7c1f3a 45%,#c9445e 100%)',
    coordinates: [41.6938, 44.8015],
    budget_per_day_inr: 4000,
    highlights: ['Old Tbilisi sulfur baths','Narikala Fortress','Georgian wine','Kazbegi day trip'],
    best_for: ['foodie','culture_vulture','photographer'],
    hidden_gem_score: 8.9, ideal_trip_days: 4,
    visa_required: false, flight_hours: 5,
    packing_tags: ['light_clothes','camera','snacks'],
    tags: ['georgia','visa-free','wine','history','caucasus'],
  },
  {
    id: 'lombok',
    name: 'Lombok',
    tagline: "Bali's Untouched Neighbor",
    country: 'Indonesia',
    type: 'international', category: 'beach',
    month_best: [4,5,6,7,8,9,10],
    image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80&fit=crop',
    gradient: 'linear-gradient(160deg,#003366 0%,#1a4d8c 45%,#3399ff 100%)',
    coordinates: [-8.6505, 116.3240],
    budget_per_day_inr: 4500,
    highlights: ['Mount Rinjani trek','Gili Islands','Pink Beach','Senggigi'],
    best_for: ['beach_lover','adventurer','mountain_junkie'],
    hidden_gem_score: 8.4, ideal_trip_days: 5,
    visa_required: false, flight_hours: 7,
    packing_tags: ['swimwear','sunscreen','trekking_gear','camera'],
    tags: ['indonesia','volcano','beach','islands','diving'],
  },
]

// ─── SEASON LOGIC ─────────────────────────────────────────────────────────────
export function getSeason(month: number): Season {
  if ([3,4,5].includes(month)) return 'spring'
  if ([6].includes(month))     return 'summer'
  if ([7,8,9].includes(month)) return 'monsoon'
  if ([10,11].includes(month)) return 'autumn'
  return 'winter'
}

// ─── DESTINATION SUGGESTION ENGINE ───────────────────────────────────────────
export function suggestDestinations(month: number, visited: string[]) {
  const low = visited.map(v => v.toLowerCase())
  const score = (d: Destination) => {
    const monthBonus   = d.month_best.includes(month) ? 3 : 0
    const visitPenalty = low.some(v => d.name.toLowerCase().includes(v) || v.includes(d.name.toLowerCase())) ? -10 : 2
    return d.hidden_gem_score + monthBonus + visitPenalty
  }
  const national      = DESTINATIONS.filter(d => d.type === 'national').sort((a,b) => score(b)-score(a)).slice(0,5)
  const international = DESTINATIONS.filter(d => d.type === 'international').sort((a,b) => score(b)-score(a)).slice(0,3)
  return { national, international }
}

// ─── LONG WEEKEND CALCULATOR ──────────────────────────────────────────────────
export function computeLongWeekends(holidays: Holiday[], visited: string[]): LongWeekend[] {
  const results: LongWeekend[] = []
  for (const holiday of holidays) {
    const date  = parseISO(holiday.date)
    const dow   = getDay(date)
    const month = getMonth(date) + 1

    let startDate: Date = date
    let endDate: Date   = date
    let bridgeDay: string | undefined
    let totalDays = 3

    if      (dow === 5) { startDate = date; endDate = addDays(date, 2); totalDays = 3 }
    else if (dow === 1) { startDate = addDays(date,-2); endDate = date; totalDays = 3 }
    else if (dow === 4) { startDate = date; endDate = addDays(date,3); bridgeDay = format(addDays(date,1),'yyyy-MM-dd'); totalDays = 4 }
    else if (dow === 2) { startDate = addDays(date,-3); endDate = date; bridgeDay = format(addDays(date,-1),'yyyy-MM-dd'); totalDays = 4 }
    else { continue }

    const { national, international } = suggestDestinations(month, visited)
    const vibeScore = Math.min(10, totalDays * 2 + (getSeason(month) === 'winter' || getSeason(month) === 'autumn' ? 1.5 : 0.5))

    results.push({
      id: holiday.date, holiday,
      startDate: format(startDate,'yyyy-MM-dd'), endDate: format(endDate,'yyyy-MM-dd'),
      totalDays, bridgeDay,
      destinations: [...national, ...international],
      month, season: getSeason(month),
      vibeScore: Math.round(vibeScore * 10) / 10,
    })
  }
  return results.sort((a,b) => a.startDate.localeCompare(b.startDate))
}

// ─── PERSONA META ─────────────────────────────────────────────────────────────
export const PERSONA_LABELS: Record<TravelerPersona, { label:string; emoji:string; description:string }> = {
  adventurer:      { label:'The Adventurer',       emoji:'🧗', description:'Treks, rapids, and offroad trails call your name.' },
  culture_vulture: { label:'The Culture Vulture',  emoji:'🏛️', description:'Ancient ruins, local festivals, and street art feed your soul.' },
  beach_lover:     { label:'The Beach Bum',        emoji:'🏖️', description:'Salt water, sand dunes, and seafood sunsets are your religion.' },
  mountain_junkie: { label:'The Peak Seeker',      emoji:'⛰️', description:'Altitude is your attitude. The higher, the better.' },
  foodie:          { label:'The Culinary Nomad',   emoji:'🍜', description:'Every trip is a food tour. You eat your way through cities.' },
  photographer:    { label:'The Frame Hunter',     emoji:'📸', description:'You see the world through golden hour light and perfect compositions.' },
  digital_nomad:   { label:'The Remote Worker',    emoji:'💻', description:'WiFi, a coffee shop, and a view. In that order.' },
  luxury_seeker:   { label:'The Connoisseur',      emoji:'🥂', description:'Thread count matters. You travel for the experience, not the hashtag.' },
}

export const PERSONA_QUESTIONS = [
  {
    id: 'q1',
    question: 'Your ideal Friday evening at the start of a trip?',
    options: [
      { label:'Night trek under the stars',         value:'adventurer' },
      { label:'Local street food crawl',            value:'foodie' },
      { label:'Museum or gallery hop',              value:'culture_vulture' },
      { label:'Sunset cocktails at a clifftop bar', value:'luxury_seeker' },
    ],
  },
  {
    id: 'q2',
    question: "What's the first thing you pack?",
    options: [
      { label:'Trekking poles + rain jacket',  value:'mountain_junkie' },
      { label:'Camera + ND filters',           value:'photographer' },
      { label:'MacBook + portable hotspot',    value:'digital_nomad' },
      { label:'Reef-safe sunscreen + snorkel', value:'beach_lover' },
    ],
  },
  {
    id: 'q3',
    question: 'Dream travel companion?',
    options: [
      { label:'A veteran mountaineer',       value:'adventurer' },
      { label:'A local food blogger',        value:'foodie' },
      { label:'A history professor',         value:'culture_vulture' },
      { label:'A luxury travel journalist',  value:'luxury_seeker' },
    ],
  },
]
