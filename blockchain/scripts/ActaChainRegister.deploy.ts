import { deployContract, getContractArtifact, getAbi } from './services';
import { ethers } from 'ethers';
import {config as dotenvConfig} from "dotenv";

dotenvConfig();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const router = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
const donId = "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000";
const owner = "0x444D341Fcd5d8627163b9E27b05Fce11f58A663a";



async function main() {
  const contractName = 'ActaChainRegistry';
  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
  const signer  = new ethers.Wallet(PRIVATE_KEY, provider);
  const constructorParams = [router, donId, owner];

  const ActaChainREgisterContract = await deployContract(contractName, signer, constructorParams);
  console.log('### Contract Address: ', ActaChainREgisterContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});