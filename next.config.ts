import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve images in modern, highly-compressed formats like AVIF and WebP
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for at least 60 seconds at the edge
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  // Drastically reduce JS bundle size by configuring module import optimization
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "chart.js",
      "react-chartjs-2",
      "date-fns",
    ],
  },
};

export default nextConfig;
