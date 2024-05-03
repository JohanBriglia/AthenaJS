// import util from "util";

export function allIndexes(array, value) {
    let indexes = [];

    array.forEach((x, i) => {
	if (x === value) indexes.push(i);
    });

    return indexes;
}

export function average(array1, array2) {
    // if (array1.length != array2.length) {
    // 	console.log(`average error: different length between ${array1} and ${array2}`);
    // 	debugger;
    // }

    return array1.map((x, i) => (x + array2[i]) / 2);
}


export function clone(array) {
    return array.splice(0);
}

export function double(probes) {
    return probes.reduce((allProbes, probe) =>
	[...allProbes, probe, probe],
	[]
    );
}


export function last(array) {
    // if (array.length === 0) {
    // 	console.log("array is empty");
    // 	debugger;
    // }

    return array[array.length - 1];
}

export function makeIntegerProbes({ size }) {
    return makeNumberArray(size).map((index) => {
	let probe = Array(size).fill(0);
	probe[index] = 1;
	return probe;
    });
}


export function makeProbes(numberOfProbes, numberOfModalities) {
    return range(1, numberOfProbes).map(() =>
	makeProbe(numberOfModalities)
    );
}

export function makeProbe(numberOfModalities) {
    return range(1, numberOfModalities).map(() =>
	makeModality()
    );
}

export function makeModality() {
    return Math.random() * 2 - 1;
}


export function range(start, end) {
    // if (start === end) {
    // 	console.log("cannot range between same values");
    // 	debugger;
    // }

    let addition = start < end
	? (x, start) => x + start
	: (x, start) => start - x; 
    
    let length = Math.abs(end - start) + 1;
    let numberArray = makeNumberArray(length);
    return numberArray.map((x) => addition(x, start));
}

export function makeNumberArray(length) {
    return Array.from(Array(length).keys());
}

export function randInt(max) {
    return Math.floor(Math.random() * (max-1) + 1);
}

export function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// export function logArrays(arrays) {
//     console.log(util.inspect(arrays, false, null, true));
// }
