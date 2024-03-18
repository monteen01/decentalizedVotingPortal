const VotingSystem = artifacts.require("VotingSystem");

module.exports = function (deployer) {
  deployer.deploy(VotingSystem).then(function (instance) {
    console.log("Contract deployed at address:", instance.address);
  });
};
