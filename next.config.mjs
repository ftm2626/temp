import nextPwa from "next-pwa"

const withPWA = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  sw: "/sw.js",
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/offline",
  },
});

export default withPWA({
  reactStrictMode: false,
  images: {
    domains: ["bootdey.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
});
