import React, { useState } from 'react';
import { Trash2, CheckCircle2, ClipboardList, ChevronRight } from 'lucide-react';
import type { ShoppingItem } from '../types';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';
import { ShoppingList } from '../components/ShoppingList/ShoppingList';

interface ListPageProps {
  lang: Lang;
  items: ShoppingItem[];
  itemCount: number;
  checkedCount: number;
  newItemId: string | null;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
  onClearList: () => void;
  onGoHome: () => void;
  onProceedToPayment: () => void;
}

export const ListPage: React.FC<ListPageProps> = ({
  lang,
  items,
  itemCount,
  checkedCount,
  newItemId,
  onRemove,
  onToggle,
  onQuantityChange,
  onClearList,
  onGoHome,
  onProceedToPayment,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const allDone = itemCount > 0 && checkedCount === itemCount;

  const handleClear = () => {
    if (showConfirm) {
      onClearList();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t(lang, 'list_title')}</h1>
          {itemCount > 0 && (
            <p className="text-sm text-gray-400 mt-0.5">
              {checkedCount} / {itemCount} {t(lang, 'list_items')}
            </p>
          )}
        </div>
        {items.length > 0 && (
          <button
            id="list-clear-btn"
            onClick={handleClear}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              showConfirm
                ? 'bg-red-500 text-white scale-105'
                : 'bg-red-50 text-red-500 hover:bg-red-100'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {showConfirm ? t(lang, 'settings_clear_confirm').split('?')[0] + '?' : t(lang, 'list_clear')}
          </button>
        )}
      </div>

      {/* All done banner */}
      {allDone && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
          <div>
            <p className="font-bold text-emerald-700">{t(lang, 'list_all_done')}</p>
            <p className="text-xs text-emerald-500">{t(lang, 'cart_all_checked')}</p>
          </div>
        </div>
      )}

      {/* Shopping list */}
      {items.length > 0 ? (
        <>
          <ShoppingList
            lang={lang}
            items={items}
            newItemId={newItemId}
            onRemove={onRemove}
            onToggle={onToggle}
            onQuantityChange={onQuantityChange}
          />
          <div className="mt-5 pt-1 pb-2">
            <button
              id="list-proceed-payment"
              onClick={onProceedToPayment}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all"
            >
              {t(lang, 'cart_proceed')} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-5">
            <ClipboardList className="w-10 h-10 text-gray-300" />
          </div>
          <p className="font-bold text-gray-800 text-lg mb-2">{t(lang, 'list_empty_title')}</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">{t(lang, 'list_empty_sub')}</p>
          <button
            id="list-go-home"
            onClick={onGoHome}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-md active:scale-95 transition-all"
          >
            {t(lang, 'nav_home')} →
          </button>
        </div>
      )}
    </div>
  );
};
