import React from 'react';
import { CreditCard, ArrowLeft, Sparkles } from 'lucide-react';
import type { Lang } from '../lib/i18n';

interface PaymentPageProps {
  lang: Lang;
  estimatedTotal: number;
  itemCount: number;
  onBack: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  lang,
  estimatedTotal,
  itemCount,
  onBack,
}) => {
  const isHindi = lang === 'hi-IN';

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] text-gray-800">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-600 hover:text-gray-800"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-gray-800 text-base tracking-tight">
          {isHindi ? 'भुगतान करें' : 'Payment'}
        </span>
        <div className="w-8" />
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Animated Card Icon Container */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center shadow-sm border border-emerald-100/60 animate-pulse">
            <CreditCard className="w-10 h-10 text-emerald-500" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-md animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-850 tracking-tight mb-2">
          {isHindi ? 'भुगतान सुविधा जल्द आ रही है!' : 'Payment Coming Soon'}
        </h1>
        
        {/* Description */}
        <p className="text-sm text-gray-500 max-w-[280px] leading-relaxed mb-8">
          {isHindi 
            ? 'हम इस सुविधा पर काम कर रहे हैं। जल्द ही आप अपनी वॉयस कार्ट वस्तुओं के लिए सुरक्षित रूप से भुगतान कर सकेंगे।' 
            : 'We are working on this feature! Soon you will be able to securely pay for your shopping cart items.'}
        </p>

        {/* Order Summary Card */}
        <div className="w-full max-w-[280px] bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-8 text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            {isHindi ? 'ऑर्डर का विवरण' : 'Order Summary'}
          </p>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-500">
              {isHindi ? 'कुल वस्तुएं' : 'Total Items'}
            </span>
            <span className="font-semibold text-gray-800">
              {itemCount} {itemCount === 1 ? (isHindi ? 'वस्तु' : 'item') : (isHindi ? 'वस्तुएं' : 'items')}
            </span>
          </div>
          <div className="h-px bg-gray-50 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-800">
              {isHindi ? 'अनुमानित कुल' : 'Estimated Total'}
            </span>
            <span className="text-lg font-extrabold text-emerald-600">
              ₹{Math.round(estimatedTotal).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={onBack}
          className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md active:scale-95 transition-all w-full max-w-[280px]"
        >
          {isHindi ? 'खरीदारी जारी रखें' : 'Continue Shopping'}
        </button>
      </div>
    </div>
  );
};
