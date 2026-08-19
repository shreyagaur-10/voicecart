import type { Lang } from './i18n';

/** Seasonal grocery suggestions keyed by month (0-indexed, Jan=0) */
export const SEASONAL_SUGGESTIONS: Record<number, string[]> = {
  0: ['Citrus Oranges', 'Blood Oranges', 'Kale', 'Brussels Sprouts', 'Clementines'],
  1: ['Grapefruit', 'Leeks', 'Collard Greens', 'Sweet Potatoes', 'Winter Squash'],
  2: ['Artichokes', 'Asparagus', 'Peas', 'Spring Onions', 'Spinach'],
  3: ['Strawberries', 'Rhubarb', 'Fennel', 'Arugula', 'Morel Mushrooms'],
  4: ['Cherries', 'Apricots', 'Radishes', 'Snap Peas', 'Fresh Herbs'],
  5: ['Blueberries', 'Peaches', 'Corn', 'Zucchini', 'Tomatoes'],
  6: ['Watermelon', 'Figs', 'Eggplant', 'Bell Peppers', 'Cucumbers'],
  7: ['Plums', 'Blackberries', 'Green Beans', 'Okra', 'Nectarines'],
  8: ['Apples', 'Pears', 'Butternut Squash', 'Beets', 'Grapes'],
  9: ['Pumpkin', 'Sweet Potatoes', 'Cranberries', 'Cauliflower', 'Turnips'],
  10: ['Pomegranates', 'Persimmons', 'Parsnips', 'Celeriac', 'Quince'],
  11: ['Clementines', 'Chestnuts', 'Brussels Sprouts', 'Winter Citrus', 'Pomelo'],
};

export const SEASONAL_SUGGESTIONS_HI: Record<number, string[]> = {
  0: ['सिट्रस संतरे', 'लाल संतरे', 'केल', 'ब्रसेल्स स्प्राउट्स', 'क्लेमेंटाइन'],
  1: ['चकोतरा', 'लीक्स', 'कोलार्ड ग्रीन्स', 'शकरकंद', 'सर्दियों का कद्दू'],
  2: ['हाथीचक्र (आटिचोक)', 'शतावरी', 'मटर', 'हरा प्याज', 'पालक'],
  3: ['स्ट्रॉबेरी', 'रेवंदचीनी', 'सौंफ', 'अरुगुला', 'गुच्छी मशरूम'],
  4: ['चेरी', 'खुबानी', 'मूली', 'हरी मटर', 'ताज़ी जड़ी-बूटियाँ'],
  5: ['ब्लूबेरी', 'आडू', 'मक्का (भुट्टा)', 'जुकिनी', 'टमाटर'],
  6: ['तरबूज', 'अंजीर', 'बैंगन', 'शिमला मिर्च', 'खीरा'],
  7: ['आलूबुखारा', 'ब्लैकबेरी', 'हरी बीन्स', 'भिंडी', 'नेक्टराइन'],
  8: ['सेब', 'नाशपाती', 'बटरनट कद्दू', 'चुकंदर', 'अंगूर'],
  9: ['कद्दू', 'शकरकंद', 'क्रैनबेरी', 'फूलगोभी', 'शलजम'],
  10: ['अनार', 'पर्सिमोन', 'पार्सनिप', 'सेलेरिएक', 'श्रीफल'],
  11: ['क्लेमेंटाइन', 'शाहबलूत', 'ब्रसेल्स स्प्राउट्स', 'सर्दियों के खट्टे फल', 'चकोतरा'],
};

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const MONTH_NAMES_HI = [
  'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर',
];

export function getCurrentSeasonalSuggestions(lang: Lang = 'en-US'): { month: string; items: string[] } {
  const month = new Date().getMonth();
  const isHindi = lang === 'hi-IN';
  return {
    month: isHindi ? MONTH_NAMES_HI[month] : MONTH_NAMES[month],
    items: isHindi ? (SEASONAL_SUGGESTIONS_HI[month] ?? []) : (SEASONAL_SUGGESTIONS[month] ?? []),
  };
}
