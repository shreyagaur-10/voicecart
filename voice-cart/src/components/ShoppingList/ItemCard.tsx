import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import type { ShoppingItem } from '../../types';
import { CATEGORY_EMOJIS } from '../../types';
import clsx from 'clsx';

interface ItemCardProps {
  item: ShoppingItem;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
  isNew?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onRemove,
  onToggle,
  onQuantityChange,
  isNew = false,
}) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 py-3 px-4 bg-white rounded-2xl',
        'shadow-card hover:shadow-card-md transition-shadow duration-200',
        isNew && 'item-enter'
      )}
    >
      {/* Checkbox */}
      <button
        id={`toggle-item-${item.id}`}
        onClick={() => onToggle(item.id)}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
          'transition-all duration-200',
          item.checked
            ? 'bg-mint-500 border-mint-500'
            : 'border-gray-300 hover:border-mint-400'
        )}
        aria-label={item.checked ? 'Uncheck item' : 'Check item'}
      >
        {item.checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Category emoji */}
      <span className="text-base" aria-hidden="true">
        {CATEGORY_EMOJIS[item.category]}
      </span>

      {/* Item details */}
      <div className="flex-1 min-w-0">
        <p
          className={clsx(
            'font-semibold text-sm capitalize truncate',
            item.checked ? 'line-through text-gray-400' : 'text-charcoal-800'
          )}
        >
          {item.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          Qty: {item.quantity}
          {item.unit ? ` ${item.unit}` : ''}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1">
        <button
          id={`decrease-qty-${item.id}`}
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3 text-gray-600" />
        </button>
        <span className="text-xs font-semibold text-charcoal-800 w-5 text-center">
          {item.quantity}
        </span>
        <button
          id={`increase-qty-${item.id}`}
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3 text-gray-600" />
        </button>
      </div>

      {/* Remove */}
      <button
        id={`remove-item-${item.id}`}
        onClick={() => onRemove(item.id)}
        className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors group ml-1"
        aria-label={`Remove ${item.name}`}
      >
        <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-400 transition-colors" />
      </button>
    </div>
  );
};
