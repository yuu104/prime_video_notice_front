/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["m.media-amazon.com"],
  },
  async rewrites() {
    return [
      {
        source: "/prime_video_api/:path*",
        destination: `${process.env.NEXT_PUBLIC_PRIME_VIDEO_API}/:path*`,
      },
      {
        source: "/backend_api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API}/:path*`,
      },
    ];
  },
  // pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

module.exports = nextConfig;
