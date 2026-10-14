import { loadEnv, type Plugin } from "vite";
import { createQuoteHandler } from "./quote.ts";

/** The local preview uses the same handler as the Vercel function, with no fake sends. */
export function quoteEndpoint(mode: string): Plugin {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const handler = createQuoteHandler({ env });
  return {
    name: "rafla-quote-endpoint",
    configureServer(server) {
      server.middlewares.use("/api/quote", (req, res) => { void handler(req, res); });
    },
    configurePreviewServer(server) {
      server.middlewares.use("/api/quote", (req, res) => { void handler(req, res); });
    },
  };
}
