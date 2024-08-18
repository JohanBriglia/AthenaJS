import path from "node:path";

const extensionsToLint = ["*.js", "*.cjs", "*.mjs"];

export const parserOptions = {
	ecmaVersion: "latest",
	sourceType: "module",
};

export const ignoreExports = [
	".eslintrc.cjs",
	"babel.config.cjs",
	"cypress.config.cjs",
	"karma.conf.cjs",
	"stylelint.config.cjs",
	"webpack.*.cjs",
	"buildWebpackConfig.cjs",
	"lint-staged.config.mjs",
	"stylelint/noInvalidDoubleSlashComment.mjs",
];

export const ignoredFiles = [
	"js/lib",
	"**/*.min.js",
	"build/**",
	"storybook-static/**",
];

/**
 * Generates a list of files to lint based on the `extensionsToLint` array,
 * adding an optional prefix to each entry.
 *
 * @param {string} [prefix] - Optional prefix to add to each entry
 * @return {string[]}
 */
export function makeListOfFilesToLint({ prefix = "**" } = {}) {
	return extensionsToLint.map((ext) => `${prefix}/${ext}`);
}

/**
 * Computes the prefix for the overrides rules based on the meta object.
 *
 * @param {object} meta - Meta object, usually from `import.meta
 * @param {string} meta.url - URL of the file
 * @return {string}
 */
export function makeOverridesPrefix({ meta }) {
	let __dirname = new URL(".", import.meta.url).pathname;
	let overridesPath = path.resolve(__dirname, "overrides");
	let overrideRulesPath = new URL(meta.url).pathname;
	let relativePath = path.relative(overridesPath, overrideRulesPath);
	let basePath = path.dirname(relativePath);

	return `${basePath}/**`;
}

/**
 * Generates a list of files to lint within an override, based of the file
 * system path of the override file.
 *
 * @param {object} meta - Meta object, usually from `import.meta
 * @param {string} meta.url - URL of the file
 * @return {string[]}
 */
export function makeListOfOverridesToLint({ meta }) {
	let prefix = makeOverridesPrefix({ meta });

	return makeListOfFilesToLint({ prefix });
}
