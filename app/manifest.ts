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
  { src: "/sleeply.ico", sizes: "48x48", type: "image/x-icon" },
  { src: "/sleeply.ico", sizes: "96x96", type: "image/x-icon" },
  { src: "/sleeply.ico", sizes: "192x192", type: "image/x-icon" },
],
  };
}
