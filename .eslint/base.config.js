import {
	ignoredFiles,
	makeListOfFilesToLint,
	parserOptions,
} from "./helpers.js";
import base from "./rules/base.js";
import consistentDefaultExportName from "./rules/consistentDefaultExportName.js";
import cypress from "./rules/cypress.js";
import eslintComments from "./rules/eslintComments.js";
import foretagsplatsen from "./rules/foretagsplatsen.js";
import globals from "globals";
import importRules from "./rules/import.js";
import jasmine from "./rules/jasmine.js";
import jsdoc from "./rules/jsdoc.js";
import mocha from "./rules/mocha.js";
import promise from "./rules/promise.js";
import shopify from "./rules/shopify.js";
import sonarjs from "./rules/sonarjs.js";
import sortImports from "./rules/sortImport.js";
import storybook from "./rules/storybook.js";
import windows from "./rules/windows.js";

export { parserOptions } from "./helpers.js";

export const baseConfig = [
	{
		name: "General settings",
		files: makeListOfFilesToLint(),
		languageOptions: {
			parserOptions,
			globals: {
				...globals.node,
				...globals.es2021,
				MathJax: false,
			},
		},
	},
	// Rules
	...foretagsplatsen,
	...base,
	...cypress,
	...consistentDefaultExportName,
	...eslintComments,
	...importRules,
	...jasmine,
	...jsdoc,
	...mocha,
	...promise,
	...shopify,
	...sonarjs,
	...sortImports,
	...storybook,
	// Windows specific rules
	...windows,
	// Ignored files
	{
		name: "Global ignore",
		ignores: ignoredFiles,
	},
];
