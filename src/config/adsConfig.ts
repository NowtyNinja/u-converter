/**
 * Advertisement Configuration for U Converter
 * 
 * You can set the advertisement mode to:
 * - 'placeholder' : Shows an informative placeholder box (default)
 * - 'custom'      : Shows your own image banner with a clickable link (Manual Ads / Sponsors)
 * - 'adsense'     : Shows real Google AdSense ads automatically
 */

export interface CustomAdBanner {
  imageUrl: string;      // URL to image (e.g. '/banners/sample.jpg' or external URL)
  targetUrl: string;     // Destination link when clicked (e.g. 'https://yourwebsite.com')
  altText: string;       // Descriptive alt text
  title?: string;        // Optional title tooltip
}

export interface AdSlotConfig {
  enabled: boolean;
  mode: 'placeholder' | 'custom' | 'adsense';
  
  // Google AdSense Configuration
  adsense: {
    client: string;      // e.g. 'ca-pub-1234567890123456'
    slot: string;        // e.g. '1234567890'
  };

  // Custom Banner Configuration (Manual / Sponsor Ads)
  custom: CustomAdBanner;
}

export interface AdsSettings {
  topBanner: AdSlotConfig;
  middleBanner: AdSlotConfig;
}

export const ADS_CONFIG: AdsSettings = {
  // Top Banner (728x90 Desktop Leaderboard / Responsive)
  topBanner: {
    enabled: false, // Disabled
    mode: 'placeholder',
    adsense: {
      client: 'ca-pub-XXXXXXXXXXXXXXXX',
      slot: 'XXXXXXXXXX',
    },
    custom: {
      imageUrl: '',
      targetUrl: '',
      altText: '',
      title: '',
    },
  },

  // Middle Banner (Below Converter Card)
  middleBanner: {
    enabled: false, // Disabled
    mode: 'placeholder',
    adsense: {
      client: 'ca-pub-XXXXXXXXXXXXXXXX',
      slot: 'YYYYYYYYYY',
    },
    custom: {
      imageUrl: '',
      targetUrl: '',
      altText: '',
      title: '',
    },
  },
};
