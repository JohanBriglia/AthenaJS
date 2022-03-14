import Athena from "../Athena.js";
import Modality from "../Modality.js";
import Trace from "../Trace.js";

describe("Trace", () => {
    describe("inject", () => {
	it("averages fluencies and concatenate echoes", () => {
	    let modality = jasmine.createSpyObj("modality", ["inject", "getLength"]);
	    modality.inject.and.returnValue({ fluency: 0.5, echo: [0.3] });
	    modality.getLength.and.returnValue(1);

	    let athena = jasmine.createSpyObj("athena", ["inject", "getLength"]);
	    athena.inject.and.returnValue({ fluency: 0, echo: [0.4, -0.5] });
	    athena.getLength.and.returnValue(2);

	    let trace = new Trace({ modalities: [modality, athena] });
	    let results = trace.inject("anyProbe");

	    expect(results.similarity).toBe(0.25);
	    expect(results.echo).toEqual([0.3, 0.4, -0.5]);
	});
    });

    describe("static fromProbe", () => {
	it("makes a list of modalities from the probe", () => {
	    let probe = [0, 1];

	    let trace = Trace.fromProbe(probe);
	    let modalities = trace._modalities;
	    
	    expect(modalities[0].constructor).toBe(Modality);
	    expect(modalities[0]._modality).toBe(probe[0]);
	    expect(modalities[0]._position).toBe(0);
	    
	    expect(modalities[1].constructor).toBe(Modality);
	    expect(modalities[1]._modality).toBe(probe[1]);
	    expect(modalities[1]._position).toBe(1);
	});
    });

    describe("static materialize", () => {
	it("makes Modalities", () => {
	    let probe = [-1, -0.5, -0.5];
	    let echo = [0, 0, 1];
	    let fluency = -0.5;
	    let athena = new Athena();
	    let modalityBuilder = athena._makeModality.bind(athena);

	    let trace = Trace.materialize({ probe, echo, fluency, modalityBuilder });
	    let modalities = trace._modalities;

	    expect(modalities.length).toBe(2);
	    expect(modalities[0].constructor).toBe(Athena);

	    let subAthenaTrace = modalities[0]._traces[0];
	    let subAthenaModalities = subAthenaTrace._modalities;
	    
	    expect(subAthenaModalities[0]._modality).toBe(-0.5);
	    expect(subAthenaModalities[1]._modality).toBe(-0.25);

	    expect(modalities[1].constructor).toBe(Modality);
	    expect(modalities[1]._modality).toBe(0.25);
	});
    });
});
