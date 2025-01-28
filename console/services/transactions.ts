import { ethers } from "ethers";
import { ContractBilateralTrade } from "@/services/contracts/BilateralTrade";
import { ContractActaChainRegistry } from "@/services/contracts/ContractActaChainRegistry";
import { updateStoreEnvelopeBlokchain } from "@/services/envelope.status";
const rpc = "https://ethereum-sepolia.rpc.subquery.network/public";

const chainId = process.env.CHAIN_ID || 11155111;

const getProvider = () => {
  return new ethers.JsonRpcProvider(rpc);
};

export const sendTransaction = async (
  privateKey: string,
  to: string,
  encodedFunction: string
) => {
  const provider = getProvider();
  const wallet = new ethers.Wallet(privateKey, provider);
  const tx = await wallet.sendTransaction({
    data: encodedFunction,
    to,
  });
  console.log("tx", tx);
  const receipt = await tx.wait();
  console.log("receipt", receipt);
};

export const encodeFunctionTransfer = async (
  contractAddress: string,
  toAddress: string,
  value: string
) => {
  const abi = [];
  const contract = new ethers.Contract(contractAddress, abi);
  const encodefunction = contract.interface.encodeFunctionData("transfer", [
    toAddress,
    value,
  ]);

  return encodefunction;
};

export const Transfer = async (
  contractAddress: string,
  privateKey: string,
  toAddress: string,
  value: string
) => {
  const encodedFunction = await encodeFunctionTransfer(
    contractAddress,
    toAddress,
    value
  );

  console.log("encodedFunction", encodedFunction);
  await sendTransaction(contractAddress, privateKey, encodedFunction as string);
};

export const getTransaction = async (txHash: string) => {
  const provider = getProvider();
  const tx = await provider.getTransaction(txHash);
  console.log("tx", tx);
  return tx;
};

// export const deployTrade = async (
//   privateKey: string,
//   smartContractParams: any,
//   abi: any,
//   bytecode: any
// ) => {
//   const provider = getProvider();
//   const wallet = new ethers.Wallet(privateKey, provider);
//   const TradeContract = {
//     abi: abi,
//     bytecode: bytecode,
//   };
//   const factory = new ethers.ContractFactory(
//     TradeContract.abi,
//     TradeContract.bytecode,
//     wallet
//   );

//   const gasEstimate = await factory.signer.estimateGas(
//     factory.getDeployTransaction(...smartContractParams)
//   );
//   const gasPrice = await provider.getGasPrice();

//   const contract = await factory.deploy(...smartContractParams, {
//     gasLimit: gasEstimate,
//     gasPrice: gasPrice,
//   });

//   return contract.address;
// };

export const whitelistRequester = async (
  privateKey: string,
  contractAddress: string,
  // address of the billateral trade contract
  requester: string
) => {
  const provider = getProvider();
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(
    contractAddress,
    ContractActaChainRegistry.abi,
    wallet
  );
  const tx = await contract.whitelistRequester(requester);
  console.log("tx", tx);
  const receipt = await tx.wait();
  console.log("receipt", receipt);
};

export const whitelistRequesterOptimase = async (requester: string) => {
  return whitelistRequester(
    process.env.WALLET_ACTA_CHAIN_RELAYER_PRIVATE_KEY as string,
    process.env.ACTA_CHAIN_REGISTRY_ADDRESS as string,
    requester
  );
};

