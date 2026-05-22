# 🌿 Escapist — Corporate Travel Portal · 2026 Long Weekends

A high-end, fully-featured travel portal for corporate employees in India to discover unexplored destinations, plan budgets, generate leave emails, and make the most of every 2026 long weekend.

Live URL - https://vip-escapist.netlify.app/

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗓️ **Long Weekend Calculator** | Computes all 2026 Indian public holiday long weekends automatically, including bridge day suggestions for Thu/Tue holidays |
| 🃏 **Bento Grid Cards** | Beautiful alternating large/small card layout with live destination image switching |
| 🔍 **Smart Destination Engine** | 10 national + 5 international "unexplored gems" ranked by month-fitness, hidden gem score, and your visited places |
| 🏷️ **Visited Places Tag Input** | Persistent tag input in the hero — type a city, press Enter. Filters destinations you have already seen |
| ⏱️ **Live Countdown Strip** | Real-time countdown (days/hrs/min/sec) to the next long weekend with destination suggestion |
| 🧭 **Travel Persona Quiz** | 3-question quiz → reveals your traveler persona → personalized destination recommendations |
| ✉️ **Leave Application Generator** | 2-step form → professionally worded email with bridge day logic → copy/download/mailto |
| 🎒 **Smart Packing List** | Auto-generated interactive checklist per destination with progress tracker and TXT export |
| 💰 **Budget Estimator** | Adjustable travellers + budget tier (Budget/Mid/Luxury) → itemized cost breakdown with visual bars |
| 🗺️ **Interactive Map** | Leaflet.js map with national (green) and international (purple) markers + info popups |
| 📢 **Scrolling Ticker** | Animated marquee of all upcoming long weekends at a glance |
| 📱 **Fully Responsive** | Mobile-first, works on all screen sizes |

---

## 🗂️ Folder Structure

