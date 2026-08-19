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

/**
 * Returns substitution suggestions for a given item name.
 * Returns empty array if no substitutions found.
 */
export function getSubstitutions(itemName: string): string[] {
  const lower = itemName.toLowerCase();
  for (const [key, subs] of Object.entries(SUBSTITUTIONS)) {
    if (lower.includes(key)) return subs;
  }
  return [];
}
