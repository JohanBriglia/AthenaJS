import Athena from "../src/athena/Athena.js";
import echoIterators from "../src/athena/echoIterators.js";
import Modality from "../src/athena/Modality.js";
import Trace from "../src/athena/Trace.js";

describe("Athena", () => {
    describe("constructor", () => {
	it("uses the initialTrace as first trace", () => {
	    let probe = [0, 1, -1];

	    let athena = makeAthena({ probe });

	    expect(athena._traces[0].asNumbers()).toEqual(probe);
	});
    });

    describe("getLength", () => {
	it("should return the echoIterator length", () => {
	    let echoIterator = [0, 1, 2];

	    let athena = new Athena({ echoIterator });

	    expect(athena.getLength()).toBe(3);
	});
    });

    describe("inject", () => {
	it("returns the correct results", () => {
	    let probe = [1, -1, 1, 0, -1];
	    let initialTrace = Trace.fromProbe([0, 0.5, -0.25]);
	    let secondTrace = Trace.fromProbe([1, -0.6, 0.7]);
	    let echoIterator = [0, 1, 2];
	    let shouldLearn = () => false;
	    let slice = [2, 5];

	    let athena = new Athena({ initialTrace, echoIterator, shouldLearn, slice });
	    athena.addTrace(secondTrace);
	    let results = athena.inject(probe);

	    expect(results.fluency).toBeCloseTo(0.092, 3);
	    expect(results.echo[0]).toBeCloseTo(0.545, 3);
	    expect(results.echo[1]).toBeCloseTo(-0.100, 3);
	    expect(results.echo[2]).toBeCloseTo(0.268, 3);
	});

	it("learns an Athena and a modality in a new Trace when it is supposed to", () => {
	    let probe = [1, 0, 1, 1, -1];
	    let initialTrace = Trace.fromProbe([1, 1, -0.25]);
	    let echoIterator = [0, 1, 2];
	    let shouldLearn = () => true;
	    let slice = [2, 5];

	    let athena = new Athena({ initialTrace, echoIterator, shouldLearn, slice });

	    expect(athena._traces.length).toBe(1);
	    
	    athena.inject(probe);

	    expect(athena._traces.length).toBe(2);
	    
	    let newTrace = athena._traces[1];

	    expect(newTrace._modalities[0].getLength()).toEqual(2);
	    expect(newTrace._modalities[0].constructor).toBe(Athena);
	    expect(newTrace._modalities[1].getLength()).toEqual(1);
	    expect(newTrace._modalities[1].constructor).toBe(Modality);
	});

	it("learns Modality's in a new Trace when it is not supposed to reproduce", () => {
	    let probe = [1, -1, 1, 0, -1];
	    let initialTrace = Trace.fromProbe([0, 0.5]);
	    let echoIterator = [0, 1];
	    let shouldLearn = () => true;
	    let slice = [2, 4];

	    let athena = new Athena({ initialTrace, echoIterator, shouldLearn, slice });

	    expect(athena._traces.length).toBe(1);
	    
	    athena.inject(probe);

	    expect(athena._traces.length).toBe(2);
	    
	    let newTrace = athena._traces[1];

	    expect(newTrace._modalities[0].getLength()).toEqual(1);
	    expect(newTrace._modalities[0].constructor).toBe(Modality);
	    expect(newTrace._modalities[1].getLength()).toEqual(1);
	    expect(newTrace._modalities[1].constructor).toBe(Modality);
	});

	it("doesn't learn when it is not supposed to", () => {
	    let probe = [1, -1, 1, 0, -1];
	    let initialTrace = Trace.fromProbe([0, 0.5, -0.25]);
	    let echoIterator = [0, 1, 2];
	    let shouldLearn = () => false;
	    let slice = [2, 5];

	    let athena = new Athena({ initialTrace, echoIterator, shouldLearn, slice });

	    expect(athena._traces.length).toBe(1);
	    
	    athena.inject(probe);

	    expect(athena._traces.length).toBe(1);
	});
    });

    describe("_getSlice", () => {
	it("should return the proper slice", () => {
	    let probe = [1, 2, 3, 4, 5];
	    let slice = [2, 4];

	    let echoIterator = makeIterator(probe.length);
	    let athena = new Athena({ echoIterator, slice });

	    expect(athena._getSlice(probe)).toEqual([3, 4]);
	});

	it("should return the whole probe is slice isn't initialized", () => {
	    let probe = [1, 2, 3, 4, 5];

	    let echoIterator = makeIterator(probe.length);
	    let athena = new Athena({ echoIterator });

	    expect(athena._getSlice(probe)).toEqual(probe);
	});
    });

    describe("_calculateActivations", () => {
	it("returns a list of activations", () => {
	    let results = [{ similarity: 0.5}, { similarity: -0.7 }];

	    let athena = makeAthena();
	    let activations = athena._calculateActivations({ results });

	    expect(activations[0]).toBeCloseTo(0.417, 3);
	    expect(activations[1]).toBeCloseTo(-0.583, 3);
	});
    });

    describe("_calculateFluency", () => {
	it("returns the corresponding fluency", () => {
	    let results = [{ similarity: 0.5}, { similarity: -0.7 }];
	    let activations = [0.417, -0.583];

	    let athena = makeAthena();

	    expect(athena._calculateFluency({ results, activations })).toBeCloseTo(-0.20, 2);
	});
    });

    describe("_calculateEcho", () => {
	it("returns the corresponding echo", () => {
	    let results = [
		{ echo: [0.5, 0.7, -0.6], similarity: 0.5},
		{ echo: [-0.7, -0.4, 0.7], similarity: -0.7 }
	    ];

	    let activations = [0.417, -0.583];
	    let echoIterator = [0, 1, 2];

	    let athena = new Athena({ echoIterator });
	    let echo = athena._calculateEcho({ results, activations });

	    expect(echo[0]).toBeCloseTo(0.617, 3);
	    expect(echo[1]).toBeCloseTo(0.525, 3);
	    expect(echo[2]).toBeCloseTo(-0.658, 3);
	});
    });

    describe("_makeModality", () => {
	it("makes a base Modality if there is one modality", () => {
	    let modalities = [0.5];
	    let position = 3;

	    let athena = makeAthena();
	    let modality = athena._makeModality({ modalities, position });

	    expect(modality.constructor).toBe(Modality);
	    expect(modality._modality).toBe(modalities[0]);
	    expect(modality._position).toEqual(position);
	});

	it("makes a new Athena if there is several modalities", () => {
	    let modalities = [0.5, -0.7, 0];
	    let position = 3;
	    let shouldLearn = jasmine.createSpy("shouldLearn");
	    let probe = jasmine.createSpy("probe");

	    let athena = new Athena({
		shouldLearn: () => shouldLearn,
		echoIterator: makeIterator(modalities.length),
	    });

	    spyOn(Trace, "fromProbe").and.returnValue(probe);
	    let modality = athena._makeModality({ modalities, position });

	    expect(modality.constructor).toBe(Athena);
	    expect(modality._traces).toEqual([probe]);
	    expect(modality._echoIterator).toEqual([0, 1, 2]);
	    expect(modality._shouldLearn()).toEqual(shouldLearn);
	    expect(modality._slice).toEqual([1, 4]);
	});
    });

    function makeIterator(size) {
	echoIterators.initializeIterators(size);
	return echoIterators.get(size);
    }

    function makeAthena({ probe = [1, -1, 0] } = {}) {
	return Athena.makeGlobalFromProbe(probe);
    }
});
