import { type NextRequest, NextResponse } from "next/server";
import { requestVerificationOptimase } from "@/services/transactions";
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
    console.log("apiKey", apiKey);
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ error: "apiKey is invalid" }, { status: 400 });
    }
    await getStatus(envelopeId);
    console.log("envelopeId", envelopeId);
    // const dataaa = await envelopeContractDeployer(
    //   "db8040fe-1fed-4ed9-9fe9-59e59982a052"
    // );
    // console.log("dataaa", dataaa);
    // await requestVerificationOptimase(
    //   "0xAE302E6c30d718E9442d08B359056662c36f3ffa"
    // );

    const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.API_URL;
    console.log("url", url);
    fetch(
      `${url}/api/transactions/deploy-trade?envelopeId=${envelopeId}&apiKey=${encodeURIComponent(
        process.env.API_KEY as string
      )}`,
      {
        method: "GET",
      }
    );

    return NextResponse.json({ message: "transactions", envelopeId });
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
