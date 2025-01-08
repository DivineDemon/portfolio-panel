import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Testimonial, testimonialSchema } from "@/lib/schema";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ImageUploader from "../ui/image-uploader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface TestimonialFormProps {
  testimonial?: Testimonial;
}

const TestimonialForm = ({ testimonial }: TestimonialFormProps) => {
  const form = useForm<Testimonial>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial,
  });

  function onSubmit(values: Testimonial) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full">
        <div className="flex h-[calc(100vh-175px)] w-full flex-col items-start justify-start gap-2.5">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Mike Wazowski" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Scare Assistant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="You're the boss, you're the boss. You're the big, hairy boss."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Label className="w-full text-left text-sm">Project Image</Label>
            <ImageUploader
              image={form.getValues("image")}
              setValue={form.setValue as (name: string, value: string) => void}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <Button type="submit" variant="default">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TestimonialForm;