```
escapist/
├── app/
│   ├── globals.css          ← Design system, custom fonts, animations
│   ├── layout.tsx           ← Root layout + metadata
│   └── page.tsx             ← Main page (orchestrates all sections)
│
├── components/
│   ├── Navbar.tsx           ← Sticky transparent→white nav with persona pill
│   ├── HeroSection.tsx      ← Full-screen hero with tag input + month picker
│   ├── Ticker.tsx           ← Scrolling marquee of upcoming weekends
│   ├── StatsBar.tsx         ← 4-stat summary card floating over hero
│   ├── CountdownStrip.tsx   ← Live countdown to next long weekend  ⭐ NEW
│   ├── BentoGrid.tsx        ← Alternating lg/sm card grid layout
│   ├── WeekendCard.tsx      ← Individual card (image + pills + action buttons)
│   ├── LeaveModal.tsx       ← Leave email generator (2-step)
│   ├── PackingModal.tsx     ← Interactive packing checklist           ⭐ NEW
│   ├── BudgetModal.tsx      ← Trip budget estimator with visual bars  ⭐ NEW
│   ├── MapModal.tsx         ← Leaflet interactive map
│   ├── PersonaQuiz.tsx      ← 3Q persona quiz overlay
│   └── Footer.tsx
│
├── constants/
│   └── holidays.ts          ← 2026 holidays, 15 destinations, all logic
│
├── hooks/
│   ├── useVisitedPlaces.ts  ← Persistent (localStorage) visited state
│   └── usePersona.ts        ← Quiz state + localStorage persistence
│
├── lib/
│   └── utils.ts             ← Formatting, email builder, packing catalog, budget calc
│
├── types/
│   └── index.ts             ← All TypeScript interfaces
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── vercel.json
└── .eslintrc.json
```

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js 18+** — [download here](https://nodejs.org)
- **npm** (comes with Node.js)

### Step 1 — Unzip and enter the folder
```bash
unzip escapist.zip
cd escapist
```

### Step 2 — Install dependencies
```bash
npm install
```
This installs Next.js, Tailwind, Framer Motion, Leaflet, date-fns, and all other packages (~2 min on first run).

### Step 3 — Start development server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Step 4 — Production build (optional, to test locally)
```bash
npm run build
npm start
```

---

## ☁️ Deploy to Vercel (Free — Recommended)

### Option A — GitHub + Vercel (Easiest)

1. Push the project to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create escapist --public --push
   # or: git remote add origin https://github.com/YOUR_USERNAME/escapist.git && git push -u origin main
   ```

2. Go to **[vercel.com](https://vercel.com)** → Sign in with GitHub → **New Project**

3. Import your `escapist` repository

4. Settings (auto-detected, no changes needed):
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Click **Deploy** → Live in ~90 seconds ✅

---

### Option B — Vercel CLI (Terminal)

```bash
# Install Vercel CLI globally
npm i -g vercel

# From inside the project folder
cd escapist
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project name? escapist
# - Which directory is your code in? ./
# - Override settings? No

# For production deployment:
vercel --prod
```

Your live URL will look like: `https://escapist-xyz.vercel.app`

---

### Option C — Netlify

```bash
npm run build
# Upload the `.next` folder to Netlify via drag-and-drop
# OR use Netlify CLI: npx netlify-cli deploy --prod --dir=.next
```

> Note: Netlify requires the `@netlify/plugin-nextjs` plugin for full Next.js support.

---

## 🌐 Environment Variables (Optional)

The app works out-of-the-box with no environment variables.

If you want to connect a real holiday API (e.g. [Calendarific](https://calendarific.com)):

1. Create a `.env.local` file:
   ```env
   CALENDARIFIC_API_KEY=your_key_here
   ```

2. Replace the static `INDIAN_HOLIDAYS_2026` array in `constants/holidays.ts` with a fetch call to `/api/holidays`

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--clr-earth` | `#0d3c1c` | Primary CTA, nav, headings |
| `--clr-moss`  | `#1d6e38` | Secondary green, hover states |
| `--clr-gold`  | `#c9a44e` | Accents, date overlays |
| `--clr-dusk`  | `#6b2d94` | International dest, bridge badge |
| `--clr-ember` | `#e84000` | Urgency badges, essential tags |
| `--clr-fog`   | `#f8f7f4` | Page background |
| Display font  | Cormorant Garamond | Dates, hero headlines |
| Body font     | DM Sans | All UI text |
| Mono font     | JetBrains Mono | Badges, labels, code |

---

## 📅 2026 Long Weekends Covered

| Holiday | Date | Day | Weekend Type |
|---|---|---|---|
| New Year's Day | Jan 1 | Thu | 4-day (bridge Fri) |
| Republic Day | Jan 26 | Mon | 3-day |
| Maha Shivratri | Feb 17 | Tue | 4-day (bridge Mon) |
| Holi | Mar 3 | Tue | 4-day (bridge Mon) |
| Ram Navami | Apr 2 | Thu | 4-day (bridge Fri) |
| Good Friday | Apr 3 | Fri | 3-day |
| Dr. Ambedkar Jayanti | Apr 14 | Tue | 4-day (bridge Mon) |
| Buddha Purnima | Apr 30 | Thu | 4-day (bridge Fri) |
| Onam | Sep 11 | Fri | 3-day |
| Gandhi Jayanti | Oct 2 | Fri | 3-day |
| Diwali | Oct 20 | Tue | 4-day (bridge Mon) |
| Govardhan Puja | Oct 22 | Thu | 4-day (bridge Fri) |
| Guru Nanak Jayanti | Nov 5 | Thu | 4-day (bridge Fri) |
| Chhath Puja | Nov 19 | Thu | 4-day (bridge Fri) |
| Christmas Day | Dec 25 | Fri | 3-day |

---

## 🏔️ Destinations

### National (India) — 10 Unexplored Gems
| Place | State | Hidden Gem Score |
|---|---|---|
| Gurez Valley | J&K | 9.8 |
| Dzükou Valley | Nagaland | 9.6 |
| Majuli | Assam | 9.5 |
| Chakrata | Uttarakhand | 9.2 |
| Sandakphu | West Bengal | 9.1 |
| Dholavira | Gujarat | 9.0 |
| Mawlynnong | Meghalaya | 8.8 |
| Chopta | Uttarakhand | 8.5 |
| Hampi (Monsoon) | Karnataka | 7.8 |
| Gokarna | Karnataka | 7.5 |

### International — 5 Unexplored Gems
| Place | Country | Visa for Indians |
|---|---|---|
| Salalah | Oman | Required |
| Almaty | Kazakhstan | Visa-free |
| Tbilisi | Georgia | Visa-free |
| Da Nang | Vietnam | Visa-free |
| Lombok | Indonesia | Visa-free |

---

## 🛠️ Extending the App

### Add more destinations
Edit the `DESTINATIONS` array in `constants/holidays.ts`.

### Add more holidays
Edit `INDIAN_HOLIDAYS_2026` in `constants/holidays.ts`.

### Add state-specific holidays
Add entries with `type: 'state'` and handle filtering in `app/page.tsx`.

### Connect real holiday API
```typescript
// app/api/holidays/route.ts
export async function GET() {
  const res = await fetch(`https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_API_KEY}&country=IN&year=2026`)
  const data = await res.json()
  return Response.json(data)
}
```

---

## 📄 License
MIT — free for personal and commercial use.

Built with ❤️ for India's corporate explorers.
