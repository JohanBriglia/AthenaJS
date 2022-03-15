import { average, range } from "./helpers.js";
import Modality from "./Modality.js";
import Trace from "./Trace.js";

export default class Athena {
    constructor({ initialTrace, echoIterator = [], shouldLearn = () => true, slice = [], level = 0 } = {}) {
	this._traces = [initialTrace];
	this._echoIterator = echoIterator;
	this._shouldLearn = shouldLearn;
	this._slice = slice;
	this._level = level;

	// It can only make new Athena's when if it isn't too deep and if there is enough modalities
	this._makeNewTrace = level < 3 && this.getLength() > 2
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

	if (this._shouldLearn()) {
	    this._learn({ probe, echo, fluency });
	}

	return { fluency, echo };
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
	let newTrace = this._makeNewTrace(spec);
	this.addTrace(newTrace);
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
	    echoIterator: range(0, size),
	    shouldLearn: this._shouldLearn.bind(this),
	    slice: [position - size, position + 1],
	    level: this._level + 1,
	});
    }

    static fromProbe(probe) {
	return new this({
	    initialTrace: Trace.fromProbe(probe),
	    echoIterator: range(0, probe.length - 1),
	});
    }

    static fromProbes(probes) {
	let copy = [...probes];
	let athena = this.fromProbe(copy.shift());
	athena.injectProbes(copy);
	return athena;
    }
}
