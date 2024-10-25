import { makeOverridesPrefix } from "../../helpers.js";
import base from "../cypress/integration/unicorn.js";

const prefix = makeOverridesPrefix({ meta: import.meta });

export default base.map((config) => ({
	...config,
	name: "unicorn: overrides for js",
	files: [
		`${prefix}/*.spec.component.js`,
		`${prefix}/componentTestHelpers/*.js`,
	],
}));
