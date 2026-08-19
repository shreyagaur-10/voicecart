// ─── i18n Translation System ─────────────────────────────────────────────────
// Supports 'en-US' (English) and 'hi-IN' (Hindi)

export type Lang = 'en-US' | 'hi-IN';

export interface Translations {
  // Nav
  nav_home: string;
  nav_search: string;
  nav_list: string;
  nav_settings: string;
  nav_voice: string;

  // Home page
  home_greeting: string;
  home_subtitle: string;
  home_tap_mic: string;
  home_cart_title: string;
  home_items: string;
  home_item: string;
  home_checked: string;
  home_est_total: string;
  home_empty_title: string;
  home_empty_sub: string;
  home_quick_add: string;
  home_suggested: string;
  home_running_low: string;
  home_seasonal: string;
  home_alt_for: string;

  // Search page
  search_title: string;
  search_placeholder: string;
  search_results: string;
  search_result: string;
  search_no_results: string;
  search_no_results_sub: string;
  search_heard: string;
  search_back: string;
  search_add_filter: string;
  search_start_title: string;
  search_start_sub: string;
  search_in_stock: string;
  search_out_of_stock: string;

  // List page
  list_title: string;
  list_empty_title: string;
  list_empty_sub: string;
  list_clear: string;
  list_checked: string;
  list_items: string;
  list_all_done: string;

  // Settings page
  settings_title: string;
  settings_voice_input: string;
  settings_language: string;
  settings_language_current: string;
  settings_language_name: string;
  settings_data: string;
  settings_clear_list: string;
  settings_clear_list_sub: string;
  settings_clear_confirm: string;
  settings_about: string;
  settings_about_speech: string;
  settings_about_nlp: string;
  settings_about_storage: string;
  settings_about_lang: string;
  settings_version: string;
  settings_theme: string;
  settings_theme_sub: string;

  // Voice modal
  voice_listening: string;
  voice_speak_now: string;
  voice_processing: string;
  voice_tap_to_stop: string;
  voice_error_permission: string;
  voice_error_not_supported: string;
  voice_error_no_speech: string;
  voice_error_network: string;
  voice_close: string;
  voice_examples: string;
  voice_example_add: string;
  voice_example_remove: string;
  voice_example_search: string;

  // Confirmations
  confirm_added: string;
  confirm_removed: string;
  confirm_cleared: string;
  confirm_searching: string;
  confirm_unknown: string;

  // Recommendations page
  recs_title: string;
  recs_subtitle: string;
  recs_smart_picks: string;
  recs_alternatives_for: string;
  recs_alternatives_sub: string;
  recs_swap: string;
  recs_running_low: string;
  recs_running_low_sub: string;
  recs_restock: string;
  recs_ran_out: string;
  recs_you_might_need: string;
  recs_popular_picks: string;
  recs_based_on_cart: string;
  recs_bestsellers: string;
  recs_for_you: string;
  recs_pairs_well: string;
  recs_customer_fav: string;
  recs_trending: string;
  recs_trending_sub: string;
  recs_on_sale: string;
  recs_on_sale_sub: string;
  recs_save_badge: string;
  recs_save_today: string;
  recs_in_season: string;
  recs_in_season_sub: string;
  recs_peak_season: string;
  recs_fresh: string;
  recs_frequently_bought: string;
  recs_frequently_sub: string;
  recs_staples: string;
  recs_everyday: string;
  recs_show_less: string;
  recs_show_all: string;
  recs_in_cart: string;
  recs_added: string;
  recs_add: string;
  recs_add_to_cart: string;
  recs_out_of_stock: string;
  // Nav For You
  nav_recs: string;
  // Cart Drawer
  cart_title: string;
  cart_empty: string;
  cart_empty_sub: string;
  cart_est_total: string;
  cart_done: string;
  cart_all_checked: string;
  cart_proceed: string;
  cart_view_list: string;
  cart_clear_all: string;
  // Toast notifications
  toast_payment_title: string;
  toast_payment_sub: string;
  toast_unavailable_title: string;
  toast_unavailable_sub: string;
  // Buttons
  btn_add: string;
  btn_remove: string;
  btn_undo: string;
  btn_cancel: string;
}

