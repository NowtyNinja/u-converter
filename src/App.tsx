import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ConverterCard } from './components/ConverterCard';
import { AdSlot } from './components/AdSlot';
import { SeoGuideSection } from './components/SeoGuideSection';
import { Footer } from './components/Footer';
import { Language } from './utils/translations';
import { Zap, ShieldCheck, Download, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('si');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('u_converter_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('u_converter_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('u_converter_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-3 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-800 shadow-sm mb-4">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>0ms Conversion Latency • 100% Client-Side Engine</span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto leading-tight">
            {lang === 'si' ? (
              <>
                සිංහල යුනිකේත සහ{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  FM-Abhaya / DL
                </span>{' '}
                අකුරු පරිවර්තකය
              </>
            ) : (
              <>
                Advanced Sinhala Unicode to{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  FM-Abhaya & Legacy
                </span>{' '}
                Font Converter
              </>
            )}
          </h1>

          {/* Description */}
          <p className="mt-3.5 text-sm sm:text-base md:text-lg text-slate-800 dark:text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed">
            {lang === 'si'
              ? 'Adobe Photoshop, Illustrator සහ මුද්‍රණ කටයුතු සඳහා සිංහල යුනිකේත පෙළ කිසිදු අකුරු විකෘතියකින් තොරව FM-Abhaya, FM-Derana, DL-Manel හා Wijeya ෆොන්ට් වලට ක්ෂණිකව පරිවර්තනය කරන්න.'
              : 'Convert standard Sinhala Unicode into FM-Abhaya, FM-Derana, DL-Manel, and Wijeya legacy ASCII fonts seamlessly for printing, Adobe Photoshop, and Illustrator.'}
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-sm text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {lang === 'si' ? '100% නිවැරදි කොම්බුව හා බැඳි අකුරු' : 'Accurate Kombuva & Bandi Akuru'}
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-sm text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {lang === 'si' ? '.txt සහ .docx අපනයනය' : '.txt & .docx Export'}
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-sm text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              {lang === 'si' ? 'සජීවී FM අකුරු පෙරදසුන' : 'Live FM Font Preview'}
            </span>
          </div>
        </div>

        {/* Top Ad Slot (Hidden when disabled) */}
        <AdSlot slotId="topBanner" type="leaderboard" className="my-4" />

        {/* Primary Interactive Converter Card */}
        <ConverterCard lang={lang} />

        {/* Mid Page Ad Banner (Hidden when disabled) */}
        <AdSlot slotId="middleBanner" type="leaderboard" className="my-6" />

        {/* Educational SEO & Design Workflow Guide Section */}
        <SeoGuideSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
};

export default App;
