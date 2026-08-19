import type { Category } from '../types';

/** Maps lowercase item keywords → category */
export const CATEGORY_MAP: Record<string, Category> = {
  // Hindi Mappings
  सेब: 'produce', केला: 'produce', केले: 'produce', संतरा: 'produce', संतरे: 'produce',
  नींबू: 'produce', आम: 'produce', अंगूर: 'produce', स्ट्रॉबेरी: 'produce',
  एवोकाडो: 'produce', टमाटर: 'produce', आलू: 'produce', प्याज: 'produce',
  लहसुन: 'produce', गाजर: 'produce', पालक: 'produce', सलाद: 'produce',
  ब्रोकोली: 'produce', अदरक: 'produce', मशरूम: 'produce', तरबूज: 'produce',
  अनानास: 'produce', पौधा: 'garden', पौधे: 'garden', फूल: 'garden',
  दूध: 'dairy', मिल्क: 'dairy', मक्खन: 'dairy', बटर: 'dairy', पनीर: 'dairy',
  चीज़: 'dairy', दही: 'dairy', अंडे: 'dairy', अंडा: 'dairy',
  चिकन: 'meat', गोमांस: 'meat', बीफ: 'meat', मछली: 'meat', सैलमन: 'meat',
  सामन: 'meat', ब्रेड: 'bakery', पाव: 'bakery', केक: 'bakery', कुकीज़: 'bakery',
  रोटी: 'bakery', पिज्जा: 'frozen', आइसक्रीम: 'frozen', 'आइस क्रीम': 'frozen',
  पानी: 'beverages', जूस: 'beverages', कॉफी: 'beverages', कॉफ़ी: 'beverages',
  चाय: 'beverages', सोडा: 'beverages', शराब: 'beverages', चिप्स: 'snacks',
  पॉपकॉर्न: 'snacks', बादाम: 'snacks', काजू: 'snacks', मूंगफली: 'snacks',
  चॉकलेट: 'snacks', मिठाई: 'snacks', अनाज: 'snacks', दलिया: 'snacks',
  पास्ता: 'snacks', चावल: 'snacks', नूडल्स: 'snacks', शहद: 'snacks',
  चीनी: 'snacks', आटा: 'snacks', नमक: 'snacks', दालें: 'snacks', दाल: 'snacks',
  साबुन: 'household', सर्फ: 'household', कागज: 'household', मोमबत्ती: 'household',
  बैटरी: 'household', बल्ब: 'household', झाड़ू: 'household', डिटर्जेंट: 'household',
  शैम्पू: 'personal-care', टूथपेस्ट: 'personal-care', टूथब्रश: 'personal-care',
  ब्रश: 'personal-care', इत्र: 'personal-care', फोन: 'electronics',
  स्मार्टफोन: 'electronics', लैपटॉप: 'electronics', टैबलेट: 'electronics',
  आईपैड: 'electronics', हेडफोन: 'electronics', हेडफ़ोन: 'electronics',
  इयरफ़ोन: 'electronics', इयरफोन: 'electronics', स्पीकर: 'electronics',
  चार्जर: 'electronics', माउस: 'electronics', कीबोर्ड: 'electronics',
  घड़ी: 'electronics', स्मार्टवॉच: 'electronics', टेलीविजन: 'electronics',
  टीवी: 'electronics', प्रिंटर: 'electronics', केबल: 'electronics',
  शर्ट: 'clothing', 'टी-शर्ट': 'clothing', 'टी शर्ट': 'clothing',
  जींस: 'clothing', पैंट: 'clothing', जैकेट: 'clothing', कोट: 'clothing',
  स्कर्ट: 'clothing', मोज़े: 'clothing', जूते: 'clothing', स्नीकर्स: 'clothing',
  चप्पल: 'clothing', टोपी: 'clothing', दस्ताने: 'clothing', बैग: 'clothing',
  बैकपैक: 'clothing', बटुआ: 'clothing', चश्मा: 'clothing', योग: 'sports',
  डम्बल: 'sports', वजन: 'sports', साइकिल: 'sports', फुटबॉल: 'sports',
  क्रिकेट: 'sports', जिम: 'sports', सप्लीमेंट: 'sports', हेलमेट: 'sports',
  गेंद: 'sports', लिपस्टिक: 'beauty', काजल: 'beauty', मेकअप: 'beauty',
  सीरम: 'beauty', तेल: 'beauty', किताब: 'books', किताबें: 'books',
  उपन्यास: 'books', डायरी: 'books', खिलौना: 'toys', खिलौने: 'toys',
  गुड़िया: 'toys', लेगो: 'toys', पेन: 'office', पेंसिल: 'office',
  नोटबुक: 'office', रबर: 'office', कार: 'automotive',

  // ── Produce ──────────────────────────────────────────────────────────────
  apple: 'produce', apples: 'produce', banana: 'produce', bananas: 'produce',
  orange: 'produce', oranges: 'produce', lemon: 'produce', lemons: 'produce',
  lime: 'produce', limes: 'produce', mango: 'produce', mangoes: 'produce',
  grape: 'produce', grapes: 'produce', strawberry: 'produce', strawberries: 'produce',
  blueberry: 'produce', blueberries: 'produce', avocado: 'produce', avocados: 'produce',
  tomato: 'produce', tomatoes: 'produce', potato: 'produce', potatoes: 'produce',
  onion: 'produce', onions: 'produce', garlic: 'produce', carrot: 'produce',
  carrots: 'produce', spinach: 'produce', lettuce: 'produce', kale: 'produce',
  broccoli: 'produce', cauliflower: 'produce', cucumber: 'produce', cucumbers: 'produce',
  celery: 'produce', corn: 'produce', peas: 'produce', ginger: 'produce',
  herbs: 'produce', cilantro: 'produce', parsley: 'produce', basil: 'produce',
  mushroom: 'produce', mushrooms: 'produce', pepper: 'produce', peppers: 'produce',
  zucchini: 'produce', asparagus: 'produce', arugula: 'produce', beets: 'produce',
  radish: 'produce', leeks: 'produce', fennel: 'produce', pear: 'produce',
  pears: 'produce', watermelon: 'produce', pineapple: 'produce',
  cherry: 'produce', cherries: 'produce', plum: 'produce', plums: 'produce',
  peach: 'produce', peaches: 'produce', pomegranate: 'produce',

  // ── Dairy & Eggs ─────────────────────────────────────────────────────────
  milk: 'dairy', 'oat milk': 'dairy', 'almond milk': 'dairy', 'soy milk': 'dairy',
  'coconut milk': 'dairy', 'skim milk': 'dairy', 'whole milk': 'dairy',
  butter: 'dairy', cheese: 'dairy', cheddar: 'dairy', mozzarella: 'dairy',
  parmesan: 'dairy', yogurt: 'dairy', 'greek yogurt': 'dairy', cream: 'dairy',
  'heavy cream': 'dairy', 'sour cream': 'dairy', 'cream cheese': 'dairy',
  eggs: 'dairy', egg: 'dairy', 'free range eggs': 'dairy',

  // ── Meat & Seafood ────────────────────────────────────────────────────────
  chicken: 'meat', beef: 'meat', pork: 'meat', lamb: 'meat', turkey: 'meat',
  fish: 'meat', salmon: 'meat', tuna: 'meat', shrimp: 'meat', bacon: 'meat',
  sausage: 'meat', 'ground beef': 'meat', 'chicken breast': 'meat', steak: 'meat',
  'pork chop': 'meat', sardines: 'meat', prawns: 'meat', crab: 'meat',

  // ── Bakery ────────────────────────────────────────────────────────────────
  bread: 'bakery', 'sourdough bread': 'bakery', 'whole wheat bread': 'bakery',
  bagel: 'bakery', bagels: 'bakery', muffin: 'bakery', muffins: 'bakery',
  croissant: 'bakery', croissants: 'bakery', rolls: 'bakery', buns: 'bakery',
  cake: 'bakery', cookies: 'bakery', crackers: 'bakery', tortilla: 'bakery',
  tortillas: 'bakery', pita: 'bakery', naan: 'bakery', waffle: 'bakery',
  pancake: 'bakery', 'english muffin': 'bakery',

  // ── Frozen ────────────────────────────────────────────────────────────────
  'frozen pizza': 'frozen', 'ice cream': 'frozen', 'frozen vegetables': 'frozen',
  'frozen fruit': 'frozen', 'frozen meals': 'frozen', 'frozen chicken': 'frozen',
  'frozen fish': 'frozen', 'frozen avocado': 'frozen', 'frozen peas': 'frozen',
  'frozen corn': 'frozen', 'frozen berries': 'frozen', popsicle: 'frozen',
  'frozen waffles': 'frozen', 'frozen burritos': 'frozen',

  // ── Beverages ─────────────────────────────────────────────────────────────
  water: 'beverages', 'sparkling water': 'beverages', juice: 'beverages',
  'orange juice': 'beverages', coffee: 'beverages', tea: 'beverages',
  soda: 'beverages', beer: 'beverages', wine: 'beverages', kombucha: 'beverages',
  smoothie: 'beverages', 'energy drink': 'beverages', lemonade: 'beverages',
  'cold brew': 'beverages', espresso: 'beverages', matcha: 'beverages',
  'protein shake': 'beverages',

  // ── Snacks & Pantry ───────────────────────────────────────────────────────
  chips: 'snacks', 'potato chips': 'snacks', popcorn: 'snacks', pretzels: 'snacks',
  nuts: 'snacks', almonds: 'snacks', cashews: 'snacks', peanuts: 'snacks',
  'trail mix': 'snacks', 'granola bar': 'snacks', 'granola bars': 'snacks',
  chocolate: 'snacks', candy: 'snacks', gummy: 'snacks', hummus: 'snacks',
  salsa: 'snacks', guacamole: 'snacks', cereal: 'snacks', granola: 'snacks',
  oatmeal: 'snacks', oats: 'snacks', pasta: 'snacks', rice: 'snacks',
  quinoa: 'snacks', noodles: 'snacks', 'olive oil': 'snacks', vinegar: 'snacks',
  'peanut butter': 'snacks', 'almond butter': 'snacks', jam: 'snacks', honey: 'snacks',
  sugar: 'snacks', flour: 'snacks', sauce: 'snacks', ketchup: 'snacks',
  mustard: 'snacks', mayo: 'snacks', 'soy sauce': 'snacks', spices: 'snacks',
  salt: 'snacks', lentils: 'snacks', beans: 'snacks',
  chickpeas: 'snacks', 'canned tomatoes': 'snacks', 'canned tuna': 'snacks',

  // ── Household ─────────────────────────────────────────────────────────────
  'dish soap': 'household', 'laundry detergent': 'household',
  'paper towels': 'household', 'toilet paper': 'household',
  tissues: 'household', sponges: 'household', 'trash bags': 'household',
  'zip lock bags': 'household', 'plastic bags': 'household', bleach: 'household',
  'all-purpose cleaner': 'household', 'window cleaner': 'household',
  'aluminum foil': 'household', 'plastic wrap': 'household',
  'baking soda': 'household', candles: 'household', batteries: 'household',
  lightbulb: 'household', lightbulbs: 'household', 'light bulb': 'household',
  'floor cleaner': 'household', mop: 'household', broom: 'household',
  detergent: 'household',

  // ── Personal Care ─────────────────────────────────────────────────────────
  shampoo: 'personal-care', conditioner: 'personal-care', soap: 'personal-care',
  'body wash': 'personal-care', toothpaste: 'personal-care',
  toothbrush: 'personal-care', 'dental floss': 'personal-care',
  deodorant: 'personal-care', 'face wash': 'personal-care',
  moisturizer: 'personal-care', sunscreen: 'personal-care', razors: 'personal-care',
  'hand sanitizer': 'personal-care', lotion: 'personal-care',
  bandages: 'personal-care', 'pain reliever': 'personal-care',
  vitamins: 'personal-care', 'cotton balls': 'personal-care',
  'face mask': 'personal-care', 'hand cream': 'personal-care',
  mouthwash: 'personal-care', floss: 'personal-care',

  // ── Electronics ───────────────────────────────────────────────────────────
  phone: 'electronics', smartphone: 'electronics', laptop: 'electronics',
  tablet: 'electronics', ipad: 'electronics', headphones: 'electronics',
  earbuds: 'electronics', earphone: 'electronics', earphones: 'electronics',
  speaker: 'electronics', charger: 'electronics',
  'usb cable': 'electronics', 'hdmi cable': 'electronics', mouse: 'electronics',
  keyboard: 'electronics', monitor: 'electronics', webcam: 'electronics',
  microphone: 'electronics', camera: 'electronics', 'power bank': 'electronics',
  smartwatch: 'electronics', watch: 'electronics', television: 'electronics',
  tv: 'electronics', router: 'electronics', 'hard drive': 'electronics',
  'flash drive': 'electronics', printer: 'electronics', scanner: 'electronics',
  cable: 'electronics', adapter: 'electronics', 'sd card': 'electronics',
  'gaming controller': 'electronics', console: 'electronics', projector: 'electronics',
  'smart home': 'electronics', 'smart plug': 'electronics',

  // ── Clothing ──────────────────────────────────────────────────────────────
  shirt: 'clothing', tshirt: 'clothing', 't-shirt': 'clothing', jeans: 'clothing',
  pants: 'clothing', trousers: 'clothing', shorts: 'clothing', jacket: 'clothing',
  coat: 'clothing', hoodie: 'clothing', sweatshirt: 'clothing', sweater: 'clothing',
  dress: 'clothing', skirt: 'clothing', blouse: 'clothing', socks: 'clothing',
  underwear: 'clothing', bra: 'clothing', shoes: 'clothing', sneakers: 'clothing',
  boots: 'clothing', sandals: 'clothing', heels: 'clothing', flip: 'clothing',
  hat: 'clothing', cap: 'clothing', gloves: 'clothing', scarf: 'clothing',
  belt: 'clothing', bag: 'clothing', backpack: 'clothing', wallet: 'clothing',
  sunglasses: 'clothing', tie: 'clothing', suit: 'clothing', leggings: 'clothing',
  pajamas: 'clothing', swimsuit: 'clothing', uniform: 'clothing',

  // ── Sports ────────────────────────────────────────────────────────────────
  yoga: 'sports', dumbbell: 'sports', dumbbells: 'sports', weights: 'sports',
  treadmill: 'sports', bicycle: 'sports', cycle: 'sports', football: 'sports',
  soccer: 'sports', basketball: 'sports', tennis: 'sports', badminton: 'sports',
  cricket: 'sports', volleyball: 'sports', swimming: 'sports', gym: 'sports',
  'protein powder': 'sports', supplement: 'sports', supplements: 'sports',
  'yoga mat': 'sports', 'resistance band': 'sports', 'jump rope': 'sports',
  helmet: 'sports', racket: 'sports', bat: 'sports',
  ball: 'sports', 'running shoes': 'sports', 'sports bottle': 'sports',
  fitness: 'sports', workout: 'sports',

  // ── Beauty ────────────────────────────────────────────────────────────────
  lipstick: 'beauty', foundation: 'beauty', mascara: 'beauty', eyeliner: 'beauty',
  eyeshadow: 'beauty', blush: 'beauty', concealer: 'beauty', primer: 'beauty',
  'setting spray': 'beauty', bronzer: 'beauty',
  'nail polish': 'beauty', perfume: 'beauty', cologne: 'beauty', serum: 'beauty',
  toner: 'beauty', 'face cream': 'beauty', 'hair mask': 'beauty',
  'hair oil': 'beauty', 'hair spray': 'beauty', 'hair color': 'beauty',
  'makeup remover': 'beauty', 'cleansing balm': 'beauty', retinol: 'beauty',

  // ── Books & Media ─────────────────────────────────────────────────────────
  book: 'books', books: 'books', novel: 'books', textbook: 'books',
  magazine: 'books', comic: 'books', 'comic book': 'books', audiobook: 'books',
  ebook: 'books', journal: 'books', diary: 'books', planner: 'books',
  dvd: 'books', 'blu-ray': 'books', music: 'books', cd: 'books',
  puzzle: 'books',

  // ── Toys ─────────────────────────────────────────────────────────────────
  toy: 'toys', toys: 'toys', doll: 'toys', 'action figure': 'toys',
  lego: 'toys', 'building blocks': 'toys', 'remote control': 'toys',
  'rc car': 'toys', stuffed: 'toys', 'stuffed animal': 'toys',
  teddy: 'toys', 'teddy bear': 'toys', 'board game': 'toys',
  playset: 'toys', 'art set': 'toys', crayon: 'toys', crayons: 'toys',
  slime: 'toys', 'water gun': 'toys',

  // ── Office ────────────────────────────────────────────────────────────────
  pen: 'office', pens: 'office', pencil: 'office', pencils: 'office',
  marker: 'office', markers: 'office', highlighter: 'office',
  stapler: 'office', scissors: 'office', tape: 'office', glue: 'office',
  notebook: 'office', notepad: 'office', 'sticky notes': 'office',
  'file folder': 'office', binder: 'office', 'paper clips': 'office',
  envelope: 'office', envelopes: 'office', 'printer paper': 'office',
  'ink cartridge': 'office', 'desk organizer': 'office',
  calculator: 'office', ruler: 'office', eraser: 'office',

  // ── Garden ────────────────────────────────────────────────────────────────
  seeds: 'garden', 'plant seeds': 'garden', 'flower seeds': 'garden',
  fertilizer: 'garden', soil: 'garden', 'potting soil': 'garden',
  pot: 'garden', pots: 'garden', planter: 'garden', 'garden hose': 'garden',
  'watering can': 'garden', 'garden gloves': 'garden', shovel: 'garden',
  rake: 'garden', trowel: 'garden', 'lawn mower': 'garden',
  pesticide: 'garden', herbicide: 'garden', mulch: 'garden',
  'compost bin': 'garden', plant: 'garden', plants: 'garden',
  succulent: 'garden', cactus: 'garden', flowers: 'garden', flower: 'garden',

  // ── Automotive ────────────────────────────────────────────────────────────
  'motor oil': 'automotive', 'car wash': 'automotive', wiper: 'automotive',
  wipers: 'automotive', 'air freshener': 'automotive', 'car charger': 'automotive',
  'car cleaner': 'automotive', wax: 'automotive', 'tire pressure': 'automotive',
  'jump starter': 'automotive', 'first aid kit': 'automotive',
  'car cover': 'automotive', 'seat cover': 'automotive',
  'steering wheel cover': 'automotive', 'car mat': 'automotive',
};

/**
 * Returns the category for a given item name.
 * Checks multi-word phrases first, then single-word keywords.
 */
export function getCategory(itemName: string): Category {
  const lower = itemName.toLowerCase().trim();

  // Try exact match first
  if (CATEGORY_MAP[lower]) return CATEGORY_MAP[lower];

  // Try multi-word prefix match (longest first)
  const entries = Object.entries(CATEGORY_MAP).sort(
    ([a], [b]) => b.length - a.length
  );
  for (const [key, cat] of entries) {
    if (lower.includes(key)) return cat;
  }

  return 'other';
}
