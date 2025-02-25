import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compilerOptions: {
    target: 'ESNext',
    module: 'ESNext',
    moduleResolution: 'Bundler',
    skipLibCheck: true,
    paths: {
      '@/*': ['./src/*'],
    },
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint'i devre dışı bırak
  },
};

export default nextConfig;
