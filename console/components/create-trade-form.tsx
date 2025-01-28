"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  tradeName: z
    .string()
    .min(2, { message: "Trade name must be at least 2 characters" }),
  buyerEmail: z.string().email({ message: "Invalid buyer email address" }),
  buyerName: z
    .string()
    .min(2, { message: "Buyer name must be at least 2 characters" }),
  sellerEmail: z.string().email({ message: "Invalid seller email address" }),
  sellerName: z
    .string()
    .min(2, { message: "Seller name must be at least 2 characters" }),
});

// const defaultValuesForms = {
//   tradeName: "Trade Name",
//   buyerEmail: "youssefmaghzaz+buyer@gmail.com",
//   buyerName: "Youssef Maghzaz (Buyer)",
//   buyerCompany: "Buyer Inc",
//   sellerEmail: "youssefmaghzaz+seller@gmail.com",
//   sellerName: "Youssef Maghzaz (Seller)",
//   sellerCompany: "Seller Inc",
// };

const defaultValuesForms = {
  tradeName: "",
  buyerEmail: "",
  buyerName: "",
  sellerEmail: "",
  sellerName: "",
};
export default function CreateTradeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [envelopeId, setEnvelopeId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesForms,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Here you would typically send the form data to your API
      const response = await fetch("/api/create-trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create trade");
      }
      toast({
        title: "... Creating Trade",
        description: "wait for the envelope to be created",
      });

      const data = await response.json();
      console.log("Trade created successfully!", data);

      // wait for the envelope to be created
      // wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Trade Created",
        description: `Your trade has been successfully created. Envelope ID: ${data.envelopeId}`,
      });
      await new Promise((resolve) => setTimeout(resolve, 50));
      setEnvelopeId(data.envelopeId);
      router.push(`/tracker/envelope/${data.envelopeId}`);
      form.reset();
    } catch (error) {
      console.error("Error creating trade:", error);
      toast({
        title: "Error",
        description: "Failed to create trade. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      {envelopeId && (
        <div className=" p-4 rounded-lg border border-blue-600 bg-blue-100">
          <p className="text-lg font-semibold">Trade created successfully</p>
          <Link href={`/tracker/envelope/${envelopeId}`}>
            <span className="text-blue-600">View Envelope</span>
          </Link>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="tradeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trade Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Buyer Information</h2>
            <FormField
              control={form.control}
              name="buyerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Seller Information</h2>
            <FormField
              control={form.control}
              name="sellerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seller Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seller Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="sellerCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seller Company</FormLabel>
                  <FormControl>
                    <Input placeholder="XYZ Inc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="outline"
          className="bg-blue-600 text-white"
        >
          {isSubmitting ? "Creating Trade..." : "Create Trade"}
        </Button>
      </form>
    </Form>
  );
}
