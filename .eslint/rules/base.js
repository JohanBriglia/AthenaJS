import cypressIntegration from "../overrides/cypress/integration/base.js";
import cypressSupportGenerators from "../overrides/cypress/support/generators/base.js";
import js from "../overrides/js/base.js";
import toolsBin from "../overrides/tools/bin/base.js";
import toolsLib from "../overrides/tools/lib/base.js";

export default [
	// Overrides
	...js,
	...cypressIntegration,
	...cypressSupportGenerators,
	...toolsBin,
	...toolsLib,
];
