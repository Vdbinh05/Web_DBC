'use client';

import { useState, useSyncExternalStore } from 'react';
import Script from 'next/script';
import { analyticsAllowed, setAnalyticsAllowed, subscribeAnalytics } from '@/lib/commerce-analytics';

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
const gaEnabled = gaId && /^G-[A-Z0-9]+$/.test(gaId);
const clarityEnabled = clarityId && /^[a-z0-9]+$/i.test(clarityId);

export default function PublicAnalytics() {
  const allowed = useSyncExternalStore(subscribeAnalytics, analyticsAllowed, () => false);
  const [storageError, setStorageError] = useState(false);

  if (!gaEnabled && !clarityEnabled) return null;

  function toggleAnalytics() {
    if (!setAnalyticsAllowed(!allowed)) {
      setStorageError(true);
      return;
    }
    setStorageError(false);
    if (allowed) window.location.reload();
  }

  return (
    <div className="mt-4 text-sam-label">
      <button type="button" aria-pressed={allowed} className="sam-focus min-h-11 rounded-sam-sm underline underline-offset-4 hover:text-sam-yellow" onClick={toggleAnalytics}>
        {allowed ? 'Tắt đo lường truy cập' : 'Cho phép đo lường truy cập'}
      </button>
      {storageError && <p role="status">Trình duyệt chưa cho phép lưu lựa chọn.</p>}
      {allowed && gaEnabled && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', ${JSON.stringify(gaId)});
          `}</Script>
        </>
      )}
      {allowed && clarityEnabled && (
        <Script id="microsoft-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments);};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", ${JSON.stringify(clarityId)});
          window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
        `}</Script>
      )}
    </div>
  );
}
