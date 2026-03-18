import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalyticsConsent, initAnalytics, trackPageView } from "../lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const syncAnalytics = async () => {
      if (!hasAnalyticsConsent()) {
        return;
      }

      await initAnalytics();
      trackPageView(`${location.pathname}${location.search}`);
    };

    void syncAnalytics();
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsTracker;