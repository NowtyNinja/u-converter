import { useState, useEffect, useRef, useCallback } from 'react';

// Browser SpeechRecognition types definition
interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultInstance {
  [index: number]: SpeechRecognitionResultItem;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionEventInstance extends Event {
  results: {
    [index: number]: SpeechRecognitionResultInstance;
    length: number;
  };
  resultIndex: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventInstance) => void) | null;
  onerror: ((event: Event & { error?: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

export function useSpeechToText(onFinalTranscript: (text: string) => void) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [interimText, setInterimText] = useState<string>('');
  const [hasSupport, setHasSupport] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const isExplicitListeningRef = useRef<boolean>(false);
  const activeLangRef = useRef<string>('si-LK');
  const interimRef = useRef<string>('');
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onFinalTranscriptRef = useRef(onFinalTranscript);
  onFinalTranscriptRef.current = onFinalTranscript;

  useEffect(() => {
    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setHasSupport(false);
    }
  }, []);

  const cleanupCurrentRecognition = () => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
  };

  const createAndStartInstance = useCallback((langCode: string) => {
    if (!isExplicitListeningRef.current) return;

    cleanupCurrentRecognition();

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setHasSupport(false);
      setIsListening(false);
      isExplicitListeningRef.current = false;
      setErrorMessage('ඔබගේ Browser එක තුළ Speech Recognition සහාය නොදක්වයි. (Google Chrome හෝ Edge භාවිත කරන්න)');
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = langCode;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEventInstance) => {
        let currentInterim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            onFinalTranscriptRef.current(transcript.trim());
            interimRef.current = '';
          } else {
            currentInterim += transcript;
          }
        }
        interimRef.current = currentInterim;
        setInterimText(currentInterim);
      };

      recognition.onerror = (event: Event & { error?: string }) => {
        // Natural speech pauses
        if (event.error === 'no-speech') return;
        if (event.error === 'audio-capture' || event.error === 'network') return;

        const isIOS =
          typeof navigator !== 'undefined' &&
          (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

        if (event.error === 'service-not-allowed') {
          isExplicitListeningRef.current = false;
          setIsListening(false);
          if (isIOS) {
            setErrorMessage(
              'Apple iOS (iPhone/iPad) හි Safari මඟින් සිංහල Speech Recognition සහාය නොදක්වයි. කරුණාකර ඔබගේ iPhone හි Helakuru හෝ Gboard keyboard එකේ ඇති Mic (🎙️) බටනය මඟින් Input කොටස තුළට හඬින් Type කරන්න.'
            );
          } else {
            setErrorMessage(
              'Speech සේවාව වෙත ප්‍රවේශ වීමට අවසර නැත (service-not-allowed). කරුණාකර Browser permissions හා Dictation සැකසුම් පරීක්ෂා කරන්න.'
            );
          }
        } else if (event.error === 'not-allowed') {
          isExplicitListeningRef.current = false;
          setIsListening(false);
          if (isIOS) {
            setErrorMessage(
              'Microphone හෝ Speech Recognition අවසරය ලබාදී නොමැත. කරුණාකර iPhone Settings > Safari > Microphone "Allow" කර Settings > General > Keyboard > "Enable Dictation" On කරන්න.'
            );
          } else {
            setErrorMessage('Microphone අවසරය (Permission) ලබාදී නොමැත.');
          }
        } else if (event.error === 'language-not-supported') {
          isExplicitListeningRef.current = false;
          setIsListening(false);
          setErrorMessage(
            'මෙම බ්‍රවුසරය මඟින් සිංහල (si-LK) හඬ හඳුනාගැනීම සහාය නොදක්වයි. කරුණාකර Google Chrome හෝ Helakuru Keyboard භාවිත කරන්න.'
          );
        } else {
          isExplicitListeningRef.current = false;
          setIsListening(false);
          setErrorMessage(`හඬ හඳුනාගැනීමේ දෝෂයකි: ${event.error || 'Unknown error'}`);
        }
      };

      recognition.onend = () => {
        // 1. Flush any leftover interim words so nothing is lost
        if (interimRef.current && interimRef.current.trim().length > 0) {
          onFinalTranscriptRef.current(interimRef.current.trim());
          interimRef.current = '';
        }
        setInterimText('');

        // 2. If user is still listening, cleanly create a fresh instance after 200ms
        if (isExplicitListeningRef.current) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            if (isExplicitListeningRef.current) {
              createAndStartInstance(activeLangRef.current);
            }
          }, 200);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      isExplicitListeningRef.current = false;
      setIsListening(false);
      setErrorMessage('හඬ හඳුනාගැනීම ආරම්භ කිරීමට නොහැකි විය.');
    }
  }, []);

  const startListening = useCallback((langCode: string = 'si-LK') => {
    setErrorMessage(null);
    setInterimText('');
    interimRef.current = '';
    isExplicitListeningRef.current = true;
    activeLangRef.current = langCode;
    createAndStartInstance(langCode);
  }, [createAndStartInstance]);

  const stopListening = useCallback(() => {
    isExplicitListeningRef.current = false;
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    // Flush any leftover interim words
    if (interimRef.current && interimRef.current.trim().length > 0) {
      onFinalTranscriptRef.current(interimRef.current.trim());
      interimRef.current = '';
    }
    cleanupCurrentRecognition();
    setIsListening(false);
    setInterimText('');
  }, []);

  useEffect(() => {
    return () => {
      isExplicitListeningRef.current = false;
      cleanupCurrentRecognition();
    };
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    isListening,
    interimText,
    hasSupport,
    errorMessage,
    clearError,
    startListening,
    stopListening,
  };
}
