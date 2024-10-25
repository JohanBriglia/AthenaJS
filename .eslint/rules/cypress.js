import cypress from "../overrides/cypress/cypress.js";
import eslint_plugin_cypress from "eslint-plugin-cypress/flat";

const cypressFiles = [
	"**/*.spec.component.js",
	"**/componentTestHelpers/*.js",
	"**/*_spec.e2e.js",
	"**/*_spec.ui.js",
];

export default [
	// Overrides
	...cypress,
	{
		name: "cypress: recommended",
		...eslint_plugin_cypress.configs.recommended,
		files: cypressFiles,
	},
	{
		name: "cypress: our rules",
		files: cypressFiles,
		rules: {
			"cypress/unsafe-to-chain-command": "off", // we should fix this one
			"cypress/no-force": "error",
			"cypress/no-pause": "error",
		},
	},
];
