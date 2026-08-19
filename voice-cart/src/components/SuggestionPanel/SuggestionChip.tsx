import React from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

interface SuggestionChipProps {
  label: string;
  emoji?: string;
  variant?: 'default' | 'substitute' | 'seasonal' | 'running-low';
  onAdd: (label: string) => void;
}

const VARIANT_STYLES = {
  default: 'bg-white border border-gray-200 text-charcoal-800',
  substitute: 'bg-mint-50 border border-mint-200 text-mint-800',
  seasonal: 'bg-amber-50 border border-amber-200 text-amber-800',
  'running-low': 'bg-orange-50 border border-orange-200 text-orange-800',
};

export const SuggestionChip: React.FC<SuggestionChipProps> = ({
  label,
  emoji,
  variant = 'default',
  onAdd,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-2 p-3 rounded-2xl shrink-0',
        'shadow-card hover:shadow-card-md transition-all duration-200 cursor-pointer',
        'active:scale-95 w-24',
        VARIANT_STYLES[variant]
      )}
      onClick={() => onAdd(label)}
      role="button"
      tabIndex={0}
      id={`suggestion-${label.toLowerCase().replace(/\s+/g, '-')}`}
      aria-label={`Add ${label}`}
      onKeyDown={(e) => e.key === 'Enter' && onAdd(label)}
    >
      {/* Icon circle */}
      <div className={clsx(
        'w-10 h-10 rounded-full flex items-center justify-center text-xl',
        variant === 'default' ? 'bg-gray-50' :
        variant === 'substitute' ? 'bg-mint-100' :
        variant === 'seasonal' ? 'bg-amber-100' :
        'bg-orange-100'
      )}>
        {emoji ?? '🛒'}
      </div>

      {/* Label */}
      <p className="text-[11px] font-semibold text-center leading-tight line-clamp-2">
        {label}
      </p>

      {/* Add indicator */}
      <div className={clsx(
        'w-5 h-5 rounded-full flex items-center justify-center',
        variant === 'substitute' ? 'bg-mint-500' :
        variant === 'seasonal' ? 'bg-amber-500' :
        variant === 'running-low' ? 'bg-orange-500' :
        'bg-charcoal-800'
      )}>
        <Plus className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};
