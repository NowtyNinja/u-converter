import React, { useState } from 'react';
import { X, Search, Sparkles, BookOpen, Lightbulb, ArrowRight, Check } from 'lucide-react';
import { Language } from '../utils/translations';

interface SinglishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample?: (sampleText: string) => void;
  lang: Language;
}

export const SinglishGuideModal: React.FC<SinglishGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
  lang,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const complexWords = [
    {
      word: 'මඤ්ඤෝක්කා',
      singlish: 'manynyoekkaa',
      altSinglish: 'maKNKNoekkaa',
      breakdown: [
        { part: 'ම', code: 'ma' },
        { part: 'ඤ්', code: 'ny / KN' },
        { part: 'ඤෝ', code: 'nyoe / KNoe' },
        { part: 'ක්', code: 'k' },
        { part: 'කා', code: 'kaa' },
      ],
      desc: 'ඤ් සහ ඤෝ එක ළඟ ඇති අසීරු වචන ටයිප් කරන ආකාරය'
    },
    {
      word: 'ප්‍රඥාව',
      singlish: 'pragnaava',
      altSinglish: 'praGNaava',
      breakdown: [
        { part: 'ප්‍ර', code: 'pra / pRa' },
        { part: 'ඥා', code: 'gnaa / GNaa' },
        { part: 'ව', code: 'va' },
      ],
      desc: 'රාකාරංශය සහ ඥ අකුර සහිත වචන'
    },
    {
      word: 'ශ්‍රී ලංකාව',
      singlish: 'shRee la\\nkaava',
      altSinglish: 'shri la\\nkaava',
      breakdown: [
        { part: 'ශ්‍රී', code: 'shRee / shri' },
        { part: 'ල', code: 'la' },
        { part: 'ං', code: '\\n' },
        { part: 'කා', code: 'kaa' },
        { part: 'ව', code: 'va' },
      ],
      desc: 'ශ්‍රී සහ අනුස්වාරය (ං) ඇතුළත් කිරීම'
    },
    {
      word: 'අඟහරුවාදා',
      singlish: 'anngaharuvaadhaa',
      altSinglish: 'anngaharuvaadhaa',
      breakdown: [
        { part: 'අ', code: 'a' },
        { part: 'ඟ', code: 'nng' },
        { part: 'හ', code: 'ha' },
        { part: 'රු', code: 'ru' },
        { part: 'වා', code: 'vaa' },
        { part: 'දා', code: 'dhaa' },
      ],
      desc: 'සඤ්ඤක ඟ (nng) අකුර'
    },
    {
      word: 'සඳවත',
      singlish: 'sanndhavatha',
      altSinglish: 'sanndhavatha',
      breakdown: [
        { part: 'ස', code: 'sa' },
        { part: 'ඳ', code: 'nndh' },
        { part: 'ව', code: 'va' },
        { part: 'ත', code: 'tha' },
      ],
      desc: 'සඤ්ඤක ඳ (nndh) අකුර'
    },
    {
      word: 'ගැටළුව',
      singlish: 'gAetLuva',
      altSinglish: 'gAetLuva',
      breakdown: [
        { part: 'ගැ', code: 'gAe / gA' },
        { part: 'ට', code: 'ta' },
        { part: 'ළු', code: 'Lu' },
        { part: 'ව', code: 'va' },
      ],
      desc: 'මූර්ධජ ළු (Lu) අකුර'
    },
    {
      word: 'ධර්මය',
      singlish: 'Dharmaya',
      altSinglish: 'DhaRmaya',
      breakdown: [
        { part: 'ධ', code: 'Dha' },
        { part: 'ර්‍ම', code: 'Rma' },
        { part: 'ය', code: 'ya' },
      ],
      desc: 'රේඵය (R) භාවිතය'
    }
  ];

  const alphabetCategories = [
    {
      name: 'ස්වර (Vowels)',
      items: [
        { char: 'අ', code: 'a' },
        { char: 'ආ', code: 'aa / a)' },
        { char: 'ඇ', code: 'A' },
        { char: 'ඈ', code: 'Aa / ae' },
        { char: 'ඉ', code: 'i' },
        { char: 'ඊ', code: 'ii / ee' },
        { char: 'උ', code: 'u' },
        { char: 'ඌ', code: 'uu / oo' },
        { char: 'එ', code: 'e' },
        { char: 'ඒ', code: 'ee / ea' },
        { char: 'ඓ', code: 'I' },
        { char: 'ඔ', code: 'o' },
        { char: 'ඕ', code: 'oe / o) / O' },
        { char: 'ඖ', code: 'au' },
      ]
    },
    {
      name: 'විශේෂ අකුරු (Special Consonants)',
      items: [
        { char: 'ඤ (ඤ්ඤෝ)', code: 'ny / KN' },
        { char: 'ඥ', code: 'gn / GN' },
        { char: 'ඟ', code: 'nng' },
        { char: 'ඳ', code: 'nndh' },
        { char: 'ඬ', code: 'nnd' },
        { char: 'ඹ', code: 'B' },
        { char: 'ණ', code: 'N' },
        { char: 'ළ', code: 'L' },
        { char: 'ළු', code: 'Lu' },
        { char: 'ශ', code: 'sh' },
        { char: 'ෂ', code: 'Sh' },
        { char: 'ං (අනුස්වාරය)', code: '\\n' },
        { char: 'ර්‍ (රේඵය)', code: 'R' },
        { char: '්‍ය (යන්සය)', code: 'Y' },
        { char: '්‍ර (රාකාරංශය)', code: 'r' },
      ]
    },
    {
      name: 'ව්‍යංජන (Base Consonants)',
      items: [
        { char: 'ක', code: 'ka' },
        { char: 'ඛ', code: 'kha' },
        { char: 'ග', code: 'ga' },
        { char: 'ඝ', code: 'gha' },
        { char: 'ච', code: 'cha' },
        { char: 'ඡ', code: 'Cha' },
        { char: 'ජ', code: 'ja' },
        { char: 'ට', code: 'ta' },
        { char: 'ඨ', code: 'Ta' },
        { char: 'ඩ', code: 'da' },
        { char: 'ඪ', code: 'Da' },
        { char: 'ත', code: 'tha' },
        { char: 'ථ', code: 'Tha' },
        { char: 'ද', code: 'dha' },
        { char: 'ධ', code: 'Dha' },
        { char: 'න', code: 'na' },
        { char: 'ප', code: 'pa' },
        { char: 'ඵ', code: 'Pha / Pa' },
        { char: 'බ', code: 'ba' },
        { char: 'භ', code: 'bha' },
        { char: 'ම', code: 'ma' },
        { char: 'ය', code: 'ya' },
        { char: 'ර', code: 'ra' },
        { char: 'ල', code: 'la' },
        { char: 'ව', code: 'va / wa' },
        { char: 'ස', code: 'sa' },
        { char: 'හ', code: 'ha' },
        { char: 'ෆ', code: 'fa' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                {lang === 'si'
                  ? 'Singlish ටයිපින් මාර්ගෝපදේශය (Singlish Guide)'
                  : 'Singlish Typing Guide & Cheat Sheet'}
              </h2>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {lang === 'si'
                  ? 'මඤ්ඤෝක්කා, ප්‍රඥාව, ශ්‍රී ලංකා වැනි අසීරු වචන ටයිප් කරන ආකාරය'
                  : 'How to type complex words like මඤ්ඤෝක්කා, ප්‍රඥාව, and full alphabet reference'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7">
          {/* SPECIAL HIGHLIGHT CARD: මඤ්ඤෝක්කා Case Study */}
          <div className="rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/70 dark:from-indigo-950/40 dark:via-slate-900 dark:to-violet-950/30 p-5 sm:p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h3 className="text-sm sm:text-base font-extrabold text-indigo-950 dark:text-indigo-200">
                {lang === 'si'
                  ? 'විශේෂ උදාහරණය: "මඤ්ඤෝක්කා" ටයිප් කරන්නේ කෙසේද?'
                  : 'Key Example: How to type "මඤ්ඤෝක්කා"?'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {lang === 'si'
                ? 'මඤ්ඤෝක්කා වැනි වචන වල ඤ් සහ ඤෝ අකුරු දෙකම එක ළඟ ඇති බැවින්, Singlish මඟින් ටයිප් කිරීමට පහත අකුරු අනුපිළිවෙල භාවිත කරන්න:'
                : 'Words like "මඤ්ඤෝක්කා" contain consecutive ඤ् and ඤෝ glyphs. Type the following keystrokes in sequence:'}
            </p>

            {/* Step breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 text-center shadow-sm">
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 block font-sinhala">ම</span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">ma</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 text-center shadow-sm">
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 block font-sinhala">ඤ්</span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">ny (KN)</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 text-center shadow-sm">
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 block font-sinhala">ඤෝ</span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">nyoe (KNoe)</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 text-center shadow-sm">
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 block font-sinhala">ක්</span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">k</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 text-center shadow-sm col-span-2 sm:col-span-1">
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 block font-sinhala">කා</span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">kaa</span>
              </div>
            </div>

            {/* Quick Copy / Try-It Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-200 dark:border-indigo-900/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ටයිප් කළ යුතු පෙළ:</span>
                <code className="px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 font-mono font-extrabold text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm border border-indigo-300 dark:border-indigo-800 select-all">
                  manynyoekkaa
                </code>
                <span className="text-xs text-slate-500 font-semibold">(හෝ maKNKNoekkaa)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode('manynyoekkaa')}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 shadow-sm transition flex items-center gap-1"
                >
                  {copiedCode === 'manynyoekkaa' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : null}
                  <span>{copiedCode === 'manynyoekkaa' ? 'පිටපත් විය' : 'Copy'}</span>
                </button>

                {onSelectSample && (
                  <button
                    onClick={() => {
                      onSelectSample('manynyoekkaa');
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 active:scale-95"
                  >
                    <span>අත්හදා බලන්න (Try It)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* MORE COMPLEX WORDS TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>නිතර භාවිත වන අසීරු වචන (Frequently Used Complex Words):</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {complexWords.slice(1).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between gap-3 hover:border-indigo-400 dark:hover:border-indigo-700 transition"
                >
                  <div>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white block font-sinhala">
                      {item.word}
                    </span>
                    <code className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {item.singlish}
                    </code>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {item.desc}
                    </p>
                  </div>

                  {onSelectSample && (
                    <button
                      onClick={() => {
                        onSelectSample(item.singlish);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 text-xs font-bold transition shrink-0"
                      title="Try this in converter"
                    >
                      Try
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SEARCH & ALPHABET CHEAT SHEET */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                අක්ෂර මාලාව සහ කෙටි යෙදුම් (Full Singlish Alphabet Reference):
              </h3>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="අකුර සොයන්න (Search char/code)..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Categorized Alphabet Tables */}
            <div className="space-y-4">
              {alphabetCategories.map((cat, cIdx) => {
                const filteredItems = cat.items.filter(
                  (it) =>
                    it.char.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    it.code.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (filteredItems.length === 0) return null;

                return (
                  <div key={cIdx} className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      {cat.name}
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {filteredItems.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          onClick={() => handleCopyCode(item.code)}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-600 cursor-pointer flex items-center justify-between transition group shadow-sm"
                          title="Click to copy code"
                        >
                          <span className="text-base font-extrabold text-slate-900 dark:text-white font-sinhala">
                            {item.char}
                          </span>
                          <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded group-hover:bg-indigo-600 group-hover:text-white transition">
                            {item.code}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            💡 ඕනෑම අකුරක කේතය (code) පිටපත් කරගැනීමට ඒ මත ක්ලික් කරන්න.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-bold transition shadow-sm"
          >
            වසන්න (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
