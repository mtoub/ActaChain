import { NextApiRequest, NextApiResponse } from "next";
import { EnvelopesApi, ApiClient } from "docusign-esign";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { envelopeId } = req.query;
  console.log("envelopeId", envelopeId);

  if (!envelopeId || typeof envelopeId !== "string") {
    return res.status(400).json({ error: "Invalid envelope ID" });
  }

  const apiClient = new ApiClient();
  apiClient.setBasePath("https://demo.docusign.net/restapi");
  apiClient.addDefaultHeader(
    "Authorization",
    `Bearer ${process.env.DOCUSIGN_ACCESS_TOKEN}`
  );

  const envelopesApi = new EnvelopesApi(apiClient);

  try {
    const envelope = await envelopesApi.getEnvelope(
      process.env.DOCUSIGN_ACCOUNT_ID as string,
      envelopeId
    );
    res.status(200).json(envelope);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An error occurred" });
    }
  }
}
