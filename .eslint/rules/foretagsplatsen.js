import finsitRecommended from "@foretagsplatsen/eslint-plugin";
import js from "../overrides/js/foretagsplatsen.js";
import jsMockups from "../overrides/js/mockups/foretagsplatsen.js";

export default [
	...finsitRecommended.configs.main,
	// Overrides
	...js,
	...jsMockups,
];
