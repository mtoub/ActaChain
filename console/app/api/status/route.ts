import { NextApiRequest, NextApiResponse } from "next";
import { EnvelopesApi, ApiClient } from "docusign-esign";
import { type NextRequest, NextResponse } from "next/server";
import { DocusignService } from "@/services/docusign";
import { listEnvelopes } from "@/services/envelope.status";

export async function GET(request: NextRequest) {
  try {
    const envelope = await listEnvelopes();
    return NextResponse.json(envelope);
  } catch (error) {
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
