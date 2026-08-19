import React from 'react';
import { Globe, Trash2, Info, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface SettingsViewProps {
  language: string;
  onLanguageToggle: () => void;
  onClearList: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onLanguageToggle,
  onClearList,
}) => {
  const isHindi = language === 'hi-IN';

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-charcoal-800">Settings</h1>

      {/* Language */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Voice Input
          </p>
        </div>
        <button
          id="settings-language-toggle"
          onClick={onLanguageToggle}
          className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-mint-100 flex items-center justify-center">
            <Globe className="w-4 h-4 text-mint-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm text-charcoal-800">Language</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Current: {isHindi ? 'हिंदी (Hindi)' : 'English'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={clsx(
              'px-2.5 py-1 rounded-full text-xs font-semibold',
              isHindi ? 'bg-mint-100 text-mint-700' : 'bg-gray-100 text-gray-600'
            )}>
              {isHindi ? 'हिंदी' : 'EN'}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </button>
      </div>

      {/* Data */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Data
          </p>
        </div>
        <button
          id="settings-clear-list"
          onClick={() => {
            if (confirm('Clear your entire shopping list? This cannot be undone.')) {
              onClearList();
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-4 hover:bg-red-50 transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
            <Trash2 className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm text-red-500">Clear Shopping List</p>
            <p className="text-xs text-gray-400 mt-0.5">Remove all items from your cart</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <Info className="w-4 h-4 text-blue-500" />
          </div>
          <p className="font-semibold text-sm text-charcoal-800">About Voice Cart</p>
        </div>
        <div className="space-y-2 text-xs text-gray-500 leading-relaxed pl-12">
          <p>🎙️ Powered by Web Speech API — works offline in Chrome/Edge</p>
          <p>🧠 Rule-based NLP parser — zero external dependencies</p>
          <p>💾 Data stored locally in your browser (localStorage)</p>
          <p>🌍 Supports English & Hindi voice input</p>
          <p className="text-mint-500 font-medium mt-2">v1.0.0 · Voice Cart</p>
        </div>
      </div>
    </div>
  );
};
