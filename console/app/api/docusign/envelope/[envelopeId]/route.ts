import { type NextRequest, NextResponse } from "next/server";
import { DocusignService } from "@/services/docusign";

export async function GET(
  request: NextRequest,
  { params }: { params: any }
) {
  const envelopeId = params.envelopeId;
  if (!envelopeId || typeof envelopeId !== "string") {
    return NextResponse.json({ error: "Invalid envelope ID" }, { status: 400 });
  }

  const docusignService = new DocusignService();
  const envelope = await docusignService.getEnvelopeStatus(envelopeId);
  console.log("envelope:", envelope);

  try {
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
