/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: "g5dx4zowmemhzky1.public.blob.vercel-storage.com",
          },
          {
            hostname: "utfs.io",
          },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ["pdf-parse"],
    },
};

export default nextConfig;
