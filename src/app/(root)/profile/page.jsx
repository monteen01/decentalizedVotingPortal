"use client";
import { useState, useEffect } from "react";
import votingSystemContract from "../constants/contract";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [selectedCandidateId, setSelectedCandidateId] = useState(0);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // Fetch candidates
      const candidatesCount = await votingSystemContract.methods
        .candidatesCount()
        .call();
      const candidatesData = [];
      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await votingSystemContract.methods
          .getCandidate(i)
          .call();
        candidatesData.push(candidate);
      }
      setCandidates(candidatesData);

      // Fetch total votes
      const totalVotes = await votingSystemContract.methods
        .getTotalVotes()
        .call();
      setTotalVotes(totalVotes);
    }
    fetchData();
  }, [voteSubmitted]); // Fetch data whenever vote is submitted

  const handleVoteSubmit = async (event) => {
    event.preventDefault();
    try {
      await votingSystemContract.methods
        .vote(selectedCandidateId)
        .send({ from: window.ethereum.selectedAddress });
      setVoteSubmitted(true);
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div>
      <h1>Voting System</h1>
      <p>Total Votes: {totalVotes}</p>
      <h2>Candidates:</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate[0]}>
            {candidate[1]} - Votes: {candidate[2]}
          </li>
        ))}
      </ul>
      <form onSubmit={handleVoteSubmit}>
        <label htmlFor="candidate">Select Candidate:</label>
        <select
          id="candidate"
          value={selectedCandidateId}
          onChange={(event) =>
            setSelectedCandidateId(parseInt(event.target.value))
          }
          required
        >
          <option value="" disabled>
            Select a candidate
          </option>
          {candidates.map((candidate) => (
            <option key={candidate[0]} value={candidate[0]}>
              {candidate[1]}
            </option>
          ))}
        </select>
        <button type="submit">Vote</button>
      </form>
    </div>
  );
}

export default App;
