import eslint_plugin_storybook from "eslint-plugin-storybook";
import js from "../overrides/js/storybook.js";
import jsMockups from "../overrides/js/mockups/storybook.js";

export default [
	...eslint_plugin_storybook.configs["flat/recommended"],
	...eslint_plugin_storybook.configs["flat/csf"],
	{
		name: "storybook: our rules",
		files: ["**/*.stories.js"],
		rules: {
			"storybook/csf-component": "error",
		},
	},
	// Overrides
	...js,
	...jsMockups,
];
