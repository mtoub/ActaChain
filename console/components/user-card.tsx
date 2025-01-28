import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Wallet, CheckCircle, Coins } from "lucide-react";

interface UserInfo {
  type: "seller" | "buyer";
  name: string;
  email: string;
  walletAddress: string;
  signatureStatus: string;
  tokenBalance: number;
}

const getEllipsisTxt = (str: string, n = 6) => {
  try {
    return `${str?.substr(0, n)}...${str?.substr(str.length - n, str.length)}`;
  } catch (e) {
    return str;
  }
};

export default function UserCard({ user }: { user: UserInfo }) {
  const colors =
    user.type === "seller"
      ? {
          bg: "from-purple-50 to-indigo-50",
          title: "text-purple-800",
          icon: "text-purple-600",
        }
      : {
          bg: "from-blue-50 to-cyan-50",
          title: "text-blue-800",
          icon: "text-blue-600",
        };

  return (
    <Card
      className={`w-full max-w-md mx-auto bg-gradient-to-br ${colors.bg} shadow-lg`}
    >
      <CardHeader className="pb-4">
        <CardTitle className={`text-2xl font-bold text-center ${colors.title}`}>
          {user.type === "seller" ? "Seller" : "Buyer"} Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className={`w-5 h-5 ${colors.icon}`} />
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className={`w-5 h-5 ${colors.icon}`} />
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-900">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Wallet className={`w-5 h-5 ${colors.icon}`} />
          <div>
            <p className="text-sm font-medium text-gray-500">Wallet Address</p>
            <a
              href={`https://sepolia.etherscan.io/address/${user.walletAddress}#tokentxns`}
              target="_blank"
              className="text-blue-400"
            >
              <p className="text-lg font-semibold text-gray-900">
                {getEllipsisTxt(user.walletAddress)}
              </p>
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm font-medium text-gray-500">
              Signature Status
            </p>
            <Badge variant="default" className="mt-1 text-gray-500">
              {user.signatureStatus}
            </Badge>
          </div>
        </div>
        {/* <div className="flex items-center space-x-3">
          <Coins className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-sm font-medium text-gray-500">Token Balance</p>
            <p className="text-lg font-semibold text-gray-900">
              {user.tokenBalance}
            </p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
