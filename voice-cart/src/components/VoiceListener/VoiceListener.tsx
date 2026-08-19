import React from 'react';
import { X } from 'lucide-react';
import { WaveformAnimation } from './WaveformAnimation';
import { TranscriptDisplay } from './TranscriptDisplay';
import type { VoiceState, ActionConfirmation } from '../../types';
import type { Lang } from '../../lib/i18n';
import { t } from '../../lib/i18n';
import clsx from 'clsx';

interface VoiceListenerProps {
  isOpen: boolean;
  voiceState: VoiceState;
  interimTranscript: string;
  finalTranscript: string;
  confirmation: ActionConfirmation | null;
  onClose: () => void;
  language: Lang;
}

export const VoiceListener: React.FC<VoiceListenerProps> = ({
  isOpen,
  voiceState,
  interimTranscript,
  finalTranscript,
  confirmation,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isListening = voiceState === 'listening';
  const isRequesting = voiceState === 'requesting-permission';
  const isHindi = language === 'hi-IN';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Voice input"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className={clsx(
          'relative w-full max-w-sm mx-4 mb-6 rounded-3xl overflow-hidden',
          'bg-gray-900 border border-white/10',
          'shadow-2xl'
        )}
        style={{ animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <div className={clsx(
              'w-2 h-2 rounded-full',
              isListening ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'
            )} />
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
              {isHindi ? 'हिंदी' : 'English'}
            </span>
            {isListening && (
              <span className="text-emerald-400 text-xs font-semibold">
                {t(language, 'voice_listening')}
              </span>
            )}
          </div>
          <button
            id="voice-listener-close"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label={t(language, 'voice_close')}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Waveform */}
        <div className="flex items-center justify-center py-8">
          <WaveformAnimation isActive={isListening} className="h-24" />
        </div>

        {/* Status */}
        <div className="px-5 pb-6">
          {isRequesting && (
            <p className="text-white/50 text-center text-sm animate-pulse mb-4">
              {isHindi ? 'माइक्रोफ़ोन एक्सेस माँग रहे हैं...' : 'Requesting microphone access...'}
            </p>
          )}

          <TranscriptDisplay
            interimTranscript={interimTranscript}
            finalTranscript={finalTranscript}
            confirmation={confirmation}
            isListening={isListening}
          />

          {/* Hint text */}
          {!interimTranscript && !finalTranscript && !isRequesting && (
            <div className="mt-4 space-y-1.5 text-center">
              <p className="text-white/30 text-xs font-medium uppercase tracking-widest mb-2">
                {t(language, 'voice_examples')}
              </p>
              <p className="text-white/50 text-sm">{t(language, 'voice_example_add')}</p>
              <p className="text-white/50 text-sm">{t(language, 'voice_example_remove')}</p>
              <p className="text-white/50 text-sm">{t(language, 'voice_example_search')}</p>
            </div>
          )}

          {/* Tap to stop hint */}
          {isListening && (
            <p className="text-white/30 text-center text-xs mt-4">
              {t(language, 'voice_tap_to_stop')}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          0%   { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};
