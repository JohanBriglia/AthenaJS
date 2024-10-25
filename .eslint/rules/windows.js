/**
 * The following is to disable the line-break rule on windows computer.
 * We assume here that Windows devs have the correct git settings
 * to auto-crlf on pull and auto-lf on push.
 */
let isWindows = /^win/.test(process.platform);
let disableLineBreaks = isWindows;

export default [
	disableLineBreaks
		? {
				name: "Windows fix",
				rules: {
					"prettier/prettier": ["error", { endOfLine: "auto" }],
					"linebreak-style": "off",
				},
			}
		: {},
];
