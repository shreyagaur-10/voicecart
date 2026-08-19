import React from 'react';
import { Mic } from 'lucide-react';
import type { VoiceState } from '../types';
import clsx from 'clsx';

interface MicFABProps {
  voiceState: VoiceState;
  onClick: () => void;
  isSupported: boolean;
  floating?: boolean;
}

export const MicFAB: React.FC<MicFABProps> = ({
  voiceState,
  onClick,
  isSupported,
  floating = true,
}) => {
  const isListening = voiceState === 'listening' || voiceState === 'requesting-permission';
  const isDisabled = !isSupported || voiceState === 'processing';

  return (
    <div
      className={clsx(
        floating ? 'absolute bottom-16 right-5 z-40' : 'relative',
        'flex items-center justify-center'
      )}
    >
      {/* Listening pulse rings */}
      {isListening && (
        <>
          <div
            className="absolute rounded-full bg-emerald-400/50 pointer-events-none"
            style={{
              width: 72,
              height: 72,
              animation: 'micPulse 1.8s ease-out infinite',
            }}
          />
          <div
            className="absolute rounded-full bg-emerald-400/30 pointer-events-none"
            style={{
              width: 72,
              height: 72,
              animation: 'micPulse 1.8s ease-out 0.6s infinite',
            }}
          />
        </>
      )}

      {/* Floating Mic FAB Button — matches exact screenshot styling */}
      <button
        id="voice-bot-fab"
        onClick={onClick}
        disabled={isDisabled}
        aria-label={isListening ? 'Stop voice listening' : 'Start voice input'}
        className={clsx(
          'relative w-14 h-14 rounded-full flex items-center justify-center',
          'bg-[#4CD9A4] text-[#045D40] transition-all duration-300',
          'shadow-[0_4px_20px_rgba(76,217,164,0.55)] hover:shadow-[0_6px_28px_rgba(76,217,164,0.75)]',
          'hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#4CD9A4]/40',
          isListening && 'bg-[#10B981] text-white scale-110 shadow-[0_0_30px_rgba(16,185,129,0.8)]',
          isDisabled && !isListening && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Mic
          className={clsx(
            'w-6 h-6 transition-all duration-200',
            isListening ? 'text-white animate-pulse' : 'text-[#065F46]'
          )}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
};
