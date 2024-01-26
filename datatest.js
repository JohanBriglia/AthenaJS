import { double, logArrays, parse } from "./helpers.js";
import Athena from "./Athena.js";
import data from "./data.json" assert { type: "json" };

let values = data.map((x) => x.values[0]);
let allValues = values.flat(2);
let absMax = getAbsMax(allValues);
console.log(absMax);

let probes = values[0].map((_, yearIndex) =>
    values[0][0].map((_, monthIndex) =>
	values
	    .map((account) => account[yearIndex][monthIndex])
	    .map(convertAccountToModality)
    )
);

let probesToLearn = double(probes.slice(0,2));

let emptyModality = Array(probesToLearn[0][0].length).fill(0);
let probeToTest = probes[2].map((x, i) => i > 0 ? emptyModality.slice() : x);
let modalityToReach = probes[2][11].map(convertModalityToAccount);

let shouldLearn = true;
let athena = Athena.fromProbe(probesToLearn.shift());
athena.setShouldLearn(() => shouldLearn);
athena.injectProbes(probesToLearn);

shouldLearn = false;

let result = athena.inject(probeToTest);

let modality = result.echo[11].map(convertModalityToAccount);
let differences = parse(modality, modalityToReach, (a,b) => {
    let dif = Math.abs(a-b);
    return b ? dif / b : (a ? dif / a : 0);
});
let difference = differences.reduce((total, each) => total + each, 0) / differences.length;

console.log("predicted", modality.slice(0,5));
console.log("fluency", result.fluency.slice(0,5));
console.log("real", modalityToReach.slice(0,5));
console.log("percent difference", difference);

console.log("Athenas count", athena.countYourself());

function getAbsMax(arr) {
    let len = arr.length;
    let max = -Infinity;

    while (len--) {
	let value = Math.abs(arr[len]);
	if (value > max) max = value;
    }

    return max;
}

function convertAccountToModality(account) {
    return account / absMax;
}

function convertModalityToAccount(modality) {
    return modality * absMax;
}
