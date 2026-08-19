import React from 'react';
import { Globe, Trash2, Info, ChevronRight, Moon, User, LogOut, LogIn } from 'lucide-react';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';
import clsx from 'clsx';

interface SettingsPageProps {
  lang: Lang;
  onLanguageToggle: () => void;
  onClearList: () => void;
  userEmail: string | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  lang,
  onLanguageToggle,
  onClearList,
  userEmail,
  onLogout,
  onLoginClick,
}) => {
  const isHindi = lang === 'hi-IN';

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-800">{t(lang, 'settings_title')}</h1>

      {/* ── Profile section ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {isHindi ? 'प्रोफ़ाइल' : 'Account & Profile'}
          </p>
        </div>

        {userEmail ? (
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{isHindi ? 'लॉग इन किया हुआ उपयोगकर्ता' : 'Logged In User'}</p>
                <p className="text-xs text-gray-400 mt-0.5">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isHindi ? 'लॉग आउट' : 'Log Out'}</span>
            </button>
          </div>
        ) : (
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{isHindi ? 'अतिथि (लॉगिन नहीं है)' : 'Guest (Not Logged In)'}</p>
                <p className="text-xs text-gray-400 mt-0.5">{isHindi ? 'स्मार्ट सुविधाओं के लिए लॉगिन करें' : 'Login to sync data & enable full features'}</p>
              </div>
            </div>
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl text-xs font-bold transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isHindi ? 'लॉग इन करें' : 'Log In'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Language section ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {t(lang, 'settings_voice_input')}
          </p>
        </div>

        <button
          id="settings-language-toggle"
          onClick={onLanguageToggle}
          className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
            <Globe className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm text-gray-800">{t(lang, 'settings_language')}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {t(lang, 'settings_language_current')}: {t(lang, 'settings_language_name')}
            </p>
          </div>
          {/* Toggle pill */}
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                'flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300',
                !isHindi
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-400'
              )}
            >
              EN
            </div>
            <div
              className={clsx(
                'flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300',
                isHindi
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-400'
              )}
            >
              हि
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      {/* ── Appearance ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {t(lang, 'settings_theme')}
          </p>
        </div>
        <div className="flex items-center gap-4 px-4 py-4 opacity-50">
          <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Moon className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm text-gray-800">{t(lang, 'settings_theme')}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t(lang, 'settings_theme_sub')}</p>
          </div>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Soon</span>
        </div>
      </div>

      {/* ── Data ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {t(lang, 'settings_data')}
          </p>
        </div>
        <button
          id="settings-clear-list"
          onClick={() => {
            if (confirm(t(lang, 'settings_clear_confirm'))) {
              onClearList();
            }
          }}
          className="w-full flex items-center gap-4 px-4 py-4 hover:bg-red-50 active:bg-red-100 transition-colors group"
        >
          <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm text-red-500">{t(lang, 'settings_clear_list')}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t(lang, 'settings_clear_list_sub')}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-300 transition-colors" />
        </button>
      </div>

      {/* ── About ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          <p className="font-bold text-sm text-gray-800">{t(lang, 'settings_about')}</p>
        </div>
        <div className="space-y-2.5 text-xs text-gray-500 leading-relaxed pl-[52px]">
          <p>{t(lang, 'settings_about_speech')}</p>
          <p>{t(lang, 'settings_about_nlp')}</p>
          <p>{t(lang, 'settings_about_storage')}</p>
          <p>{t(lang, 'settings_about_lang')}</p>
          <p className="text-emerald-500 font-semibold mt-3">{t(lang, 'settings_version')}</p>
        </div>
      </div>
    </div>
  );
};
