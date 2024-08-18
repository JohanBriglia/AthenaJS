import { makeListOfOverridesToLint } from "../../../../helpers.js";
import base from "../../integration/eslintComments.js";

export default base.map((config) => ({
	...config,
	name: "eslint-comments: overrides for cypress/support/generators",
	files: makeListOfOverridesToLint({ meta: import.meta }),
}));
