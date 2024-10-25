import { makeOverridesPrefix } from "../../helpers.js";
import base from "../cypress/integration/mocha.js";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default [
	...base.map((config) => ({
		...config,
		name: "mocha: overrides for js",
		files: [
			`${prefix}/*.spec.component.js`,
			`${prefix}/componentTestHelpers/*.js`,
		],
	})),
];
