import { makeListOfOverridesToLint } from "../../helpers.js";

export default [
	{
		name: "import: override for cypress",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-unused-modules": "off",
		},
	},
];
