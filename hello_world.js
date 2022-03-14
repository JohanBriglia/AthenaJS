import { double, makeIntegerProbes } from "./helpers.js";
import Athena from "./Athena.js";

let start = new Date();

let probesToTest = makeIntegerProbes({ size: 10 });
let probesToLearn = double([...probesToTest]);
let shouldLearn = true;

let athena = Athena.fromProbe(probesToLearn.shift());
athena.setShouldLearn(() => shouldLearn);
athena.injectProbes(probesToLearn);

shouldLearn = false;

let results = athena.injectProbes(probesToTest);
let round = (number) => number.toString().slice(0, 4);

results.forEach((result) =>
    console.log(`${result.fluency} ${result.echo.map((ej) => round(ej))}`)
);

let end = new Date();
let milliseconds = end - start;
console.log(milliseconds / 1000, "seconds");
