module.exports = {
	env: {
		node: true,
		browser: true,
	},
	ignorePatterns: ["**/node_modules", "**/dist", "**/build", "**/testRunner.ts"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			globalReturn: false,
		},
		ecmaVersion: 2020,
	},
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ["*.astro"],
			// Allows Astro components to be parsed.
			parser: "astro-eslint-parser",
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			extends: ["plugin:astro/recommended"],
			rules: { "turbo/no-undeclared-env-vars": "off" },
		},
		{
			files: ["*.tsx"],
			extends: [
				"turbo",
				"prettier",
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:import/recommended",
				"plugin:import/typescript",
				"plugin:jsx-a11y/recommended",
			],
			settings: {
				"import/resolver": {
					typescript: {},
				},
			},
			rules: {
				"react/prop-types": ["off"],
			},
			parser: "@typescript-eslint/parser",
		},
	],
};
