import cypressIntegration from "../overrides/cypress/integration/promise.js";
import cypressSupportGenerators from "../overrides/cypress/support/generators/promise.js";
import eslint_plugin_promise from "eslint-plugin-promise";
import js from "../overrides/js/promise.js";

export default [
	// waiting for "eslint-plugin-promise" to support flat-config
	{
		name: "promise: recommended",
		rules: {
			...eslint_plugin_promise.configs.recommended.rules,
		},
	},
	{
		name: "promise: our rules",
		rules: {
			"promise/always-return": "off", // Report too many problems for now
			"promise/catch-or-return": "off", // We very rarely catch errors:
			"promise/no-callback-in-promise": "off", // We use too many callbacks for now
			"promise/no-multiple-resolved": "error",
			"promise/no-nesting": "error", // Default is "warning"
			"promise/no-promise-in-callback": "off", // We use too many callbacks for now
			"promise/no-return-in-finally": "error", // Default is "warning"
			"promise/prefer-await-to-callbacks": "off", // Report too many problems for now
			"promise/prefer-await-to-then": "off", // Report too many problems for now
			"promise/valid-params": "error", // Default is "warning"
		},
	},
	// https://github.com/eslint-community/eslint-plugin-promise/issues/472
	{
		name: "promise: bug fix",
		rules: {
			"promise/no-multiple-resolved": "off",
		},
	},
	// Overrides
	...cypressIntegration,
	...cypressSupportGenerators,
	...js,
];
