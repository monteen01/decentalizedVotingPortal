// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract VotingSystem {
    address public admin;

    // string[] public parties;

    struct Candidate {
        uint id;
        string name;
        string area;
        string party;
        uint partyID;
        uint voteCount;
    }

    struct Party{
        uint id;
        string name;
        uint partyVoteCount;
        // string[] candidates;
    }

    mapping(uint => Candidate) public candidates;
    mapping(uint => Party) public parties;

    uint public candidatesCount;
    uint public partiesCount;
    mapping(address => bool) public voters;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory _name,string memory _area, string memory _party) public onlyAdmin {
        candidatesCount++;
        uint partynum=0;
        for(uint i=1;i<partiesCount;i++){
            if(keccak256(abi.encodePacked(parties[i].name)) == keccak256(abi.encodePacked( _party))){
                partynum=parties[i].id;
            }
        }
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _area,_party,partynum, 0);
        
    }

    function addParty(string memory _name) public onlyAdmin{
        partiesCount++;
        parties[partiesCount] = Party(partiesCount,_name,0);
    }


    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        candidates[_candidateId].voteCount++;
        parties[candidates[_candidateId].partyID].partyVoteCount++;
        voters[msg.sender] = true;
    }

    function getTotalVotes() public view returns (uint) {
        uint totalVotes = 0;
        for (uint i = 1; i <= candidatesCount; i++) {
            totalVotes += candidates[i].voteCount;
        }
        return totalVotes;
    }
    function getPartyVotes() public view returns (uint) {
        uint totalVotes = 0;
        for (uint i = 1; i <= partiesCount; i++) {
            totalVotes += parties[i].partyVoteCount;
        }
        return totalVotes;
    }

    function getCandidate(uint _candidateId) public view returns (uint, string memory, uint, string memory,string memory) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        return (candidates[_candidateId].id, candidates[_candidateId].name, candidates[_candidateId].voteCount,candidates[_candidateId].area,candidates[_candidateId].party);
    }

    function getWinningParty() public view returns(uint,string memory){
        uint winning=0;
        string memory winnerName;
        for(uint i=1;i<=partiesCount;i++){
            if (candidates[i].voteCount > winning) {
                winning = parties[i].partyVoteCount;
                winnerName = parties[i].name;
            }
        }
        return (winning,winnerName);

    } 
    // function getWinner() public view returns (string memory,string memory) {
    //     uint winningVoteCount = 0;
    //     string memory winnerName;
    //     string memory partyname;
    //     for (uint i = 1; i <= candidatesCount; i++) {
    //         if (candidates[i].voteCount > winningVoteCount) {
    //             winningVoteCount = candidates[i].voteCount;
    //             winnerName = candidates[i].name;
    //             partyname = candidates[i].party;
    //         }
    //     }

    //     return (winnerName,partyname);
    // }

    function getAreaDetails(string memory _area) public view returns(string memory){
        //
    }
}
