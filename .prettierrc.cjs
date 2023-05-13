module.exports = {
  plugins: [require.resolve("prettier-plugin-astro")],
  printWidth: 100,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: true,
  overrides: [
    {
      files: [".*", "*.json", "*.md", "*.toml", "*.yml"],
      options: {
        useTabs: false,
      },
    },
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
