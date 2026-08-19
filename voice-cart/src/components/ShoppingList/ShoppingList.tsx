import React, { useMemo } from 'react';
import type { ShoppingItem, Category } from '../../types';
import type { Lang } from '../../lib/i18n';
import { CategoryGroup } from './CategoryGroup';

interface ShoppingListProps {
  lang?: Lang;
  items: ShoppingItem[];
  newItemId: string | null;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

// Preferred display order — categories not in this list appear after
const PREFERRED_ORDER: Category[] = [
  'electronics',
  'clothing',
  'sports',
  'beauty',
  'books',
  'toys',
  'office',
  'produce',
  'dairy',
  'meat',
  'bakery',
  'frozen',
  'beverages',
  'snacks',
  'household',
  'personal-care',
  'garden',
  'automotive',
  'other',
];

export const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  newItemId,
  onRemove,
  onToggle,
  onQuantityChange,
}) => {
  const groupedItems = useMemo(() => {
    const groups: Partial<Record<Category, ShoppingItem[]>> = {};
    for (const item of items) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category]!.push(item);
    }
    return groups;
  }, [items]);

  // Build ordered list: preferred first, then any remaining categories
  const orderedCategories = useMemo(() => {
    const presentCategories = new Set(Object.keys(groupedItems) as Category[]);
    const ordered: Category[] = [];
    for (const cat of PREFERRED_ORDER) {
      if (presentCategories.has(cat)) ordered.push(cat);
    }
    // Append any categories not in PREFERRED_ORDER
    for (const cat of presentCategories) {
      if (!ordered.includes(cat)) ordered.push(cat);
    }
    return ordered;
  }, [groupedItems]);

  return (
    <div id="shopping-list" className="flex flex-col">
      {orderedCategories.map((category) => {
        const categoryItems = groupedItems[category] ?? [];
        return (
          <CategoryGroup
            key={category}
            category={category}
            items={categoryItems}
            newItemId={newItemId}
            onRemove={onRemove}
            onToggle={onToggle}
            onQuantityChange={onQuantityChange}
          />
        );
      })}
    </div>
  );
};
