const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";
const GA_SCRIPT_ID = "google-analytics-script";

export const COOKIE_CONSENT_KEY = "cookie_consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsReady = false;
let analyticsLoadingPromise: Promise<void> | null = null;

const injectAnalyticsScript = () => {
  if (document.getElementById(GA_SCRIPT_ID)) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Analytics."));
    document.head.appendChild(script);
  });
};

export const isAnalyticsConfigured = () => Boolean(GA_MEASUREMENT_ID);

export const hasAnalyticsConsent = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
};

export const initAnalytics = async () => {
  if (typeof window === "undefined" || analyticsReady || !isAnalyticsConfigured()) {
    return;
  }

  if (!analyticsLoadingPromise) {
    analyticsLoadingPromise = injectAnalyticsScript().then(() => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
      analyticsReady = true;
    });
  }

  await analyticsLoadingPromise;
};

export const trackPageView = (path = `${window.location.pathname}${window.location.search}`) => {
  if (typeof window === "undefined" || !analyticsReady || !window.gtag || !isAnalyticsConfigured()) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};