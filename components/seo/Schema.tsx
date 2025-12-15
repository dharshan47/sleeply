"use client";

export default function Schema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sleeply",
    url: "https://sleeply.vercel.app",
    description:
      "Sleeply is a modern sleep tracker website that helps you monitor your sleep patterns, analyze trends, and improve your sleep quality for a healthier lifestyle.",
    publisher: {
      "@type": "Organization",
      name: "Sleeply",
      logo: {
        "@type": "ImageObject",
        url: "https://sleeply.vercel.app/sleeply.png",
      },
    },
    sameAs: [
      "https://linkedin.com/dharshan47", 
      "https://github.com/dharshan47"
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
