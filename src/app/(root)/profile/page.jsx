"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Web3 from "web3";
import VotingSystem from "../../../../contract/build/contracts/VotingSystem.json";
import Navbar from "../../../components/Navbar";
const profile = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        const provider = new Web3.providers.HttpProvider(
          "HTTP://127.0.0.1:7545"
        );
        const web3Instance = new Web3(provider);
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = VotingSystem.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          VotingSystem.abi,
          deployedNetwork.address
        );
        setWeb3(web3Instance);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    };
    initializeWeb3();
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        if (contract) {
          const candidatesCount = await contract.methods
            .candidatesCount()
            .call();
          const candidatesArray = [];
          for (let i = 1; i <= candidatesCount; i++) {
            const candidate = await contract.methods.candidates(i).call();
            candidatesArray.push(candidate);
          }
          setCandidates(candidatesArray);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setError("Failed to fetch candidates");
      }
    };
    fetchCandidates();
  }, [contract]);

  // const voteForCandidate = async () => {
  //   try {
  //     setLoading(true);
  //     await contract.methods.vote(selectedCandidate.id).send({
  //       from: (await web3.eth.getAccounts())[0],
  //       gas: 6000000,
  //     });
  //     alert(
  //       `You have successfully voted for ${selectedCandidate.name} from ${selectedCandidate.area} representing ${selectedCandidate.party}`
  //     );
  //     // Refresh candidates after vote
  //     setCandidates((prevCandidates) =>
  //       prevCandidates.map((candidate) =>
  //         candidate.id === selectedCandidate.id
  //           ? { ...candidate, voteCount: candidate.voteCount + 1 }
  //           : candidate
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error voting:", error);
  //     setError("Failed to vote");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const voteForCandidate = async () => {
    try {
      setLoading(true);
      await contract.methods.vote(selectedCandidate.id).send({
        from: (await web3.eth.getAccounts())[0],
        gas: 6000000,
      });
      alert(
        `You have successfully voted for ${selectedCandidate.name} from ${selectedCandidate.area} representing ${selectedCandidate.party}`
      );
      // Refresh candidates after vote
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === selectedCandidate.id
            ? { ...candidate, voteCount: Number(candidate.voteCount) + 1 } // Convert voteCount to a number
            : candidate
        )
      );
    } catch (error) {
      console.error("Error voting:", error);
      setError("Failed to vote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>Candidates:</h1>
        <ul className="flex justify-evenly items-center my-2 mx-2 py-2 px-3">
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              <p>Name: {candidate.name}</p>
              <p>Area: {candidate.area}</p>
              <p>Party: {candidate.party}</p>
              <button
                onClick={() => setSelectedCandidate(candidate)}
                className="px-3 py-2 border border-green-400 hover:bg-green-300 shadow-md m-3 rounded-md"
              >
                Vote
              </button>
            </li>
          ))}
        </ul>
        {selectedCandidate && (
          <div>
            <p>Selected Candidate: {selectedCandidate.name}</p>
            <p>Selected Area: {selectedCandidate.area}</p>
            <p>Selected Party: {selectedCandidate.party}</p>
            <button
              onClick={voteForCandidate}
              disabled={loading}
              className="px-3 py-2 border rounded-md border-green-400 hover:bg-green-300"
            >
              Vote
            </button>
          </div>
        )}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="m-3 ">
          <Link
            className="px-3 py-2 border rounded-md border-gray-400 hover:bg-gray-300"
            href="/admin"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default profile;
