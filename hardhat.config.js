require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-ignition");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  ignition: {
    requiredConfirmations: 1,
  },

  networks: {
    base : {
      url : process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: process.env.BASESCAN_API_KEY,

    sourcify : {
      enabled: true,
    },
  }
};
