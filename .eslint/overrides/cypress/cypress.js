import { makeListOfOverridesToLint } from "../../helpers.js";
import eslint_plugin_cypress from "eslint-plugin-cypress/flat";

export default [
	{
		name: "cypress: recommended for cypress",
		...eslint_plugin_cypress.configs.recommended,
		files: makeListOfOverridesToLint({ meta: import.meta }),
	},
	{
		name: "cypress: our rules for cypress",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"cypress/unsafe-to-chain-command": "off", // we should fix this one
		},
	},
];
