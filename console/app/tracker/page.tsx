/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import { StatusStep } from "@/components/status-step";

export default function TrackerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [buyerSigned, setBuyerSigned] = useState(false);
  const [sellerSigned, setSellerSigned] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 4) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const steps = [
    {
      title: "Contract Drafted by Issuer",
      description:
        "The Issuer is preparing the contract for the trade. Please wait while the details are finalized.",
    },
    {
      title: "Contract Sent for Signatures",
      description:
        "The contract has been sent to both the Buyer and Seller for signatures using DocuSign. Please check your emails.",
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
    <div className="min-h-screen bg-black text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8">
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
        {currentStep === 2 && (
          <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Signature Status</h3>
            <div className="flex justify-between items-center">
              <div>
                <p
                  className={`font-medium ${
                    buyerSigned ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {buyerSigned
                    ? "Buyer has signed"
                    : "Waiting for Buyer to sign"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={function () {
                    setBuyerSigned(true);
                  }}
                  disabled={buyerSigned}
                >
                  {buyerSigned ? "Signed" : "Sign as Buyer"}
                </Button>
              </div>
              <div>
                <p
                  className={`font-medium ${
                    sellerSigned ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {sellerSigned
                    ? "Seller has signed"
                    : "Waiting for Seller to sign"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={function () {
                    setSellerSigned(true);
                  }}
                  disabled={sellerSigned}
                >
                  {sellerSigned ? "Signed" : "Sign as Seller"}
                </Button>
              </div>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              Blockchain Transaction Details
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Transaction Hash
                </dt>
                <dd className="mt-1 text-sm text-gray-900">0x1234abcd...</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  2025-01-25 14:30:00 UTC
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Block Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900">#1593827</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Smart Contract Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">0x5678efgh...</dd>
              </div>
            </dl>
            <div className="mt-6 flex justify-between">
              <Button variant="outline">View Signed Contract</Button>
              <Button>View on Blockchain Explorer</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
