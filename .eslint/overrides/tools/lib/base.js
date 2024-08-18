import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "base: overrides for tools/lib",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"no-console": "off",
		},
	},
];
