import { useState, useCallback, useRef } from 'react';
import type { VoiceState, VoiceError } from '../types';

// Extend Window for vendor-prefixed SpeechRecognition
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: new () => SpeechRecognitionType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: new () => SpeechRecognitionType;
  }
}

// Use the DOM SpeechRecognition interface if available
type SpeechRecognitionType = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

export interface UseVoiceInputOptions {
  language?: string;
  onResult: (transcript: string) => void;
  onError?: (error: VoiceError) => void;
}

export interface UseVoiceInputReturn {
  voiceState: VoiceState;
  interimTranscript: string;
  finalTranscript: string;
  error: VoiceError | null;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
}

export function useVoiceInput({
  language = 'en-US',
  onResult,
  onError,
}: UseVoiceInputOptions): UseVoiceInputReturn {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [error, setError] = useState<VoiceError | null>(null);

  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  const SpeechRecognitionAPI =
    typeof window !== 'undefined'
      ? window.SpeechRecognition ?? window.webkitSpeechRecognition
      : null;

  const isSupported = !!SpeechRecognitionAPI;

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setVoiceState('idle');
    setInterimTranscript('');
  }, []);

  const startListening = useCallback(() => {
    if (!SpeechRecognitionAPI) {
      const err: VoiceError = 'not-supported';
      setError(err);
      onError?.(err);
      return;
    }

    // Reset state
    setError(null);
    setFinalTranscript('');
    setInterimTranscript('');
    setVoiceState('requesting-permission');

    try {
      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;

      recognition.lang = language;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        setVoiceState('listening');
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript;
          } else {
            interim += result[0].transcript;
          }
        }

        setInterimTranscript(interim);

        if (final) {
          setFinalTranscript(final);
          setVoiceState('processing');
          onResult(final.trim());
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let mappedError: VoiceError;

        switch (event.error) {
          case 'not-allowed':
          case 'service-not-allowed':
            mappedError = 'permission-denied';
            break;
          case 'no-speech':
            mappedError = 'no-speech';
            break;
          case 'aborted':
            mappedError = 'aborted';
            break;
          case 'network':
            mappedError = 'network';
            break;
          default:
            mappedError = 'unknown';
        }

        setError(mappedError);
        setVoiceState('error');
        onError?.(mappedError);
        recognitionRef.current = null;
      };

      recognition.onend = () => {
        recognitionRef.current = null;
        setVoiceState((prev) =>
          prev === 'processing' ? 'success' : prev === 'listening' ? 'idle' : prev
        );
        setInterimTranscript('');
      };

      recognition.start();
    } catch (err) {
      console.error('SpeechRecognition start failed:', err);
      const voiceErr: VoiceError = 'unknown';
      setError(voiceErr);
      setVoiceState('error');
      onError?.(voiceErr);
    }
  }, [SpeechRecognitionAPI, language, onResult, onError]);

  return {
    voiceState,
    interimTranscript,
    finalTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
  };
}
