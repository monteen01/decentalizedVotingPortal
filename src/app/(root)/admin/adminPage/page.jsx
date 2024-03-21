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
    <div className="">
      <Navbar />
      <Toaster />
      <div className="flex justify-between w-full items-center">
        <div className="relative flex justify-between flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <h1 className="font-bold text-xl mb-2">Add candidate </h1>
            {/* Form to add candidate */}
            <div className="mb-10">
              <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                Area
              </label>
              <input
                type="text"
                className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                name="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                Party
              </label>
              <input
                type="text"
                className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                name="party"
                value={party}
                onChange={(e) => setParty(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="grid cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none"
              onClick={addCandidate}
              disabled={loading}
            >
              Add Candidate
            </button>
          </div>
          {/* Display candidates */}
          <div className="p-6 overflow-auto ">
            <h2 className="mb-4 text-lg font-semibold">Candidates:</h2>
            <ul className="">
              {candidates.map((candidate, index) => (
                <li
                  key={index}
                  className="mb-2 flex justify-between items-center border border-gray-600 my-2 mx-2 p-3 rounded-lg shadow-md"
                >
                  <div className="flex flex-col text-nowrap ">
                    <p className="mx-1 font-semibold ">
                      Name: {candidate.name}
                    </p>
                    <p className="mx-1 font-semibold ">
                      Area: {candidate.area}
                    </p>
                    <p className="mx-1 font-semibold ">
                      Party: {candidate.party}
                    </p>
                  </div>
                  <div className="flex justify-end items-center">
                    <button
                      className="text-red-500 border px-3 py-2 border-red-500 hover:bg-red-300 ml-3 rounded-md shadow-md "
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
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="flex flex-col justify-center items-center w-full ">
          <button
            type="button"
            className="cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none"
            onClick={calculateWinner}
            disabled={loading}
          >
            Calculate Winner
          </button>
          {/* Display winning party and seats */}
          {winningParty && (
            <div className="mt-4 flex justify-center items-center border rounded-lg shadow-md px-3 py-2  hover:bg-green-300 border-green-400 transition-colors">
              <p className="font-semibold capitalize ">
                Winning Party: {winningParty}
              </p>
              {/* <p className="font-semibold">Seats: {winningSeats}</p> */}
            </div>
          )}
        </div>
      </div>
      {/* calculate the votes */}
      {/* <div className="flex justify-between w-full items-center">
        <div className="relative flex justify-between flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <h1 className="font-bold text-xl mb-2">Calculate Total Votes</h1>
            <button
              type="button"
              className="grid cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none"
              onClick={calculateTotalVotes}
              disabled={loading}
            >
              Calculate Total Votes
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 overflow-auto">
        <h2 className="mb-4 text-lg font-semibold">Total Votes:</h2>
        <div>
          <h3 className="text-lg font-semibold">Candidates:</h3>
          {Object.keys(totalCandidateVotes).map((candidateName, index) => (
            <p key={index}>
              {candidateName}: {totalCandidateVotes[candidateName]}
            </p>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Parties:</h3>
          {Object.keys(totalPartyVotes).map((partyName, index) => (
            <p key={index}>
              {partyName}: {totalPartyVotes[partyName]}
            </p>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Areas:</h3>
          {Object.keys(totalAreaVotes).map((areaName, index) => (
            <p key={index}>
              {areaName}: {totalAreaVotes[areaName]}
            </p>
          ))}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div> */}
    </div>
  );
};

export default adminPage;
