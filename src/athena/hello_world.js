import { double, makeIntegerProbes, range, repeat } from "./helpers.js";
import Athena from "./Athena.js";

let allResults = [];
let numberOfModalities = 10;
let numberOfProbesToLearn = 40; // must be a multiple of numberOfModalities (min 2x)
let numberOfRepetitions = numberOfProbesToLearn / (numberOfModalities * 2);
let numberOfTests = 3;

console.log("tested ", numberOfTests, " times");
console.log(numberOfModalities, " modalities");
console.log(numberOfProbesToLearn, " probes to learn");

range(1, numberOfTests).forEach((x) => {
    let probesToTest = makeIntegerProbes({ size: numberOfModalities });
    let probesToLearn = double([...probesToTest]);
    probesToLearn = repeat({ probes: probesToLearn, numberOfRepetitions });
    let shouldLearn = true;

    let athena = Athena.makeGlobalFromProbe(probesToLearn.shift());
    athena.setShouldLearn(() => shouldLearn);
    athena.injectProbes(probesToLearn);

    shouldLearn = false;

    let results = [];
    let time = [];

    probesToTest.forEach(probe => {
	let start = new Date();
	results.push(athena.inject(probe));
	let end = new Date();
	time.push(end - start);
    });

    results[0].time = time.reduce((x, t) => x + t, 0) / time.length;

    // let firstTestProbe = probesToTest.shift();

    // let start = new Date();
    // let firstResult = athena.inject(firstTestProbe);
    // let end = new Date();

    // firstResult.time = end - start;
    //logArrays(athena.asNumbers());

    // let results = [firstResult, ...athena.injectProbes(probesToTest)];
    allResults.push(results);
    console.log("test ", x, " done");
});

let round = (number) => {
    if (Math.abs(number) < 0.001) return "0.000";
    return number.toString().slice(0, 5);
};

let results = allResults[0].map((_, index) => ({
    fluency: allResults.reduce((fluency, results) => fluency + results[index].fluency, 0) / numberOfTests,
    echo: allResults[0][0].echo.map((_, i) => allResults.reduce((echo, results) => echo + results[index].echo[i], 0) / numberOfTests),
}));

results.forEach((result) =>
    console.log(`${round(result.fluency)} | ${result.echo.map((ej) => round(ej)).join("  ")}`)
);

let milliseconds = allResults.reduce((time, results) => time + results[0].time, 0) / numberOfTests;
console.log(round(milliseconds / 1000), "seconds");


// WHOLE EXPERIMENT

// Normal : 3.79 seconds to run
// removing traces (max 15, level 5) : 0.90 seconds to run
// removing traces (max 10, level 5) : 0.23 seconds to run /!\ BROKEN /!\

// 1 probe (test)

// Normal : 0.052 seconds to run
// removing traces (max 15, level 5) : 0.027 seconds to run

// 1 probe (learn)

// Normal : 0.075 seconds to run
// removing traces (max 15, level 5) : 0.046 seconds to run
