import dotenv from "dotenv";
dotenv.config();

export const DOCUSIGN_CONFIG = {
  accountId: process.env.DOCUSIGN_ACCOUNT_ID || "",
  clientId: process.env.DOCUSIGN_CLIENT_ID || "",
  clientSecret: process.env.DOCUSIGN_CLIENT_SECRET || "",
  impersonatedUserGuid: process.env.DOCUSIGN_IMPERSONATED_USER_GUID || "",
  basePath:
    process.env.DOCUSIGN_BASE_PATH || "https://demo.docusign.net/restapi",
  redirectUri:
    process.env.DOCUSIGN_REDIRECT_URI || "https://localhost:3000/callback",
};
