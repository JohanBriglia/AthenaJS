import { double, makeIntegerProbes } from "./helpers.js";
import Athena from "./Athena.js";

let probesToTest = makeIntegerProbes({ size: 10 });
let probesToLearn = double([...probesToTest]);
probesToLearn = [...probesToLearn, ...probesToLearn];
probesToLearn = [...probesToLearn, ...probesToLearn];
console.log(probesToLearn.length);
let shouldLearn = true;

let athena = Athena.fromProbe(probesToLearn.shift());
athena.setShouldLearn(() => shouldLearn);
athena.injectProbes(probesToLearn);

shouldLearn = false;

let start = new Date();
athena.inject(probesToTest[5]);
let end = new Date();

let results = athena.injectProbes(probesToTest);
let round = (number) => number.toString().slice(0, 4);

results.forEach((result) =>
    console.log(`${result.fluency} ${result.echo.map((ej) => round(ej))}`)
);

let milliseconds = end - start;
console.log(milliseconds / 1000, "seconds");
