# 🛒 Voice Cart — Voice-Powered Shopping Assistant

A portfolio-quality, mobile-first Progressive Web App that lets you manage your grocery list using natural voice commands. Built with React 19, Vite, TypeScript, and Tailwind CSS v3.

---

## ✨ Features

### 🎙️ Tier 1 — Core Voice Experience
- **Natural voice commands** via the Web Speech API — no API key required
- **Real-time transcript** with live interim results (mint-colored text while speaking)
- **Animated waveform** modal during listening with mic pulse rings
- **Smart NLP parser** (100% rule-based, zero dependencies) recognising:
  - `"add milk"`, `"I need apples"`, `"grab 2 bottles of water"`
  - `"remove bread"`, `"take off eggs from the list"`
  - `"clear the list"`, `"start over"`
  - `"find organic avocados under $5"`
- **Category grouping** — items auto-sorted into Produce, Dairy, Meat, Bakery, Frozen, Beverages, Snacks, Household, Personal Care, Other
- **Collapsible category sections** with animated expand/collapse
- **Quantity controls** — tap +/– to adjust, voice sets initial amount
- **Check-off items** with strikethrough + progress bar
- **Estimated total** using a mock price map
- **Error handling** — mic denied, browser unsupported, no speech detected
- **localStorage persistence** — list survives page refresh

### 🔍 Tier 2 — Product Catalog & Suggestions
- **40 mock products** with Unsplash images, prices, brands, discount badges
- **Voice-triggered search** — say `"find chicken under $10"` → grid results appear
- **25 substitution pairs** — after adding milk, see Oat Milk / Almond Milk chips
- **"Running low" detector** — shows items from purchase history not bought in 7+ days
- **Quick Add panel** — curated popular items as tappable chips

### 🌿 Tier 3 — Polish & Extras
- **Seasonal suggestions** — different produce by calendar month
- **Language toggle** — English 🇬🇧 / Hindi 🇮🇳 (switches `SpeechRecognition.lang`)
- **Micro-animations** — item slide-in, FAB pulse rings, category fade
- **Settings tab** — language toggle + list clear with confirmation
- **SEO-ready** — meta description, title, semantic HTML, unique element IDs

---

## 🏗️ Architecture

```
Voice Input (Web Speech API)
        ↓
useVoiceInput.ts       →  SpeechRecognition wrapper
        ↓                  States: idle | requesting-permission | listening | processing | success | error
parseCommand()         →  Pure NLP function: string → ParsedIntent
        ↓                  Regex triggers + quantity/unit/price parser
useShoppingList.ts     →  CRUD state + localStorage persistence
        ↓
Component tree         →  ShoppingList → CategoryGroup → ItemCard
        ↑
SuggestionPanel        →  Substitutes + Running Low + Quick Add + Seasonal
```

### Key Parsed Intent Types
```ts
type ParsedIntent =
  | { action: 'add';    item: string; quantity: number; unit?: string; category: Category }
  | { action: 'remove'; item: string }
  | { action: 'search'; query: string; maxPrice?: number; filters: string[] }
  | { action: 'clear' }
  | { action: 'unknown'; transcript: string }
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── VoiceListener/     # Modal overlay, waveform bars, transcript + confirmation
│   ├── ShoppingList/      # Root list, collapsible CategoryGroup, ItemCard
│   ├── SuggestionPanel/   # Scrollable chips: substitutes, running-low, quick-add, seasonal
│   ├── SearchResults/     # Product grid with add-to-cart
│   ├── BottomNav.tsx      # 5-tab navigation (home, search, mic FAB, list, settings)
│   ├── MicFAB.tsx         # Floating mic button with pulse rings
│   ├── TopBar.tsx         # Header with logo + language toggle
│   ├── CartSummary.tsx    # Item count, progress bar, estimated total
│   ├── ErrorState.tsx     # Mic denied / unsupported / empty list states
│   └── SettingsView.tsx   # Language toggle + list clear
├── hooks/
│   ├── useVoiceInput.ts   # SpeechRecognition hook with full error mapping
│   └── useShoppingList.ts # Add/remove/toggle/clear + running-low logic
├── lib/
│   ├── commandParser.ts   # Pure NLP parser — unit tested
│   ├── categoryMap.ts     # 70+ grocery items → Category
│   ├── substitutions.ts   # 25 item substitution pairs
│   ├── mockProducts.ts    # 40 products with Unsplash images
│   └── seasonalSuggestions.ts  # Month-keyed produce picks
├── types/
│   └── index.ts           # All shared types + category labels/emojis
└── tests/
    └── commandParser.test.ts  # 9 Vitest unit tests
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#1C1C1C` (dark charcoal) |
| Surface / Card | `#FFFFFF` with `rounded-2xl` |
| Primary accent | `#00C896` (mint green) |
| Text primary | `#1A1A1A` |
| Text muted | `#9CA3AF` |
| Border | `#E5E7EB` |
| FAB mic | `#00C896` circle, 56px, glow shadow |
| Font | Inter (Google Fonts), 300–800 weights |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npx vitest run src/tests/commandParser.test.ts

# Build for production
npm run build
```

Open **Chrome or Edge** (required for Web Speech API). On first mic press, approve the microphone permission prompt.

---

## 🧪 Voice Command Examples

| Say... | Action |
|---|---|
| `"add milk"` | Add milk → Dairy |
| `"I need 3 avocados"` | Add 3 avocados → Produce |
| `"buy 2 bottles of water"` | Add 2 bottles of water → Beverages |
| `"add a dozen eggs"` | Add 12 eggs → Dairy |
| `"remove bread"` | Remove first matching bread item |
| `"find organic avocados under $5"` | Search catalog with filter |
| `"clear the list"` | Remove all items |
| `"दूध जोड़ें"` | (Hindi) Add milk — switch language first |

---

## 🔑 Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| NLP approach | Rule-based regex | Zero deps, works offline, fully testable |
| State | localStorage | No backend; survives refresh; works offline |
| Tailwind | v3 | Stable, well-documented |
| Images | Unsplash static URLs | No API key, fast, deterministic |
| Testing | Vitest | Same toolchain as Vite, zero config |
| Fonts | Inter (Google Fonts) | Matches design reference |

---

## 📋 Implementation Summary

Voice Cart was built across 6 phases:

1. **Scaffold** — Vite + React + TypeScript + Tailwind CSS v3 + Inter font
2. **Data Layer** — Types, category map (70+ items), NLP parser, 9 unit tests
3. **Core UI** — Voice modal, waveform animation, shopping list with category groups, mic FAB, bottom nav
4. **Product Catalog** — 40 mock products, search results grid, suggestion panel with substitutes
5. **Polish** — Language toggle (EN/HI), seasonal suggestions, micro-animations, settings tab
6. **Docs** — README and architecture notes

The NLP parser handles add, remove, search, and clear intents with quantity parsing (word numbers like "a dozen", numeric quantities, unit extraction like "bottles of"), price filters ("under $5"), and ingredient filters ("organic"). Short phrases with no trigger word are treated as implicit add commands, making the interaction feel natural.

---

## 📄 License

MIT — for portfolio/demo use.
