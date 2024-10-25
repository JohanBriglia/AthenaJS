import { makeListOfOverridesToLint } from "../../../helpers.js";
import eslint_plugin_jasmine from "eslint-plugin-jasmine";
import globals from "globals";

export default [
	{
		name: "jasmine: recommended for js/tests",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		plugins: {
			jasmine: eslint_plugin_jasmine,
		},
		languageOptions: {
			globals: {
				...globals.jasmine,
			},
		},
		...eslint_plugin_jasmine.configs.recommended,
	},
	{
		name: "jasmine: our rules for js/tests",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"jasmine/expect-matcher": "error",
			"jasmine/expect-single-argument": "error",
			"jasmine/new-line-before-expect": "error",
			"jasmine/new-line-between-declarations": "error",
			"jasmine/no-disabled-tests": "error",
			"jasmine/no-expect-in-setup-teardown": "error",
			"jasmine/no-pending-tests": "error",
			"jasmine/no-promise-without-done-fail": "error",
			"jasmine/no-spec-dupes": ["error", "branch"],
			"jasmine/no-suite-dupes": ["error", "branch"],
			"jasmine/no-unsafe-spy": "off",
			"jasmine/prefer-jasmine-matcher": "error",
			"jasmine/prefer-promise-strategies": "error",
			"jasmine/prefer-toHaveBeenCalledWith": "off",
			"jasmine/valid-expect": "error",
		},
	},
];
