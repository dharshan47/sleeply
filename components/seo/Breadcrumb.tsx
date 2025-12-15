"use client";

export default function Breadcrumb() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sleeply.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://sleeply.vercel.app/about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contact",
        item: "https://sleeply.vercel.app/contact",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Sleep Tracker",
        item: "https://sleeply.vercel.app/sleep-tracker",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
