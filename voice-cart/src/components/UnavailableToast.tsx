import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';

interface UnavailableToastProps {
  itemName: string;
  lang?: Lang;
  onDismiss: () => void;
}

export const UnavailableToast: React.FC<UnavailableToastProps> = ({
  itemName,
  lang = 'en-US',
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const isHindi = lang === 'hi-IN';

  return (
    <div
      className="fixed top-4 left-4 right-4 z-[9999] max-w-sm mx-auto bg-gradient-to-r from-red-600 to-rose-600 text-white p-4 rounded-2xl shadow-xl border border-red-400/40 flex items-center gap-3 animate-slide-down"
      role="alert"
    >
      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm leading-tight text-white">
          {t(lang, 'toast_unavailable_title')}
        </p>
        <p className="text-xs text-white/90 truncate mt-0.5">
          <span className="font-semibold underline">{itemName}</span>{' '}
          {isHindi ? 'वर्तमान में अनुपलब्ध या आउट ऑफ़ स्टॉक है।' : t(lang, 'toast_unavailable_sub')}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shrink-0"
        aria-label="Dismiss alert"
      >
        <X className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};
