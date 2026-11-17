import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@codenkay/video-ytplayer-core",
    "@codenkay/video-ytplayer-react",
    "@codenkay/video-ytplayer-ui",
  ],
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com https://s.ytimg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://www.youtube.com https://www.youtube-nocookie.com; connect-src 'self' https:;",
        },
      ],
    },
  ],
};

export default nextConfig;
