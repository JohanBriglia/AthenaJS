import { makeListOfOverridesToLint } from "../../helpers.js";
import globals from "globals";

export default [
	{
		name: "import: overrides for .storybook",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-unused-modules": "off",
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jquery,
			},
		},
	},
];
