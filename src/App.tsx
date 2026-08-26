import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import RouteMotion from "./components/RouteMotion";

// Eagerly load primary prerendered pages. Keeping these eager prevents direct
// route loads from replacing prerendered content with a Suspense fallback.
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import CityLanding from "./pages/CityLanding";
import AutoInsuranceLosAngelesCA from "./pages/AutoInsuranceLosAngelesCA";
import SR22InsuranceLosAngeles from "./pages/SR22InsuranceLosAngeles";
import HomeInsuranceLosAngelesCA from "./pages/HomeInsuranceLosAngelesCA";
import NoLicenseInsuranceLosAngeles from "./pages/NoLicenseInsuranceLosAngeles";
import CommercialAutoInsuranceLosAngeles from "./pages/CommercialAutoInsuranceLosAngeles";

const NotFound = lazy(() => import("./pages/NotFound"));
const QuoteWidget = lazy(() => import("./components/QuoteWidget"));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-brand-50 ring-1 ring-brand-100 grid place-items-center">
          <svg className="animate-spin w-5 h-5 text-brand-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
          </svg>
        </div>
        <p className="text-slate-400 text-[13px] font-medium tracking-wide">Loading</p>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [quoteWidgetReady, setQuoteWidgetReady] = useState(false);
  const [quoteOpenSignal, setQuoteOpenSignal] = useState(0);

  useEffect(() => {
    if (navigator.userAgent === "prerender-bot") return;

    const loadQuoteWidget = () => setQuoteWidgetReady(true);
    const openQuoteWidget = () => {
      setQuoteWidgetReady(true);
      setQuoteOpenSignal((value) => value + 1);
    };

    window.addEventListener("openQuoteModal", openQuoteWidget);
    window.addEventListener("load", loadQuoteWidget, { once: true });

    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadQuoteWidget, { timeout: 5000 })
        : globalThis.setTimeout(loadQuoteWidget, 5000);

    return () => {
      window.removeEventListener("openQuoteModal", openQuoteWidget);
      window.removeEventListener("load", loadQuoteWidget);
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else if (typeof idleId === "number") {
        globalThis.clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <>
      <ScrollToTop />

      <div className="min-h-dvh flex flex-col bg-[#f6f4ed]">
        <Navbar />
        <div className="flex-1">
          <RouteMotion key={location.pathname} routeKey={location.pathname}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/insurance/:citySlug" element={<CityLanding />} />
                <Route path="/auto-insurance-los-angeles-ca" element={<AutoInsuranceLosAngelesCA />} />
                <Route path="/sr22-insurance-los-angeles" element={<SR22InsuranceLosAngeles />} />
                <Route path="/home-insurance-los-angeles-ca" element={<HomeInsuranceLosAngelesCA />} />
                <Route path="/no-license-auto-insurance-los-angeles" element={<NoLicenseInsuranceLosAngeles />} />
                <Route path="/commercial-auto-insurance-los-angeles" element={<CommercialAutoInsuranceLosAngeles />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </RouteMotion>
        </div>
        <Footer />
      </div>

      {quoteWidgetReady && (
        <Suspense fallback={null}>
          <QuoteWidget openSignal={quoteOpenSignal} />
        </Suspense>
      )}
    </>
  );
}
