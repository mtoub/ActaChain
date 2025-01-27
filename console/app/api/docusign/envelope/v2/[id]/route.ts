import type { NextApiRequest, NextApiResponse } from "next";

export function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("GET request received");
  res.status(200).json({ name: "John Doe" });
}
