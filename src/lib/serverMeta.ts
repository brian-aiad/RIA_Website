import { createContext } from "react";
import type { PageMeta } from "./seo";

// Per-render collector: no process-global metadata can leak between routes.
export const ServerMetaContext = createContext<((meta: PageMeta) => void) | null>(null);