export const deployBilateralTradeContract = async (
  privateKey: string,
  register: string,
  actaChainRelayer: string,
  actaChainRegistry: string,
  sellerAccount: string,
  envelopeId: string,
  details: any
) => {
  console.log("rpc", rpc);
  const provider = getProvider();
  console.log("provider", provider);
  if (!provider) {
    console.log("provider not found");
  } else {
    const chainIDfromProvider = await provider.getNetwork();
    console.log("chainIDfromProvider", chainIDfromProvider);
  }

  const wallet = new ethers.Wallet(privateKey, provider);
  const TradeContract = {
    abi: ContractBilateralTrade.abi,
    bytecode: ContractBilateralTrade.bytecode,
  };
  const factory = new ethers.ContractFactory(
    TradeContract.abi,
    TradeContract.bytecode,
    wallet
  );

  const deployTransaction = await factory.getDeployTransaction(
    register,
    actaChainRelayer,
    actaChainRegistry,
    sellerAccount,
    envelopeId,
    details
  );

  const gasEstimate = await provider.estimateGas({
    from: wallet.address,
    data: deployTransaction.data,
  });

  console.log("gasEstimate", gasEstimate);
  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice;
  console.log("gasPrice", gasPrice);
  const gasPriceMultiplier = BigInt(2);
  const gasPriceHigh = gasPrice ? gasPrice * gasPriceMultiplier : gasPrice;
  console.log("gasPriceHigh", gasPriceHigh);

  const contractDeployTransaction = await wallet.sendTransaction({
    data: deployTransaction.data,
    gasLimit: gasEstimate,
    gasPrice: gasPriceHigh,
    value: 0,
  });

  console.log("contractDeployTransaction", contractDeployTransaction?.hash);

  const receipt: any = await contractDeployTransaction.wait();
  console.log("receipt", receipt);
  const contractAddress = receipt?.contractAddress;
  console.log("contractAddress", contractAddress);
  console.log("start updateStoreEnvelopeBlokchain process");
  await updateStoreEnvelopeBlokchain(
    envelopeId,
    "set #bilateralTradeContractAddress = :bilateralTradeContractAddress , #bilateralTradeContractHash = :bilateralTradeContractHash",
    {
      ":bilateralTradeContractAddress": contractAddress,
      ":bilateralTradeContractHash": contractDeployTransaction?.hash,
    },
    {
      "#bilateralTradeContractAddress": "bilateralTradeContractAddress",
      "#bilateralTradeContractHash": "bilateralTradeContractHash",
    }
  );
  console.log("end updateStoreEnvelopeBlokchain process");
  return contractAddress;
};

const getDetails = (quantity: number = 2, price: number = 100) => {
  const tradeDetails = {
    quantity: BigInt(quantity),
    buyer: process.env.WALLET_BUYER_ADDRESS as string,
    tradeDate: BigInt(Math.floor(Date.now() / 1000)),
    valueDate: BigInt(Math.floor(Date.now() / 1000) + 86400), // +1 day
    price: BigInt(price),
  };
  return tradeDetails;
};

export const deployBilateralTradeContractOptimase = async (
  envelopeId: string,
  quantity: number = 2,
  price: number = 100
) => {
  const details = getDetails(quantity, price);
  console.log("details", details);
  return deployBilateralTradeContract(
    process.env.WALLET_ACTA_CHAIN_RELAYER_PRIVATE_KEY as string,
    process.env.SOBOND_REGISTRY_ADDRESS as string,
    process.env.WALLET_ACTA_CHAIN_RELAYER_ADDRESS as string,
    process.env.ACTA_CHAIN_REGISTRY_ADDRESS as string,
    process.env.WALLET_SELLER_ADDRESS as string,
    envelopeId,
    details
  );
};

export const atReturningHash = async (
  bilateralTradeContractAddress: string
) => {
  const atReturningHashABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "addr",
          type: "address",
        },
      ],
      name: "atReturningHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const provider = getProvider();
  const wallet = new ethers.Wallet(
    process.env.WALLET_ACTA_CHAIN_RELAYER_PRIVATE_KEY as string,
    provider
  );
  const contract = new ethers.Contract(
    process.env.SOBOND_REGISTRY_ADDRESS as string,
    atReturningHashABI,
    wallet
  );
  const result = await contract.atReturningHash(bilateralTradeContractAddress);
  console.log("result", result);
  return result;
};

export const enableContractToWhitelistOptimase = async (
  contractHash: string
) => {
  const enableContractToWhitelist = [
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "contractHash",
          type: "bytes32",
        },
      ],
      name: "enableContractToWhitelist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const provider = getProvider();
  const wallet = new ethers.Wallet(
    process.env.WALLET_ACTA_CHAIN_RELAYER_PRIVATE_KEY as string,
    provider
  );
  const contract = new ethers.Contract(
    process.env.SOBOND_REGISTRY_ADDRESS as string,
    enableContractToWhitelist,
    wallet
  );
  const tx = await contract.enableContractToWhitelist(contractHash);
  // console.log("tx", tx);
  const hash = await tx.hash;
  console.log("hash", hash);
  const receipt = await tx.wait();
  console.log("receipt", receipt?.hash);
};

