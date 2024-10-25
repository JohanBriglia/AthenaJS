import { range } from "./helpers.js";
import Athena from "./Athena.js";
import echoIterators from "./echoIterators.js";

/**
 * Composition of several Athenas used as a single one. This helps to
 * counteract the catastrophic forgetting provoked by removing random
 * traces.
 * The results returned don't contain trace specific data because
 * it's not relevant.
 *
 * @param {float[]} firstProbe - Initial situation used to create athenas
 * @param {integer} [numberOfAthenas] - Size of the athena composition
 */
export default class CoAthenas {
    constructor({ firstProbe, numberOfAthenas = 2 }) {
	echoIterators.initializeIterators(firstProbe.length);

	this._athenas = this._makeAthenas({ firstProbe, numberOfAthenas });
	this._initializeLearning();

    }

    injectProbes(probes) {
	return probes.map((probe) => this.inject(probe));
    }

    inject(probe) {
	this._isLearningActivated = true;
	return this._inject(probe);
    }

    testProbes(probes) {
	return probes.map((probe) => this.test(probe));
    }

    test(probe) {
	this._isLearningActivated = false;
	return this._inject(probe);
    }

    _makeAthenas({ firstProbe, numberOfAthenas }) {
	return range(1, numberOfAthenas).map((_) =>
		Athena.fromProbe(firstProbe)
	);
    }

    _initializeLearning() {
	this._isLearningActivated = true;

	this._athenas.forEach((athena) =>
	    athena.setShouldLearn(this._shouldLearn.bind(this))
	);
    }

    _shouldLearn() {
	return this._isLearningActivated;
    }

    _inject(probe) {
	let results = this._athenas.map((athena) => athena.inject(probe));
	return this._normalize(results);
    }

    _normalize(results) {
	return {
	    probe: results[0].probe,
	    fluency: this._getAverageFluency(results),
	    echo: this._getAverageEcho(results),
	};
    }

    _getAverageFluency(results) {
	let fluencySum = fluencies.reduce(
	    (sum, { fluency }) => fluency + sum,
	    0
	);

	return fluencySum / results.length;
    }

    _getAverageEcho(results) {
	let echos = results.map((result) => result.echo);
	let firstEcho = echos.shift();

	let echoSum = echos.reduce(
	    (sum, echo) => this._addArrays(echo, sum),
	    firstEcho
	);

	return echoSum.map((sum) => sum / results.length);
    }

    _addArrays(firstArray, secondArray) {
	return firstArray.map((value, index) => value + secondArray[index]);
    }
}
