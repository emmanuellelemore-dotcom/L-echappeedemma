import React, { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
const ArticlePage = React.lazy(() => import("./pages/ArticlePage"));
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
              {/* Ancienne adresse de l'article Lofoten : redirigée vers la bonne */}
              <Route path="/blog/roadtrip-laponie-aurores-boreales" element={<Navigate to="/blog/lofoten-organiser-votre-echappee-sereine-grand-nord" replace />} />
              {/* Tous les articles, rédigés en Markdown (src/content/blog) */}
              <Route path="/blog/:slug" element={<ArticlePage />} />
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
