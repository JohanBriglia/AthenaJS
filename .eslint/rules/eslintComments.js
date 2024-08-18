import cypressIntegration from "../overrides/cypress/integration/eslintComments.js";
import cypressSupportGenerators from "../overrides/cypress/support/generators/eslintComments.js";
import eslint_plugin_eslint_comments from "eslint-plugin-eslint-comments";
import js from "../overrides/js/eslintComments.js";

export default [
	{
		name: "eslint-comments: recommended",
		plugins: {
			"eslint-comments": eslint_plugin_eslint_comments,
		},
		rules: {
			...eslint_plugin_eslint_comments.configs["recommended"].rules,
		},
	},
	{
		name: "eslint-comments: our rules",
		rules: {
			"eslint-comments/require-description": [
				"error",
				{
					ignore: ["eslint-env", "eslint-enable"],
				},
			],
			"eslint-comments/no-use": [
				"error",
				{
					allow: [
						"eslint-disable-next-line",
						"eslint-disable-line",
						"eslint-env",
					],
				},
			],
		},
	},
	// Overrides
	...cypressIntegration,
	...cypressSupportGenerators,
	...js,
];
