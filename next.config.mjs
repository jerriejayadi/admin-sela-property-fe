/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  env: {
    HOST: process.env.HOST,
  },
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: this.env.HOST + ":path*", // Proxy to Backend External
      },
    ];
  },
};

export default nextConfig;
