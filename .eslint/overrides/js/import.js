import {
	makeListOfOverridesToLint,
	makeOverridesPrefix,
} from "../../helpers.js";
import globals from "globals";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	{
		name: "import: overrides for js",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		rules: {
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: true,
					ignoreExports:
						// List of files not exporting anything:
						[
							// monitor's entry points:
							`${prefix}/*_main.js`,
							// files extending objects defined elsewhere:
							`${prefix}/backoffice/shared/modals.js`,
							`${prefix}/core/compatibility.js`,
							`${prefix}/core/widgets/widgetExtensions.js`,
							// files with only side effects:
							`${prefix}/core/iframeBuster.js`,
							`${prefix}/core/mathjax.js`,
							`${prefix}/core/mathjaxConfig.js`,
						],
				},
			],
		},
	},
	{
		name: "import: overrides for js",
		files: [
			`${prefix}/*.stories.js`,
			`${prefix}/*.spec.component.js`,
			`${prefix}/componentTestHelpers/*.js`,
		],
		rules: {
			"import/no-unused-modules": "off",
		},
	},
];
