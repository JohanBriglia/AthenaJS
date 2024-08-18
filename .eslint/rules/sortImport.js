import { fixupPluginRules } from "@eslint/compat";
import eslint_plugin_sort_imports_es6_autofix from "eslint-plugin-sort-imports-es6-autofix";

export default [
	{
		name: "sort-imports-es6-autofix: our rules",
		plugins: {
			"sort-imports-es6-autofix": fixupPluginRules(
				eslint_plugin_sort_imports_es6_autofix,
			),
		},
		rules: {
			"sort-imports-es6-autofix/sort-imports-es6": [
				"error",
				{
					ignoreCase: true,
				},
			],
		},
	},
];
