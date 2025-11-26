// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you already have `experimental` etc. keep them here
  webpack: (config, { isServer }) => {
    // We only care about browser build
    if (!isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // 🔴 Tell webpack: "canvas" should be treated as an empty module
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;
