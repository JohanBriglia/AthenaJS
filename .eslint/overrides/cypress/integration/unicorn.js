import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "unicorn: overrides for cypress/integration",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"unicorn/prefer-node-protocol": "off", // incompatible with webpack?
		},
	},
];