const en: Translations = {
  nav_home: 'Home',
  nav_search: 'Search',
  nav_list: 'List',
  nav_settings: 'Settings',
  nav_voice: 'Voice',

  home_greeting: 'Voice Superstore 👋',
  home_subtitle: 'Buy anything — Tech, Fashion, Beauty, Books & Groceries',
  home_tap_mic: 'Tap bot or speak "Add wireless headphones"',
  home_cart_title: 'Your Cart',
  home_items: 'items',
  home_item: 'item',
  home_checked: 'checked',
  home_est_total: 'Est. Total',
  home_empty_title: 'Your cart is empty',
  home_empty_sub: 'Say "Add headphones" or "Buy t-shirt" to get started',
  home_quick_add: 'Quick Add',
  home_suggested: 'Suggested',
  home_running_low: 'Running Low',
  home_seasonal: 'In Season',
  home_alt_for: 'Alternatives for',

  search_title: 'Search Products',
  search_placeholder: 'Search for products...',
  search_results: 'results',
  search_result: 'result',
  search_no_results: 'No results found',
  search_no_results_sub: 'Try a different search or remove filters',
  search_heard: 'Voice Search',
  search_back: 'Back to list',
  search_add_filter: 'Add Filter',
  search_start_title: 'Search for products',
  search_start_sub: 'Type above or say "Find milk" to search',
  search_in_stock: 'In Stock',
  search_out_of_stock: 'Out of Stock',

  list_title: 'Shopping List',
  list_empty_title: 'Nothing here yet',
  list_empty_sub: 'Go home and add items using your voice or quick-add',
  list_clear: 'Clear All',
  list_checked: 'checked',
  list_items: 'items',
  list_all_done: 'All done! 🎉',

  settings_title: 'Settings',
  settings_voice_input: 'Voice Input',
  settings_language: 'Language',
  settings_language_current: 'Current',
  settings_language_name: 'English',
  settings_data: 'Data',
  settings_clear_list: 'Clear Shopping List',
  settings_clear_list_sub: 'Remove all items from your cart',
  settings_clear_confirm: 'Clear your entire shopping list? This cannot be undone.',
  settings_about: 'About Voice Cart',
  settings_about_speech: '🎙️ Powered by Web Speech API — works in Chrome/Edge',
  settings_about_nlp: '🧠 Rule-based NLP parser — zero external dependencies',
  settings_about_storage: '💾 Data stored locally in your browser',
  settings_about_lang: '🌍 Supports English & Hindi voice input',
  settings_version: 'v1.0.0 · Voice Cart',
  settings_theme: 'Appearance',
  settings_theme_sub: 'Dark mode coming soon',

  voice_listening: 'Listening...',
  voice_speak_now: 'Speak now',
  voice_processing: 'Processing...',
  voice_tap_to_stop: 'Tap to stop',
  voice_error_permission: 'Microphone permission denied. Please allow microphone access.',
  voice_error_not_supported: 'Voice input is not supported in this browser.',
  voice_error_no_speech: 'No speech detected. Please try again.',
  voice_error_network: 'Network error. Please check your connection.',
  voice_close: 'Close',
  voice_examples: 'Try saying:',
  voice_example_add: '"Add 2 litres of milk"',
  voice_example_remove: '"Remove eggs"',
  voice_example_search: '"Find organic apples under ₹200"',

  confirm_added: 'Added to list',
  confirm_removed: 'Removed from list',
  confirm_cleared: 'List cleared',
  confirm_searching: 'Searching for',
  confirm_unknown: 'Command not understood',

  btn_add: 'Add',
  btn_remove: 'Remove',
  btn_undo: 'Undo',
  btn_cancel: 'Cancel',

  recs_title: 'Recommendations for You',
  recs_subtitle: 'personalized suggestions based on your cart & preferences',
  recs_smart_picks: 'Smart Picks',
  recs_alternatives_for: 'Alternatives for',
  recs_alternatives_sub: 'Healthier or cheaper swaps',
  recs_swap: 'Swap',
  recs_running_low: 'Running Low',
  recs_running_low_sub: 'Based on your purchase history',
  recs_restock: 'Restock',
  recs_ran_out: 'Ran out ~7 days ago',
  recs_you_might_need: 'You Might Also Need',
  recs_popular_picks: 'Popular Picks',
  recs_based_on_cart: "Based on what's in your cart",
  recs_bestsellers: 'Bestsellers near you',
  recs_for_you: 'For You',
  recs_pairs_well: 'Pairs well with your cart',
  recs_customer_fav: 'Customer favorite',
  recs_trending: 'Trending Now',
  recs_trending_sub: 'What everyone is shopping this week',
  recs_on_sale: 'On Sale Now',
  recs_on_sale_sub: 'Limited-time offers',
  recs_save_badge: 'Save',
  recs_save_today: 'Save % today',
  recs_in_season: 'In Season',
  recs_in_season_sub: 'Fresh, at peak flavor & nutrition',
  recs_peak_season: 'Peak season in',
  recs_fresh: 'Fresh',
  recs_frequently_bought: 'Frequently Bought',
  recs_frequently_sub: 'Everyday essentials',
  recs_staples: 'Staples',
  recs_everyday: 'Everyday essential',
  recs_show_less: 'Show Less',
  recs_show_all: 'Show All Staples',
  recs_in_cart: 'In Cart ✓',
  recs_added: 'Added ✓',
  recs_add: 'Add',
  recs_add_to_cart: 'Add to Cart',
  recs_out_of_stock: 'Out of Stock',

  nav_recs: 'For You',

  cart_title: 'Your Cart',
  cart_empty: 'Cart is empty',
  cart_empty_sub: 'Say "Add milk" or tap the mic to get started',
  cart_est_total: 'Est. Total',
  cart_done: 'done',
  cart_all_checked: 'All items checked off! 🎉',
  cart_proceed: 'Proceed to Payment',
  cart_view_list: 'View Full List',
  cart_clear_all: 'Clear All Items',

  toast_payment_title: 'Payment Coming Soon!',
  toast_payment_sub: 'Checkout feature is coming soon for',
  toast_unavailable_title: 'Product Unavailable',
  toast_unavailable_sub: 'is currently out of stock.',
};

