/** Fire this to open the site-wide quote contact dialog from anywhere. */
export function openQuoteModal() {
  window.dispatchEvent(new Event("openQuoteModal"));
}
