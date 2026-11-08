const ANALYTICS_KEY = 'tn-analytics-choice';
const PREFERENCE_EVENT = 'tn-analytics-change';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function analyticsAllowed() {
  try { return window.localStorage.getItem(ANALYTICS_KEY) === 'yes'; } catch { return false; }
}

export function subscribeAnalytics(callback: () => void) {
  window.addEventListener(PREFERENCE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(PREFERENCE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function setAnalyticsAllowed(allowed: boolean) {
  try {
    window.localStorage.setItem(ANALYTICS_KEY, allowed ? 'yes' : 'no');
    window.dispatchEvent(new Event(PREFERENCE_EVENT));
    return true;
  } catch {
    return false;
  }
}

type AnalyticsItem = { item_id: string; item_name: string; price: number; quantity: number };

export function trackCommerce(event: 'add_to_cart' | 'purchase', data: {
  value: number;
  items: AnalyticsItem[];
  transaction_id?: string;
}) {
  if (!GA_ID || !/^G-[A-Z0-9]+$/.test(GA_ID) || !analyticsAllowed()) return;
  const browser = window as Window & { gtag?: (...args: unknown[]) => void };
  browser.gtag?.('event', event, { ...data, currency: 'VND' });
}
