import { makeOverridesPrefix } from "../../helpers.js";
import storybookActionPattern from "../../../.storybook/storybookActionPattern.cjs";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	{
		name: "foretagsplatsen: overrides for js",
		files: [`${prefix}/*.stories.js`],
		rules: {
			"@foretagsplatsen/no-useless-storybook-action": [
				"error",
				{ pattern: storybookActionPattern },
			],
		},
	},
];
