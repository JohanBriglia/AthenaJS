import { double, makeIntegerProbes, range } from "./athena/helpers.js";
import { useState } from 'react';
import Athena from "./athena/Athena.js";

export default function runAthena() {
    let { athena, probes } = initializeAthena();
    let foo = athena.inject(probes[0]);
    let [results, setResults] = useState(foo);
    let athenaValues = getAthenaValuesFromResults(results);

    return [
	drawAthenaValues(athenaValues),
	drawAthenaProbes({ probes, onClick: (probe) => setResults(athena.inject(probe)) }),
    ];
}

function drawAthenaProbes({ probes, onClick }) {
    return makeRows([
	null,
	...probes.map((probe) => makeVector({
	    values: floorArray(probe),
	    onClick: () => onClick(probe)
	}))
    ]);
}

function initializeAthena() {
    let probesToTest = makeIntegerProbes({ size: 8 });
    let probesToLearn = double([...probesToTest]);

    let shouldLearn = true;

    let athena = Athena.fromProbe(probesToLearn.shift());
    athena.setShouldLearn(() => shouldLearn);
    athena.injectProbes(probesToLearn);

    shouldLearn = false;

    return { athena, probes: probesToTest };
}

function getAthenaValuesFromResults({ probe, results, activations, fluency, echo }) {
    return {
	probe: floorArray(probe),
	memory: results.map(({ echo }) => floorArray(echo)),
	similarities: floorArray(results.map(({ similarity }) => similarity)),
	activations: floorArray(activations),
	echo: floorArray(echo),
	fluency: floorValue(fluency),
    };
}

function floorArray(array) {
    return array.map(floorValue);
}

function floorValue(value) {
    return Math.floor(value * 100);
}

function drawAthenaValues({ probe, memory, similarities, activations, echo, fluency } = {}) {
    return makeRows([
	null,
	makeVector({ values: probe }),
	null,
	...makeMemory({ vectors: memory, similarities, activations }),
	null,
	makeEcho({ echo, fluency }),
    ]);
}

function makeRows(contentArray) {
    return <> {
	makeObjects({ values: contentArray, maker: makeRow })
    } </>;
}

function makeRow(content) {
    return <div className="board-row">{makeObjects({ values: [makeSpace(), content] })}</div>;
}

function makeMemory({
    vectors = [[42, 42, 42], [42, 42, 42]],
    similarities = [42, 42],
    activations = [42, 42]
} = {}) {
    return vectors.map((values, index) => [
	makeVector({ values }),
	makeSpace(),
	makeModality({ value: similarities[index] }),
	makeSpace(),
	makeModality({ value: activations[index] }),
    ]);
}

function makeEcho({ echo, fluency }) {
    return makeObjects({ values: [
	makeVector({ values: echo }),
	makeSpace(3),
	makeModality({ value: fluency })
    ] });
}

function makeVector({ values = [42, 42, 42], onClick } = {}) {
    return <>{
	makeObjects({
	    values,
	    maker: (value) => makeModality({ value, onClick })
	})
    }</>;
}

function makeModality({ value = 42, empty = false, onClick } = {}) {
    return <button className= {`square${empty ? " empty" : ""}`} onClick={onClick}>
	{ value }
    </button>;
}

function makeObjects({ values, maker = (value) => value }) {
    return values.map((value, i) =>
	    <div key={`${i}`}> {
		maker(value)
	    } </div>);
}

function makeSpace(numberOfSpaces = 1) {
    return <>{
	makeObjects({
	    values: Array(numberOfSpaces).fill(),
	    maker: () => makeModality({ value: " ", empty: true }),
	})
    }</>;
}
