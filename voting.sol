pragma solidity ^0.4.18;

/// @title Simple Voting.
contract Voting {
    address public chairPerson;

    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    mapping(address => uint) public voters;

    Proposal[] public proposals;

    function Voting(bytes32[] proposalNames) public {
        chairPerson = msg.sender;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function get_nb_proposals()
        public
        constant
        returns (uint) {
        return (proposals.length);
    }
}