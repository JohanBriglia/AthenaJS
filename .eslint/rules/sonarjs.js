import eslint_plugin_sonarjs from "eslint-plugin-sonarjs";

export default [
	{
		name: "sonarjs: our rules",
		plugins: {
			sonarjs: eslint_plugin_sonarjs,
		},
		rules: {
			"sonarjs/prefer-immediate-return": "error",
		},
	},
];
