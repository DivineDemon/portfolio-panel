import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { type Company, companySchema } from "@/lib/schema";
import { usePostApiCompaniesMutation, usePutApiCompaniesByIdMutation } from "@/store/services/apis";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface CompanyFormProps {
  company?: {
    id: number;
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  };
}

const CompanyForm = ({ company }: CompanyFormProps) => {
  const form = useForm<Company>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company?.name ?? "",
      hq: company?.hq ?? "",
      founded: company?.founded ?? new Date().getFullYear(),
      industry: company?.industry ?? "",
      revenue: company?.revenue ?? "",
      size: company?.size ?? "",
      ceo_name: company?.ceo_name ?? "",
      ceo_title: company?.ceo_title ?? "",
    },
  });
  const [addCompany, { isLoading: adding }] = usePostApiCompaniesMutation();
  const [editCompany, { isLoading: editing }] = usePutApiCompaniesByIdMutation();

  const onSubmit = async (values: Company) => {
    let response = null;

    if (company) {
      response = await editCompany({
        id: `${company.id}`,
        body: {
          name: values.name,
          hq: values.hq,
          founded: values.founded,
          industry: values.industry,
          revenue: values.revenue,
          size: values.size,
          ceo_name: values.ceo_name,
          ceo_title: values.ceo_title,
        },
      });
    } else {
      response = await addCompany({
        body: {
          name: values.name,
          hq: values.hq,
          founded: values.founded,
          industry: values.industry,
          revenue: values.revenue,
          size: values.size,
          ceo_name: values.ceo_name,
          ceo_title: values.ceo_title,
        },
      });
    }

    if (response.error) {
      toast.error(`Failed to ${company ? "Edit" : "Add"} Company!`);
    } else {
      toast.success(`${company ? "Edited" : "Added"} Company Successfully!`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative h-full w-full">
        <div className="flex h-[calc(100vh-190px)] w-full flex-col items-start justify-start gap-4 overflow-y-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Technology Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Technology" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hq"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Headquarters</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="founded"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Founded Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2020"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Company Size</FormLabel>
                <FormControl>
                  <Input placeholder="Solo, 1-10, 11-50, 51-200, 201-500, 500+" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="revenue"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Revenue</FormLabel>
                <FormControl>
                  <Input placeholder="N/A, $1M-$10M, $10M-$50M, $50M+" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ceo_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>CEO Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ceo_title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>CEO Title</FormLabel>
                <FormControl>
                  <Input placeholder="CEO & Founder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="absolute bottom-0 left-0 z-[1] flex w-full items-center justify-end bg-background pt-2.5">
          <Button type="submit" variant="default" disabled={editing || adding}>
            {editing || adding ? (
              <>
                <Loader2 className="animate-spin" />
                Please Wait...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CompanyForm;
