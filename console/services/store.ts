import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  ScanCommand,
  ScanCommandInput,
  PutCommand,
  PutCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";

const config: DynamoDBClientConfig = {
  region: process.env.AWS_REGION || "us-east-1", // Fallback to a default region if not set
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
}; // Replace with your region
const client = new DynamoDBClient(config);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const getItem = async <T>(
  tableName: string,
  key: Record<string, any>
): Promise<T | undefined> => {
  try {
    const params: GetCommandInput = {
      TableName: tableName,
      Key: key, // Example: { id: "123" }
    };
    const command = new GetCommand(params);
    const response = await ddbDocClient.send(command);
    return response.Item as T; // Cast to the expected type
  } catch (err) {
    console.error("Error getting item:", err);
    throw err;
  }
};

export const listItems = async <T>(tableName: string): Promise<T[]> => {
  try {
    const params: ScanCommandInput = {
      TableName: tableName,
    };
    const command = new ScanCommand(params);
    const response = await ddbDocClient.send(command);
    return response.Items as T[]; // Cast to the expected type
  } catch (err) {
    console.error("Error listing items:", err);
    throw err;
  }
};

export const createItem = async <T>(
  tableName: string,
  item: any
): Promise<void> => {
  try {
    const params: PutCommandInput = {
      TableName: tableName,
      Item: item, // Example: { id: "123", name: "John Doe", age: 30 }
    };
    const command = new PutCommand(params);
    await ddbDocClient.send(command);
    console.log("Item created successfully");
  } catch (err) {
    console.error("Error creating item:", err);
    throw err;
  }
};

export const updateItem = async (
  tableName: string,
  key: Record<string, any>,
  updateExpression: string,
  expressionAttributeValues: Record<string, any>,
  expressionAttributeNames?: Record<string, string>
): Promise<Record<string, any> | undefined> => {
  try {
    const params: UpdateCommandInput = {
      TableName: tableName,
      Key: key, // Example: { id: "123" }
      UpdateExpression: updateExpression, // Example: "set #name = :name, #age = :age"
      ExpressionAttributeValues: expressionAttributeValues, // Example: { ":name": "Jane Doe", ":age": 35 }
      ExpressionAttributeNames: expressionAttributeNames, // Optional map for attribute names
      ReturnValues: "UPDATED_NEW", // Returns updated attributes
    };
    const command = new UpdateCommand(params);
    const response = await ddbDocClient.send(command);
    return response.Attributes; // Returns updated attributes
  } catch (err) {
    console.error("Error updating item:", err);
    throw err;
  }
};
