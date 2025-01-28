import { createItem } from "./store";


const ENVELOPE_TABLE_NAME = process.env.ENVELOPE_TABLE_NAME || "docusign-dev";
export const storeEnvelope = async (envelopeId:string , envelope: any) => {
  try {
    await createItem<any>(ENVELOPE_TABLE_NAME, {
        ...envelope,
        envelopeId, timestamp: new Date().toISOString()
    });

    console.log("Envelope stored successfully.");
  } catch (err) {
    console.error("Error storing envelope:", err);
    throw err;
  }
}


export const createEnvelope = async (envelopeDefinition: any) => {
    // docusign
}
