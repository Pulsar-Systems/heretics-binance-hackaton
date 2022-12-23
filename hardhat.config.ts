import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    bsc: {
      url: "PUT YOUR RPC URL FOR BSC HERE",
      accounts: [/* PUT YOUR PRIVATE KEY HERE */]
    }
  },
  mocha: {
    timeout: 60000,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    executor: {
      default: 1,
    },
    unauthorized: {
      default: 2,
    },
  },
  typechain: {
    outDir: "./typechain",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
  },
};

export default config;
