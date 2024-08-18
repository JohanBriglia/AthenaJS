import { makeOverridesPrefix } from "../../../helpers.js";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	{
		name: "storybook: overrides for js/mockups",
		files: [`${prefix}/*.stories.js`],
		rules: {
			"storybook/csf-component": "off",
		},
	},
];
