import { NextApiRequest, NextApiResponse } from "next";
import { EnvelopesApi, ApiClient } from "docusign-esign";
import { type NextRequest, NextResponse } from "next/server";
import { DocusignService } from "@/services/docusign";
import { getStatus } from "@/services/envelope.status";

export async function GET(
  request: NextRequest,
  { params }: { params: any}
) {
  const envelopeId =  params.envelopeId;

  if (!envelopeId || typeof envelopeId !== "string") {
    return NextResponse.json({ error: "Invalid envelope ID" }, { status: 400 });
  }

  try {
    const envelope = await getStatus(envelopeId);
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
