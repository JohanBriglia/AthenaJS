import { makeListOfOverridesToLint } from "../../../../helpers.js";
import base from "../../integration/mocha.js";

export default [
	...base.map((config) => ({
		...config,
		name: "mocha: overrides for cypress/support/generators",
		files: makeListOfOverridesToLint({ meta: import.meta }),
	})),
	{
		name: "mocha: overrides for cypress/support/generators",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"mocha/no-exports": "off",
		},
	},
];
