import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 text-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          404 - Envelope Not Found
        </h1>
        <p className="text-xl text-gray-600">
          {"Sorry, we couldn't find the envelope you're looking for."}
        </p>
        <Button asChild>
          <Link href="/tracker">Return to Tracker</Link>
        </Button>
      </div>
    </div>
  );
}
