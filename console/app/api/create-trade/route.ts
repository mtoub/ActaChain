import { type NextRequest, NextResponse } from "next/server";
import { DocusignService } from "@/services/docusign";
import { storeEnvelopeStatus } from "@/services/envelope.status";
// DOCUSIGN_ACCOUNT_ID="eb67d021-05ba-4e43-96ed-5309a2c8ebb5"
// DOCUSIGN_CLIENT_ID="dc1d005f-3b5d-4bed-b5f9-b707bcf4a680"
// DOCUSIGN_IMPERSONATED_USER_GUID="8250ef5b-27d1-4252-8ca1-861938d8bcdf"
const createEnvelopeFromTemplate = async (
  accessToken: string,
  dataFrom: any
): Promise<void> => {
  const accountId = process.env.DOCUSIGN_ACCOUNT_ID;
  const templateId = process.env.DOCUSIGN_TEMPLATE_ID;

  const envelopeDefinition = {
    templateId: templateId,
    status: "sent",
    templateRoles: [
      {
        email: dataFrom?.buyerEmail,
        name: dataFrom?.buyerName,
        roleName: "buyer",
      },
      {
        email: dataFrom?.sellerEmail,
        name: dataFrom?.sellerName,
        roleName: "seller",
      },
    ],
  };

  const response = await fetch(
    `https://demo.docusign.net/restapi/v2.1/accounts/${accountId}/envelopes`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envelopeDefinition),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    console.error("Error response from DocuSign API:", data);
    throw new Error(`Failed to create envelope: ${data.message}`);
  }

  console.log("Envelope created successfully!", data);
  return data;
};
const testEnvelope = async () => {
  const docusignService = new DocusignService();

  // Define envelope details
  const envelopeDefinition = {
    emailSubject: "Please sign this document",
    recipients: {
      signers: [
        {
          email: "youssefmaghzaz@gmail.com", // Replace with your email for testing
          name: "youssef maghzaz",
          recipientId: "1",
          tabs: {
            signHereTabs: [
              {
                anchorString: "**signature**", // Use this tag in your document
                anchorYOffset: "0",
                anchorUnits: "pixels",
                anchorXOffset: "0",
              },
            ],
          },
        },
      ],
    },
    documents: [
      {
        documentBase64: Buffer.from(
          "This is a test document. Please sign here: **signature**"
        ).toString("base64"),
        name: "Test Document",
        fileExtension: "txt",
        documentId: "1",
      },
    ],
    status: "sent", // Change to 'created' to save as draft
  };

  try {
    const envelopeResponse = await docusignService.createEnvelope(
      envelopeDefinition
    );
    console.log("Envelope Created:", envelopeResponse);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating envelope:", error.message);
    } else {
      console.error("Error creating envelope:", error);
    }
  }
};

// This is a mock function to simulate creating a trade
// In a real application, this would interact with a database
async function createTrade(tradeData: any) {
  const docusignService = new DocusignService();
  const accessToken = await docusignService.getAccessToken();
  console.log("accessToken:", accessToken);
  const dataEvn: any = await createEnvelopeFromTemplate(accessToken, tradeData);
  console.log("dataEvn:", dataEvn);

  await storeEnvelopeStatus(dataEvn?.envelopeId, {
    tradeName: tradeData.tradeName,
    name: tradeData.tradeName,
    status: 0,
  });

  return dataEvn;
}

export async function POST(request: NextRequest) {
  try {
    const tradeData = await request.json();
    console.log("Creating trade with data:", tradeData);
    const createdTrade = await createTrade(tradeData);

    return NextResponse.json(createdTrade, { status: 201 });
  } catch (error) {
    console.error("Error creating trade:", error);
    return NextResponse.json(
      { error: "Failed to create trade" },
      { status: 500 }
    );
  }
}
