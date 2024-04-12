/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    api_url: "http://localhost:8080/v1/"
  }
};

export default nextConfig;
