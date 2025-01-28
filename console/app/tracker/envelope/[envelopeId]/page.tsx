/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import { StatusStep } from "@/components/status-step";
import UserCard from "@/components/user-card";
import TransactionCard from "@/components/transaction-card";

// call /api/docusing/envelope/{envelopeId}/status
const fetchEnvelopeStatus = async (envelopeId: any) => {
  const response = await fetch(`/api/docusign/envelope/${envelopeId}/status`);

  return response.json();
};

const WALLET_SELLER_ADDRESS = "0x444D341Fcd5d8627163b9E27b05Fce11f58A663a";

const WALLET_BUYER_ADDRESS = "0x3F67dD63c82A86792a8AcF261D18b1fa31311271";

const getEllipsisTxt = (str: string, n = 6) => {
  try {
    return `${str?.substr(0, n)}...${str?.substr(str.length - n, str.length)}`;
  } catch (e) {
    return str;
  }
};

export default function TrackerPage({ params }: { params: any }) {
  const unwrappedParams: any = use(params);
  const envelopeId: any = unwrappedParams.envelopeId;
  const [currentStep, setCurrentStep] = useState(1);

  const [envelopeInfo, setEnvelope] = useState<any>(null);

  const [sellerInfo, setSellerInfo] = useState<any>({
    type: "seller" as const,
    name: "... waiting",
    email: "... waiting",
    walletAddress: WALLET_SELLER_ADDRESS,
    signatureStatus: "pending",
    tokenBalance: 0,
  });

  const [buyerInfo, setBuyerInfo] = useState<any>({
    type: "buyer" as const,
    name: "... waiting",
    email: "... waiting",
    walletAddress: WALLET_BUYER_ADDRESS,
    signatureStatus: "pending",
    tokenBalance: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const envelope = await fetchEnvelopeStatus(envelopeId);
      console.log("envelope:", envelope?.envelopeSummary?.recipients?.signers);
      setCurrentStep(envelope.status || 1);
      setEnvelope(envelope);
      setBuyerInfo({
        type: "buyer" as const,
        name: envelope?.envelopeSummary?.recipients?.signers?.[0]?.name,
        email: envelope?.envelopeSummary?.recipients?.signers?.[0]?.email,
        walletAddress: WALLET_BUYER_ADDRESS,
        signatureStatus:
          envelope?.envelopeSummary?.recipients?.signers?.[0]?.status,
        tokenBalance: 0,
      });
      setSellerInfo({
        type: "seller" as const,
        name: envelope?.envelopeSummary?.recipients?.signers?.[1]?.name,
        email: envelope?.envelopeSummary?.recipients?.signers?.[1]?.email,
        walletAddress: WALLET_SELLER_ADDRESS,
        signatureStatus:
          envelope?.envelopeSummary?.recipients?.signers?.[1]?.status,
        tokenBalance: 0,
      });
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, [envelopeId]);

  const steps = [
    {
      title: "Contract Sent for Signatures",
      description:
        "The contract has been sent to both the Buyer and Seller for signatures using DocuSign. Please check your emails.",
    },
    {
      title: "Contract Delivered",
      description:
        "The contract has been successfully delivered to both parties. Waiting for signatures.",
    },
    {
      title: "Signatures Completed",
      description:
        "Both parties have signed the contract. Preparing to execute the trade on the blockchain.",
    },
    {
      title: "Trade Executed",
      description: "The trade has been successfully executed!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
          Trade Status Tracker
        </h1>
        <ProgressBar steps={4} currentStep={currentStep} />
        <div className="mt-8 space-y-8">
          {steps.map((step, index) => (
            <StatusStep
              key={index}
              step={index + 1}
              currentStep={currentStep}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
        <div className="h-8"></div>
        {currentStep === 3 && (
          <div className="mt-8 bg-black shadow-sm rounded-lg p-6">
            <div>... wating for the blockchain transaction to complete</div>
          </div>
        )}
        <div className="h-8"></div>
        {currentStep >= 4 && (
          <TransactionCard
            info={{
              type: "transaction" as const,
              transactionHash: getEllipsisTxt(
                envelopeInfo?.bilateralTradeContractHash
              ),
              smartContractAddress: getEllipsisTxt(
                envelopeInfo?.bilateralTradeContractAddress
              ),
              viewTransactionUrl: `https://sepolia.etherscan.io/tx/${envelopeInfo?.bilateralTradeContractHash}`,
              viewSmartContractUrl: `https://sepolia.etherscan.io/address/${envelopeInfo?.bilateralTradeContractAddress}`,
            }}
          />
        )}
        <div className="h-8"></div>

        {/* {currentStep >= 1 && (
          // <div className="mt-8 bg-black shadow-sm rounded-lg p-6">
          //   <h3 className="text-lg font-medium mb-4">Signature Status</h3>
          //   <div className="flex flex-col justify-between items-center space-y-4 ">
          //     <div className="flex flex-col space-y-4">
          //       <p className={`font-medium  text-green-600 flex space-x-2`}>
          //         <span>Buyer Name:</span>
          //         <span>
                    // {envelopeInfo?.envelopeSummary?.recipients?.signers?.[0]
                    //   ?.name || "... waiting for response"}
          //         </span>
          //       </p>
          //       <p className={`font-medium  text-green-600 flex space-x-2`}>
          //         <span>Buyer Email:</span>
          //         <span>
          //           {envelopeInfo?.envelopeSummary?.recipients?.signers?.[0]
          //             ?.email || "... waiting for response"}
          //         </span>
          //       </p>
          //       <a
          //         href={`https://sepolia.etherscan.io/address/${WALLET_BUYER_ADDRESS}`}
          //         target="_blank"
          //         className="text-blue-400"
          //       >
          //         <p className={`font-medium  text-green-600 flex space-x-2`}>
          //           <span>Buyer Wallet Address:</span>
          //           <span>{getEllipsisTxt(WALLET_BUYER_ADDRESS)}</span>
          //         </p>
          //       </a>
          //       <Button
          //         variant="outline"
          //         size="sm"
          //         className="mt-2 bg-blue-500 text-white hover:bg-blue-600"
          //       >
          //         <div className="flex space-x-2 text-white">
          //           <span>Signature Status:</span>
          //           <span>
          //             {envelopeInfo?.envelopeSummary?.recipients?.signers?.[0]
          //               ?.status || "... waiting for response"}
          //           </span>
          //         </div>
          //       </Button>
          //     </div>
          //     <div className="flex flex-col space-y-4">
          //       <p className={`font-medium  flex space-x-2`}>
          //         <span>Seller Name:</span>
          //         <span>
          //           {envelopeInfo?.envelopeSummary?.recipients?.signers?.[1]
          //             ?.name || "... waiting for response"}
          //         </span>
          //       </p>
          //       <p className={`font-medium   flex space-x-2`}>
          //         <span>Seller Email:</span>
          //         <span>
                    // {envelopeInfo?.envelopeSummary?.recipients?.signers?.[1]
                    //   ?.email || "... waiting for response"}
          //         </span>
          //       </p>
          //       <a
          //         href={`https://sepolia.etherscan.io/address/${WALLET_SELLER_ADDRESS}`}
          //         target="_blank"
          //         className="text-blue-400"
          //       >
          //         <p className={`font-medium  text-green-600 flex space-x-2`}>
          //           <span>Seller Wallet Address:</span>
          //           <span>{getEllipsisTxt(WALLET_SELLER_ADDRESS)}</span>
          //         </p>
          //       </a>

          //       <Button
          //         variant="outline"
          //         size="sm"
          //         className="mt-2 bg-blue-500 text-white hover:bg-blue-600"
          //       >
          //         <div className="flex space-x-2 text-white">
          //           <span>Signature Status:</span>
          //           <span>
          //             {envelopeInfo?.envelopeSummary?.recipients?.signers?.[1]
          //               ?.status || "... waiting for response"}
          //           </span>
          //         </div>
          //       </Button>
          //     </div>
          //   </div>
          // </div>
        )} */}
        {currentStep >= 1 && (
          <>
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Transaction Participants
              </h1>
              <div className="grid grid-cols-1  gap-8">
                <UserCard user={sellerInfo} />
                <UserCard user={buyerInfo} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
