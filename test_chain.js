const Web3 = require('web3');
const fs = require("fs");

//initialise
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
if(!web3.isConnected())
    throw 'BlockChain connection Failed';

console.log('Coinbase: ', web3.eth.coinbase);

const accounts = web3.eth.accounts;
console.log("Acconts: ");
console.log(accounts);
