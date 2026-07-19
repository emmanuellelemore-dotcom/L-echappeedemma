import React, { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";
const CookieBanner = React.lazy(() => import("./components/CookieBanner"));
const FeedbackWidget = React.lazy(() => import("./components/FeedbackWidget"));
import Index from "./pages/Index";
import { TournantDeVieProvider } from "./components/TournantDeVie";
const QuotePage = React.lazy(() => import("./pages/QuotePage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const Emma = React.lazy(() => import("./pages/Emma"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const MesPrestations = React.lazy(() => import("./pages/MesPrestations"));
const MesOffres = React.lazy(() => import("./pages/MesOffres"));
const VillageDuPereNoel = React.lazy(() => import("./pages/VillageDuPereNoel"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const CharteEchappee = React.lazy(() => import("./pages/charte-echappee"));
const MentionsLegales = React.lazy(() => import("./pages/mentions-legales"));
const RoadtripLaponieAuroresBoreales = React.lazy(() => import("./pages/blog/roadtrip-laponie-aurores-boreales"));
const BienChoisirSonEquipementGrandNord = React.lazy(() => import("./pages/blog/bien-choisir-son-equipement-grand-nord"));
const RandonnerGrandNordGuideInsider = React.lazy(() => import("./pages/blog/randonner-grand-nord-guide-insider"));
const PourquoiChoisirLaLaponieParentheseHivernale = React.lazy(() => import("./pages/blog/pourquoi-choisir-la-laponie-parenthese-hivernale"));
const SuedeSecreteImmersionForetBoreale = React.lazy(() => import("./pages/blog/suede-secrete-immersion-foret-boreale"));
const Islande = React.lazy(() => import("./pages/galleries/Islande"));
const Norvege = React.lazy(() => import("./pages/galleries/Norvege"));
const Suede = React.lazy(() => import("./pages/galleries/Suede"));
const Finlande = React.lazy(() => import("./pages/galleries/Finlande"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TournantDeVieProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsTracker />
          <ScrollToTop />
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Chargement...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/emma" element={<Emma />} />
              <Route path="/mes-prestations" element={<MesPrestations />} />
              <Route path="/mes-offres" element={<MesOffres />} />
              <Route path="/village-du-pere-noel" element={<VillageDuPereNoel />} />
              <Route path="/charte-echappee" element={<CharteEchappee />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/devis" element={<QuotePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/roadtrip-laponie-aurores-boreales" element={<RoadtripLaponieAuroresBoreales />} />
              <Route path="/blog/lofoten-organiser-votre-echappee-sereine-grand-nord" element={<RoadtripLaponieAuroresBoreales />} />
              <Route path="/blog/bien-choisir-son-equipement-grand-nord" element={<BienChoisirSonEquipementGrandNord />} />
              <Route path="/blog/randonner-grand-nord-guide-insider" element={<RandonnerGrandNordGuideInsider />} />
              <Route path="/blog/pourquoi-choisir-la-laponie-parenthese-hivernale" element={<PourquoiChoisirLaLaponieParentheseHivernale />} />
              <Route path="/blog/suede-secrete-immersion-foret-boreale" element={<SuedeSecreteImmersionForetBoreale />} />
              <Route path="/gallery/islande" element={<Islande />} />
              <Route path="/gallery/norvege" element={<Norvege />} />
              <Route path="/gallery/suede" element={<Suede />} />
              <Route path="/gallery/finlande" element={<Finlande />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <CookieBanner />
          </Suspense>
          <Suspense fallback={null}>
            <FeedbackWidget />
          </Suspense>
        </BrowserRouter>
      </TournantDeVieProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
