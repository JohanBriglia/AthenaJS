import { makeListOfOverridesToLint } from "../../../../helpers.js";
import base from "../../integration/promise.js";

export default base.map((config) => ({
	...config,
	name: "promise: overrides for cypress/support/generators",
	files: makeListOfOverridesToLint({ meta: import.meta }),
}));
