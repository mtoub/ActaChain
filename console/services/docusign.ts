import axios from "axios";
import fs from "fs";
import jwt from "jsonwebtoken"; // npm install jsonwebtoken @types/jsonwebtoken
import { DOCUSIGN_CONFIG } from "../config/docusign";
import dotenv from "dotenv";
dotenv.config();

export class DocusignService {
  private accessToken: string | null = null;
  private tokenExpiration: number | null = null; // store the expiration time in epoch

  // 1. Get an access token (JWT flow)
  public async getAccessToken(): Promise<string> {
    const now = Math.floor(Date.now() / 1000);

    if (
      this.accessToken &&
      this.tokenExpiration &&
      now < this.tokenExpiration
    ) {
      console.log("Using cached access token.");
      return this.accessToken!;
    }

    const privateKey = process.env.DOCUSIGN_PRIVATE_KEY || "";
    console.log("Private key successfully read.");

    // Create JWT payload
    const payload = {
      iss: DOCUSIGN_CONFIG.clientId,
      sub: DOCUSIGN_CONFIG.impersonatedUserGuid,
      aud: "account-d.docusign.com", // For demo (JWT audience differs for production)
      iat: now,
      exp: now + 3600 * 24 * 365, // in one year
      scope: "signature impersonation",
    };

    // Sign JWT
    const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
    console.log("JWT successfully signed.");

    try {
      // Exchange JWT for access token
      const response = await axios.post(
        "https://account-d.docusign.com/oauth/token",
        new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: token,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.accessToken = response.data.access_token;
      // Typically "expires_in" is around 3600
      this.tokenExpiration = now + response.data.expires_in - 60; // buffer 60 seconds
      console.log("Access token obtained successfully.");
      return this.accessToken!;
    } catch (err) {
      const error = err as any;
      console.error("JWT Auth error:", error.response?.data || error.message);
      throw new Error("Failed to get DocuSign access token");
    }
  }

  // 2. Create and send an envelope
  public async createEnvelope(envelopeDefinition: any): Promise<any> {
    const token = await this.getAccessToken();

    const url = `${DOCUSIGN_CONFIG.basePath}/v2.1/accounts/${DOCUSIGN_CONFIG.accountId}/envelopes`;
    try {
      const response = await axios.post(url, envelopeDefinition, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Envelope created successfully.");
      return response.data; // includes envelopeId, etc.
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Error creating envelope:",
          err.response?.data || err.message
        );
      } else {
        const error = err as any;
        console.error("Error creating envelope:", error.message);
      }
      throw err;
    }
  }

  // 3. (Optional) Get envelope status
  public async getEnvelopeStatus(envelopeId: string): Promise<any> {
    const token = await this.getAccessToken();
    const url = `${DOCUSIGN_CONFIG.basePath}/v2.1/accounts/${DOCUSIGN_CONFIG.accountId}/envelopes/${envelopeId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Envelope status fetched successfully.");
      return response.data;
    } catch (err) {
      const error = err as any;
      console.error(
        "Error fetching envelope status:",
        error.response?.data || error.message
      );
      throw err;
    }
  }

  async sendEnvelope(
    envelopeDefinition: any,
    accessToken: string
  ): Promise<string> {
    const url = `${DOCUSIGN_CONFIG.basePath}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes`;

    const response = await axios.post(url, envelopeDefinition, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.envelopeId;
  }
}
