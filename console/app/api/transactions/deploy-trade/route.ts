import { type NextRequest, NextResponse } from "next/server";
import { envelopeContractDeployer } from "@/services/transactions";
import { getStatus } from "@/services/envelope.status";

//  contractAddress 0x91a6a7C4C21cDa2B34319a8aE596F20F71cA76b2
export async function GET(request: NextRequest) {
  try {
    // /api/transactions?envelopeId=${envelopeId}
    const { searchParams } = new URL(request.url);
    const envelopeId = searchParams.get("envelopeId");
    const apiKey = searchParams.get("apiKey");
    if (!envelopeId) {
      return NextResponse.json(
        { error: "envelopeId is required" },
        { status: 400 }
      );
    }
    if (!apiKey) {
      return NextResponse.json(
        { error: "apiKey is required" },
        { status: 400 }
      );
    }
    console.log("apiKey trade", apiKey);
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ error: "apiKey is invalid" }, { status: 400 });
    }
    await getStatus(envelopeId);
    const bilateralTradeContractAddress = await envelopeContractDeployer(
      envelopeId
    );

    const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.API_URL;
    console.log("url", url);
    fetch(
      `${url}/api/transactions/verify?envelopeId=${envelopeId}&apiKey=${encodeURIComponent(
        process.env.API_KEY as string
      )}&bilateralTradeContractAddress=${encodeURIComponent(
        bilateralTradeContractAddress
      )}`,
      {
        method: "GET",
      }
    );

    return NextResponse.json({ message: "success", envelopeId });
  } catch (error) {
    console.log("error", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "envelope not found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { error: "envelope not found" },
        { status: 404 }
      );
    }
  }
}
