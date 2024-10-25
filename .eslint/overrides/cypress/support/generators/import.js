import { makeListOfOverridesToLint } from "../../../../helpers.js";
import base from "../../integration/import.js";

export default [
	...base.map((config) => ({
		...config,
		name: "import: overrides for cypress/support/generators",
		files: makeListOfOverridesToLint({ meta: import.meta }),
	})),
	{
		name: "import: overrides for cypress/support/generators",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: true,
					// List of files not exporting anything:
					ignoreExports: [],
				},
			],
		},
	},
];
