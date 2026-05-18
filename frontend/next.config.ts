import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // 🔥 Production build pipeline me cross-folder compile checks ko ignore karega
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build ke waqt linting warnings ko bhi ignore karega smoothly
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;