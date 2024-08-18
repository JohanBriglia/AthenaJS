import {
	makeListOfOverridesToLint,
	makeOverridesPrefix,
} from "../../../helpers.js";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	{
		name: "import: overrides for js/tests",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: true,
					// List of files not exporting anything:
					ignoreExports: [
						`${prefix}/*-tests.js`,
						`${prefix}/tests.js`,
					],
				},
			],
		},
	},
];
