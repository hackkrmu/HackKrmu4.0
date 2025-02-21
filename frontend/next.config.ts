import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_MODEL_URL: process.env.NEXT_PUBLIC_MODEL_URL,
  },
};

console.log("NEXT_PUBLIC_BACKEND_URL (Build):", process.env.NEXT_PUBLIC_BACKEND_URL);
console.log("NEXT_PUBLIC_MODEL_URL (Build):", process.env.NEXT_PUBLIC_MODEL_URL);

export default nextConfig;
