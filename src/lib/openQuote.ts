let pendingInvoker: HTMLElement | null = null;
let pendingQuoteType: QuoteType | null = null;

type QuoteInvoker = HTMLElement | { currentTarget?: EventTarget | null };
export type QuoteType = "auto" | "home" | "business" | "specialty";

/** Fire this to open the site-wide quote contact dialog from anywhere. */
export function openQuoteModal(source?: QuoteInvoker) {
  const candidate = source instanceof HTMLElement ? source : source?.currentTarget;
  pendingInvoker = candidate instanceof HTMLElement
    ? candidate
    : document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  window.dispatchEvent(new Event("openQuoteModal"));
}

/** Open the guide to the working file that matches the visitor's current task. */
export function openQuoteModalFor(quoteType: QuoteType, source?: QuoteInvoker) {
  pendingQuoteType = quoteType;
  openQuoteModal(source);
}

/** Consume the control that opened the dialog so focus can return reliably. */
export function takeQuoteInvoker() {
  const invoker = pendingInvoker;
  pendingInvoker = null;
  return invoker?.isConnected ? invoker : null;
}

/** Consume a requested starting file after the lazily loaded dialog mounts. */
export function takeQuoteType() {
  const quoteType = pendingQuoteType;
  pendingQuoteType = null;
  return quoteType;
}

/** Read the requested file while the dialog chunk is mounting. */
export function peekQuoteType() {
  return pendingQuoteType;
}
