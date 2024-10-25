import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "base: overrides for cypress/integration",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"prefer-arrow-callback": "off",
		},
	},
];
