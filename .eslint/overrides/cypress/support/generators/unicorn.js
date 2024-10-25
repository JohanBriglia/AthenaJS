import { makeListOfOverridesToLint } from "../../../../helpers.js";
import base from "../../integration/unicorn.js";

export default base.map((config) => ({
	...config,
	name: "unicorn: overrides for cypress/support/generators",
	files: makeListOfOverridesToLint({ meta: import.meta }),
}));
