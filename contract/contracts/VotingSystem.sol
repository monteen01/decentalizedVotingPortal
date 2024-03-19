// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract VotingSystem {
    address public admin;

    struct Candidate {
        uint id;
        string name;
        string area;
        string party;
        uint voteCount;
    }

    struct Party {
        string name;
        uint wonSeats;
    }

    mapping(uint => Candidate) public candidates;
    mapping(string => mapping(string => string)) public currentLeadingCandidate; 
    mapping(string => mapping(string => uint)) public seatsWonByParty; 

    uint public candidatesCount;
    mapping(address => bool) public voters;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory _name, string memory _area, string memory _party) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _area, _party, 0);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        Candidate storage candidate = candidates[_candidateId];
        candidate.voteCount++;
        voters[msg.sender] = true;

        string storage currentLeading = currentLeadingCandidate[candidate.area][""];
        if (keccak256(abi.encodePacked(currentLeading)) == keccak256(abi.encodePacked("")) || candidates[uint(keccak256(abi.encodePacked(currentLeading)))].voteCount < candidate.voteCount) {
            currentLeadingCandidate[candidate.area][""] = candidate.name;
            currentLeadingCandidate[candidate.area][candidate.party] = candidate.name;
            seatsWonByParty[candidate.party][candidate.area]++;
        }
    }

    function getOverallWinningParty() public view returns (string memory, uint) {
        string memory winningParty;
        uint maxSeats = 0;
        for (uint i = 1; i <= candidatesCount; i++) {
            uint seats = 0;
            for (uint j = 1; j <= candidatesCount; j++) {
                seats += seatsWonByParty[candidates[i].party][candidates[j].area];
            }
            if (seats > maxSeats) {
                winningParty = candidates[i].party;
                maxSeats = seats;
            }
        }
        return (winningParty, maxSeats);
    }
}
