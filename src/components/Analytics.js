import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

const GOATCOUNTER_ENDPOINT = 'https://witold1.goatcounter.com/count';
const GA_MEASUREMENT_ID = 'G-2FXQDXBK8B';
const CLARITY_PROJECT_ID = 'ye78zzt6nm';

/** Match witold1-github-home: live host only, override with ?analytics=true|false */
function isAnalyticsEnabled() {
  if (typeof window === 'undefined') return false;
  const isLiveSite = window.location.hostname === 'witold1.github.io';
  let override = null;
  try {
    const raw = new URLSearchParams(window.location.search).get('analytics');
    override = raw == null ? null : raw.toLowerCase();
  } catch {
    /* ignore */
  }
  return override === 'true' ? true : override === 'false' ? false : isLiveSite;
}

function currentPagePath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function trackPageview() {
  const path = currentPagePath();
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, { page_path: path });
  }
  if (window.goatcounter && typeof window.goatcounter.count === 'function') {
    window.goatcounter.count({ path });
  }
}

/**
 * GoatCounter, GA4, Microsoft Clarity, (same IDs / gating as witold1-github-home).
 * Initial load is handled by the vendor scripts; SPA navigations get explicit pageviews.
 */
export default function Analytics() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isAnalyticsEnabled());
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const onRoute = () => {
      trackPageview();
    };
    router.events.on('routeChangeComplete', onRoute);
    return () => {
      router.events.off('routeChangeComplete', onRoute);
    };
  }, [enabled, router.events]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src="//gc.zgo.at/count.js"
        data-goatcounter={GOATCOUNTER_ENDPOINT}
        strategy="afterInteractive"
      />
      <Script id="ms-clarity" strategy="afterInteractive">{`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}</Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
      `}</Script>
    </>
  );
}
