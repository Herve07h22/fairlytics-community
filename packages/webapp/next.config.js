/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  experimental: {
    // L'image est construite depuis la racine du monorepo : le traçage des fichiers
    // doit partir de là pour retrouver les node_modules hissés par yarn workspaces.
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  // webpack n'est pas une dépendance déclarée : on utilise l'instance que Next injecte.
  webpack: (config, { webpack }) => {
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
