import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { testimonialFormSchema } from "@/lib/form-schemas";
import { cn, imageToUrl } from "@/lib/utils";
import {
  useGetApiTestimonialsByIdQuery,
  usePostApiTestimonialsMutation,
  usePutApiTestimonialsByIdMutation,
} from "@/store/services/apis";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Textarea } from "../ui/textarea";

interface TestimonialSheetProps {
  id?: number;
}

const TestimonialSheet = ({ id }: TestimonialSheetProps) => {
  const { data: testimonial } = useGetApiTestimonialsByIdQuery(
    { id: `${id}` },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  );
  const [putTestimonial, { isLoading }] = usePutApiTestimonialsByIdMutation();
  const [postTestimonial, { isLoading: posting }] = usePostApiTestimonialsMutation();

  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof testimonialFormSchema>) => {
    let response = null;
    let imageUrl: string | undefined;

    if (values.image instanceof FileList && values.image.length > 0) {
      imageUrl = await imageToUrl(values.image[0] as File);
    } else if (typeof values.image === "string" && values.image) {
      imageUrl = values.image;
    }

    if (id) {
      response = await putTestimonial({
        id: `${id}`,
        body: {
          company: values.company,
          content: values.content,
          designation: values.designation,
          client_name: values.client_name,
          ...(imageUrl && { image: imageUrl }),
        },
      });
    } else {
      response = await postTestimonial({
        body: {
          company: values.company,
          content: values.content,
          designation: values.designation,
          client_name: values.client_name,
          ...(imageUrl && { image: imageUrl }),
        },
      });
    }

    if (response.error) {
      // @ts-expect-error - response.error.data.message is not typed
      toast.error(response.error.data.message);
    } else {
      toast.success(response.data.message);
      form.reset();
    }
  };

  useEffect(() => {
    if (testimonial) {
      form.reset({
        company: testimonial.data.company,
        content: testimonial.data.content,
        image: testimonial.data.image ?? "",
        designation: testimonial.data.designation,
        client_name: testimonial.data.client_name,
      });
    }
  }, [testimonial, form]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant={id ? "outline" : "default"}>
          {id ? "Edit" : "Add"}
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 space-y-0">
        <SheetHeader className="border-b">
          <SheetTitle>{id ? "Edit" : "Add New"} Testimonial</SheetTitle>
          <SheetDescription>{id ? "Edit the" : "Add New"} testimonial details.</SheetDescription>
        </SheetHeader>
        <form
          className="flex h-[calc(100dvh-83px)] w-full flex-col items-start justify-start gap-4 overflow-y-auto p-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Field>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input required type="text" id="company" placeholder="Company Name" {...form.register("company")} />
            <FieldError errors={form.formState.errors.company ? [form.formState.errors.company] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <Textarea required id="content" placeholder="Content" {...form.register("content")} />
            <FieldError errors={form.formState.errors.content ? [form.formState.errors.content] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="designation">Designation</FieldLabel>
            <Input required type="text" id="designation" placeholder="Designation" {...form.register("designation")} />
            <FieldError errors={form.formState.errors.designation ? [form.formState.errors.designation] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="client_name">Client Name</FieldLabel>
            <Input required type="text" id="client_name" placeholder="Client Name" {...form.register("client_name")} />
            <FieldError errors={form.formState.errors.client_name ? [form.formState.errors.client_name] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="image">Image</FieldLabel>
            <FieldError errors={form.formState.errors.image ? [form.formState.errors.image] : undefined} />
            <div className="flex w-full items-center justify-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                placeholder="Upload Image"
                {...form.register("image")}
                className="p-0 file:mr-2.5 file:h-9 file:bg-primary file:px-2.5 file:py-0"
              />
              <Avatar>
                <AvatarImage alt="client image" src={`${form.watch("image")}`} />
                <AvatarFallback>{form.watch("client_name")?.charAt(0) ?? "NA"}</AvatarFallback>
              </Avatar>
            </div>
          </Field>
          <div className="sticky bottom-0 z-50 mt-auto grid w-full grid-cols-2 gap-4 bg-background pt-4">
            <SheetClose className={cn(buttonVariants({ variant: "outline" }))}>Cancel</SheetClose>
            <Button type="submit" variant="default" className="w-full" disabled={isLoading || posting}>
              {isLoading || posting ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TestimonialSheet;
