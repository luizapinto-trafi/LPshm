import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shapermint.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn2.irontive.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.stamped.io", pathname: "/**" },
    ],
  },
};

export default nextConfig;
