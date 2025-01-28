import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function HeroPageWithNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
        <Image
          src="/hero.png"
          alt="Tokenized Bond Trading"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">ActaChain</h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl">
            Revolutionizing Tokenized Bond Trading with Automation and
            Simplicity
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Streamline bilateral bond trades using DocuSign and blockchain
            technology. Reduce costs, eliminate legal bottlenecks, and enable
            secure, instant execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Learn More
            </Button>
            <Link href="/create-trade">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
              >
                Create Trade
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Reduce Costs",
                description:
                  "Minimize operational expenses through automated processes and reduced intermediaries.",
              },
              {
                title: "Automate Execution",
                description:
                  "Streamline trade execution with smart contracts and blockchain technology.",
              },
              {
                title: "Leverage DocuSign",
                description:
                  "Utilize DocuSign's trusted platform for secure and legally binding digital signatures.",
              },
              {
                title: "Ensure Compliance",
                description:
                  "Maintain regulatory compliance with transparent and auditable blockchain transactions.",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to revolutionize your bond trading?
          </h2>
          <p className="text-xl mb-8">
            Join ActaChain today and experience the future of tokenized bond
            trading.
          </p>
          <Link href="/create-trade">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
