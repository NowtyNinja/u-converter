import React, { useEffect } from 'react';
import { ADS_CONFIG, AdSlotConfig } from '../config/adsConfig';
import { ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slotId?: 'topBanner' | 'middleBanner';
  type?: 'leaderboard' | 'rectangle';
  className?: string;
  customConfig?: AdSlotConfig;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'topBanner',
  type = 'leaderboard',
  className = '',
  customConfig,
}) => {
  const config = customConfig || ADS_CONFIG[slotId] || ADS_CONFIG.topBanner;

  // Run AdSense push when in adsense mode
  useEffect(() => {
    if (config.enabled && config.mode === 'adsense' && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense script error:', err);
      }
    }
  }, [config.enabled, config.mode]);

  if (!config.enabled) {
    return null;
  }

  // 1. MANUAL / CUSTOM BANNER AD (Direct Sponsor / Image + Link)
  if (config.mode === 'custom' && config.custom?.imageUrl) {
    return (
      <div
        className={`relative mx-auto overflow-hidden rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md transition-all group ${className}`}
        style={{
          width: '100%',
          maxWidth: type === 'leaderboard' ? '728px' : '300px',
          minHeight: type === 'leaderboard' ? '90px' : '250px',
        }}
      >
        <span className="absolute top-1.5 right-2 z-10 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
          SPONSORED
        </span>

        <a
          href={config.custom.targetUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full relative"
          title={config.custom.title || config.custom.altText}
        >
          <img
            src={config.custom.imageUrl}
            alt={config.custom.altText || 'Sponsor Advertisement'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            style={{ maxHeight: type === 'leaderboard' ? '110px' : '280px' }}
          />

          <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors flex items-center justify-end p-2 opacity-0 group-hover:opacity-100">
            <span className="p-1 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white shadow">
              <ExternalLink className="w-4 h-4" />
            </span>
          </div>
        </a>
      </div>
    );
  }

  // 2. REAL GOOGLE ADSENSE AD
  if (config.mode === 'adsense') {
    return (
      <div
        className={`relative mx-auto flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${className}`}
        style={{
          width: '100%',
          maxWidth: type === 'leaderboard' ? '728px' : '300px',
          minHeight: type === 'leaderboard' ? '90px' : '250px',
        }}
      >
        <span className="absolute top-1 right-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          ADVERTISEMENT
        </span>

        <ins
          className="adsbygoogle block"
          style={{
            display: 'block',
            width: '100%',
            height: type === 'leaderboard' ? '90px' : '250px',
          }}
          data-ad-client={config.adsense.client}
          data-ad-slot={config.adsense.slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // 3. PLACEHOLDER / INFORMATIVE BOX (Default state until user configures ads)
  return (
    <div
      className={`relative mx-auto flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 p-4 text-center transition-colors ${className}`}
      style={{
        width: '100%',
        maxWidth: type === 'leaderboard' ? '728px' : '300px',
        minHeight: type === 'leaderboard' ? '90px' : '250px',
      }}
    >
      <div className="absolute top-2 right-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
        ADVERTISEMENT SPACE
      </div>

      <div className="flex flex-col items-center gap-1.5 max-w-md">
        <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          {slotId === 'topBanner' ? 'Top Leaderboard (728 × 90)' : 'Middle Banner (728 × 90)'}
        </span>
        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
          Google AdSense හෝ ඔබගේම Manual Sponsor Banner මෙතැන පෙන්විය හැක.
        </p>
        <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
          Edit: src/config/adsConfig.ts
        </span>
      </div>
    </div>
  );
};
