import { makeOverridesPrefix } from "../../helpers.js";
import base from "../cypress/integration/base.js";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	...base.map((config) => ({
		...config,
		name: "base: overrides for js",
		files: [
			`${prefix}/*.spec.component.js`,
			`${prefix}/componentTestHelpers/*.js`,
		],
	})),
	{
		name: "base: overrides for js",
		files: [`${prefix}/*.stories.js`],
		rules: {
			"no-alert": "off",
		},
	},
];
