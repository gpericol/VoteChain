"use strict";
const crypto = require('crypto'); 
let Vote = require('./vote.js');

let GENESIS_HASH = "c0de000000000000000000000000000000000000000000000000000000000000";
let START_HASH = "MATT DAMON";

class VoteChain {
    constructor() {
        this.chain = [];
    }

    mine(uid, round, vote_for) {
        let previous_hash = GENESIS_HASH;
        let hash = START_HASH;

        if (this.chain.length > 0) {
            previous_hash = crypto.createHash('sha256').update(this.chain[this.chain.length - 1].get()).digest('hex');
        }

        let vote = new Vote(uid, round, vote_for, previous_hash);
        
        while (!hash.startsWith("c0de")) {
            vote.nonce++;
            hash = crypto.createHash('sha256').update(vote.get()).digest('hex');
        }
        this.chain.push(vote);
    }

    verify(){
        let previous_hash = GENESIS_HASH;
        
        if(this.chain.length == 0){
            return true;
        }

        for(let i = 0; i < this.chain.length ; i++){
            if(previous_hash != this.chain[i].previous_hash){
                return false;
            }
            previous_hash = crypto.createHash('sha256').update(this.chain[i].get()).digest('hex');       
        }
        return true;
    }
}

module.exports = VoteChain;