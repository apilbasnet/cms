/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@edge-ui/react"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
