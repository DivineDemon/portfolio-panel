import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { type ClientFormValues, clientFormSchema } from "@/lib/form-schemas";
import { imageToUrl } from "@/lib/upload";
import { cn } from "@/lib/utils";
import {
  useGetApiClientsByIdQuery,
  usePostApiClientsMutation,
  usePutApiClientsByIdMutation,
} from "@/store/services/apis";

const EMPTY_DEFAULTS: ClientFormValues = {
  company: "",
  content: "",
  designation: "",
  clientName: "",
  feedback: "",
  image: "",
};

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

interface ClientSheetProps {
  id?: number;
}

export default function ClientSheet({ id }: ClientSheetProps) {
  const [open, setOpen] = useState(false);
  const { data: client } = useGetApiClientsByIdQuery(
    { id: `${id}` },
    { skip: !id || !open, refetchOnMountOrArgChange: true },
  );
  const [putClient, { isLoading: isUpdating }] = usePutApiClientsByIdMutation();
  const [postClient, { isLoading: isCreating }] = usePostApiClientsMutation();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const imageValue = form.watch("image");
  const clientName = form.watch("clientName");

  const previewUrl = useMemo(() => {
    if (typeof imageValue === "string" && imageValue) return imageValue;
    if (imageValue instanceof FileList && imageValue.length > 0) return URL.createObjectURL(imageValue[0]!);
    return undefined;
  }, [imageValue]);

  useEffect(() => {
    if (!previewUrl?.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    if (!open) return;
    if (id && client) {
      form.reset({
        company: client.data.company,
        content: client.data.content,
        image: client.data.image ?? "",
        designation: client.data.designation,
        clientName: client.data.clientName,
        feedback: client.data.feedback ?? "",
      });
    } else if (!id) {
      form.reset(EMPTY_DEFAULTS);
    }
  }, [open, id, client, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      let imageUrl: string | undefined;

      if (values.image instanceof FileList && values.image.length > 0) {
        imageUrl = await imageToUrl(values.image[0]!);
        toast.success("Image uploaded");
      } else if (typeof values.image === "string" && values.image) {
        imageUrl = values.image;
      }

      const body = {
        company: values.company,
        content: values.content,
        designation: values.designation,
        clientName: values.clientName,
        ...(values.feedback?.trim() && { feedback: values.feedback.trim() }),
        ...(imageUrl && { image: imageUrl }),
      };

      const response = id ? await putClient({ id: `${id}`, body }) : await postClient({ body });

      if ("error" in response && response.error) {
        toast.error(getMutationErrorMessage(response.error));
        return;
      }

      if ("data" in response && response.data) {
        toast.success(response.data.message);
        form.reset(EMPTY_DEFAULTS);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed");
    }
  });

  const isSubmitting = isUpdating || isCreating || form.formState.isSubmitting;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" variant={id ? "outline" : "default"} className={id ? "w-full" : undefined}>
          {id ? "Edit" : "Add client"}
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 space-y-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>{id ? "Edit client" : "Add client"}</SheetTitle>
          <SheetDescription>
            {id ? "Update the client details and testimonial." : "Add a new client to link with projects."}
          </SheetDescription>
        </SheetHeader>
        <form
          className="flex h-[calc(100dvh-83px)] w-full flex-col items-start justify-start gap-4 overflow-y-auto p-4"
          onSubmit={onSubmit}
        >
          <FieldGroup className="w-full gap-4">
            <Field data-invalid={!!form.formState.errors.clientName}>
              <FieldLabel htmlFor="clientName">Client name</FieldLabel>
              <FieldContent>
                <Input
                  id="clientName"
                  placeholder="Jane Doe"
                  disabled={isSubmitting}
                  {...form.register("clientName")}
                />
                <FieldError errors={[form.formState.errors.clientName]} />
              </FieldContent>
            </Field>

            <Field data-invalid={!!form.formState.errors.designation}>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <FieldContent>
                <Input
                  id="designation"
                  placeholder="Product Manager"
                  disabled={isSubmitting}
                  {...form.register("designation")}
                />
                <FieldError errors={[form.formState.errors.designation]} />
              </FieldContent>
            </Field>

            <Field data-invalid={!!form.formState.errors.company}>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <FieldContent>
                <Input id="company" placeholder="Acme Inc." disabled={isSubmitting} {...form.register("company")} />
                <FieldError errors={[form.formState.errors.company]} />
              </FieldContent>
            </Field>

            <Field data-invalid={!!form.formState.errors.content}>
              <FieldLabel htmlFor="content">Testimonial</FieldLabel>
              <FieldContent>
                <Textarea
                  id="content"
                  placeholder="What did the client say about working with you?"
                  rows={5}
                  disabled={isSubmitting}
                  {...form.register("content")}
                />
                <FieldError errors={[form.formState.errors.content]} />
              </FieldContent>
            </Field>

            <Field data-invalid={!!form.formState.errors.feedback}>
              <FieldLabel htmlFor="feedback">Feedback comment</FieldLabel>
              <FieldContent>
                <Textarea
                  id="feedback"
                  placeholder="Additional feedback or context (optional)"
                  rows={3}
                  disabled={isSubmitting}
                  {...form.register("feedback")}
                />
                <FieldError errors={[form.formState.errors.feedback]} />
              </FieldContent>
            </Field>

            <Field data-invalid={!!form.formState.errors.image}>
              <FieldLabel htmlFor="image">Photo</FieldLabel>
              <FieldContent>
                <div className="flex w-full items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    disabled={isSubmitting}
                    className="p-0 file:mr-2.5 file:h-9 file:bg-primary file:px-2.5 file:py-0"
                    {...form.register("image")}
                  />
                  <Avatar size="lg">
                    <AvatarImage alt={clientName || "Client"} src={previewUrl} />
                    <AvatarFallback>{clientName?.charAt(0) ?? "?"}</AvatarFallback>
                  </Avatar>
                </div>
                <FieldError errors={[form.formState.errors.image]} />
              </FieldContent>
            </Field>
          </FieldGroup>

          <div className="mt-auto grid w-full grid-cols-2 gap-4 bg-background pt-2">
            <SheetClose type="button" className={cn(buttonVariants({ variant: "outline" }))} disabled={isSubmitting}>
              Cancel
            </SheetClose>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : id ? "Save changes" : "Create"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
