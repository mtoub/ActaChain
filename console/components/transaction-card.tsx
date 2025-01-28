import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Wallet,
  CheckCircle,
  Coins,
  Hash,
  FileCode2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionInfo {
  type: "transaction";
  transactionHash: string;
  smartContractAddress: string;
  viewTransactionUrl: string;
  viewSmartContractUrl: string;
}

type CardInfo = TransactionInfo;

export default function TransactionCard({ info }: { info: CardInfo }) {
  const colors = {
    seller: {
      bg: "from-purple-50 to-indigo-50",
      title: "text-purple-800",
      icon: "text-purple-600",
    },
    buyer: {
      bg: "from-blue-50 to-cyan-50",
      title: "text-blue-800",
      icon: "text-blue-600",
    },
    transaction: {
      bg: "from-green-50 to-emerald-50",
      title: "text-green-800",
      icon: "text-green-600",
    },
  };

  const color = colors[info.type];

  return (
    <Card
      className={`w-full max-w-md mx-auto bg-gradient-to-br ${color.bg} shadow-lg`}
    >
      <CardHeader className="pb-4">
        <CardTitle className={`text-2xl font-bold text-center ${color.title}`}>
          {info.type === "transaction"
            ? "Blockchain Transaction Details"
            : `${info.type === "seller" ? "Seller" : "Buyer"} Information`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <>
          <div className="flex items-center space-x-3">
            <Hash className={`w-5 h-5 ${color.icon}`} />
            <div>
              <p className="text-sm font-medium text-gray-500">
                Transaction Hash
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {info.transactionHash}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FileCode2 className={`w-5 h-5 ${color.icon}`} />
            <div>
              <p className="text-sm font-medium text-gray-500">
                Smart Contract Address
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {info.smartContractAddress}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <a
              className="w-full"
              href={info.viewTransactionUrl}
              target="_blank"
            >
              <Button
                variant="outline"
                className="w-full bg-green-500 text-white hover:bg-green-600"
                onClick={() => window?.open(info.viewTransactionUrl, "_blank")}
              >
                View Transaction
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <a
              className="w-full"
              href={info.viewSmartContractUrl}
              target="_blank"
            >
              <Button
                variant="outline"
                className="w-full bg-green-500 text-white hover:bg-green-600"
                onClick={() => window?.open(info.viewTransactionUrl, "_blank")}
              >
                View Smart Contract
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </>
      </CardContent>
    </Card>
  );
}
