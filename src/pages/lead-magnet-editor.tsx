import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MarkdownField } from "@/components/ui/markdown-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { type LeadMagnetFormValues, leadMagnetFormSchema } from "@/lib/form-schemas";
import {
  useGetApiLeadMagnetsByIdQuery,
  usePostApiLeadMagnetsMutation,
  usePutApiLeadMagnetsByIdMutation,
} from "@/store/services/cms-apis";

const DEFAULTS: LeadMagnetFormValues = {
  slug: "",
  title: "",
  description: "",
  magnetType: "pdf",
  pdfUrl: "",
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  published: false,
};

function splitCsv(value?: string) {
  if (!value?.trim()) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function LeadMagnetEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { data: magnet, isLoading } = useGetApiLeadMagnetsByIdQuery({ id: id ?? "" }, { skip: !isEdit });
  const [createMagnet, { isLoading: isCreating }] = usePostApiLeadMagnetsMutation();
  const [updateMagnet, { isLoading: isUpdating }] = usePutApiLeadMagnetsByIdMutation();

  const form = useForm<LeadMagnetFormValues>({
    resolver: zodResolver(leadMagnetFormSchema) as Resolver<LeadMagnetFormValues>,
    defaultValues: DEFAULTS,
  });

  const magnetType = form.watch("magnetType");

  useEffect(() => {
    if (!magnet?.data) return;
    const m = magnet.data;
    form.reset({
      slug: m.slug,
      title: m.title,
      description: m.description,
      magnetType: m.magnetType,
      pdfUrl: m.pdfUrl ?? "",
      seoTitle: m.seoTitle ?? "",
      seoDescription: m.seoDescription ?? "",
      keywords: m.keywords.join(", "),
      published: m.published,
    });
  }, [magnet, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    const body = {
      slug: values.slug.trim(),
      title: values.title.trim(),
      description: values.description,
      magnetType: values.magnetType,
      pdfUrl: values.magnetType === "pdf" ? values.pdfUrl?.trim() || null : null,
      seoTitle: values.seoTitle?.trim() || null,
      seoDescription: values.seoDescription?.trim() || null,
      keywords: splitCsv(values.keywords),
      published: values.published,
    };

    const response = isEdit ? await updateMagnet({ id: id!, body }) : await createMagnet({ body });

    if ("error" in response && response.error) {
      toast.error("Failed to save lead magnet");
      return;
    }

    if ("data" in response && response.data) {
      toast.success(response.data.message);
      navigate("/dashboard/lead-magnets");
    }
  });

  const isSubmitting = isCreating || isUpdating || form.formState.isSubmitting;

  if (isEdit && isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="w-fit">
        <Link to="/dashboard/lead-magnets">
          <ChevronLeft className="size-4" />
          Lead magnets
        </Link>
      </Button>

      <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Magnet content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" {...form.register("title")} disabled={isSubmitting} />
            </Field>
            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <Input id="slug" {...form.register("slug")} disabled={isSubmitting} />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <MarkdownField control={form.control} name="description" height={200} />
            </Field>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field>
                <FieldLabel>Type</FieldLabel>
                <Controller
                  control={form.control}
                  name="magnetType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF download</SelectItem>
                        <SelectItem value="calculator">ROI calculator</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              {magnetType === "pdf" && (
                <Field>
                  <FieldLabel htmlFor="pdfUrl">PDF URL</FieldLabel>
                  <Input id="pdfUrl" placeholder="https://..." {...form.register("pdfUrl")} disabled={isSubmitting} />
                </Field>
              )}
              <Field className="flex items-center justify-between gap-3">
                <FieldLabel htmlFor="published">Published</FieldLabel>
                <Controller
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <Switch
                      id="published"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field>
                <FieldLabel htmlFor="seoTitle">SEO title</FieldLabel>
                <Input id="seoTitle" {...form.register("seoTitle")} disabled={isSubmitting} />
              </Field>
              <Field>
                <FieldLabel htmlFor="seoDescription">SEO description</FieldLabel>
                <Textarea id="seoDescription" rows={3} {...form.register("seoDescription")} disabled={isSubmitting} />
              </Field>
              <Field>
                <FieldLabel htmlFor="keywords">Keywords</FieldLabel>
                <Input id="keywords" {...form.register("keywords")} disabled={isSubmitting} />
              </Field>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
