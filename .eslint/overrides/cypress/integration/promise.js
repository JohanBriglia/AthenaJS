import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "promise: overrides for cypress/integration",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			// The best practice eslint-plugin-promise recommends is
			// incompatible with Cypress promises:
			"promise/no-return-wrap": "off",
			"promise/param-names": "off",
			"promise/always-return": "off",
			"promise/no-nesting": "off",
			"promise/no-promise-in-callback": "off",
			"promise/no-callback-in-promise": "off",
			"promise/no-return-in-finally": "off",
			"promise/valid-params": "off",
		},
	},
];
