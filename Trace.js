import { average, last } from "./helpers.js";
import Modality from "./Modality.js";
//import Modalities from "./Modalities.js";

export default class Trace {
    constructor({ modalities }) {
	this._modalities = modalities;
	this._length = modalities.length;
    }

    inject(probe) {
	let likelyhood = 0;
	let traceEcho = [];

	this._modalities.forEach((modality) => {
	    let { fluency, echo } = modality.inject(probe);
	    likelyhood += fluency;
	    traceEcho = [...traceEcho, ...echo];
	});

	return {
	    similarity: likelyhood / this._length,
	    echo: traceEcho
	};
    }

    asNumbers() {
	return this._modalities.map((modality) => modality.asNumbers());
    }

    static fromProbe(probe) {
	return new this({
	    modalities: probe.map((modality, index) => {
		// return Modalities.get(modality, index);
		return new Modality({ modality, position: index });
	    }),
	});
    }

    static materialize({ probe, echo, fluency, modalityBuilder }) {
	let modalities = this._makeModalities({
	    values: average(probe, echo),
	    echo: [...echo],
	    threshold: Math.abs(fluency),
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
	    let difference = Math.abs(echo.shift() - echo[0]);

	    if (difference > threshold) {
		modalities.push(modalityBuilder({ modalities: [...modalityValues], position: j }));
		modalityValues = [];
	    }
	}

	modalityValues.push(last(values));
	modalities.push(modalityBuilder({ modalities: [...modalityValues], position: protoLength }));

	return modalities;
    }
}
