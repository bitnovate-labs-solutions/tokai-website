import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/our-solutions",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/address-contact",
        permanent: false,
      },
      {
        source: "/risk-assessment",
        destination: "/our-solutions",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
      {
        protocol: "https",
        hostname: "prismic-io.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "tokai.com.my",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
