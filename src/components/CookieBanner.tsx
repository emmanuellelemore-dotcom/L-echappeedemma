import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored !== "accepted" && stored !== "rejected") {
      setIsVisible(true);
    }
  }, []);

  const handleChoice = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card/95 p-4 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            Nous utilisons des cookies pour mesurer l'audience et améliorer le site. Vous pouvez accepter ou refuser.
            <button
              type="button"
              className="ml-2 underline text-accent hover:text-accent-foreground text-xs"
              onClick={() => setShowDetails((v) => !v)}
            >
              {showDetails ? 'Masquer les détails' : 'Détails'}
            </button>
            {showDetails && (
              <div className="mt-2 p-2 rounded bg-muted/60 text-xs text-foreground border">
                <strong>Ce que nous collectons :</strong> uniquement des statistiques anonymes de fréquentation (Google Analytics).<br />
                <strong>Ce que nous ne faisons pas :</strong> aucune revente, aucun partage de vos données personnelles, aucune publicité ciblée.<br />
                <strong>Votre choix :</strong> vous pouvez accepter ou refuser le suivi à tout moment. Pour toute question, contactez-nous à hello-lechappeedemma@gmail.com.
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => handleChoice("rejected")}
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
