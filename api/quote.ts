import type { IncomingMessage, ServerResponse } from "node:http";
import { COMING_SOON_ENABLED } from "../config/release.mjs";
import { createQuoteHandler } from "../server/quote.ts";
const fullSiteHandler = createQuoteHandler();
export default function handler(request: IncomingMessage, response: ServerResponse) {
  // Vite's local form endpoint uses the full handler directly for review.
  // The deployed endpoint cannot send mail while the release is gated.
  if (COMING_SOON_ENABLED) {
    response.statusCode = 503;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Robots-Tag", "noindex, nofollow");
    response.end(JSON.stringify({ error: "Online requests are not open yet. Please call (310) 572-7246 or text Ash at (213) 879-5955." }));
    return;
  }
  return fullSiteHandler(request, response);
}
