let proposal_votes = [0,0,0,0,0];
let _ = setInterval(getVotes, 1000 * 12);

function vote(proposal_id) {
    proposal_votes[proposal_id] += 1;
    console.log(proposal_votes);
}

function getVotes() {
    ret = [];
    let i = 0;
    proposal_votes.forEach(function (proposal) {
        ret.push({
            id: i,
            value: proposal
        });
        i++;
    });
    console.log(ret);
    document.getElementById("graph").innerHTML = JSON.stringify(ret);
}