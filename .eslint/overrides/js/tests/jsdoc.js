import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "jsdoc: overrides for js/tests",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"jsdoc/require-jsdoc": "off",
		},
	},
];
