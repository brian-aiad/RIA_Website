import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { ServerMetaContext } from "./lib/serverMeta";
import type { PageMeta } from "./lib/seo";

export function render(url: string) {
  const metadata: PageMeta[] = [];
  const html = renderToString(
    <StaticRouter location={url}>
      <ServerMetaContext.Provider value={(meta) => metadata.push(meta)}>
        <App />
      </ServerMetaContext.Provider>
    </StaticRouter>,
  );
  if (metadata.length !== 1) throw new Error(`Expected one page metadata record for ${url}; found ${metadata.length}`);
  return { html, meta: metadata[0] };
}
