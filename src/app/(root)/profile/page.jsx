"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Web3 from "web3";
import VotingSystem from "../../../../contract/build/contracts/VotingSystem.json";
import Navbar from "../../../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/components/loading";
import Footer from "@/components/Footer";

const Profile = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
  // useEffect(() => {
  //   const initializeWeb3 = async () => {
  //     try {
  //       const provider = new Web3.providers.HttpProvider(
  //         "HTTP://127.0.0.1:7545"
  //       );
  //       const web3Instance = new Web3(provider);
  //       const networkId = await web3Instance.eth.net.getId();
  //       const deployedNetwork = VotingSystem.networks[networkId];
  //       const contractInstance = new web3Instance.eth.Contract(
  //         VotingSystem.abi,
  //         deployedNetwork.address
  //       );
  //       setWeb3(web3Instance);
  //       setContract(contractInstance);
  //     } catch (error) {
  //       console.error("Error initializing Web3:", error);
  //     }
  //   };
  //   initializeWeb3();
  // }, []);
  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Create a new Web3 instance using MetaMask's provider
          const web3Instance = new Web3(window.ethereum);
          // Request user permission to connect to MetaMask
          await window.ethereum.enable();
          // Get the network ID
          const networkId = await web3Instance.eth.net.getId();
          // Get the deployed network data from the contract ABI
          const deployedNetwork = VotingSystem.networks[networkId];
          // Create a contract instance using the deployed contract address
          const contractInstance = new web3Instance.eth.Contract(
            VotingSystem.abi,
            deployedNetwork && deployedNetwork.address
          );
          // Set the web3 and contract instances in state
          setWeb3(web3Instance);
          setContract(contractInstance);
        } else {
          // MetaMask not found, handle accordingly
          console.error("MetaMask not detected");
        }
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

  const voteForCandidate = async () => {
    try {
      setLoading(true);
      await contract.methods.vote(selectedCandidate.id).send({
        from: (await web3.eth.getAccounts())[0],
        gas: 6000000,
      });
      successToast(
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
      errorToast("Already voted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster />

      <div className="bg-gradient-to-r from-[#1488CC] to-[#2B32B2] min-h-screen flex flex-col justify-center items-center ">
        <h1 className="text-3xl font-semibold text-white mb-6">Candidates:</h1>
        <ul className="flex justify-between gap-3">
          {candidates.map((candidate) => (
            <li
              key={candidate.id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <p className="text-lg font-semibold">
                Name: <span className="uppercase">{candidate.name}</span>
              </p>
              <p className="text-sm">Area: {candidate.area}</p>
              <p className="text-sm">Party: {candidate.party}</p>
              <span className="flex w-full justify-center items-center">
                <button
                  onClick={() => setSelectedCandidate(candidate)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  Vote
                </button>
              </span>
            </li>
          ))}
        </ul>
        {selectedCandidate && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-4">
            <p className="text-lg font-semibold">
              Selected Candidate:{" "}
              <span className="uppercase">{selectedCandidate.name}</span>
            </p>
            <p className="text-sm">Selected Area: {selectedCandidate.area}</p>
            <p className="text-sm">Selected Party: {selectedCandidate.party}</p>
            <button
              onClick={voteForCandidate}
              disabled={loading}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Confirm Vote
            </button>
          </div>
        )}
        {loading && (
          <div className="text-white mt-8">
            <Loader />
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
