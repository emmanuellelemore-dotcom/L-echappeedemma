import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
const CookieBanner = React.lazy(() => import("./components/CookieBanner"));
const FeedbackWidget = React.lazy(() => import("./components/FeedbackWidget"));
import Index from "./pages/Index";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import Emma from "./pages/Emma";
import NotFound from "./pages/NotFound";
const Islande = React.lazy(() => import("./pages/galleries/Islande"));
const Norvege = React.lazy(() => import("./pages/galleries/Norvege"));
const Suede = React.lazy(() => import("./pages/galleries/Suede"));
const Finlande = React.lazy(() => import("./pages/galleries/Finlande"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div style={{textAlign:'center',padding:'2rem'}}>Chargement de la galerie...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/emma" element={<Emma />} />
            <Route path="/devis" element={<QuotePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/galerie/islande" element={<Islande />} />
            <Route path="/galerie/norvege" element={<Norvege />} />
            <Route path="/galerie/suede" element={<Suede />} />
            <Route path="/galerie/finlande" element={<Finlande />} />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
