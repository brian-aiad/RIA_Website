import { NavLink } from "react-router-dom";
import { site } from "../lib/site";
import { usePageMeta } from "../lib/seo";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found (404) | Rafla Insurance Agency",
    description:
      "The page you're looking for doesn't exist. Head back to our homepage or contact Rafla Insurance Agency in Los Angeles, CA at (310) 572-7246 for help.",
    canonical: "https://raflainsurance.com/404",
  });

  return (
    <main id="main-content" className="relative hero-mesh overflow-hidden min-h-[80vh] flex items-center">
      {/* Decorative blurs to match other hero sections */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />

      <div className="container relative pt-28 pb-20 text-center max-w-2xl mx-auto">
        <div className="page-fade-in">
          {/* Big 404 numeral */}
          <div className="relative inline-block">
            <span className="block text-[120px] md:text-[180px] leading-none font-extrabold text-white/10 tracking-tighter select-none">
              404
            </span>
            <span className="absolute inset-0 grid place-items-center">
              <span className="inline-flex items-center gap-2 bg-gold-400/15 text-gold-300 px-4 py-2 rounded-full text-sm font-bold ring-1 ring-gold-400/30">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2 4 6v6c0 5 3.6 8.7 8 10 4.4-1.3 8-5 8-10V6l-8-4z" />
                </svg>
                Page not found
              </span>
            </span>
          </div>

          <h1 className="display-2 text-white mt-2">
            Looks like this coverage{" "}
            <span className="relative inline-block">
              <span className="relative z-10">expired</span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 5.5c40-3 100-3 196 0"
                  stroke="#e3a719"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 text-lg text-white/80 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back
            on track — our team is one click or call away.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <NavLink to="/" className="btn btn-accent btn-lg">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
              </svg>
              Back to Home
            </NavLink>
            <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
              Call {site.contact.phone}
            </a>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-white/60 mb-4 font-medium">Or jump to a popular page:</p>
            <nav className="flex flex-wrap justify-center gap-2">
              {[
                { to: "/services", label: "Insurance Services" },
                { to: "/about", label: "About Us" },
                { to: "/locations", label: "Our Los Angeles Office" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 ring-1 ring-white/15 transition-all"
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
