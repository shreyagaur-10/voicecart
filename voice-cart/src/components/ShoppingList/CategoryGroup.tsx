import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ShoppingItem, Category } from '../../types';
import { CATEGORY_LABELS, CATEGORY_EMOJIS } from '../../types';
import { ItemCard } from './ItemCard';

interface CategoryGroupProps {
  category: Category;
  items: ShoppingItem[];
  newItemId: string | null;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

export const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  items,
  newItemId,
  onRemove,
  onToggle,
  onQuantityChange,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="mb-4 animate-fade-in">
      {/* Category header */}
      <button
        id={`category-header-${category}`}
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-between w-full mb-2 px-1 group"
        aria-expanded={!collapsed}
      >
        <div className="flex items-center gap-2">
          {/* Icon pill */}
          <div className="w-7 h-7 rounded-full bg-mint-100 flex items-center justify-center">
            <span className="text-sm">{CATEGORY_EMOJIS[category]}</span>
          </div>
          <span className="font-bold text-sm text-charcoal-800">
            {CATEGORY_LABELS[category]}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
          {collapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Items */}
      {!collapsed && (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onRemove={onRemove}
              onToggle={onToggle}
              onQuantityChange={onQuantityChange}
              isNew={item.id === newItemId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
