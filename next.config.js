/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Photography comes from the Unsplash CDN. next/image refuses any host that
    // is not listed here, so this is the only remote source the site can load.
    // The Unsplash licence allows free commercial use and expects hotlinking.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
