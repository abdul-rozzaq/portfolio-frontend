import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add your production image domains here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Strict mode catches potential issues early
  reactStrictMode: true,
};

export default nextConfig;
