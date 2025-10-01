import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,    // ensures pages like /about/ exist
  images: {
    unoptimized: true,    // disable Next.js Image Optimization
  },
};

export default nextConfig;
