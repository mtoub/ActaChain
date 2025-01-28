"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getEnvelopes() {
  const url = "/api/status";
  console.log("url:", url);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch envelopes");
  }
  return res.json();
}

const getStatusName = (status: number) => {
  switch (status) {
    case 0:
      return "Sent";
    case 1:
      return "Delivered";
    case 2:
      return "Completed";
    case 3:
      return "Submitted Transaction";
    case 4:
      return "Transaction Completed";
    case 5:
      return "Transaction Completed";
    default:
      return "Transaction Completed";
  }
};

export default function TrackerPage() {
  const [envelopes, setEnvelopes] = useState<any>([]);

  useEffect(() => {
    getEnvelopes().then(setEnvelopes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Envelope Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Envelope ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {envelopes.map((envelope) => (
                  <TableRow key={envelope.envelopeId}>
                    <TableCell>
                      <Link
                        href={`/tracker/envelope/${envelope.envelopeId}`}
                        className="text-blue-600 hover:underline"
                      >
                        {envelope.envelopeId}
                      </Link>
                    </TableCell>
                    <TableCell>{getStatusName(envelope.status)}</TableCell>
                    <TableCell>{envelope.name || envelope.tradeName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
