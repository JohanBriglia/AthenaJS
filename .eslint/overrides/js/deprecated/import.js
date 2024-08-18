import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "import: overrides for js/deprecated",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-deprecated": "off",
		},
	},
];
