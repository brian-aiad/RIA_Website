let pendingInvoker: HTMLElement | null = null;

type QuoteInvoker = HTMLElement | { currentTarget?: EventTarget | null };

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

/** Consume the control that opened the dialog so focus can return reliably. */
export function takeQuoteInvoker() {
  const invoker = pendingInvoker;
  pendingInvoker = null;
  return invoker?.isConnected ? invoker : null;
}
