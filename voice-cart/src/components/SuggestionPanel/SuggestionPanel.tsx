import React from 'react';
import { Lightbulb, RefreshCw, Leaf } from 'lucide-react';
import { SuggestionChip } from './SuggestionChip';
import { getCurrentSeasonalSuggestions } from '../../lib/seasonalSuggestions';
import { getSubstitutions } from '../../lib/substitutions';
import { CATEGORY_EMOJIS } from '../../types';
import { getCategory } from '../../lib/categoryMap';
import type { Lang } from '../../lib/i18n';
import { t } from '../../lib/i18n';

interface SuggestionPanelProps {
  lang?: Lang;
  lastAddedItem?: string;
  runningLowItems: string[];
  onAddItem: (name: string) => void;
}

const QUICK_ADD_DEFAULTS = [
  { label: 'Wireless Headphones', labelHi: 'वायरलेस हेडफ़ोन', emoji: '🎧' },
  { label: 'Organic Avocados', labelHi: 'ऑर्गेनिक एवोकाडो', emoji: '🥑' },
  { label: 'Cotton Crewneck T-Shirt', labelHi: 'कॉटन टी-शर्ट', emoji: '👕' },
  { label: 'Yoga Mat', labelHi: 'योग मैट', emoji: '🧘' },
  { label: 'Hyaluronic Acid Serum', labelHi: 'हयालूरोनिक एसिड सीरम', emoji: '🧴' },
  { label: 'Atomic Habits Book', labelHi: 'एटॉमिक हैबिट्स किताब', emoji: '📚' },
  { label: 'Almond Milk', labelHi: 'बादाम का दूध', emoji: '🥛' },
  { label: 'LEGO Millennium Falcon', labelHi: 'लेगो मिलेनियम फाल्कन', emoji: '🧸' },
];

function getEmojiForItem(name: string): string {
  const cat = getCategory(name);
  return CATEGORY_EMOJIS[cat];
}

export const SuggestionPanel: React.FC<SuggestionPanelProps> = ({
  lang = 'en-US',
  lastAddedItem,
  runningLowItems,
  onAddItem,
}) => {
  const { month, items: seasonalItems } = getCurrentSeasonalSuggestions(lang);
  const substitutes = lastAddedItem ? getSubstitutions(lastAddedItem, lang) : [];

  return (
    <div className="space-y-4">
      {/* Substitutions — shown when an item was just added */}
      {substitutes.length > 0 && lastAddedItem && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
            <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">
              {t(lang, 'home_alt_for')} {lastAddedItem}
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {substitutes.slice(0, 4).map((sub) => (
              <SuggestionChip
                key={sub}
                label={sub}
                emoji={getEmojiForItem(sub)}
                variant="substitute"
                onAdd={onAddItem}
              />
            ))}
          </div>
        </section>
      )}

      {/* Running low */}
      {runningLowItems.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-orange-500" />
            <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">
              {t(lang, 'home_running_low')}
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {runningLowItems.map((item) => (
              <SuggestionChip
                key={item}
                label={item}
                emoji={getEmojiForItem(item)}
                variant="running-low"
                onAdd={onAddItem}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick Add */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">
            {t(lang, 'home_quick_add')}
          </p>
          <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest">
            {t(lang, 'home_suggested')}
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {QUICK_ADD_DEFAULTS.map((item) => {
            const itemLabel = lang === 'hi-IN' ? item.labelHi : item.label;
            return (
              <SuggestionChip
                key={itemLabel}
                label={itemLabel}
                emoji={item.emoji}
                variant="default"
                onAdd={onAddItem}
              />
            );
          })}
        </div>
      </section>

      {/* Seasonal */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-3.5 h-3.5 text-amber-500" />
          <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">
            {t(lang, 'home_seasonal')} — {month}
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {seasonalItems.map((item) => (
            <SuggestionChip
              key={item}
              label={item}
              emoji={getEmojiForItem(item)}
              variant="seasonal"
              onAdd={onAddItem}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
