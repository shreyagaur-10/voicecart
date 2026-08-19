import type { Product } from '../types';
import type { Lang } from './i18n';

export const MOCK_PRODUCTS: Product[] = [
  // ── Electronics & Tech ──────────────────────────────────────────────────
  {
    id: 'e1',
    name: 'Wireless Noise-Canceling Headphones',
    nameHi: 'वायरलेस नॉइज़-कैंसलिंग हेडफ़ोन',
    brand: 'Sony WH-1000XM5',
    brandHi: 'सोनी WH-1000XM5',
    price: 14999,
    originalPrice: 17999,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['wireless', 'headphones', 'noise canceling', 'sony', 'audio', 'electronics', 'हेडफोन', 'वायरलेस', 'earphones', 'earphone', 'इयरफ़ोन', 'इयरफोन'],
  },
  {
    id: 'e2',
    name: 'Apple iPad Air 10.9" 64GB Wi-Fi',
    nameHi: 'ऐप्पल आईपैड एयर 10.9" 64GB वाई-फ़ाई',
    brand: 'Apple',
    brandHi: 'ऐप्पल',
    price: 44900,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['ipad', 'tablet', 'apple', 'ios', 'electronics', 'आईपैड', 'टैबलेट'],
  },
  {
    id: 'e3',
    name: 'Ergonomic Wireless Optical Mouse',
    nameHi: 'एर्गोनॉमिक वायरलेस ऑप्टिकल माउस',
    brand: 'Logitech MX Master 3S',
    brandHi: 'लॉजिitech MX मास्टर 3S',
    price: 2499,
    originalPrice: 2999,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['mouse', 'wireless', 'logitech', 'accessories', 'electronics', 'माउस'],
  },
  {
    id: 'e4',
    name: 'Fast Wireless Charging Pad 15W',
    nameHi: 'फ़ास्ट वायरलेस चार्जिंग पैड 15W',
    brand: 'Anker',
    brandHi: 'एंकर',
    price: 799,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1622445268465-843d61183141?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['charger', 'wireless', 'anker', 'iphone', 'android', 'electronics', 'चार्जिंग', 'चार्जर'],
  },
  {
    id: 'e5',
    name: 'Portable Bluetooth Speaker Waterproof',
    nameHi: 'पोर्टेबल ब्लूटूथ स्पीकर वाटरप्रूफ',
    brand: 'JBL Flip 6',
    brandHi: 'JBL फ़्लिप 6',
    price: 4999,
    originalPrice: 5999,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['speaker', 'bluetooth', 'waterproof', 'audio', 'jbl', 'electronics', 'स्पीकर', 'ब्लूटूथ'],
  },

  // ── Clothing & Fashion ─────────────────────────────────────────────────
  {
    id: 'c1',
    name: 'Classic Cotton Crewneck T-Shirt Pack (3-Pack)',
    nameHi: 'क्लासिक कॉटन टी-शर्ट (3 का पैक)',
    brand: 'Uniqlo',
    brandHi: 'यूनिकलो',
    price: 699,
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['shirt', 't-shirt', 'cotton', 'clothing', 'men', 'women', 'apparel', 'टी-शर्ट', 'कपड़े'],
  },
  {
    id: 'c2',
    name: 'Slim-Fit Stretch Denim Jeans',
    nameHi: 'स्लिम-फ़िट स्ट्रैच डेनिम जींस',
    brand: "Levi's 511",
    brandHi: 'लीवाइस 511',
    price: 2199,
    originalPrice: 2799,
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['jeans', 'denim', 'pants', 'levis', 'clothing', 'जींस', 'पैंट'],
  },
  {
    id: 'c3',
    name: 'Breathable Running Shoes Cushion Comfort',
    nameHi: 'सांस लेने योग्य रनिंग शूज़ कम्फर्ट',
    brand: 'Nike Air Zoom',
    brandHi: 'नाइकी एयर ज़ूम',
    price: 3995,
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['shoes', 'sneakers', 'nike', 'running', 'clothing', 'जूते', 'स्नीकर्स'],
  },
  {
    id: 'c4',
    name: 'Waterproof Hooded Rain Jacket',
    nameHi: 'वाटरप्रूफ हुडेड रेन जैकेट',
    brand: 'The North Face',
    brandHi: 'द नॉर्थ फेस',
    price: 2499,
    originalPrice: 2999,
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['jacket', 'waterproof', 'north face', 'coat', 'clothing', 'जैकेट', 'कोट'],
  },

  // ── Beauty & Personal Care ──────────────────────────────────────────────
  {
    id: 'b1',
    name: 'Hydrating Hyaluronic Acid Serum 30ml',
    nameHi: 'हाइड्रेटिंग हयालूरोनिक एसिड सीरम 30ml',
    brand: 'The Ordinary',
    brandHi: 'द ऑर्डिनरी',
    price: 499,
    category: 'beauty',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['skincare', 'serum', 'hyaluronic acid', 'beauty', 'सीरम', 'सौंदर्य'],
  },
  {
    id: 'b2',
    name: 'Matte Velvet Lipstick - Ruby Red',
    nameHi: 'मैट वेलवेट लिपस्टिक - रूबी रेड',
    brand: 'MAC Cosmetics',
    brandHi: 'मैक कॉस्मेटिक्स',
    price: 1250,
    category: 'beauty',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['lipstick', 'makeup', 'mac', 'beauty', 'लिपस्टिक', 'मेकअप'],
  },
  {
    id: 'b3',
    name: 'Electric Sonic Toothbrush Rechargeable',
    nameHi: 'इलेक्ट्रिक सोनिक टूथब्रश रीचार्ज करने योग्य',
    brand: 'Philips Sonicare',
    brandHi: 'फ़िलिप्स सोनिकेयर',
    price: 1499,
    originalPrice: 1999,
    category: 'personal-care',
    imageUrl: 'https://images.unsplash.com/photo-1559591937-e68fb3305e40?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['toothbrush', 'dental', 'personal-care', 'philips', 'टूथब्रश', 'ब्रश'],
  },
  {
    id: 'b4',
    name: 'Organic Argan Hair Repair Oil (100ml)',
    nameHi: 'ऑर्गेनिक आर्गन हेयर रिपेयर ऑयल (100ml)',
    brand: 'Moroccanoil',
    brandHi: 'मोरोक्कनऑयल',
    price: 799,
    category: 'beauty',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['hair oil', 'argan oil', 'beauty', 'hair care', 'तेल', 'हेयर ऑयल'],
  },

  // ── Sports & Fitness ────────────────────────────────────────────────────
  {
    id: 's1',
    name: 'Non-Slip Thick Yoga Mat with Strap',
    nameHi: 'नॉन-स्लिप थिक योग मैट पट्टा के साथ',
    brand: 'Liforme',
    brandHi: 'लाइफ़ॉर्म',
    price: 799,
    originalPrice: 999,
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['yoga', 'mat', 'fitness', 'sports', 'workout', 'योग मैट', 'फिटनेस'],
  },
  {
    id: 's2',
    name: 'Adjustable Dumbbell Set 5-52.5 lbs',
    nameHi: 'एडजस्टेबल डम्बल सेट',
    brand: 'Bowflex SelectTech',
    brandHi: 'बोफ़्लेक्स',
    price: 2499,
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['dumbbells', 'weights', 'gym', 'sports', 'workout', 'डम्बल', 'जिम'],
  },
  {
    id: 's3',
    name: 'Insulated Stainless Steel Water Bottle 32oz',
    nameHi: 'इंसुलेटेड स्टेनलेस स्टील पानी की बोतल',
    brand: 'Hydro Flask',
    brandHi: 'हाइड्रो फ़्लास्क',
    price: 699,
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['water bottle', 'hydro flask', 'sports', 'outdoors', 'बोतल', 'पानी बोतल'],
  },

  // ── Books & Media ───────────────────────────────────────────────────────
  {
    id: 'bk1',
    name: 'Atomic Habits by James Clear (Hardcover)',
    nameHi: 'एटॉमिक हैबिट्स - जेम्स क्लियर (हार्डकवर)',
    brand: 'Penguin Random House',
    brandHi: 'पेंगुइन रैंडम हाउस',
    price: 399,
    originalPrice: 499,
    category: 'books',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['book', 'atomic habits', 'self help', 'best seller', 'books', 'किताब', 'पुस्तक'],
  },
  {
    id: 'bk2',
    name: 'Hardcover Notebook Dot Grid A5',
    nameHi: 'हार्डकवर नोटबुक डॉट ग्रिड A5',
    brand: 'Moleskine',
    brandHi: 'मोलस्काइन',
    price: 599,
    category: 'books',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['notebook', 'moleskine', 'journal', 'books', 'office', 'नोटबुक', 'डायरी'],
  },

  // ── Toys & Games ────────────────────────────────────────────────────────
  {
    id: 't1',
    name: 'LEGO Star Wars Millennium Falcon 1351 Pcs',
    nameHi: 'लेगो स्टार वार्स मिलेनियम फाल्कन',
    brand: 'LEGO',
    brandHi: 'लेगो',
    price: 2999,
    category: 'toys',
    imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['lego', 'star wars', 'toys', 'building blocks', 'games', 'खिलौना', 'लेगो'],
  },
  {
    id: 't2',
    name: 'Classic Monopoly Board Game',
    nameHi: 'क्लासिक एकाधिकार (मोनोपॉली) बोर्ड गेम',
    brand: 'Hasbro Gaming',
    brandHi: 'हैसब्रो गेमिंग',
    price: 699,
    category: 'toys',
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['board game', 'monopoly', 'hasbro', 'toys', 'family', 'गेम', 'बोर्ड गेम'],
  },

  // ── Home, Garden & Automotive ──────────────────────────────────────────
  {
    id: 'h1',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    nameHi: 'डायसन V15 वैक्यूम क्लीनर',
    brand: 'Dyson',
    brandHi: 'डायसन',
    price: 9999,
    category: 'household',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['vacuum', 'dyson', 'cleaning', 'household', 'home', 'वैक्यूम क्लीनर', 'सफाई'],
  },
  {
    id: 'g1',
    name: 'Indoor Monstera Deliciosa Swiss Cheese Plant',
    nameHi: 'इनडोर मॉन्स्टेरा स्विस चीज़ पौधा',
    brand: 'Bloomscape',
    brandHi: 'ब्लूमस्केप',
    price: 499,
    category: 'garden',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['plant', 'monstera', 'indoor plant', 'garden', 'पौधा', 'पेड़'],
  },
  {
    id: 'a1',
    name: 'High-Tech Digital Car Tire Inflator Air Pump',
    nameHi: 'डिजिटल कार टायर हवा पंप',
    brand: 'AstroAI',
    brandHi: 'एस्ट्रोAI',
    price: 1299,
    category: 'automotive',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['car', 'tire pump', 'automotive', 'accessories', 'कार', 'पंप'],
  },

  // ── Food & Groceries (Everyday Essentials) ────────────────────────────
  {
    id: 'p1',
    name: 'Organic Hass Avocados (Bag of 4)',
    nameHi: 'ऑर्गेनिक एवोकाडो (4 का बैग)',
    brand: 'Whole Foods',
    brandHi: 'होल फूड्स',
    price: 180,
    originalPrice: 220,
    category: 'produce',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop',
    inStock: true,
    tags: ['organic', 'produce', 'avocado', 'fresh', 'एवोकाडो', 'फल'],
  },
  {
    id: 'p6',
    name: 'Oat Milk Original (64oz)',
    nameHi: 'ओट मिल्क ओरिजिनल (64oz)',
    brand: 'Oatly',
    brandHi: 'ओटली',
    price: 199,
    category: 'dairy',
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    inStock: true,
    tags: ['oat milk', 'dairy-free', 'vegan', 'beverages', 'दूध', 'ओट मिल्क'],
  },
  {
    id: 'p8',
    name: 'Free Range Large Eggs (1 Dozen)',
    nameHi: 'फ्री रेंज ताज़े अंडे (1 दर्जन)',
    brand: 'Vital Farms',
    brandHi: 'वाइटल फ़ार्म्स',
    price: 85,
    category: 'dairy',
    imageUrl: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=300&h=300&fit=crop',
    inStock: true,
    tags: ['eggs', 'free range', 'dairy', 'protein', 'अंडे', 'अंडा'],
  },
  {
    id: 'p9',
    name: 'Sourdough Bread Loaf',
    nameHi: 'साउरडॉ ताज़ा ब्रेड लोफ़',
    brand: 'Tartine Bakery',
    brandHi: 'टार्टिन बेकरी',
    price: 90,
    category: 'bakery',
    imageUrl: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=300&h=300&fit=crop',
    inStock: true,
    tags: ['bread', 'sourdough', 'bakery', 'fresh', 'ब्रेड', 'पाव'],
  },
  {
    id: 'p13',
    name: 'Fresh Atlantic Salmon Fillet (1 lb)',
    nameHi: 'ताज़ा अटलांटिक सामन (सैलमन) फ़िले',
    brand: 'Seafood Select',
    brandHi: 'सीफ़ूड सेलेक्ट',
    price: 450,
    originalPrice: 550,
    category: 'meat',
    imageUrl: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300&h=300&fit=crop',
    inStock: true,
    tags: ['salmon', 'seafood', 'fish', 'meat', 'protein', 'मछली', 'सैलमन'],
  },
  {
    id: 'off1',
    name: 'Gel Ink Pens Black 0.5mm Pack of 12',
    nameHi: 'जेल इंक पेन ब्लैक (12 का पैक)',
    brand: 'Pilot G2',
    brandHi: 'पायलट G2',
    price: 149,
    category: 'office',
    imageUrl: 'https://images.unsplash.com/photo-1585336261026-6757c54e3ed7?w=400&h=400&fit=crop',
    inStock: true,
    tags: ['pens', 'stationery', 'office', 'pilot', 'पेन', 'कलम'],
  },
  // ── Out of Stock / Unavailable Items ─────────────────────────────────────
  {
    id: 'oos1',
    name: 'PlayStation 5 Digital Edition Console',
    nameHi: 'प्लेस्टेशन 5 डिजिटल कंसोल',
    brand: 'Sony',
    brandHi: 'सोनी',
    price: 39990,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop',
    inStock: false,
    tags: ['ps5', 'playstation', 'console', 'gaming', 'electronics', 'प्लेस्टेशन'],
  },
  {
    id: 'oos2',
    name: 'Organic Whole Milk Gallon',
    nameHi: 'ऑर्गेनिक होल मिल्क गैलन',
    brand: 'Horizon Organic',
    brandHi: 'होराइजन ऑर्गेनिक',
    price: 120,
    category: 'dairy',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    inStock: false,
    tags: ['milk', 'organic', 'dairy', 'दूध'],
  },
];

