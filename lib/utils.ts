import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO, differenceInDays } from 'date-fns'
import type { LongWeekend, Destination, PackingItem, BudgetBreakdown } from '@/types'

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

export function formatDateRange(start: string, end: string): string {
  const s = parseISO(start), e = parseISO(end)
  if (s.getMonth() === e.getMonth()) return `${format(s,'MMM d')}–${format(e,'d')}`
  return `${format(s,'MMM d')} – ${format(e,'MMM d')}`
}

export function formatBudget(inr: number): string {
  return inr >= 1000 ? `₹${(inr/1000).toFixed(1)}k/day` : `₹${inr}/day`
}

export function getDaysUntil(dateStr: string): number {
  return differenceInDays(parseISO(dateStr), new Date())
}

export function getUrgencyLabel(days: number): string {
  if (days < 0)    return 'Past'
  if (days === 0)  return 'Today!'
  if (days <= 7)   return 'This week!'
  if (days <= 30)  return 'Coming soon'
  if (days <= 60)  return 'Plan now'
  return 'On the horizon'
}

export function getSeasonEmoji(season: string): string {
  return { spring:'🌸', summer:'☀️', monsoon:'🌧️', autumn:'🍂', winter:'❄️' }[season] ?? '🌍'
}

// ─── LEAVE EMAIL ─────────────────────────────────────────────────────────────
export function buildLeaveEmail(p: { employeeName:string; managerName:string; weekend:LongWeekend; destination?:Destination }): string {
  const start = format(parseISO(p.weekend.startDate),'MMMM d, yyyy')
  const end   = format(parseISO(p.weekend.endDate),'MMMM d, yyyy')
  const bridge = p.weekend.bridgeDay
    ? `\nTo maximise this opportunity, I would like to take an additional day of leave on ${format(parseISO(p.weekend.bridgeDay),'EEEE, MMMM d, yyyy')}, creating a ${p.weekend.totalDays}-day break by bridging the ${p.weekend.holiday.name} with the weekend.`
    : ''
  const dest = p.destination
    ? `\n\nI plan to travel to ${p.destination.name}, ${p.destination.country}. I will be reachable on email and Slack for urgent matters, and will ensure a full handover of ongoing deliverables before my departure.`
    : '\n\nI will ensure complete handover of all ongoing tasks and deliverables before departure.'

  return `Subject: Leave Application – ${start} to ${end} (${p.weekend.holiday.name})

Dear ${p.managerName || 'Manager'},

I hope this message finds you well.

I am writing to request leave from ${start} to ${end} (${p.weekend.totalDays} days), to avail the long weekend around the ${p.weekend.holiday.name} public holiday.${bridge}${dest}

I will complete all pending work and ensure a smooth handover before my leave begins. I will be available for any critical matters throughout.

I would be grateful for your approval.

Warm regards,
${p.employeeName || '[Your Name]'}
[Designation] · [Department] · [Employee ID]`
}

