/* GLOBAL VARIABLES */
window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log("MetaMask is awesome");
        web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
});

abi = JSON.parse('[{"constant":false,"inputs":[{"name":"proposalId","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"name","type":"bytes32"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voteCasted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"chairPerson","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_nb_proposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"proposalNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

contractAddress = '0x7c64c8e0555514e7070fe595b7c08219ef5bb11f';

VotingContract = web3.eth.contract(abi);

contractInstance = VotingContract.at(contractAddress);

const VotingService = _ => {
  /* PRIVATE FUNCTIONS */
    const _formatVotes = votes => votes.map(vote => vote.value);

    const getVotes = new Promise( function (resolve, reject) {
        let ret = [];
        contractInstance.get_nb_proposals(function (err, _nbProposals) {
            const nbPoroposals = parseInt(_nbProposals, 10);
            for(let i = 0; i < nbPoroposals; i++) {
                contractInstance.proposals(i, function (err, proposal) {
                    ret.push({
                        id: i,
                        name: web3.toAscii(proposal[0]).replace(/\0/g, ''),
                        value: parseInt(proposal[1], 10)
                    });
                    if (i === nbPoroposals - 1)
                        resolve(ret);
                });
            }
        });
    });



    const vote = (id) => new Promise(function (resolve, reject) {

        web3.version.getNetwork((error, netId) => {
            console.log(netId);
            console.log(web3.eth.accounts);
            console.log(web3.eth.defaultAccount);
            console.log(web3.eth.coinbase);
            console.log(web3.currentProvider);
            console.log(web3.currentProvider.isMetaMask);
        });

        if (web3.isConnected()) {
            // let functionData = contractInstance.vote.getData(id);
            // console.log(id);
            contractInstance.vote(parseInt(id, 10), {
                // to: contractAddress,
                from: web3.eth.coinbase,
                // data: functionData,
                gas:500000
            }, function (err, txHash) {
                if (err) {
                    console.log(err);
                    reject(Error(err));
                }
                else {
                    console.log("Transaction Hash: " + txHash);
                    resolve('txHash: ' + txHash);
                }
            });
        } else {
            reject(Error("No Blockchain Connection"));
        }
    });


    return {
    /* PUBLIC FUNCTIONS */
        getAllVotes: _ => Promise.resolve(getVotes).then(_formatVotes),
        // getAllVotes: _ => Promise.resolve(votes).then(_formatVotes),
        submitVote: (id) => Promise.resolve(id).then(vote)
  };
};
