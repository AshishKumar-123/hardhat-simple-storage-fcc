require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */

const GOREILLY_RPC_URL = process.env.GOREILLY_RPC_URL || "https://eth-goreilly"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xffdfd"
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "kdjfkldja93053k4jdfd"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "sdfdfdsdf"

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.8",
  networks: {
    goreilly: {
      url: GOREILLY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts:[], --> We don't need to give account because hardhat automatically connects to localhost accounts !!
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    },
  },
  // gasReporter:{
  //   enabled:true,
  //   currency:"USD",
  //   coinmarketcap:COINMARKETCAP_API_KEY,
  // }
}
