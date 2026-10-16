import React from 'react';
import { Heart } from 'lucide-react';
import { Language } from '../utils/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side credit */}
        <div className="text-center sm:text-left space-y-1">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {lang === 'si'
              ? 'U Converter — සිංහල යුනිකේත සහ FM/DL පැරණි අකුරු පරිවර්තකය'
              : 'U Converter — Advanced Sinhala Unicode & Legacy Font Converter'}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {lang === 'si'
              ? 'පරිවර්තන නීති පද්ධතිය කොළඹ විශ්වවිද්‍යාල පරිගණක අධ්‍යයනායතනයේ (UCSC LTRL) පර්යේෂණ පදනම් කරගනිමින් නවීකරණය කරන ලදී.'
              : 'Conversion algorithm derived and modernized from research by Language Technology Research Laboratory (LTRL), University of Colombo School of Computing (UCSC).'}
          </p>
        </div>

        {/* Right side copyright */}
        <div className="flex items-center gap-1.5 text-center sm:text-right">
          <span>{lang === 'si' ? 'නිර්මාණය කළේ' : 'Made with'}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>
            {lang === 'si'
              ? 'ශ්‍රී ලාංකික නිර්මාණකරුවන්, මාධ්‍යවේදීන් සහ සිසුන් වෙනුවෙනි.'
              : 'for Sri Lankan creators, journalists & students.'}
          </span>
        </div>
      </div>
    </footer>
  );
};
