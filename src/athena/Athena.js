import { allIndexes, average, range, randInt, randomElement } from "./helpers.js";
import echoIterators from "./echoIterators.js";
import Modality from "./Modality.js";
import Trace from "./Trace.js";

export default class Athena {
    constructor({ initialTrace, echoIterator, shouldLearn = () => true, slice = [], level = 0 } = {}) {
	this._traces = [initialTrace];
	this._echoIterator = echoIterator;
	this._shouldLearn = shouldLearn;
	this._slice = slice;
	this._level = level;

	//this._maxNumberOfTraces = Math.round(initialTrace.length * 1.5);
	this._maxNumberOfTraces = 15;
	//this._maxIndex = this._maxNumberOfTraces - 2;
	this._maxIndex = 13;

	// It can only make new Athena's when if it isn't too deep and if there is enough modalities
	this._makeNewTrace = level < 5 && this.getLength() > 2
	    ? this._materializeTrace.bind(this)
	    : this._makeNumericTrace.bind(this);
    }

    setShouldLearn(shouldLearn) {
	this._shouldLearn = shouldLearn;
    }

    getLength() {
	return this._echoIterator.length;
    }

    addTrace(trace) {
	this._traces.push(trace);
    }

    injectProbes(probes) {
	return probes.map((probe) => this.inject(probe));
    }

    inject(initialProbe) {
	let probe = this._getSlice(initialProbe);
	let results = this._traces.map((trace) => trace.inject(probe));
	let activations = this._calculateActivations({ results });
	let fluency = this._calculateFluency({ results, activations });
	let echo = this._calculateEcho({ results, activations });
	this._learn({ probe, echo, fluency, activations });

	return { probe, results, activations, fluency, echo };
    }

    _getSlice(probe) {
	return probe.slice(...this._slice);
    }

    _calculateActivations({ results }) {
	let intensity = results.reduce((i, { similarity }) =>
	    i + Math.abs(similarity),
	    0
	) || 1;

	return results.map(({ similarity }) => similarity / intensity);
    }

    _calculateFluency({ results, activations }) {
	return results.reduce((fluency, { similarity }, index) =>
	    fluency + (activations[index] * Math.abs(similarity)),
	    0
	);
    }

    _calculateEcho({ results, activations }) {
	return this._echoIterator.map((j) =>
	    results.reduce((echoJ, { echo }, i) =>
		echoJ + (echo[j] * activations[i]),
		0
	    )
	);
    }

    _learn(spec) {
	if (!this._shouldLearn()) return;

	let newTrace = this._makeNewTrace(spec);
	this._removePreviousTrace(spec);
	this.addTrace(newTrace);
    }

    _removePreviousTrace({ activations }) {
	if (this._traces.length < this._maxNumberOfTraces) return;

	// let indexToRemove = randInt(this._maxIndex);

	// Removing the trace having the least activation (closer to 0) leads to little to no benefits
	// let absActivations = activations.slice(1, this._maxIndex).map(a => Math.abs(a));
	// let indexToRemove = randomElement(allIndexes(absActivations, Math.min(...absActivations))) + 1;

	let absActivations = activations.slice();
	let indexToRemove = randomElement(allIndexes(absActivations, Math.max(...absActivations))) + 1;

	this._traces = this._traces.filter((_, i) => i != indexToRemove);
    }

    _makeNumericTrace({ probe, echo }) {
	return Trace.fromProbe(average(probe, echo));
    }

    _materializeTrace({ probe, echo, fluency }) {
	return Trace.materialize({
	    probe,
	    echo,
	    fluency,
	    modalityBuilder: this._makeModality.bind(this)
	});
    }

    _makeModality({ modalities, position }) {
	let size = modalities.length - 1;

	if (size === 0)
	    return new Modality({ modality: modalities[0], position });

	return new this.constructor({
	    initialTrace: Trace.fromProbe(modalities),
	    echoIterator: echoIterators.get(size),
	    shouldLearn: this._shouldLearn.bind(this),
	    slice: [position - size, position + 1],
	    level: this._level + 1,
	});
    }

    asNumbers() {
	return this._traces.map((trace) => trace.asNumbers());
    }

    static fromProbe(probe) {
	return new this({
	    initialTrace: Trace.fromProbe(probe),
	    echoIterator: echoIterators.get(probe.length - 1),
	});
    }

    static makeGlobalFromProbe(probe) {
	echoIterators.initializeIterators(probe.length);
	return this.fromProbe(probe);
    }
}
