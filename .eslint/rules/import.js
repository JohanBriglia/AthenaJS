import { ignoreExports } from "../helpers.js";
import cypress from "../overrides/cypress/import.js";
import cypressIntegration from "../overrides/cypress/integration/import.js";
import cypressSupportGenerators from "../overrides/cypress/support/generators/import.js";
import js from "../overrides/js/import.js";
import jsCoreElements from "../overrides/js/core/elements/import.js";
import jsDeprecated from "../overrides/js/deprecated/import.js";
import jsTests from "../overrides/js/tests/import.js";
import path from "node:path";
import storybook from "../overrides/.storybook/import.js";
import toolsBin from "../overrides/tools/bin/import.js";
import toolsLib from "../overrides/tools/lib/import.js";

const __dirname = new URL(".", import.meta.url).pathname;

export default [
	{
		name: "import: our rules",
		settings: {
			"import/resolver": {
				webpack: {
					config: fromRoot("./webpack.config.cjs"),
				},
			},
		},
		rules: {
			"import/no-restricted-paths": [
				"error",
				{
					zones: [
						// Prevent models from importing core/*
						{
							target: fromRoot("./js/models"),
							from: fromRoot("./js/core"),
							except: [
								"./count.js",
								"./currency.js",
								"./date.js",
								"./percentage.js",
								"./polyglot/polyglot.js",
								"./ratio.js",
								"./buildSubPeriodsBetween.js",
								"./helpers",
								"./alerts/AlertCollector.js",
								"./elements/icons/index.js",
								"./NestedMap.js",
								"./alerts/alertBus.js",
							],
						},
						// Prevent core/widgets from importing core/*
						{
							target: fromRoot("./js/core/widgets"),
							from: fromRoot("./js/core"),
							except: [
								"./elements",
								"./widgets",
								"./count.js",
								"./currency.js",
								"./date.js",
								"./percentage.js",
								"./polyglot/polyglot.js",
								"./polyglot/translatedString.js",
								"./ratio.js",
								"./buildSubPeriodsBetween.js",
								"./helpers",
								"./responsive.js",
								"./numbroWrapper.js",
								"./list/ListSource.js",
								"./list/streams/ArrayStream.js",
								"./alerts",
								"./NestedMap.js",
								"./dragAndDrop/dragAndDropSupport.js",
							],
						},

						// Prevent accounting from importing from agency/
						{
							target: "js/accounting/",
							from: "js/agency/",
						},
						// Prevent accounting from importing from backoffice/
						{
							target: "js/accounting/",
							from: "js/backoffice/",
						},
						// Prevent accounting from importing from country/
						{
							target: "js/accounting/",
							from: "js/country/",
						},

						// Prevent agency from importing from  accounting/
						{
							target: "js/agency/",
							from: "js/accounting/",
						},
						// Prevent agency from importing from  backoffice/
						{
							target: "js/agency/",
							from: "js/backoffice/",
						},
						// Prevent agency from importing from  country/
						{
							target: "js/agency/",
							from: "js/country/",
						},

						// Prevent backoffice from importing from agency/
						{
							target: "js/backoffice/",
							from: "js/agency/",
						},
						// Prevent backoffice from importing from accounting/
						{
							target: "js/backoffice/",
							from: "js/accounting/",
						},
						// Prevent backoffice from importing from country/
						{
							target: "js/backoffice/",
							from: "js/country/",
						},

						// Prevent country from importing from agency/
						{
							target: "js/country/",
							from: "js/agency/",
						},
						// Prevent country from importing from backoffice/
						{
							target: "js/country/",
							from: "js/backoffice/",
						},
						// Prevent country from importing from accounting/
						{
							target: "js/country/",
							from: "js/accounting/",
						},
					],
				},
			],
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: true,
					// List of files not exporting anything:
					ignoreExports,
				},
			],
		},
	},
	// Overrides
	...cypress,
	...cypressIntegration,
	...cypressSupportGenerators,
	...js,
	...jsCoreElements,
	...jsDeprecated,
	...jsTests,
	...storybook,
	...toolsBin,
	...toolsLib,
];

function fromRoot(pathToReach) {
	return path.resolve(__dirname, "..", "..", pathToReach);
}
