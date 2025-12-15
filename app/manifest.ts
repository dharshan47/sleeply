import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sleeply",
    short_name: "Sleeply",
    description: "Sleep tracking and wellness app",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9810fa",
    icons: [
      {
        src: "/sleeply.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
