import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-4">ActaChain</h1>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">
            Revolutionizing Tokenized Bond Trading with Automation and
            Simplicity
          </h2>
          <p className="text-xl mb-8">
            Streamline bilateral bond trades using DocuSign and blockchain
            technology. Reduce costs, eliminate legal bottlenecks, and enable
            secure, instant execution.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
            // onClick={function () {
            //   document
            //     .getElementById("learn-more")
            //     ?.scrollIntoView({ behavior: "smooth" });
            // }}
            >
              Learn More
            </Button>
            <Button
              variant="outline"
              asChild
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Link href="/tracker">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>

      <div
        id="learn-more"
        className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"
      >
        <ValuePoint
          title="Reduce Costs"
          description="Minimize operational expenses through automated processes and reduced intermediaries."
        />
        <ValuePoint
          title="Automate Execution"
          description="Streamline trade execution with smart contracts and blockchain technology."
        />
        <ValuePoint
          title="Leverage DocuSign"
          description="Utilize DocuSign's trusted platform for secure and legally binding digital signatures."
        />
        <ValuePoint
          title="Ensure Compliance"
          description="Maintain regulatory compliance with transparent and auditable blockchain transactions."
        />
      </div>
    </main>
  );
}

function ValuePoint({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {title}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{description}</p>
    </div>
  );
}
