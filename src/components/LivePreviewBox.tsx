import React, { useState } from 'react';
import { Eye, AlignLeft, AlignCenter, AlignRight, ZoomIn, Type, Palette } from 'lucide-react';
import { TargetFont, FONT_OPTIONS } from '../engine/converterRegistry';
import { Language, translations } from '../utils/translations';

interface LivePreviewBoxProps {
  outputText: string;
  targetFont: TargetFont;
  lang: Language;
}

export const LivePreviewBox: React.FC<LivePreviewBoxProps> = ({
  outputText,
  targetFont,
  lang,
}) => {
  const [fontSize, setFontSize] = useState<number>(32);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [previewFontFamily, setPreviewFontFamily] = useState<string>('FM-Abhaya');
  const [previewBg, setPreviewBg] = useState<'white' | 'warm' | 'dark'>('white');
  const [previewTextColor, setPreviewTextColor] = useState<'black' | 'indigo' | 'slate'>('black');

  const t = translations[lang];
  const activeFont = FONT_OPTIONS.find((f) => f.id === targetFont);

  // If there's no output text, show a pleasant Sinhala placeholder preview
  const displayContent = outputText.trim()
    ? outputText
    : 'Y%S ,xld m%cd;dka;%sl iudcjd§ ckrch'; // "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය" in FM

  // Background and text color mappings
  const bgStyles = {
    white: 'bg-white border-slate-300',
    warm: 'bg-amber-50/60 border-amber-200',
    dark: 'bg-slate-950 border-slate-700',
  };

  const textColors = {
    black: previewBg === 'dark' ? '#ffffff' : '#090d16',
    indigo: '#4f46e5',
    slate: previewBg === 'dark' ? '#cbd5e1' : '#1e293b',
  };

  return (
    <div className="mt-8 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden transition-all">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b-2 border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {t.livePreviewTitle}
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-800">
                Font: {previewFontFamily}
              </span>
            </h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {t.livePreviewSubtitle}
            </p>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Font Selector for Preview */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700 text-xs shadow-sm">
            <Type className="w-3.5 h-3.5 text-slate-500 ml-1" />
            <button
              onClick={() => setPreviewFontFamily('FM-Abhaya')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                previewFontFamily === 'FM-Abhaya'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600'
              }`}
            >
              FM-Abhaya
            </button>
            <button
              onClick={() => setPreviewFontFamily('FM-Derana')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                previewFontFamily === 'FM-Derana'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600'
              }`}
            >
              FM-Derana
            </button>
          </div>

          {/* Color & Contrast Options */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700 text-xs shadow-sm">
            <Palette className="w-3.5 h-3.5 text-slate-500 ml-1" />
            <button
              onClick={() => {
                setPreviewBg('white');
                setPreviewTextColor('black');
              }}
              className={`w-6 h-6 rounded-md border ${
                previewBg === 'white' ? 'ring-2 ring-indigo-500' : 'border-slate-300'
              } bg-white`}
              title="White Background"
            />
            <button
              onClick={() => {
                setPreviewBg('warm');
                setPreviewTextColor('black');
              }}
              className={`w-6 h-6 rounded-md border ${
                previewBg === 'warm' ? 'ring-2 ring-indigo-500' : 'border-slate-300'
              } bg-amber-100`}
              title="Paper Warm Background"
            />
            <button
              onClick={() => {
                setPreviewBg('dark');
                setPreviewTextColor('slate');
              }}
              className={`w-6 h-6 rounded-md border ${
                previewBg === 'dark' ? 'ring-2 ring-indigo-500' : 'border-slate-600'
              } bg-slate-900`}
              title="Dark Background"
            />
          </div>

          {/* Alignment controls */}
          <div className="hidden sm:flex items-center gap-0.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setTextAlign('left')}
              className={`p-1.5 rounded-lg ${
                textAlign === 'left'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
              }`}
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTextAlign('center')}
              className={`p-1.5 rounded-lg ${
                textAlign === 'center'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
              }`}
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTextAlign('right')}
              className={`p-1.5 rounded-lg ${
                textAlign === 'right'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
              }`}
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>

          {/* Font size slider */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm">
            <ZoomIn className="w-4 h-4 text-slate-500" />
            <input
              type="range"
              min="18"
              max="64"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-20 sm:w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              title={`Preview Font Size: ${fontSize}px`}
            />
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 w-9 text-right">
              {fontSize}px
            </span>
          </div>
        </div>
      </div>

      {/* Rendered Visual Container */}
      <div
        className={`p-6 sm:p-10 min-h-[160px] max-h-[400px] overflow-y-auto border-y transition-colors ${bgStyles[previewBg]}`}
      >
        <div
          style={{
            fontFamily: previewFontFamily,
            fontSize: `${fontSize}px`,
            textAlign: textAlign,
            color: textColors[previewTextColor],
            lineHeight: 1.6,
          }}
          className="font-normal break-words whitespace-pre-wrap select-text selection:bg-indigo-300 dark:selection:bg-indigo-800"
        >
          {displayContent}
        </div>
      </div>

      {/* Footer hint */}
      <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-950/80 text-xs text-slate-700 dark:text-slate-300 flex flex-wrap items-center justify-between gap-3">
        <span className="font-medium">
          💡 <strong>Photoshop / Illustrator උපදෙස:</strong> මෙම පෙළ Copy කර Photoshop හි Type Tool මඟින් Paste කළ පසු, font menu එකෙන් <strong>"{activeFont?.name || 'FM-Abhaya'}"</strong> තෝරන්න.
        </span>
        <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
          ● TrueType Font Loaded
        </span>
      </div>
    </div>
  );
};
