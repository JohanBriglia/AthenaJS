import Modality from "../Modality.js";

describe("Modality", () => {
    describe("inject", () => {
	it("returns infimum and modality as result", () => {
	    let probe = [0, 0.5];
	    let modalityValue = -0.25;
	    let position = 1;

	    let modality = new Modality({ modality: modalityValue, position });
	    let result = modality.inject(probe);

	    expect(result.fluency).toBe(-0.25);
	    expect(result.echo).toEqual([modalityValue]);
	});
    });

    describe("_getSlice", () => {
	it("returns the item at the correct position", () => {
	    let probe = [0, 42, 2];
	    let position = 1;

	    let modality = new Modality({ position });

	    expect(modality._getSlice(probe)).toBe(42);
	});
    });

    describe("_getInfimum", () => {
	it("gets minimal between positive values", () => {
	    let x = 0.5;
	    let y = 0.25;

	    let modality = new Modality();

	    expect(modality._getInfimum({ x, y })).toBe(0.25);
	});
	
	it("gets maximal between negative values as positive value", () => {
	    let x = -0.5;
	    let y = -0.25;

	    let modality = new Modality();

	    expect(modality._getInfimum({ x, y })).toBe(0.25);
	});
	
	it("gets closer to 0 between positive and negative values as negative value", () => {
	    let x = -0.5;
	    let y = 0.25;

	    let modality = new Modality();

	    expect(modality._getInfimum({ x, y })).toBe(-0.25);
	});
    });
});
