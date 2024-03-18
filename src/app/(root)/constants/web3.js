import Web3 from "web3";

let web3;

// Check if Web3 is injected by the browser (MetaMask)
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Use MetaMask provider
  web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // Request user permission to access accounts
} else {
  // Fallback to localhost provider (Ganache or local blockchain)
  const provider = new Web3.providers.HttpProvider("http://localhost:7545");
  web3 = new Web3(provider);
}

export default web3;
