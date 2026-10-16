import React, { useState, useEffect } from 'react';
import {
  ArrowLeftRight,
  Copy,
  Check,
  Trash2,
  ClipboardPaste,
  Download,
  FileText,
  FileCode,
  Sparkles,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  BookOpen,
  Lightbulb,
  Mic,
  MicOff,
  X
} from 'lucide-react';
import {
  ConversionDirection,
  TargetFont,
  FONT_OPTIONS,
  convertText
} from '../engine/converterRegistry';
import { exportToDocx, exportToTxt } from '../utils/docxExport';
import { Language, translations } from '../utils/translations';
import { LivePreviewBox } from './LivePreviewBox';
import { SinglishGuideModal } from './SinglishGuideModal';
import { useSpeechToText } from '../hooks/useSpeechToText';

interface ConverterCardProps {
  lang: Language;
}

export const ConverterCard: React.FC<ConverterCardProps> = ({ lang }) => {
  const [direction, setDirection] = useState<ConversionDirection>('unicode_to_legacy');
  const [targetFont, setTargetFont] = useState<TargetFont>('fm-abhaya');
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedInput, setCopiedInput] = useState<boolean>(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState<boolean>(false);
  const [isSinglishGuideOpen, setIsSinglishGuideOpen] = useState<boolean>(false);
  
  // Font size control for textareas (default 18px for high Sinhala legibility)
  const [editorFontSize, setEditorFontSize] = useState<number>(18);

  // Speech-to-Text Voice Typing integration
  const handleVoiceTranscript = (transcript: string) => {
    const clean = transcript.trim();
    if (!clean) return;
    setInputText((prev) => {
      if (!prev) return clean;
      const separator = prev.endsWith(' ') || prev.endsWith('\n') ? '' : ' ';
      return prev + separator + clean;
    });
  };

  const {
    isListening,
    interimText,
    errorMessage: speechError,
    clearError,
    startListening,
    stopListening,
  } = useSpeechToText(handleVoiceTranscript);

  const t = translations[lang];

  // Perform live real-time conversion
  useEffect(() => {
    const converted = convertText(inputText, direction, targetFont);
    setOutputText(converted);
  }, [inputText, direction, targetFont]);

  // Statistics calculation
  const getStats = (text: string) => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 0;
    return { chars, words, lines };
  };

  const inputStats = getStats(inputText);
  const outputStats = getStats(outputText);

  // Copy output
  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = outputText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Copy input (Unicode text)
  const handleCopyInput = async () => {
    if (!inputText) return;
    try {
      await navigator.clipboard.writeText(inputText);
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = inputText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    }
  };

  // Paste into input
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch {
      // Ignore if permission denied
    }
  };

  // Clear text
  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  // Swap input & output and toggle mode
  const handleSwap = () => {
    if (direction === 'singlish_to_unicode' || direction === 'voice_to_unicode') {
      setDirection('legacy_to_unicode');
      setInputText(outputText);
      return;
    }

    const nextDirection: ConversionDirection =
      direction === 'unicode_to_legacy' ? 'legacy_to_unicode' : 'unicode_to_legacy';
    setDirection(nextDirection);
    setInputText(outputText);
  };

  const samplePresets = [
    {
      title: 'ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය',
      text: 'ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය'
    },
    {
      title: 'විශ්වවිද්‍යාල නිවේදනය',
      text: 'විශ්වවිද්‍යාල ප්‍රතිපාදන කොමිෂන් සභාව මඟින් නිකුත් කරන ලද නිවේදනයයි.'
    },
    {
      title: 'මානව හිමිකම් ප්‍රඥප්තිය',
      text: 'සියලු මනුෂ්‍යයෝ නිදහස්ව උපත ලබා ඇත. ගෞරවයෙන් හා අයිතිවාසිකම්වලින් සමාන වෙති.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Configuration Bar: Mode Switcher, Singlish Guide Button, Font Selector & Editor Zoom */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-sm flex-wrap gap-1">
            <button
              onClick={() => setDirection('unicode_to_legacy')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                direction === 'unicode_to_legacy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              {t.modeUnicodeToLegacy}
            </button>
            <button
              onClick={() => setDirection('legacy_to_unicode')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                direction === 'legacy_to_unicode'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              {t.modeLegacyToUnicode}
            </button>
            <button
              onClick={() => setDirection('singlish_to_unicode')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                direction === 'singlish_to_unicode'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              {t.modeSinglishToUnicode}
            </button>
            <button
              onClick={() => setDirection('voice_to_unicode')}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                direction === 'voice_to_unicode'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-800 dark:text-slate-200 hover:text-rose-600 dark:hover:text-white'
              }`}
            >
              <Mic className={`w-3.5 h-3.5 ${isListening && direction === 'voice_to_unicode' ? 'animate-bounce text-white' : 'text-rose-500'}`} />
              <span>{t.modeVoiceToUnicode}</span>
            </button>
          </div>

          {/* Singlish Guide Trigger Button */}
          <button
            onClick={() => setIsSinglishGuideOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-950 dark:text-amber-200 border-2 border-amber-300 dark:border-amber-800 font-extrabold text-xs sm:text-sm shadow-sm transition hover:scale-[1.02] active:scale-95"
            title="Singlish ටයිපින් මාර්ගෝපදේශය (Singlish Guide)"
          >
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-500" />
            <span>{lang === 'si' ? 'මඤ්ඤෝක්කා Singlish Guide' : 'Singlish Typing Guide'}</span>
          </button>
        </div>

        {/* Right side controls: Font Family Selector + Editor Text Size */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Editor Font Size Controls */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-sm">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {lang === 'si' ? 'අකුරු ප්‍රමාණය:' : 'Text Size:'}
            </span>
            <button
              onClick={() => setEditorFontSize((prev) => Math.max(14, prev - 2))}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              title="Decrease Font Size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 w-8 text-center">
              {editorFontSize}px
            </span>
            <button
              onClick={() => setEditorFontSize((prev) => Math.min(32, prev + 2))}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              title="Increase Font Size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Target Font Selector */}
          {direction !== 'singlish_to_unicode' && (
            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {t.selectFont}
              </label>
              <select
                value={targetFont}
                onChange={(e) => setTargetFont(e.target.value as TargetFont)}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:outline-none focus:border-indigo-600"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.category})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Dual-Pane Converter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 relative">
        {/* INPUT PANE */}
        <div className="flex flex-col rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md overflow-hidden transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
          {/* Pane Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></span>
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 tracking-wide">
                {direction === 'voice_to_unicode'
                  ? t.inputHeadingVoice
                  : direction === 'unicode_to_legacy'
                  ? t.inputHeadingUnicode
                  : direction === 'legacy_to_unicode'
                  ? t.inputHeadingLegacy
                  : t.inputHeadingSinglish}
              </h2>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {/* Copy Unicode button if input is Unicode */}
              {(direction === 'unicode_to_legacy' || direction === 'voice_to_unicode') && inputText && (
                <button
                  onClick={handleCopyInput}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition shadow-sm"
                  title={lang === 'si' ? 'යුනිකෝඩ් පිටපත් කරන්න (Copy Unicode)' : 'Copy Unicode text'}
                >
                  {copiedInput ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                  <span>{copiedInput ? t.copiedInput : t.copyInputUnicode}</span>
                </button>
              )}

              {/* Voice Typing Button */}
              <button
                onClick={() => {
                  if (isListening) {
                    stopListening();
                  } else {
                    if (direction === 'singlish_to_unicode') {
                      setDirection('voice_to_unicode');
                    }
                    startListening('si-LK');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400'
                    : 'text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title={lang === 'si' ? 'හඬින් ටයිප් කරන්න (Voice Typing)' : 'Voice Typing'}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4 text-white" />
                    <span>{lang === 'si' ? 'සවන් දෙමින්... (Stop)' : 'Listening... (Stop)'}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-rose-500" />
                    <span>{lang === 'si' ? 'හඬින් ටයිප් කරන්න' : 'Voice Typing'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePaste}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm"
                title="Paste from clipboard"
              >
                <ClipboardPaste className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{t.paste}</span>
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition shadow-sm"
                title="Clear all text"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.clear}</span>
              </button>
            </div>
          </div>

          {/* Active Voice Listening Live Banner */}
          {isListening && (
            <div className="mx-4 mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-800 text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm animate-in fade-in">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200 font-extrabold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                <span>
                  {lang === 'si'
                    ? '🔴 අඛණ්ඩව සවන් දෙමින් පවතී (ඕනෑම කථාවක් හෝ ලිපියක් නොනවත්වා කථා කරන්න - වචන අතර නැවතුනද Mic ක්‍රියාවිරහිත නොවේ)...'
                    : '🔴 Listening continuously (dictate freely - mic will not turn off across pauses)...'}
                </span>
              </div>
              {interimText && (
                <span className="italic text-slate-800 dark:text-slate-200 font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-rose-200">
                  "{interimText}"
                </span>
              )}
            </div>
          )}

          {/* Dedicated Voice to Unicode Mode Guidance Banner */}
          {direction === 'voice_to_unicode' && !isListening && (
            <div className="mx-4 mt-3 p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs flex flex-col gap-2 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-900 dark:text-slate-100 font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>{lang === 'si' ? 'අඛණ්ඩ සිංහල හඬින් යුනිකේත ටයිප් කිරීම' : 'Continuous Sinhala Voice Typing'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                  {lang === 'si' ? 'Non-Stop Auto Restart' : 'Non-Stop Active'}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                💡 <strong>වැඩිම නිරවද්‍යතාවයක් (Accuracy) ලබාගැනීමට උපදෙස්:</strong>
                <br />• <strong>ස්වාභාවික විරාමය:</strong> එක් එක් වාක්‍යයක් අවසානයේ හුස්මක් ගෙන තත්පර 1ක ස්වාභාවික විරාමයක් තබන්න (එවිට AI එකට වචන 100%ක් නිවැරදිව Finalize කිරීමට හැකිවේ).
                <br />• <strong>පැහැදිලි ශබ්දය:</strong> මයික්‍රෆෝනයට සෙන්ටිමීටර් 15-20ක් පමණ ළංවී පසුබිම් ඝෝෂාව අවම පරිසරයක කථා කරන්න.
              </p>
            </div>
          )}

          {/* Speech Error Banner */}
          {speechError && (
            <div className="mx-4 mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-start justify-between gap-3 shadow-sm animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <span className="text-base leading-none">⚠️</span>
                <div className="space-y-1">
                  <p className="font-bold leading-relaxed">{speechError}</p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                    💡 <strong>iPhone / iOS සඳහා උපදෙස:</strong> Input කොටස මත Tap කර ඔබගේ <strong>Helakuru</strong> හෝ <strong>Gboard</strong> Keyboard එකෙහි ඇති <strong>Mic (🎙️) බටනය</strong> ඔබා සිංහලෙන් කථා කරන්න. එවිට හඬින් කෙලින්ම Type වී 0ms කින් Legacy Fonts වලට Convert වේ!
                  </p>
                </div>
              </div>
              <button
                onClick={clearError}
                className="p-1 rounded-lg text-amber-700 hover:text-amber-900 dark:text-amber-300 hover:bg-amber-200/60 dark:hover:bg-amber-900/60 transition flex-shrink-0"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Helper Banner for Singlish */}
          {direction === 'singlish_to_unicode' && (
            <div className="mx-4 mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm">
              <span className="text-amber-950 dark:text-amber-200 font-medium">
                💡 <strong>මඤ්ඤෝක්කා</strong> වැනි වචන සඳහා:{' '}
                <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                  manynyoekkaa
                </code>{' '}
                හෝ{' '}
                <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                  maKNKNoekkaa
                </code>
              </span>
              <button
                onClick={() => setIsSinglishGuideOpen(true)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>සම්පූර්ණ Guide එක</span>
              </button>
            </div>
          )}

          {/* Text Area */}
          <div className="relative flex-1 bg-white dark:bg-slate-900">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                direction === 'voice_to_unicode'
                  ? t.inputPlaceholderVoice
                  : direction === 'unicode_to_legacy'
                  ? t.inputPlaceholderUnicode
                  : direction === 'legacy_to_unicode'
                  ? t.inputPlaceholderLegacy
                  : t.inputPlaceholderSinglish
              }
              rows={9}
              style={{
                fontSize: `${editorFontSize}px`,
                lineHeight: 1.7,
              }}
              className="w-full h-full p-4 sm:p-5 bg-transparent resize-y border-none focus:outline-none text-slate-950 dark:text-white font-medium sinhala-text placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Pane Footer: Statistics & Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs text-slate-700 dark:text-slate-300">
            {/* Presets */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-slate-800 dark:text-slate-200">{t.samples}:</span>
              {samplePresets.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(sample.text)}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-slate-800 dark:text-slate-200 font-bold transition text-xs border border-slate-300 dark:border-slate-700"
                  title={sample.title}
                >
                  #{idx + 1}
                </button>
              ))}

              {direction === 'singlish_to_unicode' && (
                <button
                  onClick={() => setInputText('manynyoekkaa')}
                  className="px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100 font-bold transition text-xs border border-amber-300 dark:border-amber-700 hover:bg-amber-300"
                  title="Try 'මඤ්ඤෝක්කා'"
                >
                  මඤ්ඤෝක්කා
                </button>
              )}
            </div>

            {/* Counts */}
            <div className="flex items-center gap-3 font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
              <span>
                {inputStats.chars} {t.chars}
              </span>
              <span>•</span>
              <span>
                {inputStats.words} {t.words}
              </span>
            </div>
          </div>
        </div>

        {/* Central Swap Floating Button (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            onClick={handleSwap}
            className="p-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all duration-200 border-4 border-white dark:border-slate-950"
            title="Swap input & output / මාරු කරන්න"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        {/* OUTPUT PANE */}
        <div className="flex flex-col rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md overflow-hidden transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
          {/* Pane Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm"></span>
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 tracking-wide">
                {direction === 'unicode_to_legacy'
                  ? t.outputHeadingLegacy
                  : t.outputHeadingUnicode}
              </h2>
            </div>

            {/* Actions: Copy & Download */}
            <div className="flex items-center gap-2">
              {/* Copy Button */}
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                    : outputText
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                }`}
                title="Copy converted text to clipboard"
              >
                {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.copied : t.copy}</span>
              </button>

              {/* Download Menu */}
              <div className="relative">
                <button
                  onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                  disabled={!outputText}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border-2 border-slate-300 dark:border-slate-700 transition shadow-sm ${
                    outputText
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                  title="Download converted text"
                >
                  <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {downloadMenuOpen && outputText && (
                  <div
                    onMouseLeave={() => setDownloadMenuOpen(false)}
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 shadow-2xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <button
                      onClick={() => {
                        exportToTxt(outputText);
                        setDownloadMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-left text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                      <FileText className="w-4 h-4 text-slate-500" />
                      {t.downloadTxt}
                    </button>
                    <button
                      onClick={() => {
                        exportToDocx(
                          outputText,
                          'converted-sinhala-text.docx',
                          targetFont === 'dl-manel' ? 'DL-Manel' : 'FM-Abhaya'
                        );
                        setDownloadMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-left text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                      <FileCode className="w-4 h-4 text-indigo-600" />
                      {t.downloadDocx}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Text Area Output */}
          <div className="relative flex-1 bg-slate-50/70 dark:bg-slate-950/40">
            <textarea
              value={outputText}
              readOnly
              placeholder={t.outputPlaceholder}
              rows={9}
              style={{
                fontSize: `${editorFontSize}px`,
                lineHeight: 1.7,
              }}
              className="w-full h-full p-4 sm:p-5 bg-transparent resize-y border-none focus:outline-none text-slate-950 dark:text-white font-mono font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 select-all"
            />
          </div>

          {/* Pane Footer: Statistics */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs text-slate-700 dark:text-slate-300">
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
              ✓ 0ms Real-Time Conversion
            </span>
            <div className="flex items-center gap-3 font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
              <span>
                {outputStats.chars} {t.chars}
              </span>
              <span>•</span>
              <span>
                {outputStats.words} {t.words}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Swap Button */}
      <div className="flex lg:hidden justify-center mt-4">
        <button
          onClick={handleSwap}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-md hover:bg-indigo-700 transition"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>{t.swap}</span>
        </button>
      </div>

      {/* LIVE FONT PREVIEW BOX */}
      {direction === 'unicode_to_legacy' && (
        <LivePreviewBox outputText={outputText} targetFont={targetFont} lang={lang} />
      )}

      {/* SINGLISH TYPING GUIDE MODAL */}
      <SinglishGuideModal
        isOpen={isSinglishGuideOpen}
        onClose={() => setIsSinglishGuideOpen(false)}
        onSelectSample={(sample) => {
          setDirection('singlish_to_unicode');
          setInputText(sample);
        }}
        lang={lang}
      />
    </div>
  );
};
