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

  const startListening = useCallback((langCode: string = 'si-LK') => {
    setErrorMessage(null);
    setInterimText('');

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setHasSupport(false);
      setErrorMessage('ඔබගේ Browser එක තුළ Speech Recognition සහාය නොදක්වයි. (Chrome හෝ Edge භාවිත කරන්න)');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

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
          } else {
            currentInterim += transcript;
          }
        }
        setInterimText(currentInterim);
      };

      recognition.onerror = (event: Event & { error?: string }) => {
        if (event.error === 'no-speech') return;
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone අවසරය (Permission) ලබාදී නොමැත.');
        } else {
          setErrorMessage(`හඬ හඳුනාගැනීමේ දෝෂයකි: ${event.error || 'Unknown error'}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimText('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      setIsListening(false);
      setErrorMessage('හඬ හඳුනාගැනීම ආරම්භ කිරීමට නොහැකි විය.');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setInterimText('');
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return {
    isListening,
    interimText,
    hasSupport,
    errorMessage,
    startListening,
    stopListening,
  };
}
