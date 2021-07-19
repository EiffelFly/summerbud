const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  pageExtensions: ["js", "jsx", "mdx"],
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.mdx/,
  //     use: [
  //       options.defaultLoaders.babel,
  //       {
  //         loader: "@mdx-js/loader",
  //       },
  //     ],
  //   });

  //   return config;
  // },
});
