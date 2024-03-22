"use client";
import { useState, useEffect } from "react";
import VotingSystem from "../../../../../contract/build/contracts/VotingSystem.json";
import Web3 from "web3";
import Navbar from "../../../../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
const adminPage = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [party, setParty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState([]);
  // displaying the winner
  const [winningParty, setWinningParty] = useState("");
  const [winningSeats, setWinningSeats] = useState(0);
  //testing
  const [totalCandidateVotes, setTotalCandidateVotes] = useState({});
  const [totalPartyVotes, setTotalPartyVotes] = useState({});
  const [totalAreaVotes, setTotalAreaVotes] = useState({});
  // toast
  const successToast = (message) => {
    toast.success(message, {
      position: "top-center", // Adjust position as desired
      autoClose: 5000, // Close after 5 seconds
    });
  };
  const errorToast = (message) => {
    toast.error(message, {
      position: "top-center", // Adjust position as desired
    });
  };
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

  const fetchCandidates = async () => {
    try {
      if (contract) {
        const candidatesCount = await contract.methods
          .candidatesCount()
          .call({ gas: 5000000 });
        const candidatesArray = [];
        for (let i = 1; i <= candidatesCount; i++) {
          const candidate = await contract.methods
            .candidates(i)
            .call({ gas: 5000000 });
          candidatesArray.push(candidate);
        }
        setCandidates(candidatesArray);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError("Failed to fetch candidates");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [contract]);

  const addCandidate = async () => {
    try {
      setLoading(true);
      await contract.methods
        .addCandidate(name, area, party)
        .send({ from: (await web3.eth.getAccounts())[0], gas: 6000000 });
      successToast("Candidate added successfully!");
      setName("");
      setArea("");
      setParty("");
      console.log("name: " + name, "area: " + area, "party: " + party);
      fetchCandidates();
    } catch (error) {
      console.error("Error adding candidate:", error);
      errorToast("Failed to add candidate");
    } finally {
      setLoading(false);
    }
  };

  //removing the candiadate from the contract
  const removeCandidate = async (candidateId) => {
    try {
      setLoading(true);
      await contract.methods.removeCandidate(candidateId).send({
        from: (await web3.eth.getAccounts())[0],
        gas: 6000000,
      });
      successToast("Candidate removed successfully!");
      setLoading(false);
      // Refresh candidates after removal
      fetchCandidates();
      setName("");
      setArea("");
      setParty("");
    } catch (error) {
      console.error("Error removing candidate:", error);
      setError("Failed to remove candidate");
      setLoading(false);
    }
  };

  // Function to calculate winner
  const calculateWinner = async () => {
    try {
      setLoading(true);
      await contract.methods.calculateWinner().send({
        from: (await web3.eth.getAccounts())[0],
        gas: 6000000,
      });
      successToast("Winning party calculated successfully!");
      // Fetch the winning party and seats
      const winningParty = await contract.methods
        .getOverallWinningParty()
        .call();
      setWinningParty(winningParty[0]);
      setWinningSeats(winningParty[1]);
      console.log(winningParty[0]);
    } catch (error) {
      console.error("Error calculating winner:", error);
      setError("Failed to calculate winner");
    } finally {
      setLoading(false);
    }
  };
  //!calucate the votes
  // const calculateTotalVotes = async () => {
  //   try {
  //     setLoading(true);
  //     await contract.methods.calculateTotalVotes().send({
  //       from: (await web3.eth.getAccounts())[0],
  //       gas: 6000000,
  //     });
  //     alert("Total votes calculated successfully!");
  //     // Fetch and update total votes for candidates, parties, and areas
  //     const candidateVotes = await contract.methods
  //       .totalCandidateVotes()
  //       .call();
  //     const partyVotes = await contract.methods.totalPartyVotes().call();
  //     const areaVotes = await contract.methods.totalAreaVotes().call();
  //     setTotalCandidateVotes(candidateVotes);
  //     setTotalPartyVotes(partyVotes);
  //     setTotalAreaVotes(areaVotes);
  //     console.log(candidateVotes, areaVotes, partyVotes);
  //   } catch (error) {
  //     console.error("Error calculating total votes:", error);
  //     setError("Failed to calculate total votes: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <Toaster />

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#1488CC] to-[#2B32B2]">
        <div className="w-full sm:w-[30rem] bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-xl font-bold mb-4 text-gray-800">
            Add Candidate
          </h1>
          {/* Form to add candidate */}
          <div className="mb-4">
            <label className="block text-xs font-medium uppercase text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-400 bg-white py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium uppercase text-gray-700">
              Area
            </label>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-400 bg-white py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium uppercase text-gray-700">
              Party
            </label>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-400 bg-white py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
              name="party"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={addCandidate}
            disabled={loading}
          >
            Add Candidate
          </button>

          {/* Display candidates */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Candidates:
            </h2>
            <ul>
              {candidates.map((candidate, index) => (
                <li key={index} className="border-b border-gray-400 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold">
                        Name: {candidate.name}
                      </p>
                      <p className="text-sm font-semibold">
                        Area: {candidate.area}
                      </p>
                      <p className="text-sm font-semibold">
                        Party: {candidate.party}
                      </p>
                    </div>
                    <button
                      className="text-red-500 border border-red-500 py-1 px-3 rounded-md shadow-md hover:bg-red-300 focus:outline-none focus:bg-red-300"
                      onClick={() => removeCandidate(candidate.id)}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {loading && <p className="text-gray-800 mt-4">Loading...</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>

        <div className="ml-4">
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={calculateWinner}
            disabled={loading}
          >
            Calculate Winner
          </button>
          {/* Display winning party and seats */}
          {winningParty && (
            <div className="mt-4 bg-green-300 rounded-lg shadow-md p-3">
              <p className="text-sm font-semibold text-green-800">
                Winning Party: {winningParty}
              </p>
              {/* <p className="text-sm font-semibold">Seats: {winningSeats}</p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default adminPage;
