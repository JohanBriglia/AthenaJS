import {
	makeListOfOverridesToLint,
	makeOverridesPrefix,
} from "../../../helpers.js";

let prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	{
		name: "import: overrides for cypress/integration",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: true,
					// List of files not exporting anything:
					ignoreExports: [`${prefix}/*_spec.*.js`],
				},
			],
		},
	},
];
