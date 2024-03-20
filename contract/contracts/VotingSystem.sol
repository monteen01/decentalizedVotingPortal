// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract VotingSystem{
    address public admin;
    string public winningParty;
    uint public Seats = 0;
    struct Candidate {
        uint id;
        string name;
        string area;
        string party;
        uint voteCount;
    }

    string[] public Ar;
    struct Area {
        string name;
        string leadingParty;
        uint totalVote;
    }

    string[] public Pr;
    struct Party{
        string name;
        uint totalSeatsWon;
    }

    mapping(uint => Candidate) public candidates;
    mapping (string => Area) public areas;
    mapping (string => Party) public parties;

    uint public candidatesCount;
    uint public areasCount;
    uint public partiesCount;

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
        if(keccak256(abi.encodePacked(_area)) == keccak256(abi.encodePacked(areas[_area].name))){
            //
        }
        else{
            areasCount++;
            areas[_area]=Area(_area,"",0);
            Ar.push(_area);
        }
        
        if(keccak256(abi.encodePacked(_party)) == keccak256(abi.encodePacked(parties[_party].name))){
            //
        }
        else{
            partiesCount++;
            parties[_party]=Party(_party,0);
            Pr.push(_party);
        }
        
        
    }

    //remove candidates
        function removeCandidate(uint _candidateId) public onlyAdmin {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        delete candidates[_candidateId];
        // You might want to implement logic here to reorganize candidate IDs if needed
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        Candidate storage candidate = candidates[_candidateId];
        candidate.voteCount++;
        voters[msg.sender] = true;
    
        if(areas[candidate.area].totalVote<candidate.voteCount){
            areas[candidate.area].totalVote=candidate.voteCount;
            areas[candidate.area].leadingParty=candidate.party;
        }
        
    }
    function calculateWinner() public{
        for(uint i=0;i<areasCount;i++){
            parties[areas[Ar[i]].leadingParty].totalSeatsWon++;
        }
        for(uint i=0;i<partiesCount;i++){
            if(parties[Pr[i]].totalSeatsWon>Seats){
                Seats=parties[Pr[i]].totalSeatsWon;
                winningParty=Pr[i];
            }
        }

    }

    function getOverallWinningParty() public view returns (string memory, uint) {
        return(winningParty,Seats);
    }
}
