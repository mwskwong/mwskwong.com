import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: true,
    // dynamicIO: true,
  },
};

export default nextConfig;
