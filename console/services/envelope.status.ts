import { createItem, getItem, listItems, updateItem } from "./store";

const ENVELOPE_TABLE_NAME = process.env.ENVELOPE_TABLE_NAME || "docusign";

export const getStatus = async (envelopeId: string) => {
  try {
    console.log("Fetching envelope status...");
    console.log("envelopeId:", envelopeId);
    const envelope = await getItem(ENVELOPE_TABLE_NAME, {
      envelopeId,
    });
    console.log("Envelope status fetched successfully.");
    return envelope;
  } catch (err) {
    console.error("Error getting envelope status:", err);
    throw err;
  }
};

export const listEnvelopes = async () => {
  // listItems(ENVELOPE_TABLE_NAME);
  const envelopes: any = await listItems(ENVELOPE_TABLE_NAME);

  return envelopes;
};

export const storeEnvelopeStatus = async (
  envelopeId: string,
  envelope: any
) => {
  try {
    if (!envelopeId || !envelope) {
      throw new Error("Invalid envelope data");
    }
    const envelopeExists = await getItem<any>(ENVELOPE_TABLE_NAME, {
      envelopeId,
    });
    //   envelopeSummary: data.envelopeSummary,
    if (envelopeExists) {
      await updateItem(
        ENVELOPE_TABLE_NAME,
        { envelopeId },
        "set #status = :status, #timestamp = :timestamp , #envelopeSummary = :envelopeSummary",
        {
          ":status": envelope.status,
          ":timestamp": new Date().toISOString(),
          ":envelopeSummary": envelope.envelopeSummary,
        },
        {
          "#status": "status",
          "#timestamp": "timestamp",
          "#envelopeSummary": "envelopeSummary",
        }
      );
    } else {
      await createItem<any>(ENVELOPE_TABLE_NAME, {
        ...envelope,
        envelopeId,
        timestamp: new Date().toISOString(),
      });
    }
    console.log("Envelope stored successfully.");
  } catch (err) {
    console.error("Error storing envelope:", err);
    throw err;
  }
};

export const updateStoreEnvelopeStatus = async (
  envelopeId: string,
  envelope: any
) => {
  await updateItem(
    ENVELOPE_TABLE_NAME,
    { envelopeId },
    "set #status = :status, #timestamp = :timestamp , #contracts = :contracts",
    {
      ":status": envelope.status,
      ":timestamp": new Date().toISOString(),
      ":contracts": envelope.contracts,
    },
    {
      "#status": "status",
      "#timestamp": "timestamp",
      "#contracts": "contracts",
    }
  );
};

// "set #status = :status",
// {
//   ":status": variableValue,
// },
// {
//   "#status": variableName,
// }
export const updateStoreEnvelopeBlokchain = async (
  envelopeId: string,
  updateExpression: string,
  expressionAttributeValues: Record<string, any>,
  expressionAttributeNames?: Record<string, string>
) => {
  console.log("Updating envelope Blokchain status...", {
    updateExpression,
    expressionAttributeValues,
    expressionAttributeNames,
  });
  await updateItem(
    ENVELOPE_TABLE_NAME,
    { envelopeId },
    updateExpression,
    expressionAttributeValues,
    expressionAttributeNames
  );
  console.log("Envelope status Blokchain updated successfully.");
};
