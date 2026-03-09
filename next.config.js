/** @type {import('next').NextConfig} */
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Your existing alias configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    // On client bundles, provide a fallback for crypto
    if (!isServer) {
      config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: false,
        buffer: false,
      };
    }

    // Adjust the minimizer to prevent mangling function and class names
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          keep_fnames: true,
          keep_classnames: true,
        },
      }),
    ];

    return config;
  },
};

module.exports = nextConfig;
