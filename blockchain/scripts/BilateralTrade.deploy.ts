import { deployContract, getContractArtifact, getAbi } from './services';
import { ethers } from 'ethers';
import {config as dotenvConfig} from "dotenv";

dotenvConfig();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const register = "0x0B99dc3C6D80E9c4Cc9cD330B9f33FB1772759f2";

const buyer = "0x3F67dD63c82A86792a8AcF261D18b1fa31311271";

const actaChainRegistry = process.env.ACTA_CHAIN_REGISTRY as string;

const envelopeId = "a7bc17a7-8ddc-4a02-8bb1-afedd119d776";



async function main() {
  const contractName = 'BilateralTrade';
  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
  const signer  = new ethers.Wallet(PRIVATE_KEY, provider);
  const constructorParams = [register, buyer, actaChainRegistry, envelopeId];

  const BilateralTradeContract = await deployContract(contractName, signer, constructorParams);
  console.log('### Contract Address: ', BilateralTradeContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});