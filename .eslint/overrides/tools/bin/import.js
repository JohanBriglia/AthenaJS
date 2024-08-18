import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "import: overrides for tools/bin",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: false,
				},
			],
		},
	},
];
