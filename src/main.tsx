import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App";
import "./index.css";
import "./ria-revamp.css";

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

// The local prerender step snapshots browser-rendered DOM. Some JSX creates
// adjacent text nodes that the browser merges when that snapshot is serialized,
// so mounting cleanly avoids hydration mismatches while preserving static HTML
// for the initial response and for search crawlers.
ReactDOM.createRoot(rootEl).render(app);
