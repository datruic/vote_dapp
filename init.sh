#!/usr/bin/env bash
# create pass.txt
echo "password" > /opt/eth/pass.txt
# create an account
address=$(geth --datadir /opt/eth/chain --password /opt/eth/pass.txt account new | cut -c11-50)
echo "Account created, address => $address"
echo ${address} > /opt/eth/account.txt

echo "{
    \"config\": {
        \"chainId\": 24215,
        \"homesteadBlock\": 0,
        \"eip155Block\": 0,
        \"eip158Block\": 0
    },
    \"difficulty\": \"1\",
    \"gasLimit\": \"2100000\",
    \"alloc\": {
        \"$address\": { \"balance\": \"0x200000000000000000000000000000000000000000000000000000000000000\" }
    }
}" > /opt/eth/genesis-block.json

#init the chain
geth --datadir /opt/eth/chain init /opt/eth/genesis-block.json

# create dir for ipfs
mkdir /opt/eth/ipfs_data
