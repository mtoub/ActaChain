import { FunctionFragment, Signer, BaseContract, ContractFactory, InterfaceAbi, Interface, BytesLike } from 'ethers';
import { Abi, AbiConstructor, AbiFunction, AbiEvent, AbiError } from 'abitype';
import { keccak256, toUtf8Bytes } from './utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
dotenv.config();

export function getContractArtifact(contractName: string): any {
  let artifact = JSON.parse(
    readFileSync(join(__dirname, `../../artifacts/contracts/${contractName}.sol/${contractName}.json`), 'utf8'),
  );

  return artifact;
}

export function getAbi(contractName: string): Abi {
  let artifact = getContractArtifact(contractName);
  if (artifact) {
    return artifact.abi;
  } else {
    throw new Error(`Artifact ${contractName} not found in compilation result`);
  }
}

export function getAbiFunction(contractName: string, functionName: string): AbiFunction {
  const abi: Abi = getAbi(contractName);

  if (!abi) {
    throw new Error(`Artifact ${contractName} not found in compilation result`);
  }

  const abiFunction = abi.filter((item: any) => item.type === 'function' && item.name === functionName)[0];

  return abiFunction as AbiFunction;
}

export function getFunctionSelector(abiFunction: AbiFunction): string {
  const functionFragment = FunctionFragment.from(abiFunction);

  const selector = functionFragment.selector;

  return selector;
}

export async function deployContract(
  contractName: string,
  signer: any,
  constructorParams?: any[],
): Promise<BaseContract> {
  const contractArtifact = await getContractArtifact(contractName);
  if (!contractArtifact) {
    throw new Error(`Artifact ${contractName} not found in compilation result`);
  }
  const artifactAbi = contractArtifact.abi as InterfaceAbi;
  const artifactBytecode = contractArtifact.bytecode;

  if (!artifactBytecode) {
    throw new Error(`Artifact ${contractName} does not have any bytecode`);
  }

  // check if constructorParams is provided
  if (constructorParams && !contractArtifact.constructor) {
    throw new Error(`Artifact ${contractName} does not have a constructor`);
  }

  const contractFactory = new ContractFactory(artifactAbi, artifactBytecode, signer);

  let contract: BaseContract;

  if (constructorParams) {
    contract = await contractFactory.deploy(...constructorParams);
  } else {
    contract = await contractFactory.deploy();
  }

  await contract.deploymentTransaction()?.wait();

  return contract;
}

const main = async () => {
  console.log('Testing scripts');
  const contractName = 'USDReform';
  const artifacts = getContractArtifact(contractName);

  console.log({ artifacts });
  const abiFunction = await getAbiFunction(contractName, 'mint');
  console.log({ abiFunction });
};

if (require.main === module) {
  main();
}
