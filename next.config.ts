import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Static HTML export
  trailingSlash: true, // To ensure proper URL formatting on GitHub Pages
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during the build process
  }
};

export default nextConfig;
