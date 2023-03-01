import { addArrays, average, last, parse } from "./helpers.js";
import Modality from "./Modality.js";

const averageThreshold = 0.5;

export default class Trace {
    constructor({ modalities }) {
	this._modalities = modalities;
	this._length = modalities.length;
    }

    inject(probe) {
	let likelyhood = Array(this.getMatricialLength()).fill(0);
	let traceEcho = [];

	this._modalities.forEach((modality) => {
	    let { fluency, echo } = modality.inject(probe);
	    likelyhood = addArrays(likelyhood, fluency);
	    traceEcho = [...traceEcho, ...echo];
	});

	return {
	    similarity: likelyhood.map((x) => x / this._length),
	    echo: traceEcho,
	};
    }

    getMatricialLength() {
	return this._modalities[0].getMatricialLength();
    }

    asNumbers() {
	return this._modalities.map((modality) => modality.asNumbers());
    }

    static fromProbe(probe) {
	return new this({
	    modalities: probe.map((modality, index) => {
		return new Modality({ modality, position: index });}
	    ),
	});
    }

    static materialize({ probe, echo, fluency, modalityBuilder }) {
	let modalities = this._makeModalities({
	    values: probe.map((x, i) => average(x, echo[i])),
	    echo: [...echo],
	    threshold: fluency.map(Math.abs),
	    modalityBuilder,
	});

	return new this({ modalities });
    }

    static _makeModalities({ values, echo, threshold, modalityBuilder }) {
	let protoLength = echo.length - 1;
	let modalities = [];
	let modalityValues = [];

	for (let j = 0; j < protoLength; j++) {
	    modalityValues.push(values[j]);
	    let difference = parse(echo.shift(), echo[0], (a, b) => Math.abs(a - b));
	    let shouldMakeModality = parse(difference, threshold, (a, b) => a >= b ? 1 : 0);

	    if ((shouldMakeModality.reduce((a, b) => a+b) / shouldMakeModality.length) > averageThreshold) {
		modalities.push(modalityBuilder({ modalities: [...modalityValues], position: j }));
		modalityValues = [];
	    }
	}

	modalityValues.push(last(values));
	modalities.push(modalityBuilder({ modalities: [...modalityValues], position: protoLength }));

	return modalities;
    }
}
