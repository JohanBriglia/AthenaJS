import eslint_plugin_shopify from "@shopify/eslint-plugin";

export default [
	{
		name: "shopify: our rules",
		plugins: {
			"@shopify": eslint_plugin_shopify,
		},
		rules: {
			"@shopify/prefer-early-return": ["error", { maximumStatements: 0 }],
		},
	},
];
