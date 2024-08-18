import { makeOverridesPrefix } from "../../helpers.js";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	{
		name: "storybook: overrides for js",
		files: [`${prefix}/*.stories.js`],
		rules: {
			"storybook/prefer-pascal-case": "error", // default is warning
			"storybook/no-title-property-in-meta": "error",
		},
	},
];
