# Product Requirement Document (PRD): Advanced Sinhala Unicode to Legacy/Normal Font Converter Web Application

## 1. Project Overview & Vision
The objective of this project is to build a high-performance, responsive, and intuitive web-based converter that converts standard Sinhala Unicode text into traditional/legacy Sinhala ASCII fonts (such as FM-Abhaya, DL-Manel, Wijeya, FM-Derana, etc.) and vice versa.

Legacy fonts are widely used in printing, graphic design (Adobe Photoshop, Illustrator), and local typesetting. Since standard Sinhala Unicode text distorts when typed into legacy font environments, this tool bridges the gap seamlessly.

---

## 2. Target Audience & Business Requirements
* **Target Users:** Graphic designers, printing press operators, content editors, journalists, legal typists, and students in Sri Lanka.
* **Business Goals:**
  * **SEO Dominance:** High organic traffic by optimizing for search queries like *Sinhala Unicode Converter*, *Unicode to FM Abhaya*, *DL Manel Converter*, *Unicode to DL Converter*.
  * **User Retention:** Fast rendering, 0ms conversion latency, instant copy/download utilities.
  * **Monetization Readiness:** Integrated ad slots (Google AdSense 728x90 desktop banner, 300x250 mobile banners) and API infrastructure for potential bulk conversion services.

---

## 3. Key Features & Functional Specifications

### 3.1 Converter Core Engine
* **Bi-Directional Conversion:**
  * Sinhala Unicode $\rightarrow$ Legacy/Normal Fonts (FM Series, DL Series, Wijeya, etc.)
  * Legacy/Normal Fonts $\rightarrow$ Sinhala Unicode
* **Character Mapping Architecture:**
  * Complex character combination handling (e.g., Kombuva `ෙ`, Bandi Akuru, Repaya, Yansaya, Rakaransaya).
  * Position re-ordering logic (e.g., in Unicode, vowel signs like Kombuva `ෙ` appear after the consonant, whereas in ASCII/Legacy fonts, the visual glyph appears before the consonant).

### 3.2 Key Application Features
1. **Real-Time Input/Output Processing:** Live state updates as the user types or pastes text.
2. **Font Selector Dropdown:**
  * Standard FM Fonts (FM-Abhaya, FM-Derana, FM-Rajitha, etc.)
  * DL Fonts (DL-Manel, DL-Araliya, etc.)
  * Wijeya / Singree / Helabasa formats.
3. **Utility Actions:**
  * **One-Click Copy:** Copy output text directly to clipboard.
  * **Clear All:** Single button to reset both input and output fields.
  * **Download Output:** Export converted text as `.txt` or `.docx` file.
  * **Live Font Preview:** Custom font-face preview for output text.
4. **Offline Capability (PWA Support):** Entire conversion logic must execute client-side via JavaScript without relying on server-side requests.

---

## 4. Technical Architecture & Tech Stack

### Recommended Stack
* **Frontend Framework:** Next.js (React) or Vite + React
  * *Reason:* SSR/SSG capabilities for maximum speed, SEO ranking, and lightweight deployment (Vercel/Netlify).
* **Styling & UI:** Tailwind CSS + Radix UI / Shadcn UI
* **State & Engine:** Pure JavaScript Regex/String Replacement Mapping Modules.
* **Analytics & Meta:** GA4, OpenGraph meta tags, Schema.org WebApplication structured data.

---

## 5. Core Converter Engine Implementation (JavaScript Code Template)

```javascript
/**
 * Sinhala Unicode to FM-Abhaya / Legacy Font Converter Engine
 */

// Mapping array for Unicode to FM-Abhaya ASCII character equivalents
const unicodeToFmAbhayaMap = [
  // Special combinations / Ligatures / Modifiers
  { u: '්‍ර', l: '්‍ර' }, // Rakaransaya
  { u: '්‍ය', l: '්‍ය' }, // Yansaya
  { u: 'ං', l: 'ං' },  // Anusvaraya
  { u: 'ඃ', l: 'ඃ' },  // Visargaya
  
  // Independent Vowels
  { u: 'අ', l: 'අ' }, { u: 'ආ', l: 'ආ' }, { u: 'ඇ', l: 'ඇ' }, { u: 'ඈ', l: 'ඈ' },
  { u: 'ඉ', l: 'ඉ' }, { u: 'ඊ', l: 'ඊ' }, { u: 'උ', l: 'උ' }, { u: 'ඌ', l: 'ඌ' },
  { u: 'එ', l: 'එ' }, { u: 'ඒ', l: 'ඒ' }, { u: 'ඔ', l: 'ඔ' }, { u: 'ඕ', l: 'ඕ' },
  
  // Consonants
  { u: 'ක', l: 'ක' }, { u: 'ඛ', l: 'ඛ' }, { u: 'ග', l: 'ග' }, { u: 'ඝ', l: 'ඝ' },
  { u: 'ච', l: 'ච' }, { u: 'ඡ', l: 'ඡ' }, { u: 'ජ', l: 'ජ' }, { u: 'ඣ', l: 'ඣ' },
  { u: 'ට', l: 'ට' }, { u: 'ඨ', l: 'ඨ' }, { u: 'ඩ', l: 'ඩ' }, { u: 'ඪ', l: 'ඪ' },
  { u: 'ණ', l: 'ණ' }, { u: 'ත', l: 'ත' }, { u: 'ථ', l: 'ථ' }, { u: 'ද', l: 'ද' },
  { u: 'ධ', l: 'ධ' }, { u: 'න', l: 'න' }, { u: 'ප', l: 'ප' }, { u: 'ඵ', l: 'ඵ' },
  { u: 'බ', l: 'බ' }, { u: 'භ', l: 'භ' }, { u: 'ම', l: 'ම' }, { u: 'ය', l: 'ය' },
  { u: 'ර', l: 'ර' }, { u: 'ල', l: 'ල' }, { u: 'ව', l: 'ව' }, { u: 'ශ', l: 'ශ' },
  { u: 'ෂ', l: 'ෂ' }, { u: 'ස', l: 'ස' }, { u: 'හ', l: 'හ' }, { u: 'ළ', l: 'ළ' },
  { u: 'ෆ', l: 'ෆ' }
];

/**
 * Re-orders vowel signs (like Kombuva 'ෙ') before consonant for ASCII legacy fonts
 */
function fixKombuvaPosition(text) {
  // Regex to swap Kombuva position: [Consonant][Kombuva] -> [Kombuva][Consonant]
  return text.replace(/([\u0D9A-\u0DC6])(ෙ)/g, '$2$1');
}

/**
 * Main Conversion Function
 */
export function convertUnicodeToLegacy(inputStr, targetFont = 'FM-Abhaya') {
  if (!inputStr) return '';
  
  let convertedText = inputStr;
  
  // Step 1: Pre-processing & Kombuva positioning
  convertedText = fixKombuvaPosition(convertedText);
  
  // Step 2: Replace characters based on mapping table
  unicodeToFmAbhayaMap.forEach(rule => {
    const regex = new RegExp(rule.u, 'g');
    convertedText = convertedText.replace(regex, rule.l);
  });
  
  return convertedText;
}