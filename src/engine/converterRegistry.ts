import { convertUnicodeToFm } from './unicodeToFm';
import { fmAbayaToUnicode } from './fmToUnicode';
import { unicodeToDlManel } from './unicodeToDl';
import { dlManelToUnicode } from './dlToUnicode';
import { singlishToUnicode } from './singlishToUnicode';

export type ConversionDirection = 'unicode_to_legacy' | 'legacy_to_unicode' | 'singlish_to_unicode';

export type TargetFont = 'fm-abhaya' | 'fm-derana' | 'dl-manel' | 'wijeya';

export interface FontOption {
  id: TargetFont;
  name: string;
  category: 'FM Series' | 'DL Series' | 'Wijeya Format';
  cssFamily: string;
  previewFont: string;
  description: string;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'fm-abhaya',
    name: 'FM-Abhaya',
    category: 'FM Series',
    cssFamily: "'FM-Abhaya', sans-serif",
    previewFont: 'FM-Abhaya',
    description: 'The Sri Lankan industry standard font for newspapers, publishing, and graphic design.'
  },
  {
    id: 'fm-derana',
    name: 'FM-Derana',
    category: 'FM Series',
    cssFamily: "'FM-Derana', 'FM-Abhaya', sans-serif",
    previewFont: 'FM-Derana',
    description: 'Modern bold display font widely used in media, branding, and posters.'
  },
  {
    id: 'dl-manel',
    name: 'DL-Manel',
    category: 'DL Series',
    cssFamily: "'FM-Abhaya', sans-serif",
    previewFont: 'FM-Abhaya',
    description: 'Classic book font popular in government and legal document publishing.'
  },
  {
    id: 'wijeya',
    name: 'Wijeya / Singree',
    category: 'Wijeya Format',
    cssFamily: "'FM-Abhaya', sans-serif",
    previewFont: 'FM-Abhaya',
    description: 'Wijeya Sinhala layout standard font for local typewriters and desktop publishing.'
  }
];

export function convertText(
  inputText: string,
  direction: ConversionDirection,
  targetFont: TargetFont = 'fm-abhaya'
): string {
  if (!inputText) return '';

  if (direction === 'singlish_to_unicode') {
    return singlishToUnicode(inputText);
  }

  if (direction === 'unicode_to_legacy') {
    switch (targetFont) {
      case 'dl-manel':
        return unicodeToDlManel(inputText);
      case 'fm-abhaya':
      case 'fm-derana':
      case 'wijeya':
      default:
        return convertUnicodeToFm(inputText);
    }
  }

  if (direction === 'legacy_to_unicode') {
    switch (targetFont) {
      case 'dl-manel':
        return dlManelToUnicode(inputText);
      case 'fm-abhaya':
      case 'fm-derana':
      case 'wijeya':
      default:
        return fmAbayaToUnicode(inputText);
    }
  }

  return inputText;
}
