import web3 from "../constants/web3";
import VotingContract from "../../../../contract/build/contracts/VotingSystem.json";

export const contractABI = VotingContract.abi;

export const contractAddress = "0x98161C25cf8f76e64B6f5832a68f6Fb492D252E7";

const votingSystemContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);

export default votingSystemContract;
