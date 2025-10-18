import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Testimonial, testimonialSchema } from "@/lib/schema";
import { usePostApiTestimonialsMutation, usePutApiTestimonialsByIdMutation } from "@/store/services/apis";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import ImageUploader from "../ui/image-uploader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface TestimonialFormProps {
  testimonial?: TestimonialProps;
}

const TestimonialForm = ({ testimonial }: TestimonialFormProps) => {
  const form = useForm<Testimonial>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      client_name: testimonial?.client_name,
      company: testimonial?.company,
      content: testimonial?.content,
      designation: testimonial?.designation,
      image: testimonial?.image,
    },
  });
  const [addTestimonial, { isLoading: adding }] = usePostApiTestimonialsMutation();
  const [editTestimonial, { isLoading: editing }] = usePutApiTestimonialsByIdMutation();

  const onSubmit = async (values: Testimonial) => {
    let response = null;
    if (testimonial) {
      response = await editTestimonial({
        id: `${testimonial.id}`,
        body: {
          client_name: values.client_name,
          company: values.company,
          content: values.content,
          designation: values.designation,
          image: values.image,
        },
      });
    } else {
      response = await addTestimonial({
        body: {
          client_name: values.client_name,
          company: values.company,
          content: values.content,
          designation: values.designation,
          image: values.image,
        },
      });
    }

    if (response.error) {
      toast.error(`Failed to ${testimonial ? "Edit" : "Add"} Testimonial!`);
    } else {
      toast.success(`${testimonial ? "Edited" : "Added"} Testimonial Successfully!`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative h-full w-full">
        <div className="flex h-[calc(100vh-175px)] w-full flex-col items-start justify-start gap-2.5">
          <FormField
            control={form.control}
            name="client_name"
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
            name="company"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Monsters Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
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
            name="content"
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
            <Label className="w-full text-left text-sm">Client Image</Label>
            <ImageUploader
              image={form.getValues("image")}
              setValue={form.setValue as (name: string, value: string) => void}
            />
          </div>
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

export default TestimonialForm;