const hi: Translations = {
  nav_home: 'होम',
  nav_search: 'खोजें',
  nav_list: 'सूची',
  nav_settings: 'सेटिंग',
  nav_voice: 'आवाज़',

  home_greeting: 'वॉइस सुपरस्टोर 👋',
  home_subtitle: 'कुछ भी खरीदें — इलेक्ट्रॉनिक्स, कपड़े, किताबें और राशन',
  home_tap_mic: 'आवाज़ से सामान जोड़ने के लिए बोट दबाएं',
  home_cart_title: 'आपकी कार्ट',
  home_items: 'वस्तुएं',
  home_item: 'वस्तु',
  home_checked: 'चेक किया',
  home_est_total: 'अनुमानित कुल',
  home_empty_title: 'कार्ट खाली है',
  home_empty_sub: '"हेडफोन जोड़ें" या "टी-शर्ट खरीदें" कहें',
  home_quick_add: 'जल्दी जोड़ें',
  home_suggested: 'सुझाव',
  home_running_low: 'कम हो रहा है',
  home_seasonal: 'मौसमी',
  home_alt_for: 'विकल्प:',

  search_title: 'उत्पाद खोजें',
  search_placeholder: 'उत्पाद खोजें...',
  search_results: 'परिणाम',
  search_result: 'परिणाम',
  search_no_results: 'कोई परिणाम नहीं मिला',
  search_no_results_sub: 'दूसरी खोज आज़माएं या फ़िल्टर हटाएं',
  search_heard: 'आवाज़ खोज',
  search_back: 'सूची पर वापस जाएं',
  search_add_filter: 'फ़िल्टर जोड़ें',
  search_start_title: 'उत्पाद खोजें',
  search_start_sub: 'ऊपर टाइप करें या "दूध खोजें" कहें',
  search_in_stock: 'उपलब्ध',
  search_out_of_stock: 'अनुपलब्ध',

  list_title: 'खरीदारी सूची',
  list_empty_title: 'अभी कुछ नहीं है',
  list_empty_sub: 'होम पर जाएं और आवाज़ से वस्तुएं जोड़ें',
  list_clear: 'सब हटाएं',
  list_checked: 'चेक किया',
  list_items: 'वस्तुएं',
  list_all_done: 'सब हो गया! 🎉',

  settings_title: 'सेटिंग',
  settings_voice_input: 'आवाज़ इनपुट',
  settings_language: 'भाषा',
  settings_language_current: 'वर्तमान',
  settings_language_name: 'हिंदी',
  settings_data: 'डेटा',
  settings_clear_list: 'खरीदारी सूची साफ़ करें',
  settings_clear_list_sub: 'कार्ट से सभी वस्तुएं हटाएं',
  settings_clear_confirm: 'पूरी खरीदारी सूची हटाएं? यह वापस नहीं होगा।',
  settings_about: 'Voice Cart के बारे में',
  settings_about_speech: '🎙️ Web Speech API द्वारा संचालित — Chrome/Edge में काम करता है',
  settings_about_nlp: '🧠 नियम-आधारित NLP पार्सर — कोई बाहरी निर्भरता नहीं',
  settings_about_storage: '💾 डेटा आपके ब्राउज़र में स्थानीय रूप से सहेजा जाता है',
  settings_about_lang: '🌍 अंग्रेज़ी और हिंदी आवाज़ इनपुट का समर्थन करता है',
  settings_version: 'v1.0.0 · Voice Cart',
  settings_theme: 'दिखावट',
  settings_theme_sub: 'डार्क मोड जल्द आ रहा है',

  voice_listening: 'सुन रहा हूं...',
  voice_speak_now: 'अभी बोलें',
  voice_processing: 'प्रोसेस हो रहा है...',
  voice_tap_to_stop: 'रोकने के लिए दबाएं',
  voice_error_permission: 'माइक्रोफ़ोन अनुमति अस्वीकृत। कृपया माइक्रोफ़ोन एक्सेस दें।',
  voice_error_not_supported: 'इस ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है।',
  voice_error_no_speech: 'कोई बोली नहीं सुनी। कृपया फिर कोशिश करें।',
  voice_error_network: 'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।',
  voice_close: 'बंद करें',
  voice_examples: 'यह कहकर देखें:',
  voice_example_add: '"दो लीटर दूध जोड़ें"',
  voice_example_remove: '"अंडे हटाएं"',
  voice_example_search: '"जैविक सेब खोजें"',

  confirm_added: 'सूची में जोड़ा',
  confirm_removed: 'सूची से हटाया',
  confirm_cleared: 'सूची साफ़ की',
  confirm_searching: 'खोज रहे हैं',
  confirm_unknown: 'कमांड समझ नहीं आई',

  btn_add: 'जोड़ें',
  btn_remove: 'हटाएं',
  btn_undo: 'पूर्ववत करें',
  btn_cancel: 'रद्द करें',

  recs_title: 'आपके लिए सुझाव',
  recs_subtitle: 'आपकी कार्ट और पसंद के आधार पर व्यक्तिगत सुझाव',
  recs_smart_picks: 'स्मार्ट चुनाव',
  recs_alternatives_for: 'विकल्प:',
  recs_alternatives_sub: 'स्वस्थ या सस्ते विकल्प',
  recs_swap: 'बदलें',
  recs_running_low: 'कम हो रहा है',
  recs_running_low_sub: 'आपके खरीद इतिहास के आधार पर',
  recs_restock: 'दोबारा खरीदें',
  recs_ran_out: '~7 दिन पहले खत्म हुआ',
  recs_you_might_need: 'आपको यह भी चाहिए होगा',
  recs_popular_picks: 'लोकप्रिय चुनाव',
  recs_based_on_cart: 'आपकी कार्ट के आधार पर',
  recs_bestsellers: 'आपके पास के बेस्टसेलर',
  recs_for_you: 'आपके लिए',
  recs_pairs_well: 'आपकी कार्ट के साथ अच्छा लगेगा',
  recs_customer_fav: 'ग्राहकों की पसंद',
  recs_trending: 'अभी ट्रेंड में',
  recs_trending_sub: 'इस हफ्ते सबसे ज़्यादा खरीदा जा रहा है',
  recs_on_sale: 'अभी सेल पर',
  recs_on_sale_sub: 'सीमित समय के ऑफर',
  recs_save_badge: 'बचाएं',
  recs_save_today: '% की बचत आज',
  recs_in_season: 'मौसमी',
  recs_in_season_sub: 'ताज़ा, अधिकतम स्वाद और पोषण',
  recs_peak_season: 'का मौसम',
  recs_fresh: 'ताज़ा',
  recs_frequently_bought: 'अक्सर खरीदा जाता है',
  recs_frequently_sub: 'रोज़ाना की ज़रूरतें',
  recs_staples: 'ज़रूरी चीज़ें',
  recs_everyday: 'रोज़ाना की ज़रूरत',
  recs_show_less: 'कम दिखाएं',
  recs_show_all: 'सभी ज़रूरी चीज़ें देखें',
  recs_in_cart: 'कार्ट में है ✓',
  recs_added: 'जोड़ा गया ✓',
  recs_add: 'जोड़ें',
  recs_add_to_cart: 'कार्ट में जोड़ें',
  recs_out_of_stock: 'उपलब्ध नहीं',

  nav_recs: 'आपके लिए',

  cart_title: 'आपकी कार्ट',
  cart_empty: 'कार्ट खाली है',
  cart_empty_sub: '"दूध जोड़ें" कहें या माइक दबाएं',
  cart_est_total: 'अनुमानित कुल',
  cart_done: 'हो गया',
  cart_all_checked: 'सभी चीज़ें चेक हो गईं! 🎉',
  cart_proceed: 'भुगतान करें',
  cart_view_list: 'पूरी सूची देखें',
  cart_clear_all: 'सब हटाएं',

  toast_payment_title: 'भुगतान जल्द आएगा!',
  toast_payment_sub: 'चेकआउट सुविधा जल्द आ रही है',
  toast_unavailable_title: 'उत्पाद उपलब्ध नहीं',
  toast_unavailable_sub: 'अभी स्टॉक में नहीं है।',
};

export const translations: Record<Lang, Translations> = { 'en-US': en, 'hi-IN': hi };

export function t(lang: Lang, key: keyof Translations): string {
  return translations[lang][key] ?? translations['en-US'][key];
}
