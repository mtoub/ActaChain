import CreateTradeForm from "@/components/create-trade-form";

export const metadata = {
  title: "Create Trade - ActaChain",
  description: "Create a new tokenized bond trade on ActaChain",
};

export default function CreateTradePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 text-gray-200 text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 text-gray-900 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create New Trade
        </h1>
        <CreateTradeForm />
      </div>
    </div>
  );
}
