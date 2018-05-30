var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let _ = setInterval(getVotes, 1000 * 1);

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"name","type":"bytes32"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"chairPerson","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_nb_proposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"proposalNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

VotingContract = web3.eth.contract(abi);

contractInstance = VotingContract.at('0x4cfdc4604b8d4b5955930b34240271ccb46f6abe');

function checkConnection() {
    if(!web3.isConnected()) {
        document.getElementById("chain_status").innerHTML = 'Blockchain Status: FAILED';
        return false;
    } else {
        document.getElementById("chain_status").innerHTML = 'Blockchain Status: Connected';
        return true;
    }
}

function getChairman() {
    if(checkConnection()) {
        const chairman = contractInstance.chairPerson();
        console.log(chairman);
        document.getElementById("chair_man").innerHTML = 'Chairman Address: ' + chairman.toString();
    }
}

function getVotes() {
    const npProposals = parseInt(contractInstance.get_nb_proposals(), 10);
    // const npProposals = 0;
    let ret = [];
    for (let i = 0; i < npProposals; i++) {
        let proposal = contractInstance.proposals(i);
        ret.push({
            name: web3.toAscii(proposal[0]).replace(/\0/g, ''),
            votes: proposal[1]
        });
    }
    document.getElementById("graph").innerHTML = JSON.stringify(ret);
}