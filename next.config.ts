import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for maximum compatibility with free hosting
  // Comment out 'output: "export"' for Vercel (uses hybrid rendering)
  // output: "export",
  
  // Image optimization settings
  images: {
    // For static hosting, use unoptimized or configure external loader
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: false,
  
  // TypeScript config
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Experimental features
  experimental: {
    // Enable for faster builds
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dropdown-menu'],
  },
  
  // Headers for security (applied at build time for static exports)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
