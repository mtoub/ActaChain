import "@chainlink/env-enc";

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 2;

const npmCommand: string | undefined = process.env.npm_lifecycle_event;
const isTestEnvironment: boolean = npmCommand === "test" || npmCommand === "test:unit";

const isSimulation: boolean = process.argv.length === 3 && process.argv[2] === "functions-simulate-script";

// Set EVM private keys (required)
const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY: string | undefined = process.env.SECOND_PRIVATE_KEY;

if (!isTestEnvironment && !isSimulation && !PRIVATE_KEY) {
  throw new Error("Set the PRIVATE_KEY environment variable with your EVM wallet private key");
}

const accounts: string[] = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}
if (SECOND_PRIVATE_KEY) {
  accounts.push(SECOND_PRIVATE_KEY);
}

type NetworkConfig = {
  url: string;
  gasPrice?: number;
  nonce?: number;
  accounts: string[];
  verifyApiKey: string;
  chainId: number;
  confirmations: number;
  nativeCurrencySymbol: string;
  linkToken: string;
  linkPriceFeed: string;
  functionsRouter: string;
  donId: string;
  gatewayUrls: string[];
};

type NetworksConfig = {
  [key: string]: NetworkConfig;
};

const networks: NetworksConfig = {
  ethereumSepolia: {
    url: process.env.ETHEREUM_SEPOLIA_RPC_URL || "UNSET",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ETHERSCAN_API_KEY || "UNSET",
    chainId: 11155111,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    linkPriceFeed: "0x42585eD362B3f1BCa95c640FdFf35Ef899212734", // LINK/ETH
    functionsRouter: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0", 
    donId: "fun-ethereum-sepolia-1",
    gatewayUrls: [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ],
  },
};

export { networks };
