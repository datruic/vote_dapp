#!/usr/bin/env bash
# create pass.txt
echo "password" > /opt/eth/pass.txt
# create an account
coinbase_address=$(geth --datadir /opt/eth/chain --password /opt/eth/pass.txt account new | cut -c11-50)
echo "Account created, address => $coinbase_address"
echo ${coinbase_address} > /opt/eth/account.txt

declare -a address
c=0
while [ $c -le 9 ]
do
	echo "Account $c created"
	address[$c]=$(geth --datadir /opt/eth/chain --password /opt/eth/pass.txt account new | cut -c11-50)
    echo "Account created, address => ${address[$c]}"
	(( c++ ))
done

echo "{
    \"config\": {
        \"chainId\": 425642,
        \"homesteadBlock\": 0,
        \"eip155Block\": 0,
        \"eip158Block\": 0
    },
    \"difficulty\": \"1\",
    \"gasLimit\": \"0x2fefd8\",
    \"alloc\": {
        \"$coinbase_address\": { \"balance\": \"0x200000000000000000000000000000000000000000000000000000000000000\" },
        \"${address[0]}\": { \"balance\": \"0x200000000000000000000\" },
        \"${address[1]}\": { \"balance\": \"0x200000000000000000000\" },
        \"${address[2]}\": { \"balance\": \"0x200000000000000000000\" },
        \"${address[3]}\": { \"balance\": \"0x200000000000000000000\" },
        \"${address[4]}\": { \"balance\": \"0x200000000000000000000\" },
        \"${address[5]}\": { \"balance\": \"0x200000000000000000000\" },
        \"${address[6]}\": { \"balance\": \"0x200000000000000000000\" },
        \"${address[7]}\": { \"balance\": \"0x200000000000000000000\" },
        \"${address[8]}\": { \"balance\": \"0x200000000000000000000\" }
    }
}" > /opt/eth/genesis-block.json

#init the chain
geth --datadir /opt/eth/chain init /opt/eth/genesis-block.json

# create dir for ipfs
mkdir /opt/eth/ipfs_data

#geth --datadir /opt/eth/chain --unlock 0 --password /opt/eth/pass.txt --rpc --rpcapi eth,net,web3,personal,admin --rpcaddr 0.0.0.0 --rpccorsdomain "*" --mine --minerthreads=1 --etherbase 0 --networkid 425642 console