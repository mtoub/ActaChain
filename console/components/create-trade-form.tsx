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

const formSchema = z.object({
  buyerEmail: z.string().email({ message: "Invalid buyer email address" }),
  buyerName: z
    .string()
    .min(2, { message: "Buyer name must be at least 2 characters" }),
  buyerCompany: z
    .string()
    .min(2, { message: "Buyer company must be at least 2 characters" }),
  sellerEmail: z.string().email({ message: "Invalid seller email address" }),
  sellerName: z
    .string()
    .min(2, { message: "Seller name must be at least 2 characters" }),
  sellerCompany: z
    .string()
    .min(2, { message: "Seller company must be at least 2 characters" }),
});

export default function CreateTradeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyerEmail: "",
      buyerName: "",
      buyerCompany: "",
      sellerEmail: "",
      sellerName: "",
      sellerCompany: "",
    },
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

      const data = await response.json();

      toast({
        title: "Trade Created",
        description: `Your trade has been successfully created. Envelope ID: ${data.envelopeId}`,
      });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Input placeholder="buyer@example.com" {...field} />
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
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corp" {...field} />
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
                    <Input placeholder="seller@example.com" {...field} />
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
                    <Input placeholder="Jane Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Trade..." : "Create Trade"}
        </Button>
      </form>
    </Form>
  );
}
