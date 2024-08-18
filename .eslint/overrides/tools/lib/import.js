import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "import: overrides for tools/lib",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: true,
					// List of files not exporting anything:
					ignoreExports: ["tools/lib/*.cjs"],
				},
			],
		},
	},
];
