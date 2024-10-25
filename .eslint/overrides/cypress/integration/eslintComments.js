import { makeListOfOverridesToLint } from "../../../helpers.js";

export default [
	{
		name: "eslint-comments: overrides for cypress/integration",
		files: makeListOfOverridesToLint({ meta: import.meta }),
		rules: {
			"eslint-comments/no-use": [
				"error",
				{
					allow: [
						"eslint-disable-next-line",
						"eslint-disable-line",
						"eslint-env",
						// tests often rely on these 2 when using test
						// generators:
						"eslint-disable",
						"eslint-enable",
					],
				},
			],
		},
	},
];
