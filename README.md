# Voice Cart 🛒🎙️

> **A voice-first, bilingual shopping assistant web application built with React 19, TypeScript, Tailwind CSS v3, and Web Speech API.**

🔗 **Live Demo**: [voice-cart-zhf4-1yfrkptov-shreya-s-projects13.vercel.app/](voice-cart-zhf4-1yfrkptov-shreya-s-projects13.vercel.app/)  
📦 **GitHub Repository**: [https://github.com/shreyagaur-10/voice-cart](https://github.com/shreyagaur-10/voicecart)

---

## 🎯 Technical Approach

For a brief write-up and detailed technical breakdown of our approach, system architecture, NLU design, and internationalization strategy, please refer to **[`approach.md`](./approach.md)**.

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

- **[Detailed Technical Approach Guide (`approach.md`)](./approach.md)** — Deep dive into system design, NLU engine, i18n strategy, and state management.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
