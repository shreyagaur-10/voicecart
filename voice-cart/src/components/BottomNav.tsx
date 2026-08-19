import React from 'react';
import { Home, Search, Sparkles, ShoppingBag, Settings } from 'lucide-react';
import type { NavTab } from '../types';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';
import clsx from 'clsx';

interface BottomNavProps {
  activeTab: NavTab;
  lang: Lang;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  lang,
  onTabChange,
}) => {
  const navItems = [
    { id: 'home' as NavTab,     label: t(lang, 'nav_home'),   icon: <Home className="w-5 h-5" /> },
    { id: 'search' as NavTab,   label: t(lang, 'nav_search'), icon: <Search className="w-5 h-5" /> },
    { id: 'recs' as NavTab,     label: t(lang, 'nav_recs'),   icon: <Sparkles className="w-5 h-5" /> },
    { id: 'list' as NavTab,     label: t(lang, 'nav_list'),   icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'settings' as NavTab, label: t(lang, 'nav_settings'), icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <nav
      className="bg-white/95 backdrop-blur-md border-t border-gray-100 safe-bottom z-30 shrink-0"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-1 pt-2 pb-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={clsx(
                'flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all duration-200 flex-1',
                isActive
                  ? 'text-emerald-600 font-semibold'
                  : 'text-gray-400 hover:text-gray-600'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={clsx(
                  'relative flex items-center justify-center transition-transform duration-200',
                  isActive && 'scale-110 text-emerald-600'
                )}
              >
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
                )}
              </div>
              <span className="text-[10px] leading-none tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
