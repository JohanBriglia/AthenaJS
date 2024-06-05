import { makeNumberArray, range } from "./helpers.js";

class EchoIterators {
    constructor() {
	this._iterators = [];
    }

    get(numberOfModalities) {
	return this._iterators[numberOfModalities];
    }

    initializeIterators(maxNumberOfModalities) {
	if (this._iterators.length >= maxNumberOfModalities) return;

	let iterators = range(1, maxNumberOfModalities).map(
	    (numberOfModalities) => makeNumberArray(numberOfModalities)
	);

	// use an empty iterator for 0 modalities
	this._iterators = [[], ...iterators];
    }
}

const echoIterators = new EchoIterators();

export default echoIterators;
