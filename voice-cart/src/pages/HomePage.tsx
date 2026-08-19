import React from 'react';
import { ShoppingCart, TrendingUp, Mic2 } from 'lucide-react';
import type { ShoppingItem } from '../types';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';
import { ShoppingList } from '../components/ShoppingList/ShoppingList';
import { SuggestionPanel } from '../components/SuggestionPanel/SuggestionPanel';

interface HomePageProps {
  lang: Lang;
  items: ShoppingItem[];
  itemCount: number;
  checkedCount: number;
  estimatedTotal: number;
  newItemId: string | null;
  lastAddedItem?: string;
  runningLowSuggestions: string[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
  onSuggestionAdd: (name: string) => void;
  onMicPress: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  items,
  itemCount,
  checkedCount,
  estimatedTotal,
  newItemId,
  lastAddedItem,
  runningLowSuggestions,
  onRemove,
  onToggle,
  onQuantityChange,
  onSuggestionAdd,
  onMicPress,
}) => {
  const progress = itemCount > 0 ? (checkedCount / itemCount) * 100 : 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Hero greeting */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white shadow-lg">
        <p className="text-2xl font-bold leading-tight">{t(lang, 'home_greeting')}</p>
        <p className="text-sm opacity-80 mt-0.5">{t(lang, 'home_subtitle')}</p>

        {/* Mic CTA */}
        <button
          id="home-mic-cta"
          onClick={onMicPress}
          className="mt-4 flex items-center gap-2.5 bg-white/20 hover:bg-white/30 active:scale-95 transition-all duration-200 backdrop-blur-sm rounded-2xl px-4 py-2.5"
        >
          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Mic2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-sm font-semibold">{t(lang, 'home_tap_mic')}</span>
        </button>
      </div>

      {/* Cart summary — only when items exist */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                {t(lang, 'home_cart_title')}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">{itemCount}</span>{' '}
                {itemCount === 1 ? t(lang, 'home_item') : t(lang, 'home_items')}
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gray-800 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>{checkedCount} {t(lang, 'home_checked')}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Estimated total */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                {t(lang, 'home_est_total')}
              </p>
            </div>
            <p className="text-xl font-bold text-gray-800">
              ₹{Math.round(estimatedTotal).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      )}

      {/* Suggestion panel */}
      <SuggestionPanel
        lang={lang}
        lastAddedItem={lastAddedItem}
        runningLowItems={runningLowSuggestions}
        onAddItem={onSuggestionAdd}
      />

      {/* Shopping list or empty state */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="font-bold text-gray-800 text-lg mb-2">{t(lang, 'home_empty_title')}</p>
          <p className="text-sm text-gray-400 leading-relaxed">{t(lang, 'home_empty_sub')}</p>
        </div>
      ) : (
        <ShoppingList
          lang={lang}
          items={items}
          newItemId={newItemId}
          onRemove={onRemove}
          onToggle={onToggle}
          onQuantityChange={onQuantityChange}
        />
      )}
    </div>
  );
};
