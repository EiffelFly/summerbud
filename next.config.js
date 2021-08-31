
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  pageExtensions: ["js", "jsx", "mdx"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./lib/generate-sitemap');
    }

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
      }
    ]
  }
});
