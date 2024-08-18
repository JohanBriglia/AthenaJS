import eslint_plugin_jsdoc from "eslint-plugin-jsdoc";
import jsTests from "../overrides/js/tests/jsdoc.js";

export default [
	{
		name: "jsdoc: our rules",
		plugins: {
			jsdoc: eslint_plugin_jsdoc,
		},
		settings: {
			jsdoc: {
				mode: "jsdoc",
				avoidExampleOnConstructors: true,
				tagNamePreference: {
					returns: "return",
				},
				preferredTypes: {
					Function: "function",
				},
			},
		},
		rules: {
			"jsdoc/check-alignment": "error",
			"jsdoc/check-examples": "off",
			"jsdoc/check-indentation": "off",
			"jsdoc/check-param-names": "off",
			"jsdoc/check-syntax": "error",
			"jsdoc/check-tag-names": "error",
			"jsdoc/check-types": "error",
			"jsdoc/implements-on-classes": "error",
			"jsdoc/match-description": "off",
			"jsdoc/newline-after-description": "off",
			"jsdoc/no-types": "off",
			"jsdoc/no-undefined-types": "off",
			"jsdoc/require-description": "off",
			"jsdoc/require-description-complete-sentence": "off",
			"jsdoc/require-example": "off",
			"jsdoc/require-hyphen-before-param-description": "error",
			"jsdoc/require-jsdoc": [
				"error",
				{
					require: {
						ArrowFunctionExpression: false,
						ClassDeclaration: true,
						FunctionExpression: false,
						FunctionDeclaration: false,
						MethodDefinition: false,
					},
				},
			],
			"jsdoc/require-param": "off",
			"jsdoc/require-param-description": "error",
			"jsdoc/require-param-name": "error",
			"jsdoc/require-param-type": "error",
			"jsdoc/require-returns": "off",
			"jsdoc/require-returns-check": "error",
			"jsdoc/require-returns-description": "off",
			"jsdoc/require-returns-type": "error",
			"jsdoc/valid-types": "error",
		},
	},
	// Overrides
	...jsTests,
];
