// ─── Category Types ───────────────────────────────────────────────────────────

export type Category =
  | 'produce'
  | 'dairy'
  | 'meat'
  | 'bakery'
  | 'frozen'
  | 'beverages'
  | 'snacks'
  | 'household'
  | 'personal-care'
  | 'electronics'
  | 'clothing'
  | 'sports'
  | 'beauty'
  | 'books'
  | 'toys'
  | 'office'
  | 'garden'
  | 'automotive'
  | 'other';

export const CATEGORY_LABELS: Record<Category, string> = {
  produce:       'Produce',
  dairy:         'Dairy & Eggs',
  meat:          'Meat & Seafood',
  bakery:        'Bakery',
  frozen:        'Frozen',
  beverages:     'Beverages',
  snacks:        'Snacks & Pantry',
  household:     'Household',
  'personal-care': 'Personal Care',
  electronics:   'Electronics',
  clothing:      'Clothing & Fashion',
  sports:        'Sports & Outdoors',
  beauty:        'Beauty & Makeup',
  books:         'Books & Media',
  toys:          'Toys & Games',
  office:        'Office & Stationery',
  garden:        'Garden & Plants',
  automotive:    'Automotive',
  other:         'Other',
};

export const CATEGORY_EMOJIS: Record<Category, string> = {
  produce:       '🥦',
  dairy:         '🥛',
  meat:          '🥩',
  bakery:        '🍞',
  frozen:        '🧊',
  beverages:     '🧃',
  snacks:        '🍿',
  household:     '🧹',
  'personal-care': '🧴',
  electronics:   '📱',
  clothing:      '👕',
  sports:        '⚽',
  beauty:        '💄',
  books:         '📚',
  toys:          '🧸',
  office:        '📎',
  garden:        '🌱',
  automotive:    '🚗',
  other:         '🛒',
};

// ─── Shopping Item ─────────────────────────────────────────────────────────────

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  category: Category;
  addedAt: number; // timestamp ms
  checked: boolean;
}

// ─── Parsed Intent ─────────────────────────────────────────────────────────────

export type ParsedIntent =
  | {
      action: 'add';
      item: string;
      quantity: number;
      unit?: string;
      category: Category;
    }
  | {
      action: 'unavailable';
      item: string;
    }
  | {
      action: 'remove';
      item: string;
    }
  | {
      action: 'search';
      query: string;
      maxPrice?: number;
      filters: string[];
    }
  | {
      action: 'clear';
    }
  | {
      action: 'unknown';
      transcript: string;
    };

// ─── Voice State ───────────────────────────────────────────────────────────────

export type VoiceState =
  | 'idle'
  | 'requesting-permission'
  | 'listening'
  | 'processing'
  | 'success'
  | 'error';

export type VoiceError =
  | 'permission-denied'
  | 'not-supported'
  | 'no-speech'
  | 'aborted'
  | 'network'
  | 'unknown';

// ─── Product (Mock Catalog) ────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  nameHi?: string;
  brand: string;
  brandHi?: string;
  price: number;
  originalPrice?: number;
  category: Category;
  imageUrl: string;
  inStock: boolean;
  tags: string[];
}

// ─── App Navigation ────────────────────────────────────────────────────────────

export type NavTab = 'home' | 'search' | 'recs' | 'list' | 'settings';

// ─── Action Confirmation ───────────────────────────────────────────────────────

export interface ActionConfirmation {
  transcript: string;
  intent: ParsedIntent;
  itemName?: string;
  timestamp: number;
}
