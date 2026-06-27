import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MarkdownField } from "@/components/ui/markdown-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { pageDetailToFormValues } from "@/lib/cms-form";
import { type PageFormValues, pageFormSchema } from "@/lib/form-schemas";
import {
  useGetApiPagesByIdQuery,
  usePostApiPagesMutation,
  usePutApiPagesByIdMutation,
} from "@/store/services/cms-apis";

const DEFAULTS: PageFormValues = {
  slug: "",
  title: "",
  pageType: "persona",
  content: "",
  excerpt: "",
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  relatedProjectSlugs: "",
  relatedWorkflowSlugs: "",
  sortOrder: "",
  featured: false,
  published: false,
};

function splitCsv(value?: string) {
  if (!value?.trim()) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

function PageEditorSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

function PageEditorForm({
  pageId,
  initialValues,
  isEdit,
}: {
  pageId?: string;
  initialValues: PageFormValues;
  isEdit: boolean;
}) {
  const navigate = useNavigate();
  const [createPage, { isLoading: isCreating }] = usePostApiPagesMutation();
  const [updatePage, { isLoading: isUpdating }] = usePutApiPagesByIdMutation();

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema) as Resolver<PageFormValues>,
    defaultValues: initialValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const body = {
      slug: values.slug.trim(),
      title: values.title.trim(),
      pageType: values.pageType,
      content: values.content,
      excerpt: values.excerpt?.trim() || null,
      seoTitle: values.seoTitle?.trim() || null,
      seoDescription: values.seoDescription?.trim() || null,
      keywords: splitCsv(values.keywords),
      relatedProjectSlugs: splitCsv(values.relatedProjectSlugs),
      relatedWorkflowSlugs: splitCsv(values.relatedWorkflowSlugs),
      sortOrder: values.sortOrder === "" ? null : Number(values.sortOrder),
      featured: values.featured,
      published: values.published,
      publishedAt: values.published ? new Date().toISOString() : null,
    };

    const response = isEdit ? await updatePage({ id: pageId!, body }) : await createPage({ body });

    if ("error" in response && response.error) {
      toast.error(getMutationErrorMessage(response.error));
      return;
    }

    if ("data" in response && response.data) {
      toast.success(response.data.message);
      navigate("/dashboard/pages");
    }
  });

  const isSubmitting = isCreating || isUpdating || form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">{isEdit ? "Edit page" : "New page"}</h1>
        <p className="text-muted-foreground text-sm">Markdown body, SEO fields, and related case study links.</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>URL slug uses full path, e.g. for-founders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" {...form.register("title")} disabled={isSubmitting} />
              <FieldError errors={form.formState.errors.title ? [form.formState.errors.title] : undefined} />
            </Field>
            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <Input id="slug" placeholder="for-founders" {...form.register("slug")} disabled={isSubmitting} />
              <FieldError errors={form.formState.errors.slug ? [form.formState.errors.slug] : undefined} />
            </Field>
            <Field>
              <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
              <Textarea id="excerpt" rows={2} {...form.register("excerpt")} disabled={isSubmitting} />
            </Field>
            <Field>
              <FieldLabel>Body (Markdown)</FieldLabel>
              <MarkdownField control={form.control} name="content" height={360} />
              <FieldError errors={form.formState.errors.content ? [form.formState.errors.content] : undefined} />
            </Field>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field>
                <FieldLabel>Page type</FieldLabel>
                <Controller
                  control={form.control}
                  name="pageType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(["persona", "index"] as const).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="sortOrder">Sort order</FieldLabel>
                <Input id="sortOrder" type="number" {...form.register("sortOrder")} disabled={isSubmitting} />
              </Field>
              <Field className="flex flex-row items-center justify-between gap-3">
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
              <Field className="flex flex-row items-center justify-between gap-3">
                <FieldLabel htmlFor="featured">Featured</FieldLabel>
                <Controller
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <Switch
                      id="featured"
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
                <FieldLabel htmlFor="keywords">Keywords (comma-separated)</FieldLabel>
                <Input id="keywords" {...form.register("keywords")} disabled={isSubmitting} />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field>
                <FieldLabel htmlFor="relatedProjectSlugs">Project slugs</FieldLabel>
                <Input
                  id="relatedProjectSlugs"
                  placeholder="scintia, losono"
                  {...form.register("relatedProjectSlugs")}
                  disabled={isSubmitting}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="relatedWorkflowSlugs">Workflow slugs</FieldLabel>
                <Input id="relatedWorkflowSlugs" {...form.register("relatedWorkflowSlugs")} disabled={isSubmitting} />
              </Field>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : isEdit ? "Save page" : "Create page"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function PageEditorPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const {
    data: page,
    isLoading,
    isError,
  } = useGetApiPagesByIdQuery({ id: id ?? "" }, { skip: !isEdit, refetchOnMountOrArgChange: true });

  if (isEdit && (isLoading || !page)) {
    return <PageEditorSkeleton />;
  }

  if (isEdit && isError) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl tracking-tight">Edit page</h1>
        <p className="text-destructive text-sm">Unable to load page details.</p>
      </div>
    );
  }

  const initialValues = isEdit && page ? pageDetailToFormValues(page.data) : DEFAULTS;

  return <PageEditorForm key={id ?? "new"} pageId={id} initialValues={initialValues} isEdit={isEdit} />;
}
