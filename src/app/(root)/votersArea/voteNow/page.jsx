// import Web3 from "web3";
// import { useState, useEffect } from "react";

// // ABI and contract address (replace these with your actual ABI and address)
// import VotingSystemABI from "@/context/VotingSystemABI.json"; // Import the ABI from the Truffle build
// const contractAddress = "YOUR_CONTRACT_ADDRESS";

// const Home = () => {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [accounts, setAccounts] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState("");

//   useEffect(() => {
//     async function connectWeb3() {
//       if (
//         typeof window !== "undefined" &&
//         typeof window.ethereum !== "undefined"
//       ) {
//         const web3Instance = new Web3(window.ethereum);
//         setWeb3(web3Instance);

//         try {
//           // Request account access
//           await window.ethereum.request({ method: "eth_requestAccounts" });

//           // Get accounts
//           const accs = await web3Instance.eth.getAccounts();
//           setAccounts(accs);

//           // Load contract
//           const contractInstance = new web3Instance.eth.Contract(
//             VotingSystemABI,
//             contractAddress
//           );
//           setContract(contractInstance);

//           // Load candidates
//           const candidatesCount = await contractInstance.methods
//             .getCandidatesCount()
//             .call();
//           const candidatesList = [];
//           for (let i = 0; i < candidatesCount; i++) {
//             const candidate = await contractInstance.methods
//               .getCandidate(i)
//               .call();
//             candidatesList.push(candidate);
//           }
//           setCandidates(candidatesList);
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       }
//     }

//     connectWeb3();
//   }, []);

//   const handleVote = async () => {
//     try {
//       await contract.methods
//         .vote(selectedCandidate)
//         .send({ from: accounts[0] });
//       console.log("Vote successful");
//     } catch (error) {
//       console.error("Error voting:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Online Voting System</h1>
//       <label>Select Candidate:</label>
//       <select
//         value={selectedCandidate}
//         onChange={(e) => setSelectedCandidate(e.target.value)}
//       >
//         <option value="">Select</option>
//         {candidates.map((candidate) => (
//           <option key={candidate.id} value={candidate.id}>
//             {candidate.name}
//           </option>
//         ))}
//       </select>
//       <button onClick={handleVote} disabled={!selectedCandidate}>
//         Vote
//       </button>
//     </div>
//   );
// };

// export default Home;
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
