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
import NotFound from "./pages/NotFound";

const QuoteWidget = lazy(() => import("./components/QuoteWidget"));

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
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadQuoteWidget, { timeout: 5000 })
        : globalThis.setTimeout(loadQuoteWidget, 5000);

    return () => {
      window.removeEventListener("openQuoteModal", openQuoteWidget);
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
