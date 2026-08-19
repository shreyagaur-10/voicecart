import React from 'react';
import { ShoppingCart, TrendingUp } from 'lucide-react';

interface CartSummaryProps {
  itemCount: number;
  checkedCount: number;
  estimatedTotal: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  itemCount,
  checkedCount,
  estimatedTotal,
}) => {
  const progress = itemCount > 0 ? (checkedCount / itemCount) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">
            Current Cart
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-charcoal-800">{itemCount}</span>{' '}
            {itemCount === 1 ? 'item' : 'items'} total
          </p>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-charcoal-800 flex items-center justify-center shadow-mint">
          <ShoppingCart className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Progress bar */}
      {itemCount > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{checkedCount} checked</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-mint-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Estimated total */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Est. Total
          </p>
        </div>
        <p className="text-2xl font-bold text-charcoal-800">
          ${estimatedTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
