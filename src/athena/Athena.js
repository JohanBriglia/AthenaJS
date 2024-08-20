import { allIndexes, average, range, randInt, randomElement } from "./helpers.js";
import echoIterators from "./echoIterators.js";
import Modality from "./Modality.js";
import Trace from "./Trace.js";

const maxNumberOfTraces = 15;
const halfIndex = Math.ceil(maxNumberOfTraces / 2);
const maxIndex = 13;
const maxLevel = 5;

export default class Athena {
    constructor({ initialTrace, echo, echoIterator, shouldLearn, slice = [], level = 0 }) {
	this._traces = [initialTrace];
	this._echoIterator = echoIterator;
	this._shouldLearn = shouldLearn;
	this._slice = slice;
	this._level = level;
	this._echo = echo;

	// It can only make new Athena's if there is enough modalities
	this._makeNewTrace = this.getLength() < 3
	    ? this._makeNumericTrace.bind(this)
	    : this._makeTraceConstruction();
    }

    setTraces(traces) {
	this._traces = traces;
    }

    setShouldLearn(shouldLearn) {
	this._shouldLearn = shouldLearn;
    }

    getLength() {
	return this._echoIterator.length;
    }

    asUpgradedLevel() {
	if (this._level === maxLevel) return this._asModalities();

	this._level++;
	this._makeNewTrace = this._makeTraceConstruction();
	
	this._upgradeTracesLevel();

	return this;
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
	this._echo = this._calculateEcho({ results, activations });
	this._learn({ probe, echo: this._echo, fluency, activations });

	return { probe, results, activations, fluency, echo: this._echo };
    }

    _asModalities() {
	let position = this._slice[0] || 0;

	return this._echo.map((modality, index) => {
	    return new Modality({ modality, position: position + index });
	});
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
	this.addTrace(newTrace);

	if (this._traces.length > maxNumberOfTraces) {
	    //this._removePreviousTrace(spec);
	    this._splitTraces();
	}
    }

    _removePreviousTrace({ activations }) {
	// Removing the trace having the least activation (closer to 0) leads to little to no benefits
	// let absActivations = activations.slice(1, maxIndex).map(a => Math.abs(a));
	// let indexToRemove = randomElement(allIndexes(absActivations, Math.min(...absActivations))) + 1;

	// let absActivations = activations.slice();
	// let indexToRemove = randomElement(allIndexes(absActivations, Math.max(...absActivations))) + 1;

	let indexToRemove = randInt(maxIndex);
	this._traces = this._traces.filter((_, i) => i != indexToRemove);
    }

    _splitTraces() {
	this._upgradeTracesLevel();

	let firstTraces = this._traces.slice(0, halfIndex);
	var secondTraces = this._traces.slice(halfIndex);

	this._traces = [
	    new Trace({ modalities: [this._reproduce(firstTraces)] }),
	    new Trace({ modalities: [this._reproduce(secondTraces)] }),
	];
    }

    _upgradeTracesLevel() {
	this._traces.forEach((trace) => trace.upgradeLevel());
    }

    _reproduce(traces) {
	return this.constructor.load({
	    traces,
	    echoIterator: this._echoIterator,
	    shouldLearn: this._shouldLearn.bind(this),
	    level: this._level + 1,
	    echo: this._echo,
	});
    }

    _makeTraceConstruction() {
	// It can only make new Athena's when it isn't too deep
	return this._level < maxLevel
	    ? this._materializeTrace.bind(this)
	    : this._makeNumericTrace.bind(this);
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
	if (modalities.length === 1)
	    return new Modality({ modality: modalities[0], position });

	return new this.constructor({
	    initialTrace: Trace.fromProbe(modalities),
	    echoIterator: echoIterators.get(modalities.length),
	    shouldLearn: this._shouldLearn.bind(this),
	    slice: [position - modalities.length + 1, position + 1],
	    level: this._level + 1,
	    echo: modalities,
	});
    }

    asNumbers() {
	return this._traces.map((trace) => trace.asNumbers());
    }

    static fromProbe(probe) {
	return new this({
	    initialTrace: Trace.fromProbe(probe),
	    echoIterator: echoIterators.get(probe.length),
	    shouldLearn: () => true,
	});
    }

    static makeGlobalFromProbe(probe) {
	echoIterators.initializeIterators(probe.length);
	return this.fromProbe(probe);
    }

    static load({ echo, traces, echoIterator, shouldLearn, level }) {
	let athena = new this({ echo, echoIterator, shouldLearn, level });
	athena.setTraces(traces);
	return athena;
    }
}
