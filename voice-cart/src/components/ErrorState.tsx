import React from 'react';
import { MicOff, WifiOff, AlertTriangle, ShoppingBasket } from 'lucide-react';
import type { VoiceError } from '../types';

interface ErrorStateProps {
  type: 'empty' | VoiceError;
  onDismiss?: () => void;
}

const ERROR_CONFIG: Record<string, {
  icon: React.ReactNode;
  title: string;
  description: string;
  bg: string;
  iconBg: string;
}> = {
  empty: {
    icon: <ShoppingBasket className="w-10 h-10 text-gray-400" />,
    title: 'Your list is quiet.',
    description: 'Tap the mic below to start adding groceries with your voice.',
    bg: 'bg-gray-50',
    iconBg: 'bg-gray-100',
  },
  'permission-denied': {
    icon: <MicOff className="w-8 h-8 text-red-500" />,
    title: 'Microphone Denied',
    description: 'We need access to hear your grocery list. Please update your permissions.',
    bg: 'bg-red-50',
    iconBg: 'bg-red-100',
  },
  'not-supported': {
    icon: <AlertTriangle className="w-8 h-8 text-amber-500" />,
    title: 'Browser Not Supported',
    description: 'Voice input requires Chrome or Edge. Please open this app in a supported browser.',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
  },
  'no-speech': {
    icon: <MicOff className="w-8 h-8 text-amber-500" />,
    title: 'No Speech Detected',
    description: 'We couldn\'t hear anything. Tap the mic and speak clearly.',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
  },
  network: {
    icon: <WifiOff className="w-8 h-8 text-amber-500" />,
    title: 'Network Error',
    description: 'Voice recognition needs an internet connection. Please check your connection.',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
  },
  unknown: {
    icon: <AlertTriangle className="w-8 h-8 text-amber-500" />,
    title: 'Something Went Wrong',
    description: 'Voice input encountered an error. Please try again.',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
  },
  aborted: {
    icon: <AlertTriangle className="w-8 h-8 text-gray-400" />,
    title: 'Listening Stopped',
    description: 'Voice input was cancelled. Tap the mic to try again.',
    bg: 'bg-gray-50',
    iconBg: 'bg-gray-100',
  },
};

export const ErrorState: React.FC<ErrorStateProps> = ({ type, onDismiss }) => {
  const config = ERROR_CONFIG[type] ?? ERROR_CONFIG.unknown;

  const isEmptyState = type === 'empty';

  return (
    <div
      id={`error-state-${type}`}
      className={`rounded-2xl p-5 ${config.bg} ${isEmptyState ? 'flex flex-col items-center text-center py-12' : ''} animate-fade-in`}
    >
      {isEmptyState ? (
        <>
          <div className={`w-20 h-20 rounded-full ${config.iconBg} flex items-center justify-center mb-5`}>
            {config.icon}
          </div>
          <h2 className="font-bold text-lg text-charcoal-800 mb-2">{config.title}</h2>
          <p className="text-sm text-gray-500 max-w-[240px] mb-1">{config.description}</p>
          <p className="text-xs text-mint-500 font-medium uppercase tracking-widest mt-3">
            System Ready
          </p>
        </>
      ) : (
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-xl ${config.iconBg} flex items-center justify-center shrink-0`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-charcoal-800 mb-1">{config.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{config.description}</p>
            {onDismiss && (
              <button
                id="dismiss-error"
                onClick={onDismiss}
                className="mt-2 text-xs font-semibold text-mint-500 hover:text-mint-600 transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
