import { makeOverridesPrefix } from "../../../helpers.js";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	{
		name: "foretagsplatsen: overrides for js/mockups",
		files: [`${prefix}/*.stories.js`],
		rules: {
			"@foretagsplatsen/ensure-storybook-title": "off",
			"@foretagsplatsen/no-useless-storybook-action": "off",
		},
	},
];
