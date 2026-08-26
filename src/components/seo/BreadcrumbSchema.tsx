import { useEffect } from "react";

interface BreadcrumbSchemaProps {
  crumbs: Array<{ name: string; url: string }>;
}

export default function BreadcrumbSchema({ crumbs }: BreadcrumbSchemaProps) {
  useEffect(() => {
    document.querySelectorAll('script[data-schema="BreadcrumbSchema"]').forEach(s => s.remove());
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-schema", "BreadcrumbSchema");
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    });
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [crumbs]);

  return null;
}
