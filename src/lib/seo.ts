import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
}

/**
 * Sets document title, meta description, and canonical URL per page.
 * Cleans up on unmount by restoring defaults.
 */
export function usePageMeta({ title, description, canonical, robots }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    const restorers: Array<() => void> = [];
    document.title = title;

    const setMeta = (selector: string, attributes: Record<string, string>, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      const created = !element;
      const previousContent = element?.content ?? "";
      if (!element) {
        element = document.createElement("meta");
        Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
        document.head.appendChild(element);
      }
      element.content = content;
      restorers.push(() => {
        if (created) element?.remove();
        else if (element) element.content = previousContent;
      });
    };

    setMeta('meta[name="description"]', { name: "description" }, description);
    setMeta('meta[property="og:title"]', { property: "og:title" }, title);
    setMeta('meta[property="og:description"]', { property: "og:description" }, description);
    setMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    setMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    if (canonical) setMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
    if (robots) setMeta('meta[name="robots"]', { name: "robots" }, robots);

    // Canonical link
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdLink = !link;
    const prevCanonical = link?.href ?? "";
    if (canonical) {
      if (link) {
        link.href = canonical;
      } else {
        link = document.createElement("link");
        link.rel = "canonical";
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    return () => {
      document.title = previousTitle;
      restorers.reverse().forEach((restore) => restore());
      if (createdLink) link?.remove();
      else if (link && prevCanonical) link.href = prevCanonical;
    };
  }, [title, description, canonical, robots]);
}

export function useImagePreload(href?: string, options: { media?: string } = {}) {
  const { media } = options;

  useEffect(() => {
    if (!href) return;

    const mediaSelector = media ? `[media="${media}"]` : ":not([media])";
    const existing = document.querySelector<HTMLLinkElement>(
      `link[rel="preload"][as="image"][href="${href}"]${mediaSelector}`,
    );
    if (existing) {
      existing.setAttribute("fetchpriority", "high");
      return;
    }

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.type = "image/webp";
    if (media) link.media = media;
    link.setAttribute("fetchpriority", "high");
    link.setAttribute("data-hero-preload", "true");
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [href, media]);
}
