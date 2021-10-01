module.exports = {
  pageExtensions: ["js", "jsx", "mdx"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./lib/generate-sitemap");
    }

    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled",
        generateStatsFile: true,
        reportFilename: isServer
          ? "../analyze/server.json"
          : "./analyze/client.json",
      })
    );

    return config;
  },
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
  async redirects() {
    return [
      // {
      //   source: '/',
      //   has: [
      //     {
      //       type: 'header',
      //       key: 'x-vercel-ip-country',
      //       value: 'TW'
      //     }
      //   ],
      //   destination: '/zh-tw',
      //   permanent: true,
      // },
      {
        source: "/",
        destination: "/zh-tw",
        permanent: true,
      },
    ];
  },
};
