import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';
import clsx from 'clsx';

interface TopBarProps {
  lang: Lang;
  activeTab: string;
  onLanguageToggle: () => void;
  itemCount: number;
  onCartClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ lang, activeTab, onLanguageToggle, itemCount, onCartClick }) => {
  const isHindi = lang === 'hi-IN';

  // Page title based on active tab
  const pageTitle = () => {
    if (activeTab === 'search') return t(lang, 'search_title');
    if (activeTab === 'list') return t(lang, 'list_title');
    if (activeTab === 'settings') return t(lang, 'settings_title');
    if (activeTab === 'recs') return `✨ ${t(lang, 'nav_recs')}`;
    return 'Voice Cart';
  };

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shrink-0">
      {/* Left: logo + page title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-sm">
          <span className="text-white text-sm font-bold">V</span>
        </div>
        <span className="font-bold text-gray-800 text-base tracking-tight">
          {pageTitle()}
        </span>
      </div>

      {/* Right: language toggle + cart badge */}
      <div className="flex items-center gap-2">
        {/* Language toggle — the main toggle button */}
        <button
          id="language-toggle"
          onClick={onLanguageToggle}
          title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
          className="flex items-center gap-1 rounded-xl overflow-hidden border border-gray-200 text-xs font-bold transition-all duration-200 hover:shadow-sm"
          aria-label={isHindi ? 'Switch to English' : 'Switch to Hindi'}
        >
          <span
            className={clsx(
              'px-2.5 py-1.5 transition-all duration-300',
              !isHindi ? 'bg-emerald-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'
            )}
          >
            EN
          </span>
          <span
            className={clsx(
              'px-2.5 py-1.5 transition-all duration-300',
              isHindi ? 'bg-emerald-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'
            )}
          >
            हि
          </span>
        </button>

        {/* Cart badge — clickable to open drawer */}
        <button
          id="topbar-cart-btn"
          onClick={onCartClick}
          aria-label={`Open cart, ${itemCount} items`}
          className="relative active:scale-90 transition-transform duration-150"
        >
          <div className={clsx(
            'w-8 h-8 rounded-xl flex items-center justify-center transition-colors',
            itemCount > 0 ? 'bg-emerald-500 shadow-sm' : 'bg-gray-100'
          )}>
            <ShoppingCart className={clsx('w-4 h-4', itemCount > 0 ? 'text-white' : 'text-gray-400')} />
          </div>
          {itemCount > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">{itemCount > 9 ? '9+' : itemCount}</span>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};
