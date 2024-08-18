import cypressIntegration from "../overrides/cypress/integration/mocha.js";
import cypressSupportGenerators from "../overrides/cypress/support/generators/mocha.js";
import js from "../overrides/js/mocha.js";

export default [
	// Overrides
	...cypressIntegration,
	...cypressSupportGenerators,
	...js,
];
