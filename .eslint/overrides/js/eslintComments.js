import { makeOverridesPrefix } from "../../helpers.js";
import base from "../cypress/integration/eslintComments.js";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default base.map((config) => ({
	...config,
	name: "eslint-comments: overrides for js",
	files: [
		`${prefix}/*.spec.component.js`,
		`${prefix}/componentTestHelpers/*.js`,
	],
}));
