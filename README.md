# Voice Cart 🛒🎙️

> **A voice-first, bilingual shopping assistant web application built with React 19, TypeScript, Tailwind CSS v3, and Web Speech API.**

🔗 **Live Demo**: [voice-cart-zhf4-1yfrkptov-shreya-s-projects13.vercel.app/](voice-cart-zhf4-1yfrkptov-shreya-s-projects13.vercel.app/)  
📦 **GitHub Repository**: [https://github.com/shreyagaur-10/voice-cart](https://github.com/shreyagaur-10/voicecart)

---

## 🎯 Technical Approach

Voice Cart is engineered as a responsive, voice-driven shopping assistant tailored for mobile and web. It pairs the browser's native **Web Speech API** (`SpeechRecognition`) with a **deterministic rule-based NLU engine** (`commandParser.ts`) to achieve low-latency voice command parsing in English (`en-US`) and Hindi (`hi-IN`) without cloud dependency costs.

### Core Engineering Strategy & Pillars:
1. **Client-Side Speech & Intent Parsing:** Natural voice input parsed into structured intents (`add`, `remove`, `search`, `clear`) with entity extraction for quantities (numerical and spoken words like *"a dozen"*), units (`litres`, `packs`), and price filters (`under ₹5000`).
2. **Bilingual i18n & Catalog Mapping:** Complete UI localization with automatic keyword mapping between spoken English/Hindi terms and inventory categories across 19 categories.
3. **Dynamic Recommendation Engines:** Custom React hooks (`useShoppingList`, `useVoiceInput`) managing automated recommendations (*"Running Low"* from purchase history, seasonal produce by calendar month, and product substitutions).
4. **Resilient User Experience:** Out-of-stock items trigger instant visual feedback toasts, while checkout actions launch an interactive *"Payment Coming Soon"* modal.

---

## ✨ Key Features

- 🎙️ **Bilingual Voice Recognition**: Hands-free voice commands supporting **English (`en-US`)** and **Hindi (`hi-IN`)**.
- 🌐 **Instant Language Toggle**: Seamlessly switches UI strings, product names, categories, and toasts between English and Hindi.
- 🔐 **Auth & Guest Access**: Persistent logged-in user state or instant guest browsing mode (`localStorage`).
- 🛍️ **Smart Recommendations ("For You")**:
  - **Running Low**: Smart alerts for items bought >7 days ago that need restocking.
  - **Seasonal Produce**: Month-keyed fresh fruit and vegetable picks.
  - **Substitutions & Swaps**: Healthier or cheaper alternatives when items are added to cart.
- 📦 **Categorized Shopping List**: Dynamically groups cart items across 19 categories (Electronics, Clothing, Groceries, Books, Sports, etc.).
- 💳 **Payment Coming Soon Modal**: Interactive centered popup modal displaying cart summaries and security highlights upon checkout attempt.

---

## 🏗️ Architecture Flow

```text
  [ User Speaks Command ]
             │
             ▼
  [ Web Speech API (en-US / hi-IN) ]
             │ (transcript text)
             ▼
  [ Rule-based NLU Command Parser ]
             │ (action, item, qty, category)
             ▼
  [ Intent Handler / Availability Check ]
             │
      ┌──────┴────────────────────────┐
      ▼                               ▼
[ Item Available ]           [ Product Unavailable ]
  ├─ Add to Shopping List      └─ Trigger Toast Notification
  ├─ Update Estimated Total
  └─ Persist to localStorage
```

---

## 🔐 Authentication & Storage

- **Logged-in User Session**: Session email stored locally via `localStorage.getItem('user_email')`.
- **Guest Access**: Enables immediate access without authentication (`localStorage.getItem('is_guest')`).
- **Data Persistence**: Cart items and purchase history are safely stored in browser `localStorage`.

---

## 🧪 Testing

Unit tests validate command parsing logic, quantity extraction, category auto-mapping, and Hindi keyword parsing using **Vitest**.

To run unit tests locally:
```bash
npm run test
```

---

## ⚠️ Known Limitations & Out of Scope

- **Browser Support**: Web Speech API requires Chrome or Edge (Safari has partial support; Firefox requires flag configuration).
- **Backend Sync**: Data is currently stored in local browser `localStorage` without cloud database sync.
- **Mock Catalog**: Product dataset and pricing are statically defined for demonstration rather than connected to a live ERP database.
- **NLU Scope**: Intent parser uses keyword/regex matching optimized for shopping commands rather than heavy LLM conversational flows.

---

## 🚀 Quick Start (Local Setup)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shreyagaur-10/voice-cart.git
   cd voice-cart
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run local development server**:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in **Google Chrome** or **Microsoft Edge**.

---

## 🗣️ Supported Voice Commands

| Action | English Example | Hindi Example |
| :--- | :--- | :--- |
| **Add Item** | `"Add 2 eggs"`, `"Add wireless headphones"` | `"दो लीटर दूध जोड़ें"`, `"सेब जोड़ें"` |
| **Remove Item** | `"Remove eggs"` | `"अंडे हटाएं"` |
| **Search Catalog** | `"Find headphones under ₹5000"` | `"जैविक सेब खोजें"` |
| **Clear List** | `"Clear shopping list"` | `"सब बताएं"` |

---

## 📄 Related Documentation

- **[Detailed Technical Approach Guide (`approach.md`)](./approach.md)** —Comprehensive deep dive into Web Speech API integration, rule-based NLU parser logic, bilingual i18n dictionary architecture, state persistence, and recommendation algorithms.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
