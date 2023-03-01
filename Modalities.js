import Modality from "./Modality.js";
import { range } from "./helpers.js";

const modalities = new Map();

range(-1000, 1000).forEach((value) => {
    let foo = new Map();
    let modality = value / 1000 || 0;

    range(0, 9).forEach((position) => {
	foo.set(position, new Modality({ modality, position }));
    });

    modalities.set(value, foo);
});

const Modalities = {
    // bitwise operator is the fastest way to set a negative float to an interger;
    get: (modality, position) => {
	let foo = modalities
	    .get((modality * 1000) | 0)
	    .get(position);

	return foo;
    },
};

export default Modalities;
