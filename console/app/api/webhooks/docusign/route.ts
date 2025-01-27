/* eslint-disable @typescript-eslint/no-explicit-any */

import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const signature = headersList.get("X-DocuSign-Signature-1");
  console.log("DocuSign signature:", signature);

  // if (!signature) {
  //   return NextResponse.json(
  //     { error: "Missing DocuSign signature" },
  //     { status: 401 }
  //   );
  // }

  // TODO: Verify the DocuSign signature here
  // This would involve computing an HMAC of the request body using your secret
  // and comparing it to the provided signature

  try {
    const body = await req.json();

    // Log the webhook payload for debugging
    console.log("Received DocuSign webhook:", JSON.stringify(body, null, 2));

    // Handle different event types
    switch (body.event) {
      case "envelope-sent":
        await handleEnvelopeSent(body?.data);
        break;
      case "envelope-delivered":
        await handleEnvelopeDelivered(body?.data);
        break;
      case "envelope-completed":
        await handleEnvelopeCompleted(body?.data);
        break;
      // Add more cases as needed
      default:
        console.log(`Unhandled event type: ${body.event}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing DocuSign webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleEnvelopeSent(data: any) {
  // TODO: Implement logic for when an envelope is sent
  console.log("Envelope sent:", data.envelopeId);
}

async function handleEnvelopeDelivered(data: any) {
  // TODO: Implement logic for when an envelope is delivered
  console.log("Envelope delivered:", data.envelopeId);
}

async function handleEnvelopeCompleted(data: any) {
  // TODO: Implement logic for when an envelope is completed
  console.log("Envelope completed:", data.envelopeId);
  // This is where you might update your database or trigger other processes
}
