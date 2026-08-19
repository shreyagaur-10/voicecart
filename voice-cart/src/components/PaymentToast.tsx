import React, { useEffect } from 'react';
import { CreditCard, X, Sparkles, Lock, Truck, ShieldCheck } from 'lucide-react';
import type { Lang } from '../lib/i18n';

interface PaymentModalProps {
  estimatedTotal: number;
  lang: Lang;
  onDismiss: () => void;
}

export const PaymentToast: React.FC<PaymentModalProps> = ({
  estimatedTotal,
  lang,
  onDismiss,
}) => {
  const isHindi = lang === 'hi-IN';

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onDismiss]);

  const features = isHindi
    ? [
        { icon: <Lock className="w-4 h-4" />, text: '256-bit SSL एन्क्रिप्शन' },
        { icon: <Truck className="w-4 h-4" />, text: 'तेज़ डिलीवरी विकल्प' },
        { icon: <ShieldCheck className="w-4 h-4" />, text: '100% सुरक्षित भुगतान' },
      ]
    : [
        { icon: <Lock className="w-4 h-4" />, text: '256-bit SSL Encryption' },
        { icon: <Truck className="w-4 h-4" />, text: 'Fast Delivery Options' },
        { icon: <ShieldCheck className="w-4 h-4" />, text: '100% Secure Payments' },
      ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Payment coming soon"
        className="fixed inset-0 z-[9999] flex items-center justify-center px-5 pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-xs bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">

          {/* Gradient header */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 px-6 pt-8 pb-10 text-white text-center">
            {/* Close button */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CreditCard className="w-8 h-8 text-white" />
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                {isHindi ? 'जल्द आ रहा है' : 'Coming Soon'}
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-tight">
              {isHindi ? 'भुगतान\nजल्द आएगा!' : 'Payment\nComing Soon!'}
            </h2>
          </div>

          {/* Overlap card */}
          <div className="relative -mt-5 mx-4 bg-white rounded-2xl shadow-lg px-4 py-4 border border-gray-100">
            <p className="text-center text-xs text-gray-500 leading-relaxed">
              {isHindi
                ? 'हम आपके लिए एक शानदार चेकआउट अनुभव बना रहे हैं।'
                : "We're building a seamless checkout experience just for you."}
            </p>
            <div className="mt-3 pt-3 border-t border-gray-50 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">
                {isHindi ? 'आपकी कार्ट राशि' : 'Your Cart Total'}
              </p>
              <p className="text-2xl font-bold text-emerald-600">
                ₹{Math.round(estimatedTotal).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Feature list */}
          <div className="px-6 py-4">
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-600">{f.text}</span>
                  <span className="ml-auto text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {isHindi ? 'जल्द' : 'Soon'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom button */}
          <div className="px-6 pb-6">
            <button
              onClick={onDismiss}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md active:scale-95 transition-all duration-200 hover:shadow-lg"
            >
              {isHindi ? 'ठीक है, समझ गया! 👍' : 'Got it, thanks! 👍'}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-3">
              {isHindi
                ? 'आपकी कार्ट सुरक्षित रखी जाएगी'
                : 'Your cart will be saved for when we launch'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
