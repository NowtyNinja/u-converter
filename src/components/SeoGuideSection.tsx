import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, AlertCircle } from 'lucide-react';
import { Language } from '../utils/translations';

interface SeoGuideSectionProps {
  lang: Language;
}

export const SeoGuideSection: React.FC<SeoGuideSectionProps> = ({ lang }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'යුනිකේත (Unicode) සහ පැරණි අකුරු (FM / Legacy Fonts) අතර වෙනස කුමක්ද?',
      qEn: 'What is the difference between Sinhala Unicode and Legacy fonts (FM / DL)?',
      a: 'යුනිකේත (Unicode) යනු අන්තර්ජාලය, ජංගම දුරකථන සහ නවීන වෙබ් අඩවි සඳහා භාවිත කරන ජාත්‍යන්තර ප්‍රමිතියයි. නමුත් Adobe Photoshop, Illustrator, CorelDraw වැනි Graphic Design මෘදුකාංග සහ මුද්‍රණාල වල පැරණි ASCII ෆොන්ට් (FM-Abhaya, DL-Manel ආදී) බහුලව භාවිත කෙරේ. යුනිකේත පෙළක් කෙලින්ම Photoshop වෙත දැමූ විට අකුරු කැඩී විකෘති වන බැවින්, මෙම පරිවර්තකය මඟින් එය FM ෆොන්ට් වලට ගැළපෙන පරිදි සකසා දේ.',
      aEn: 'Unicode is the modern international standard used on the web, mobile phones, and modern operating systems. However, printing presses and design tools like Adobe Photoshop, Illustrator, and CorelDraw widely use legacy ASCII fonts like FM-Abhaya and DL-Manel. When Unicode text is pasted into Photoshop, vowel signs and ligatures distort. U Converter rearranges glyphs so they render perfectly.'
    },
    {
      q: 'Photoshop / Illustrator වලට අකුරු Paste කළ පසු අකුරු වෙනුවට ඉංග්‍රීසි අකුරු පෙනෙන්නේ ඇයි?',
      qEn: 'Why does converted text appear as random English letters in Photoshop?',
      a: 'පැරණි FM / DL ෆොන්ට් ක්‍රියා කරන්නේ ASCII ආකෘතියෙනි (උදාහරණයක් ලෙස "fl" යනු FM-Abhaya වල "කෙ" වේ). එම නිසා Photoshop හි Text Tool එක තෝරාගෙන, එහි Font Family එක ලෙස "FM-Abhaya" හෝ ඔබ තෝරාගත් FM ෆොන්ට් එක තෝරා දිය යුතුය. එවිට ඉංග්‍රීසි අකුරු වෙනුවට නියම සිංහල අකුරු දිස්වේ.',
      aEn: 'Legacy fonts use standard ASCII keystrokes (for example, "fl" displays as "කෙ" in FM-Abhaya). In Photoshop, make sure to select the text and set its font family to "FM-Abhaya" (or your selected FM font) in the Character panel.'
    },
    {
      q: 'කොම්බුව (ෙ), ඇලපිල්ල (ා), සහ බැඳි අකුරු කැඩෙන්නේ නැතුව නිවැරදිව පරිවර්තනය වේද?',
      qEn: 'Does this converter properly handle Kombuva (ෙ) and Bandi Akuru (බැඳි අකුරු)?',
      a: 'ඔව්! අපගේ පරිවර්තකය කොළඹ විශ්වවිද්‍යාල පරිගණක අධ්‍යයනායතනයේ (UCSC LTRL) ප්‍රමිතියට අනුව සකසා ඇති බැවින්, කොම්බුවේ පිහිටීම ඉදිරියට ගෙන ඒම (Vowel re-ordering), රාකාරංශය (්‍ර), යන්සය (්‍ය), සහ බැඳි අකුරු 100% ක් නිවැරදිව පරිවර්තනය කරයි.',
      aEn: 'Yes! U Converter implements the official UCSC Language Technology Research Laboratory standards, correctly repositioning the Kombuva prefix before consonants and accurately translating Rakaransaya, Yansaya, and Bandi Akuru ligatures.'
    },
    {
      q: 'මෙම පරිවර්තකය Offline (අන්තර්ජාලය නොමැතිව) භාවිත කළ හැකිද?',
      qEn: 'Can I use this converter offline without an internet connection?',
      a: 'ඔව්! මෙම මුළු පරිවර්තන එන්ජිමම 100% ක් ඔබගේ Browser එක තුළ Client-Side ධාවනය වේ. කිසිදු දත්තයක් සේවාදායකයකට (Server) නොයන බැවින් ක්ෂණිකව (0ms Latency) සහ පූර්ණ ආරක්ෂිතව ක්‍රියා කරයි. PWA තාක්ෂණය හරහා Offline ද භාවිත කළ හැක.',
      aEn: 'Yes! The entire conversion logic executes directly inside your browser on the client side with 0ms latency. No text is sent to an external server, making it completely private and offline-capable.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t-2 border-slate-300 dark:border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Graphic Design Workflow Guide */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                {lang === 'si'
                  ? 'Photoshop සහ Illustrator වල සිංහල අකුරු භාවිතය'
                  : 'How to use Sinhala fonts in Adobe Photoshop & Illustrator'}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'si'
                  ? 'අකුරු කැඩී යාමකින් තොරව පරිපූර්ණ ග්‍රැෆික් නිර්මාණ සඳහා පියවරෙන් පියවර මඟපෙන්වීම'
                  : 'Step-by-step workflow for zero-distortion typography in graphic design'}
              </p>
            </div>
          </div>

          {/* Steps Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                01
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {lang === 'si' ? 'යුනිකේත පරිවර්තනය' : 'Convert Text'}
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === 'si'
                  ? 'ඔබගේ සිංහල පෙළ U Converter වෙත ඇතුළත් කර "Copy" බොත්තම ඔබන්න.'
                  : 'Paste your Sinhala Unicode text into U Converter and copy the output.'}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                02
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {lang === 'si' ? 'Photoshop වෙත Paste කරන්න' : 'Paste in Photoshop'}
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === 'si'
                  ? 'Adobe Photoshop හි Type Tool (T) තෝරාගෙන පෙළ Paste (Ctrl+V) කරන්න.'
                  : 'Select the Type Tool (T) in Photoshop / Illustrator and paste the text.'}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                03
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {lang === 'si' ? 'FM Font එක තෝරන්න' : 'Select FM Font'}
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === 'si'
                  ? 'Character panel එකෙන් "FM-Abhaya" හෝ ඔබ තෝරාගත් FM ෆොන්ට් එක තෝරන්න.'
                  : 'Highlight the text and select "FM-Abhaya" from your fonts list.'}
              </p>
            </div>
          </div>

          {/* Pro Tips Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 text-xs sm:text-sm space-y-2 text-amber-950 dark:text-amber-100 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>{lang === 'si' ? 'Adobe Paragraph Composer වැදගත් සැකසුම:' : 'Adobe Paragraph Composer Important Setting:'}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-amber-900 dark:text-amber-200">
              {lang === 'si'
                ? 'Adobe Photoshop / InDesign හි Paragraph Panel එකේ මෙනුවෙන් "Latin and East Asian Layout" තෝරා තබන්න. "World-Ready Layout" තිබුණහොත් ඇතැම් පැරණි ASCII අකුරු පෙරළි වැරදි ලෙස දිස්විය හැක.'
                : 'In Adobe Photoshop or InDesign, ensure your Paragraph panel menu is set to "Latin and East Asian Layout" rather than "World-Ready Layout" when working with ASCII legacy fonts.'}
            </p>
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-violet-600 text-white shadow-sm">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                {lang === 'si' ? 'නිතර අසන ප්‍රශ්න' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'si' ? 'පරිවර්තනය පිළිබඳ වැදගත් කරුණු' : 'Key information about Sinhala conversions'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  >
                    <span>{lang === 'si' ? faq.q : faq.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3 animate-in fade-in duration-150">
                      {lang === 'si' ? faq.a : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
