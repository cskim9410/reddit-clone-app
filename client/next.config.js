/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        pathname: "/avatar",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "ec2-54-180-1-35.ap-northeast-2.compute.amazonaws.com",
        port: "4000",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
