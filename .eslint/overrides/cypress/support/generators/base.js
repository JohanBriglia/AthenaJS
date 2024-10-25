import { makeListOfOverridesToLint } from "../../../../helpers.js";
import base from "../../integration/base.js";

export default base.map((config) => ({
	...config,
	name: "base: overrides for cypress/support/generators",
	files: makeListOfOverridesToLint({ meta: import.meta }),
}));
