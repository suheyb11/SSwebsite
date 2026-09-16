/** @type {import('next').NextConfig} */
const nextConfig = {
  // The dev server owns .next while it runs, so a production build would fight
  // it for the same folder. Setting NEXT_DIST_DIR builds somewhere else:
  //   NEXT_DIST_DIR=.next-prod npm run build
  distDir: process.env.NEXT_DIST_DIR || ".next",
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
