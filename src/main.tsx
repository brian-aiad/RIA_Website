import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>
);

// The local prerender step snapshots the fully rendered browser DOM after scroll
// and entrance animations have settled. Hydrating that post-animation HTML creates
// React 418 mismatches, so the client mounts cleanly while crawlers still receive
// route-specific static HTML.
ReactDOM.createRoot(rootEl).render(app);
