import { makeListOfOverridesToLint } from "../../../helpers.js";
import eslint_plugin_mocha from "eslint-plugin-mocha";

export default [
	{
		name: "mocha: recommended for cypress/integration",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		...eslint_plugin_mocha.configs.flat.recommended,
	},
	{
		name: "mocha: overrides for cypress/integration",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"mocha/no-exclusive-tests": "error",
			"mocha/no-hooks-for-single-case": "off",
			"mocha/no-top-level-hooks": "off",
			"mocha/no-pending-tests": "error",
			"mocha/no-skipped-tests": "error",
		},
	},
];
