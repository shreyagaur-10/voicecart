import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { ActionConfirmation } from '../../types';
import clsx from 'clsx';

interface TranscriptDisplayProps {
  interimTranscript: string;
  finalTranscript: string;
  confirmation: ActionConfirmation | null;
  isListening: boolean;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  interimTranscript,
  finalTranscript,
  confirmation,
  isListening,
}) => {
  const displayText = interimTranscript || finalTranscript;

  return (
    <div className="flex flex-col items-center gap-4 w-full px-4">
      {/* Live transcript */}
      {isListening && (
        <p className="text-xs tracking-widest uppercase font-semibold text-mint-500 animate-pulse">
          Listening...
        </p>
      )}

      {displayText && (
        <div className="text-center">
          <p className="text-white text-xl font-semibold leading-snug">
            &ldquo;
            <span
              className={clsx(
                interimTranscript ? 'text-mint-400' : 'text-white'
              )}
            >
              {displayText}
            </span>
            &rdquo;
          </p>
        </div>
      )}

      {/* Action confirmation card */}
      {confirmation && (
        <div
          className={clsx(
            'w-full rounded-2xl p-3 flex items-center gap-3 animate-slide-up shadow-card',
            confirmation.intent.action === 'unavailable'
              ? 'bg-rose-50 border border-rose-200 text-rose-900'
              : 'bg-white'
          )}
        >
          {confirmation.intent.action === 'unknown' ? (
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
          ) : confirmation.intent.action === 'unavailable' ? (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-mint-500 shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-charcoal-800 text-sm truncate">
              {confirmation.intent.action === 'add' && confirmation.intent.item && (
                <>
                  {confirmation.intent.quantity > 1
                    ? `${confirmation.intent.quantity} `
                    : ''}
                  {confirmation.intent.unit
                    ? `${confirmation.intent.unit} of `
                    : ''}
                  <span className="capitalize">{confirmation.intent.item}</span>
                </>
              )}
              {confirmation.intent.action === 'unavailable' && (
                <span className="capitalize text-rose-700 font-bold">{confirmation.intent.item}</span>
              )}
              {confirmation.intent.action === 'remove' && (
                <span className="capitalize">{confirmation.intent.item}</span>
              )}
              {confirmation.intent.action === 'search' && (
                <span className="capitalize">{confirmation.intent.query}</span>
              )}
              {confirmation.intent.action === 'clear' && 'List cleared'}
              {confirmation.intent.action === 'unknown' && "Didn't catch that"}
            </p>
            <p className={clsx('text-xs mt-0.5', confirmation.intent.action === 'unavailable' ? 'text-rose-600 font-semibold' : 'text-gray-400')}>
              {confirmation.intent.action === 'add' && 'Added to cart'}
              {confirmation.intent.action === 'unavailable' && 'Product Unavailable (Out of Stock)'}
              {confirmation.intent.action === 'remove' && 'Removed from list'}
              {confirmation.intent.action === 'search' && 'Showing results'}
              {confirmation.intent.action === 'clear' && 'All items cleared'}
              {confirmation.intent.action === 'unknown' && 'Try again with a clearer command'}
            </p>
          </div>
          {confirmation.intent.action === 'add' && (
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-mint-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-mint-500" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
