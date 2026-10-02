interface BreadcrumbSchemaProps {
  crumbs: Array<{ name: string; url: string }>;
}

export default function BreadcrumbSchema({ crumbs }: BreadcrumbSchemaProps) {
  const data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
  };

  return <script type="application/ld+json" data-schema="BreadcrumbSchema" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
