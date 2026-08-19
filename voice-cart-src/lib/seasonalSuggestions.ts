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

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function getCurrentSeasonalSuggestions(): { month: string; items: string[] } {
  const month = new Date().getMonth();
  return {
    month: MONTH_NAMES[month],
    items: SEASONAL_SUGGESTIONS[month] ?? [],
  };
}
