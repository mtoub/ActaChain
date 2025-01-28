import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const evId = params.evId;

  const envelope = {
    envelopeId: evId,
    status: "sent",
  };

  if (envelope) {
    return NextResponse.json(envelope);
  } else {
    return NextResponse.json({ error: "envelope not found" }, { status: 404 });
  }
}
