import { ethers } from 'ethers';
import { getAbi } from './services';
import { Location,   SubscriptionManager, ReturnType, CodeLanguage } from "@chainlink/functions-toolkit";
import {config as dotenvConfig} from "dotenv";
import fs from "fs";

dotenvConfig();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const ACTA_CHAIN_REGISTRY = process.env.ACTA_CHAIN_REGISTRY as string;

const subscriptionId = parseInt(process.env.SUBSCRIPTION_ID || "0");
const ABI = getAbi('ActaChainRegistry') as any;

const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider) as any;

    // linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    // linkPriceFeed: "0x42585eD362B3f1BCa95c640FdFf35Ef899212734", // LINK/ETH
    // functionsRouter: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0", 

const linkTokenAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const functionsRouterAddress = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";

const source = fs.readFileSync(__dirname + '/../verifyDocusignEnvelope.js').toString();

// console.log('### Source: ', source);

const subManager = new SubscriptionManager({ signer , linkTokenAddress, functionsRouterAddress })
await subManager.initialize()




// const slotId = parseInt(taskArgs.slotid)
// const callbackGasLimit = parseInt(taskArgs.callbackgaslimit)

async function execute() {

  // Create contract instance
  const actaChainRegistry = new ethers.Contract(ACTA_CHAIN_REGISTRY, ABI, signer);

  // // Whitelist a requester
  // const whitelistTx = await actaChainRegistry.addWhitelistedRequester("0x444D341Fcd5d8627163b9E27b05Fce11f58A663a");
  // const whitelistReceipt = await whitelistTx.wait();

  // const isWhitelisted = await actaChainRegistry.whitelistedRequesters("0x444D341Fcd5d8627163b9E27b05Fce11f58A663a");

  // console.log('### Whitelisted: ', isWhitelisted);

  // Execute the request
  const requestTx = await actaChainRegistry.sendRequest(
        [source,
    Location.Remote,
    [],
    ["a7bc17a7-8ddc-4a02-8bb1-afedd119d776"],
    [],
     subscriptionId,
    uint32 callbackGasLimit]
  )
  const requestReceipt = await requestTx.wait();

}

execute().catch((error) => {
  console.error(error);
  process.exit(1);
});
