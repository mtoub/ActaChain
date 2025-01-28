import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import {config as dotenvConfig} from "dotenv";

const config: HardhatUserConfig = {
  	solidity: {
		compilers: [
			{
				version: "0.8.28",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				},
			},

		],
	},
  	networks: {
		polygon: {
			url: process.env.SEPOLIA_RPC_URL || "https://endpoints.omniatech.io/v1/eth/sepolia/public",
			accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
			chainId: 11155111,
		},
	},
  	typechain: {
		outDir: "typechain",
		target: "ethers-v6",
	},
	gasReporter: {
		enabled: true,
		showMethodSig: true,
		includeBytecodeInJSON: true,
		currency: "USD",
		coinmarketcap: process.env.COINMARKETBASE_API_KEY,
	},
	contractSizer: {
		alphaSort: true,
		disambiguatePaths: false,
		runOnCompile: false,
		strict: true,
		only: [],
	},
};

export default config;
