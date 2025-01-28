import { ethers } from 'ethers';
import { deployContract, getContractArtifact, getAbi } from './services';
import {config as dotenvConfig} from "dotenv";

dotenvConfig();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const registerContract = "0x0B99dc3C6D80E9c4Cc9cD330B9f33FB1772759f2";

const subscriptionId = parseInt(process.env.SUBSCRIPTION_ID || "0");
const registerAbi = getAbi('IRegister') as any;

const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
const issuer = new ethers.Wallet(PRIVATE_KEY, provider);


// const slotId = parseInt(taskArgs.slotid)
// const callbackGasLimit = parseInt(taskArgs.callbackgaslimit)

async function execute() {

  // Create contract instance
  const soBondRegister = new ethers.Contract(registerContract, registerAbi, issuer);

  // Execute the request
  const tx = await soBondRegister.requestEthereumPrice(subscriptionId, slotId, callbackGasLimit)
  await tx.wait()
}
