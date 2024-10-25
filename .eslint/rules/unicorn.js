import cypressIntegration from "../overrides/cypress/integration/unicorn.js";
import cypressSupportGenerators from "../overrides/cypress/support/generators/unicorn.js";
import js from "../overrides/js/unicorn.js";

export default [
	// Overrides
	...cypressIntegration,
	...cypressSupportGenerators,
	...js,
];