/**
 * Get translated product name based on language selection.
 */
export function getProductName(product: Product, lang: Lang): string {
  if (lang === 'hi-IN' && product.nameHi) return product.nameHi;
  return product.name;
}

export function getTranslatedItemName(name: string, lang: Lang): string {
  const product = findProductByName(name);
  if (product) {
    return lang === 'hi-IN' && product.nameHi ? product.nameHi : product.name;
  }

  const mappings: Record<string, string> = {
    // English -> Hindi
    milk: 'दूध', eggs: 'अंडे', egg: 'अंडा', bread: 'ब्रेड', butter: 'मक्खन', cheese: 'चीज़',
    chicken: 'चिकन', beef: 'बीफ', salmon: 'सैलमन', apples: 'सेब', apple: 'सेब',
    bananas: 'केले', banana: 'केला', oranges: 'संतरे', orange: 'संतरा', avocados: 'एवोकाडो',
    spinach: 'पालक', broccoli: 'ब्रोकोली', potato: 'आलू', potatoes: 'आलू',
    tomato: 'टमाटर', tomatoes: 'टमाटर', onion: 'प्याज', onions: 'प्याज',
    garlic: 'लहसुन', carrot: 'गाजर', carrots: 'गाजर', water: 'पानी', juice: 'जूस',
    coffee: 'कॉफ़ी', tea: 'चाय', soda: 'सोडा', chips: 'चिप्स', popcorn: 'पॉपकॉर्न',
    chocolate: 'चॉकलेट', sugar: 'चीनी', salt: 'नमक', pasta: 'पास्ता', rice: 'चावल',
    shampoo: 'शैम्पू', soap: 'साबुन', toothpaste: 'टूथपेस्ट', toothbrush: 'टूथब्रश',
    headphones: 'हेडफोन', mouse: 'माउस', speaker: 'स्पीकर', charger: 'चार्जर',
    shirt: 'शर्ट', tshirt: 'टी-शर्ट', jeans: 'जींस', shoes: 'जूते', jacket: 'जैकेट',
    yoga: 'योग', book: 'किताब', books: 'किताबें', toy: 'खिलौना', toys: 'खिलौने',
    pen: 'पेन', pencil: 'पेंसिल', notebook: 'नोटबुक', plant: 'पौधा', car: 'कार',
    
    // Hindi -> English
    'दूध': 'Milk', 'अंडे': 'Eggs', 'अंडा': 'Egg', 'ब्रेड': 'Bread', 'मक्खन': 'Butter', 'चीज़': 'Cheese',
    'चिकन': 'Chicken', 'बीफ': 'Beef', 'सैलमन': 'Salmon', 'सेब': 'Apples',
    'केले': 'Bananas', 'केला': 'Banana', 'संतरे': 'Oranges', 'संतरा': 'Orange', 'एवोकाडो': 'Avocado',
    'पालक': 'Spinach', 'ब्रोकोली': 'Broccoli', 'आलू': 'Potato', 'टमाटर': 'Tomato', 'प्याज': 'Onion',
    'लहसुन': 'Garlic', 'गाजर': 'Carrot', 'पानी': 'Water', 'जूस': 'Juice',
    'कॉफ़ी': 'Coffee', 'चाय': 'Tea', 'सोडा': 'Soda', 'चिप्स': 'Chips', 'पॉपकॉर्न': 'Popcorn',
    'चॉकलेट': 'Chocolate', 'चीनी': 'Sugar', 'नमक': 'Salt', 'पास्ता': 'Pasta', 'चावल': 'Rice',
    'शैम्पू': 'Shampoo', 'साबुन': 'Soap', 'टूथपेस्ट': 'Toothpaste', 'टूथब्रश': 'Toothbrush',
    'हेडफोन': 'Headphones', 'माउस': 'Mouse', 'स्पीकर': 'Speaker', 'चार्जर': 'Charger',
    'शर्ट': 'Shirt', 'टी-शर्ट': 'T-shirt', 'जींस': 'Jeans', 'जूते': 'Shoes', 'जैकेट': 'Jacket',
    'योग': 'Yoga', 'किताब': 'Book', 'किताबें': 'Books', 'खिलौना': 'Toy', 'खिलौने': 'Toys',
    'पेन': 'Pen', 'पेंसिल': 'Pencil', 'नोटबुक': 'Notebook', 'पौधा': 'Plant', 'कार': 'Car'
  };

  const lower = name.toLowerCase().trim();
  if (lang === 'hi-IN') {
    return mappings[lower] ?? name;
  } else {
    const englishMatch = mappings[lower];
    if (englishMatch) return englishMatch;
    return name.replace(/\b\w/g, c => c.toUpperCase());
  }
}

