/** @type {import('next').NextConfig} */

const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  webpack: (config) => {
    // Moment (dépendance du DatePicker d'antd) embarque ses 130 locales par défaut.
    // On ne garde que celles importées explicitement, soit "fr".
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );
    return config;
  },
};

module.exports = nextConfig;
