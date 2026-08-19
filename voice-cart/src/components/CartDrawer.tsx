import React, { useEffect, useCallback } from 'react';
import {
  X, ShoppingCart, Trash2, Plus, Minus, TrendingUp,
  CheckCircle2, ShoppingBag, ChevronRight
} from 'lucide-react';
import type { ShoppingItem } from '../types';
import { CATEGORY_EMOJIS, CATEGORY_LABELS } from '../types';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';
import clsx from 'clsx';

interface CartDrawerProps {
  isOpen: boolean;
  items: ShoppingItem[];
  itemCount: number;
  checkedCount: number;
  estimatedTotal: number;
  lang: Lang;
  onClose: () => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
  onClearAll: () => void;
  onGoToList: () => void;
  onProceedToPayment: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  itemCount,
  checkedCount,
  estimatedTotal,
  lang,
  onClose,
  onRemove,
  onToggle,
  onQuantityChange,
  onClearAll,
  onGoToList,
  onProceedToPayment,
}) => {
  const progress = itemCount > 0 ? (checkedCount / items.length) * 100 : 0;

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Group items by category
  const groupedItems = React.useMemo(() => {
    const groups: Partial<Record<string, ShoppingItem[]>> = {};
    for (const item of items) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category]!.push(item);
    }
    return groups;
  }, [items]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel — slides up from bottom */}
      <div
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50 max-w-sm mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ maxHeight: '85dvh' }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 shrink-0 border-b border-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
              <ShoppingCart className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-base leading-tight">{t(lang, 'cart_title')}</p>
              <p className="text-xs text-gray-400">
                {items.length} {items.length === 1 ? t(lang, 'home_item') : t(lang, 'home_items')}
              </p>
            </div>
          </div>
          <button
            id="cart-drawer-close"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12 px-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-emerald-300" />
            </div>
            <p className="font-bold text-gray-700 text-lg mb-1">{t(lang, 'cart_empty')}</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t(lang, 'cart_empty_sub')}
            </p>
          </div>
        ) : (
          <>
            {/* Progress + total header */}
            <div className="px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 shrink-0 border-b border-emerald-100/60">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{t(lang, 'cart_est_total')}</span>
                </div>
                <span className="text-xl font-bold text-gray-800">
                  ₹{Math.round(estimatedTotal).toLocaleString('en-IN')}
                </span>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {checkedCount}/{items.length} {t(lang, 'cart_done')}
                </span>
              </div>
            </div>

            {/* Scrollable item list */}
            <div className="flex-1 overflow-y-auto px-5 py-3" id="cart-items-list">
              {Object.entries(groupedItems).map(([category, catItems]) => (
                <div key={category} className="mb-4">
                  {/* Category header */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-sm">{CATEGORY_EMOJIS[category as keyof typeof CATEGORY_EMOJIS]}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {catItems!.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onToggle={onToggle}
                        onRemove={onRemove}
                        onQuantityChange={onQuantityChange}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer actions */}
            <div className="px-5 py-4 border-t border-gray-100 shrink-0 flex flex-col gap-2">
              {checkedCount === items.length && items.length > 0 && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <p className="text-sm font-semibold text-emerald-700">{t(lang, 'cart_all_checked')}</p>
                </div>
              )}
              <button
                id="cart-proceed-to-payment"
                onClick={() => { onProceedToPayment(); onClose(); }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all mb-1"
              >
                {t(lang, 'cart_proceed')} <ChevronRight className="w-4 h-4" />
              </button>
              <button
                id="cart-view-full-list"
                onClick={() => { onGoToList(); onClose(); }}
                className="w-full py-2.5 rounded-2xl bg-gray-50 border border-gray-150 text-gray-700 font-semibold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                {t(lang, 'cart_view_list')}
              </button>
              <button
                id="cart-clear-all"
                onClick={onClearAll}
                className="w-full py-2.5 rounded-2xl bg-red-50 text-red-500 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> {t(lang, 'cart_clear_all')}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

// ─── Cart Item Row ─────────────────────────────────────────────────────────────

interface CartItemProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onToggle, onRemove, onQuantityChange }) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 bg-gray-50 rounded-2xl px-3 py-2.5 transition-all duration-200',
        item.checked && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        aria-label={item.checked ? 'Uncheck item' : 'Check item'}
        className="shrink-0"
      >
        <div
          className={clsx(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            item.checked
              ? 'bg-emerald-500 border-emerald-500'
              : 'border-gray-300 bg-white'
          )}
        >
          {item.checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </button>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p
          className={clsx(
            'text-sm font-semibold text-gray-800 leading-snug truncate',
            item.checked && 'line-through text-gray-400'
          )}
        >
          {item.name}
        </p>
        {item.unit && (
          <p className="text-xs text-gray-400">{item.unit}</p>
        )}
      </div>

      {/* Quantity stepper */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-all"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3 text-gray-500" />
        </button>
        <span className="w-5 text-center text-sm font-bold text-gray-700">
          {item.quantity}
        </span>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3 text-white" />
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="shrink-0 w-7 h-7 rounded-xl bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors ml-1"
        aria-label={`Remove ${item.name}`}
      >
        <X className="w-3.5 h-3.5 text-red-400" />
      </button>
    </div>
  );
};
