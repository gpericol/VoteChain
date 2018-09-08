class Vote {
    constructor(uid, round, vote_for, previous_hash) {
        this.uid = uid;
        this.round = round;
        this.vote_for = vote_for;
        this.previous_hash = previous_hash;
        this.time = +Date.now();
        this.nonce = -1;
    }

    get() {
        return this.uid + "$" + this.round + "$" + this.vote_for + "$" + this.previous_hash + "$" + this.time + "$" + this.nonce;
    }
}

module.exports = Vote;