export function getTranslatedUnit(unit: string | undefined, lang: Lang): string | undefined {
  if (!unit) return undefined;
  if (lang !== 'hi-IN') return unit;
  const lower = unit.toLowerCase().trim();
  const unitMappings: Record<string, string> = {
    'dozen': 'दर्जन',
    'pack': 'पैक',
    'lb': 'पाउंड',
    'lbs': 'पाउंड',
    'pcs': 'पीस',
    'kg': 'किलोग्राम',
    'g': 'ग्राम',
    'litre': 'लीटर',
    'litres': 'लीटर',
    'pack of 12': '12 का पैक',
    'pack of 3': '3 का पैक',
    'bag of 4': '4 का बैग',
  };
  return unitMappings[lower] ?? unit;
}

/**
 * Get translated brand name based on language selection.
 */
export function getProductBrand(product: Product, lang: Lang): string {
  if (lang === 'hi-IN' && product.brandHi) return product.brandHi;
  return product.brand;
}

/**
 * Search products by query string and optional price filter.
 * Supports searching in English AND Hindi.
 */
export function searchProducts(
  query: string,
  maxPrice?: number,
  filters: string[] = []
): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  return MOCK_PRODUCTS.filter((product) => {
    // Price filter
    if (maxPrice !== undefined && product.price > maxPrice) return false;

    // Organic / filter keywords
    for (const f of filters) {
      if (!product.tags.includes(f) && !product.name.toLowerCase().includes(f) && !(product.nameHi && product.nameHi.toLowerCase().includes(f))) {
        return false;
      }
    }

    // Text match across name, nameHi, brand, brandHi, category, tags
    const searchable = [
      product.name.toLowerCase(),
      product.nameHi ? product.nameHi.toLowerCase() : '',
      product.brand.toLowerCase(),
      product.brandHi ? product.brandHi.toLowerCase() : '',
      product.category.toLowerCase(),
      ...product.tags,
    ].join(' ');

    return terms.some((term) => searchable.includes(term));
  });
}

/**
 * Find exact or fuzzy product by item name (English or Hindi).
 */
export function findProductByName(name: string): Product | undefined {
  const lower = name.toLowerCase().trim();
  return MOCK_PRODUCTS.find(
    (p) =>
      p.name.toLowerCase() === lower ||
      p.name.toLowerCase().includes(lower) ||
      lower.includes(p.name.toLowerCase()) ||
      (p.nameHi && (p.nameHi.toLowerCase() === lower || p.nameHi.toLowerCase().includes(lower) || lower.includes(p.nameHi.toLowerCase())))
  );
}

/**
 * Check if a product is available in stock.
 */
export function checkProductAvailability(name: string): { available: boolean; product?: Product } {
  const product = findProductByName(name);
  if (product && !product.inStock) {
    return { available: false, product };
  }
  return { available: true, product };
}
