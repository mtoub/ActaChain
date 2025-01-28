import { type NextRequest, NextResponse } from "next/server";
import { DocusignService } from "@/services/docusign";

const API_KEY_ENV = process.env.API_KEY || "your-api-key-here";
export async function GET(request: NextRequest, { params }: { params: any }) {
  const userId = params?.userId;
  const apiKey = request.headers.get("x-api-key");
  console.log("apiKey:", apiKey, process.env.API_KEY);
  if (apiKey !== API_KEY_ENV) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }
  const docusignService = new DocusignService();
  if (userId === "20250127") {
    const accessToken = await docusignService.getAccessToken();
    return NextResponse.json({
      accessToken,
    });
  }

  return NextResponse.json({ error: "User not found" }, { status: 404 });
}