export const waitelistProcess = async (
  bilateralTradeContractAddress: string
) => {
  console.log("whitelisting process");

  console.log("start whitelistRequesterOptimase process");
  const whitelistPromise = whitelistRequesterOptimase(
    bilateralTradeContractAddress
  );

  const enableContractToWhitelistOptimaseAction = async () => {
    console.log("start atReturningHash process");
    const hashId = await atReturningHash(bilateralTradeContractAddress);
    console.log("end atReturningHash process");

    console.log("start enableContractToWhitelistOptimase process");
    await enableContractToWhitelistOptimase(hashId);
    console.log("end enableContractToWhitelistOptimase process");
  };
  await Promise.all([
    whitelistPromise,
    enableContractToWhitelistOptimaseAction,
  ]);
  console.log("end waitelistProcess process");
};

export const waitelistProcessStep = async (
  bilateralTradeContractAddress: string
) => {
  console.log(" whitelisting process");
  console.log(" start whitelistRequesterOptimase process");

  await whitelistRequesterOptimase(bilateralTradeContractAddress);
  console.log(" end whitelistRequesterOptimase process");
  console.log(" start atReturningHash process");
  const hashId = await atReturningHash(bilateralTradeContractAddress);
  console.log(" end atReturningHash process");
  console.log("hashId", hashId);
  console.log(" start enableContractToWhitelistOptimase process");
  await enableContractToWhitelistOptimase(hashId);
  console.log(" end enableContractToWhitelistOptimase process");
};

export const envelopeContractDeployer = async (
  envelopeId: string,
  quantity: number = 2,
  price: number = 100
) => {
  // start time
  const startTime = new Date().getTime();
  console.log("startTime", startTime);
  console.log("envelopeId", envelopeId);
  console.log("quantity", quantity);
  console.log("price", price);
  console.log(" start deployBilateralTradeContractOptimase process");
  const bilateralTradeContractAddress =
    await deployBilateralTradeContractOptimase(envelopeId, quantity, price);
  // time now

  console.log("deployBilateralTrade timeNow", new Date().getTime() - startTime);
  console.log(" end deployBilateralTradeContractOptimase process");
  console.log("bilateralTradeContractAddress", bilateralTradeContractAddress);
  console.log(" start waitelistProcess process");
  await waitelistProcess(bilateralTradeContractAddress);
  console.log(" end waitelistProcess process");
  await updateStoreEnvelopeBlokchain(
    envelopeId,
    "set #whitelistStatus = :whitelistStatus, #status = :status",
    {
      ":whitelistStatus": 1,
      ":status": 4,
    },
    {
      "#whitelistStatus": "whitelistStatus",
      "#status": "status",
    }
  );
  // end time
  const endTime = new Date().getTime();
  // console.log("endTime", endTime);
  console.log("total time", endTime - startTime);
  return bilateralTradeContractAddress;
};

export const requestVerificationOptimase = async (contractAddress: string) => {
  const provider = getProvider();
  const wallet = new ethers.Wallet(
    process.env.WALLET_ACTA_CHAIN_RELAYER_PRIVATE_KEY as string,
    provider
  );

  const contract = new ethers.Contract(
    contractAddress,
    ContractBilateralTrade.abi,
    wallet
  );
  const tx = await contract.requestVerification();
  console.log("tx hash", tx.hash);
  const receipt = await tx.wait();
  console.log("receipt", receipt?.hash);
};

//bilateralTradeContractAddress 0x5272842c27CA0cF62bDeBA94069bE8CBbb519635
//bilateralTradeContractAddress 0x7159298937A06ba16585429500575771Ec90EC12
//bilateralTradeContractAddress 0xAE302E6c30d718E9442d08B359056662c36f3ffa
