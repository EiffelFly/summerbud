module.exports = {
	env: {
		node: true,
		browser: true,
	},
	extends: [
		"turbo",
		"prettier",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
	],
	settings: {
		"import/resolver": {
			typescript: {},
		},
	},
	rules: {
		"react/prop-types": ["off"],
	},
	ignorePatterns: ["**/node_modules", "**/dist", "**/build", "**/testRunner.ts"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			globalReturn: false,
		},
		ecmaVersion: 2020,
	},
};
