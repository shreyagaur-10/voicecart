import type { Lang } from './i18n';

/** Maps item name keywords → array of substitution suggestions */
export const SUBSTITUTIONS: Record<string, string[]> = {
  milk: ['Oat Milk', 'Almond Milk', 'Soy Milk', 'Coconut Milk'],
  'oat milk': ['Almond Milk', 'Soy Milk', 'Coconut Milk', 'Regular Milk'],
  'almond milk': ['Oat Milk', 'Soy Milk', 'Coconut Milk'],
  butter: ['Coconut Oil', 'Olive Oil', 'Vegan Butter', 'Ghee'],
  eggs: ['Flax Eggs', 'Chia Eggs', 'Aquafaba', 'Egg Replacer'],
  cheese: ['Vegan Cheese', 'Nutritional Yeast', 'Cashew Cheese'],
  sugar: ['Honey', 'Maple Syrup', 'Stevia', 'Agave Nectar'],
  flour: ['Almond Flour', 'Oat Flour', 'Coconut Flour', 'Rice Flour'],
  bread: ['Sourdough Bread', 'Whole Wheat Bread', 'Gluten-Free Bread', 'Pita Bread'],
  pasta: ['Zucchini Noodles', 'Rice Pasta', 'Lentil Pasta', 'Chickpea Pasta'],
  rice: ['Quinoa', 'Cauliflower Rice', 'Farro', 'Brown Rice'],
  chicken: ['Tofu', 'Tempeh', 'Jackfruit', 'Turkey'],
  beef: ['Turkey', 'Bison', 'Beyond Burger', 'Impossible Burger'],
  coffee: ['Green Tea', 'Matcha', 'Chai Tea', 'Decaf Coffee'],
  chips: ['Rice Cakes', 'Veggie Straws', 'Popcorn', 'Pretzels'],
  mayo: ['Greek Yogurt', 'Avocado Spread', 'Hummus', 'Mustard'],
  sour: ['Greek Yogurt', 'Coconut Cream', 'Cashew Cream'],
  cream: ['Coconut Cream', 'Cashew Cream', 'Oat Cream'],
  soda: ['Sparkling Water', 'Kombucha', 'Coconut Water', 'Infused Water'],
  bacon: ['Turkey Bacon', 'Tempeh Bacon', 'Coconut Bacon'],
  shrimp: ['Tofu', 'Hearts of Palm', 'King Oyster Mushrooms'],
  salmon: ['Sardines', 'Mackerel', 'Plant-Based Salmon'],
  peanut: ['Almond Butter', 'Sunflower Butter', 'Tahini', 'Cashew Butter'],
  honey: ['Maple Syrup', 'Agave Nectar', 'Date Syrup'],
  chocolate: ['Cacao Nibs', 'Carob Chips', 'Dark Chocolate (70%+)'],
};

/** Maps Hindi item name keywords → array of Hindi substitution suggestions */
export const SUBSTITUTIONS_HI: Record<string, string[]> = {
  दूध: ['ओट मिल्क', 'बादाम का दूध', 'सोया मिल्क', 'नारियल का दूध'],
  milk: ['ओट मिल्क', 'बादाम का दूध', 'सोया मिल्क', 'नारियल का दूध'],
  'ओट मिल्क': ['बादाम का दूध', 'सोया मिल्क', 'नारियल का दूध', 'नियमित दूध'],
  'बादाम का दूध': ['ओट मिल्क', 'सोया मिल्क', 'नारियल का दूध'],
  मक्खन: ['नारियल का तेल', 'जैतून का तेल', 'शाकाहारी मक्खन', 'घी'],
  अंडे: ['अलसी के अंडे', 'चिया अंडे', 'एक्वाफाबा', 'अंडा रिप्लेसर'],
  अंडा: ['अलसी के अंडे', 'चिया अंडे', 'एक्वाफाबा', 'अंडा रिप्लेसर'],
  पनीर: ['शाकाहारी पनीर', 'पोषण खमीर', 'काजू पनीर'],
  चीज़: ['शाकाहारी पनीर', 'पोषण खमीर', 'काजू पनीर'],
  चीनी: ['शहर', 'मेपल सिरप', 'स्टीविया', 'अगेव अमृत'],
  आटा: ['बादाम का आटा', 'ओट का आटा', 'नारियल का आटा', 'चावल का आटा'],
  ब्रेड: ['साउरडॉ ब्रेड', 'गेहूं की ब्रेड', 'ग्लूटेन-मुक्त ब्रेड', 'पीटा ब्रेड'],
  पास्ता: ['जुकिनी नूडल्स', 'चावल का पास्ता', 'मसूर का पास्ता', 'चने का पास्ता'],
  चावल: ['किनुआ', 'फूलगोभी के चावल', 'फैरो', 'ब्राउन राइस'],
  चिकन: ['टोफू', 'टेम्पेह', 'कटहल', 'टर्की'],
  बीफ़: ['टर्की', 'बायसन', 'बियॉन्ड बर्गर', 'इम्पॉसिबल बर्गर'],
  कॉफ़ी: ['ग्रीन टी', 'माचा', 'चाय', 'डिकैफ़ कॉफ़ी'],
  चिप्स: ['राइस केक', 'वेजी स्ट्रॉज', 'पॉपकॉर्न', 'प्रेट्ज़ेल'],
  मेयोनेज़: ['ग्रीक योगर्ट', 'एवोकाडो स्प्रेड', 'हम्मस', 'सरसों (मस्टर्ड)'],
  खट्टा: ['ग्रीक योगर्ट', 'नारियल की मलाई', 'काजू की मलाई'],
  मलाई: ['नारियल की मलाई', 'काजू की मलाई', 'ओट क्रीम'],
  क्रीम: ['नारियल की मलाई', 'काजू की मलाई', 'ओट क्रीम'],
  सोडा: ['सोडा वाटर', 'कोम्बुचा', 'नारियल पानी', 'इन्फ्यूज्ड वाटर'],
  बेकन: ['टर्की बेकन', 'टेम्पेह बेकन', 'नारियल बेकन'],
  झींगा: ['टोफू', 'हार्ट्स ऑफ पाम', 'किंग ऑयस्टर मशरूम'],
  सामन: ['सार्डिन', 'मैकेरल', 'प्लांट-बेस्ड सैलमन'],
  सैलमन: ['सार्डिन', 'मैकेरल', 'प्लांट-बेस्ड सैलमन'],
  मूँगफली: ['बादाम का मक्खन', 'सूरजमुखी का मक्खन', 'ताहिनी', 'काजू का मक्खन'],
  शहद: ['मेपल सिरप', 'अगेव अमृत', 'खजूर का सिरप'],
  चॉकलेट: ['कोको निब्स', 'कैरोब चिप्स', 'डार्क चॉकलेट (70%+)'],
};

/**
 * Returns substitution suggestions for a given item name.
 * Returns empty array if no substitutions found.
 */
export function getSubstitutions(itemName: string, lang: Lang = 'en-US'): string[] {
  const lower = itemName.toLowerCase();
  const source = lang === 'hi-IN' ? SUBSTITUTIONS_HI : SUBSTITUTIONS;
  for (const [key, subs] of Object.entries(source)) {
    if (lower.includes(key)) return subs;
  }
  return [];
}
