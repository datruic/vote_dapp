//import
const Web3 = require('web3');
const fs = require("fs");
const solc = require('solc');

//cosntants
const contract_file_name = '/work/voting.sol';
const contract_name = ':' + 'Voting';
// const proposalNames = ['iPhoneX', 'Pixel 2', 'Galaxy S9', 'One plus 6'];
// var senderAddress = '0';

//initialise
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
if(!web3.isConnected())
    throw 'BlockChain connection Failed';

//create and deploy contract
var source = fs.readFileSync(contract_file_name, 'utf8');
var compiledContract = solc.compile(source, 1);

// console.log(compiledContract);

var abi = compiledContract.contracts[contract_name].interface;
var bytecode = '0x' + compiledContract.contracts[contract_name].bytecode;
var gasEstimate = web3.eth.estimateGas({data: bytecode});
var MyContract = web3.eth.contract(JSON.parse(abi));
var accounts = web3.eth.accounts;
// console.log(accounts);
var senderAddress = accounts[0];
// console.log(MyContract);
console.log(senderAddress);

var myContractReturned = MyContract.new(['iPhoneX', 'Pixel 2', 'Galaxy S9', 'One plus 6'], {
    from:senderAddress,
    data:bytecode,
    gas:4700000 }, function(err, myContract){
    if (err)
        console.log(err);
    if(!err)
        if(!myContract.address) {
            console.log(myContract.transactionHash); // The hash of the transaction, which deploys the contract
            console.log("\nYEAAAH, The contract is sent. Waiting for it to be mined...can take few minutes");
            console.log("\nBelieve me The Contract is Huge. It takes time. After All WE ARE CHANGING THE INTERNET...");
        }
        else {
            //cat mycontract to a file
            fs.writeFileSync("/opt/eth/contract_details.json", JSON.stringify(myContract));
            console.log(myContract.address) // the contract address
        }
});
