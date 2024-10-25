import eslint_plugin_consistent_default_export_name from "eslint-plugin-consistent-default-export-name";

export default [
	{
		name: "consistent-default-export-name: our rules",
		plugins: {
			"consistent-default-export-name":
				eslint_plugin_consistent_default_export_name,
		},
		rules: {
			"consistent-default-export-name/default-export-match-filename":
				"error",
		},
	},
];
