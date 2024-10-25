import Athena from "./src/athena/Athena.js";
import express from "express";

// curl http://localhost:3100/athenas -d '{ "probe": [1, 0, -1] }' -H "Content-type: application/json"

// Create an Athena:
// POST /athenas
// body: [0, 1, -1] || [[1, 0, 0], ...]
// ⇒ returns {id: 42}

// Compute stuff:
// POST /athenas/{id}/Inject
// body: [0, 1, -1] || [[1, 0, 0], ...]
// ⇒ returns { probe, echo, fluency, activations }

// Define parameters:
// POST /athenas/{id}/Setup
// body: { shouldLearn: true }
// ⇒ returns { id: 2, shouldLearn: true}

const PORT = 3100;

const app = express();
app.use(express.json());

let athenas = [];

function getAthena(req) {
    let id = req.params.id;
    return { id, athena: athenas[id] };
}

function makeAthena(probe) {
    let id = athenas.length;
    let athena = Athena.makeGlobalFromProbe(probe);
    athenas.push(athena);
    return { id, athena };
}

function isSingleProbe(content) {
    return !Array.isArray(content[0]);
}

app.post('/athenas', function (req, res) {
    let content = req.body;
    let probes = isSingleProbe(content) ? [content] : content;
    let { id, athena } = makeAthena(probes.shift());
    athena.injectProbes(probes);
    res.send({id});
});

app.post('/athenas/:id/Inject', function (req, res) {
    let content = req.body;
    let { athena } = getAthena(req);

    let result = isSingleProbe(content)
	? athena.inject(content)
	: athena.injectProbes(content);

    res.send(result);
});

app.post('/athenas/:id/Learn', function (req, res) {
    console.log(req.body);
    let [shouldLearn] = req.body;
    let { id, athena } = getAthena(req);
    athena.setShouldLearn(() => shouldLearn);
    res.send({ id, shouldLearn });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
