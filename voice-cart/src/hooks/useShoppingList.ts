import { useState, useCallback, useEffect } from 'react';
import type { ShoppingItem, Category } from '../types';
import { getCategory } from '../lib/categoryMap';

const STORAGE_KEY = 'voice-cart-items';
const PURCHASE_HISTORY_KEY = 'voice-cart-history';

// ─── Purchase history for "running low" feature ───────────────────────────────

interface PurchaseRecord {
  itemName: string;
  addedAt: number;
}

function loadHistory(): PurchaseRecord[] {
  try {
    return JSON.parse(localStorage.getItem(PURCHASE_HISTORY_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveHistory(records: PurchaseRecord[]) {
  localStorage.setItem(PURCHASE_HISTORY_KEY, JSON.stringify(records));
}

// ─── Shopping list persistence ────────────────────────────────────────────────

const BANNED_NOISE_ITEMS = new Set(['hi', 'hello', 'athuku', 'hey', 'test', 'testing', 'ok', 'okay', 'yes', 'no']);

function loadItems(): ShoppingItem[] {
  try {
    const parsed: ShoppingItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return parsed.filter(
      (item) => item && item.name && !BANNED_NOISE_ITEMS.has(item.name.toLowerCase().trim())
    );
  } catch {
    return [];
  }
}

function saveItems(items: ShoppingItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function generateId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Running-low logic (items added > 7 days ago in history) ─────────────────

const RUNNING_LOW_DAYS = 7;

export function getRunningLowSuggestions(currentItems: ShoppingItem[]): string[] {
  const history = loadHistory();
  const currentNames = new Set(currentItems.map((i) => i.name.toLowerCase()));
  const now = Date.now();
  const cutoff = RUNNING_LOW_DAYS * 24 * 60 * 60 * 1000;

  const seen = new Set<string>();
  return history
    .filter((record) => {
      const isOld = now - record.addedAt > cutoff;
      const notInCart = !currentNames.has(record.itemName.toLowerCase());
      const notSeen = !seen.has(record.itemName.toLowerCase());
      if (notSeen && isOld && notInCart) {
        seen.add(record.itemName.toLowerCase());
        return true;
      }
      return false;
    })
    .map((r) => r.itemName)
    .slice(0, 5);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseShoppingListReturn {
  items: ShoppingItem[];
  addItem: (name: string, quantity?: number, unit?: string, category?: Category) => ShoppingItem;
  removeItem: (id: string) => void;
  removeItemByName: (name: string) => boolean;
  toggleItem: (id: string) => void;
  clearList: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  itemCount: number;
  checkedCount: number;
  estimatedTotal: number;
  runningLowSuggestions: string[];
}

// Simple mock price map for estimated total (in INR ₹)
const MOCK_PRICES: Record<string, number> = {
  headphones: 14999, ipad: 44900, mouse: 2499, charger: 799, speaker: 4999,
  tshirt: 699, jeans: 2199, shoes: 3995, jacket: 2499, serum: 499,
  lipstick: 1250, toothbrush: 1499, argan: 799, yoga: 799, dumbbells: 2499,
  bottle: 699, book: 399, notebook: 599, lego: 2999, monopoly: 699,
  vacuum: 9999, plant: 499, pump: 1299, milk: 65, eggs: 85,
  bread: 90, butter: 180, cheese: 249, chicken: 299, beef: 399,
  salmon: 450, apples: 180, bananas: 50, oranges: 120, avocados: 180,
  spinach: 40, broccoli: 80, default: 199,
};

function estimatePrice(name: string): number {
  const lower = name.toLowerCase();
  for (const [key, price] of Object.entries(MOCK_PRICES)) {
    if (lower.includes(key)) return price;
  }
  return MOCK_PRICES.default;
}

export function useShoppingList(): UseShoppingListReturn {
  const [items, setItems] = useState<ShoppingItem[]>(loadItems);

  // Persist on every change
  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = useCallback(
    (name: string, quantity = 1, unit?: string, category?: Category): ShoppingItem => {
      const resolvedCategory = category ?? getCategory(name);

      // Check if item already exists (case-insensitive)
      const existing = items.find(
        (i) => i.name.toLowerCase() === name.toLowerCase()
      );

      if (existing) {
        // Increment quantity
        setItems((prev) =>
          prev.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        );
        return { ...existing, quantity: existing.quantity + quantity };
      }

      const newItem: ShoppingItem = {
        id: generateId(),
        name,
        quantity,
        unit,
        category: resolvedCategory,
        addedAt: Date.now(),
        checked: false,
      };

      setItems((prev) => [newItem, ...prev]);

      // Record in purchase history
      const history = loadHistory();
      saveHistory([{ itemName: name, addedAt: Date.now() }, ...history.slice(0, 99)]);

      return newItem;
    },
    [items]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const removeItemByName = useCallback(
    (name: string): boolean => {
      const lower = name.toLowerCase();
      const match = items.find((i) => i.name.toLowerCase().includes(lower));
      if (match) {
        setItems((prev) => prev.filter((i) => i.id !== match.id));
        return true;
      }
      return false;
    },
    [items]
  );

  const toggleItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  }, []);

  const clearList = useCallback(() => {
    setItems([]);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const checkedCount = items.filter((i) => i.checked).length;
  const estimatedTotal = items.reduce(
    (sum, i) => sum + estimatePrice(i.name) * i.quantity,
    0
  );

  const runningLowSuggestions = getRunningLowSuggestions(items);

  return {
    items,
    addItem,
    removeItem,
    removeItemByName,
    toggleItem,
    clearList,
    updateQuantity,
    itemCount,
    checkedCount,
    estimatedTotal,
    runningLowSuggestions,
  };
}
