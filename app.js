let express = require('express');
let app = express();

let VoteChain = require('./votechain/votechain.js');

let PORT = 3000;
let voteChain = new VoteChain();

app.get('/mine/:uid/:round/:vote_for', function (req, res) {
    voteChain.mine(req.params.uid, req.params.round, req.params.vote_for);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ result: "BLOCKCHAINED!!!1!1!" }));
});

app.get('/unblockchain', function (req, res) {
    voteChain = new VoteChain();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ result: "UNBLOCKCHAINED!!!1!1!" }));
});

app.get('/verify', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ correct: voteChain.verify() }));
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ blockchain: voteChain.chain }));
});

app.listen(PORT, function () {
    console.log('Listening at ' + PORT);
});