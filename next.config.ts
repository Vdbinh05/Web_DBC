import type { NextConfig } from "next";
import { ADMIN_HOST, ADMIN_PATH } from "./src/lib/admin-routing";

const adminHost = [{ type: "host" as const, value: ADMIN_HOST.replaceAll(".", "\\.") }];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: ADMIN_PATH, has: adminHost, destination: "/", permanent: false },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: adminHost, destination: ADMIN_PATH },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.vietqr.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
