import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
}

/**
 * Sets document title, meta description, and canonical URL per page.
 * Cleans up on unmount by restoring defaults.
 */
export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;

    // Meta description
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = meta?.content ?? "";
    if (meta) {
      meta.content = description;
    } else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Open Graph
    setOgContent("og:title", title);
    setOgContent("og:description", description);
    if (canonical) {
      setOgContent("og:url", canonical);
    }

    // Canonical link
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
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
      document.title = prev;
      const m = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (m) m.content = prevDesc;
      const l = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (l && prevCanonical) l.href = prevCanonical;
    };
  }, [title, description, canonical]);
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

function setOgContent(property: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (el) {
    el.content = content;
  }
}
