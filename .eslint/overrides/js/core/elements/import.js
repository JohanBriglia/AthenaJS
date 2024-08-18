import { makeListOfOverridesToLint } from "../../../../helpers.js";

export default [
	{
		name: "import: overrides for js/core/elements",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-unused-modules": "off",
		},
	},
];
