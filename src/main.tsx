import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/source-sans-3/wght.css";
import App from "./App";
import "./index.css";
import "./ria-revamp.css";
import "./refinement.css";

const rootEl = document.getElementById("root")!;
const isDeployedHost = /(^|\.)raflainsurance\.com$|\.vercel\.app$/.test(window.location.hostname);
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {isDeployedHost && <Analytics />}
      {isDeployedHost && <SpeedInsights />}
    </BrowserRouter>
  </React.StrictMode>
);

// Static route HTML provides the initial response and crawlable content.
// Mount the interactive app consistently for direct visits and client routes;
// motion and analytics initialize only in the browser.
ReactDOM.createRoot(rootEl).render(app);
