require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();
const projectId = "bab89c57aa7f40f6860f59e271d12349"

module.exports = {
  networks: {
    hardhat:{
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
      gasPrice: 470000000000,
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
  },
  solidity: "0.8.4",
};