# Brief Write-up of Approach (Voice Cart)

### Approach & System Architecture 

**Voice Cart** is engineered as a responsive, voice-first shopping assistant tailored for mobile and web experiences, built using React (TypeScript), Tailwind CSS, and Vite.

**Core Engineering Strategy:**
1. **Voice Processing & Rule-Based NLU:** Utilizes the Web Speech API (`webkitSpeechRecognition`) for low-latency, real-time voice input in English (`en-US`) and Hindi (`hi-IN`). A custom Natural Language Understanding (NLU) parser converts speech into structured intent objects (`add`, `remove`, `search`, `clear`) without external API latencies.
2. **Bilingual i18n & Smart Catalog:** Features complete bilingual translation for all UI components, bottom sheets, navigation, and mock products. Fuzzy tag matching maps spoken queries (e.g., *"egg"* ➔ *"Free Range Eggs"*), while validating catalog availability and prompting interactive toast notifications for out-of-stock items.
3. **State Management & Intelligence:** Custom React hooks (`useShoppingList`, `useVoiceInput`) manage shopping cart state and local browser persistence. Purchase history tracking enables automated recommendations: "Running Low" alerts, monthly seasonal produce, and healthier/cheaper item substitutions.
4. **Resilient UX:** Styled with Tailwind CSS, featuring smooth micro-animations, category grouping across 19 departments, floating voice bot controls, and a centered payment modal.