// ─── PACKING LIST GENERATOR ───────────────────────────────────────────────────
const PACKING_CATALOG: Record<string, PackingItem[]> = {
  trekking_gear:  [
    { name:'Trekking poles',    category:'Gear',     emoji:'🥢', essential:true },
    { name:'Hiking boots',      category:'Footwear', emoji:'👟', essential:true },
    { name:'Headlamp',          category:'Gear',     emoji:'🔦', essential:true },
    { name:'Trekking backpack', category:'Gear',     emoji:'🎒', essential:true },
    { name:'Gaiters',           category:'Gear',     emoji:'🧤', essential:false },
  ],
  warm_layers:    [
    { name:'Thermal inner',  category:'Clothing', emoji:'🧥', essential:true },
    { name:'Fleece jacket',  category:'Clothing', emoji:'🧣', essential:true },
    { name:'Warm socks x4',  category:'Clothing', emoji:'🧦', essential:true },
    { name:'Beanie / woolly hat', category:'Clothing', emoji:'🪖', essential:true },
    { name:'Hand warmers',   category:'Accessories', emoji:'🤲', essential:false },
  ],
  light_clothes:  [
    { name:'Breathable tees x4', category:'Clothing', emoji:'👕', essential:true },
    { name:'Lightweight trousers', category:'Clothing', emoji:'👖', essential:true },
    { name:'Comfortable sandals', category:'Footwear', emoji:'🩴', essential:true },
  ],
  raincoat:       [
    { name:'Waterproof jacket',  category:'Clothing', emoji:'🧥', essential:true },
    { name:'Dry bags',           category:'Gear',     emoji:'💼', essential:true },
    { name:'Waterproof phone case', category:'Tech', emoji:'📱', essential:false },
  ],
  camera:         [
    { name:'Camera + lenses',  category:'Tech', emoji:'📷', essential:true },
    { name:'Tripod',           category:'Tech', emoji:'🔭', essential:false },
    { name:'Extra batteries',  category:'Tech', emoji:'🔋', essential:true },
    { name:'Memory cards x2',  category:'Tech', emoji:'💾', essential:true },
    { name:'ND filters',       category:'Tech', emoji:'🔍', essential:false },
  ],
  sunscreen:      [
    { name:'SPF 50+ sunscreen', category:'Skin', emoji:'🧴', essential:true },
    { name:'Lip balm SPF',      category:'Skin', emoji:'💋', essential:true },
    { name:'Sunglasses',        category:'Accessories', emoji:'🕶️', essential:true },
    { name:'Wide-brim hat',     category:'Clothing', emoji:'👒', essential:true },
  ],
  swimwear:       [
    { name:'Swimwear x2',        category:'Clothing', emoji:'🩱', essential:true },
    { name:'Quick-dry towel',    category:'Gear',     emoji:'🏊', essential:true },
    { name:'Waterproof bag',     category:'Gear',     emoji:'💼', essential:false },
  ],
  medicine:       [
    { name:'Altitude sickness pills', category:'Health', emoji:'💊', essential:true },
    { name:'ORS sachets',             category:'Health', emoji:'💧', essential:true },
    { name:'First-aid kit',           category:'Health', emoji:'🩹', essential:true },
    { name:'Prescription meds',       category:'Health', emoji:'💊', essential:true },
  ],
  formal:         [
    { name:'Smart casual top x2', category:'Clothing', emoji:'👔', essential:true },
    { name:'Dress shoes',         category:'Footwear', emoji:'👞', essential:true },
  ],
  snacks:         [
    { name:'Energy bars x6',  category:'Food', emoji:'🍫', essential:true },
    { name:'Trail mix',        category:'Food', emoji:'🥜', essential:true },
    { name:'Electrolyte tabs', category:'Food', emoji:'💊', essential:false },
  ],
}

// Shared always-essentials
const ALWAYS_PACK: PackingItem[] = [
  { name:'Passport / Aadhaar', category:'Documents', emoji:'🪪', essential:true },
  { name:'Travel insurance',   category:'Documents', emoji:'📄', essential:true },
  { name:'Power bank 20000mAh', category:'Tech',    emoji:'🔋', essential:true },
  { name:'Universal adapter',  category:'Tech',     emoji:'🔌', essential:false },
  { name:'Cash (local + INR)', category:'Finance',  emoji:'💵', essential:true },
  { name:'Toiletries bag',     category:'Personal', emoji:'🧴', essential:true },
]

export function generatePackingList(dest: Destination): PackingItem[] {
  const seen = new Set<string>()
  const items: PackingItem[] = [...ALWAYS_PACK]

  for (const tag of dest.packing_tags) {
    const catalog = PACKING_CATALOG[tag] ?? []
    for (const item of catalog) {
      if (!seen.has(item.name)) { seen.add(item.name); items.push(item) }
    }
  }
  return items
}

// ─── BUDGET CALCULATOR ────────────────────────────────────────────────────────
export function estimateBudget(dest: Destination, days: number, travellers: number, tier: 'budget'|'mid'|'luxury'): BudgetBreakdown {
  const mult = { budget:0.7, mid:1.0, luxury:1.8 }[tier]
  const base = dest.budget_per_day_inr * mult

  const flights = dest.type === 'international'
    ? Math.round((dest.flight_hours ?? 5) * 3500 * mult) * travellers
    : Math.round((dest.distance_from_delhi_km ?? 1000) / 10 * mult * 1.2) * travellers

  const hotel      = Math.round(base * 0.45 * days * travellers)
  const food       = Math.round(base * 0.25 * days * travellers)
  const activities = Math.round(base * 0.15 * days * travellers)
  const transport  = Math.round(base * 0.10 * days * travellers)
  const misc       = Math.round(base * 0.05 * days * travellers)

  return { flights, hotel, food, activities, transport, misc, total: flights+hotel+food+activities+transport+misc }
}
