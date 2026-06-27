import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MarkdownField } from "@/components/ui/markdown-field";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { blogPostDetailToFormValues } from "@/lib/cms-form";
import { type BlogPostFormValues, blogPostFormSchema } from "@/lib/form-schemas";
import { resolveCoverImage } from "@/lib/upload";
import {
  useGetApiBlogPostsByIdQuery,
  usePostApiBlogPostsMutation,
  usePutApiBlogPostsByIdMutation,
} from "@/store/services/cms-apis";

const DEFAULTS: BlogPostFormValues = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: undefined,
  seoTitle: "",
  seoDescription: "",
  keywords: "",
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

function BlogEditorSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

function BlogEditorForm({
  postId,
  initialValues,
  isEdit,
}: {
  postId?: string;
  initialValues: BlogPostFormValues;
  isEdit: boolean;
}) {
  const navigate = useNavigate();
  const [createPost, { isLoading: isCreating }] = usePostApiBlogPostsMutation();
  const [updatePost, { isLoading: isUpdating }] = usePutApiBlogPostsByIdMutation();

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema) as Resolver<BlogPostFormValues>,
    defaultValues: initialValues,
  });

  const coverValue = form.watch("coverImage");
  const coverPreview =
    typeof coverValue === "string" && coverValue
      ? coverValue
      : coverValue instanceof FileList && coverValue.length > 0
        ? URL.createObjectURL(coverValue[0]!)
        : null;

  const onSubmit = form.handleSubmit(async (values) => {
    let coverImageUrl: string | null = null;

    try {
      const resolvedCover = await resolveCoverImage(values.coverImage);
      coverImageUrl = resolvedCover?.trim() || null;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cover image upload failed");
      return;
    }

    const body = {
      slug: values.slug.trim(),
      title: values.title.trim(),
      excerpt: values.excerpt?.trim() || null,
      content: values.content,
      coverImage: coverImageUrl,
      seoTitle: values.seoTitle?.trim() || null,
      seoDescription: values.seoDescription?.trim() || null,
      keywords: splitCsv(values.keywords),
      featured: values.featured,
      published: values.published,
      publishedAt: values.published ? new Date().toISOString() : null,
    };

    const response = isEdit ? await updatePost({ id: postId!, body }) : await createPost({ body });

    if ("error" in response && response.error) {
      toast.error("Failed to save blog post");
      return;
    }

    if ("data" in response && response.data) {
      toast.success(response.data.message);
      navigate("/dashboard/blog");
    }
  });

  const isSubmitting = isCreating || isUpdating || form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">{isEdit ? "Edit post" : "New post"}</h1>
        <p className="text-muted-foreground text-sm">Markdown body, SEO fields, and cover image.</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" {...form.register("title")} disabled={isSubmitting} />
              <FieldError errors={form.formState.errors.title ? [form.formState.errors.title] : undefined} />
            </Field>
            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <Input
                id="slug"
                placeholder="when-to-hire-fractional-cto"
                {...form.register("slug")}
                disabled={isSubmitting}
              />
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
                <FieldLabel htmlFor="coverImage">Cover image</FieldLabel>
                <Controller
                  control={form.control}
                  name="coverImage"
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <div className="space-y-2">
                      {coverPreview ? (
                        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                          <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
                        </div>
                      ) : null}
                      <Input
                        ref={ref}
                        type="file"
                        id="coverImage"
                        accept="image/*"
                        disabled={isSubmitting}
                        onChange={(event) => onChange(event.target.files?.length ? event.target.files : undefined)}
                        onBlur={onBlur}
                        className="p-0 file:mr-2.5 file:h-9 file:bg-primary file:px-2.5 file:py-0"
                      />
                      <p className="text-muted-foreground text-xs">
                        Uploads to ImgBB and stores the image URL on save.
                      </p>
                    </div>
                  )}
                />
                <FieldError
                  errors={form.formState.errors.coverImage ? [form.formState.errors.coverImage] : undefined}
                />
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
                <FieldLabel htmlFor="keywords">Keywords</FieldLabel>
                <Input id="keywords" {...form.register("keywords")} disabled={isSubmitting} />
              </Field>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : isEdit ? "Save post" : "Create post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function BlogEditorPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const {
    data: post,
    isLoading,
    isError,
  } = useGetApiBlogPostsByIdQuery({ id: id ?? "" }, { skip: !isEdit, refetchOnMountOrArgChange: true });

  if (isEdit && (isLoading || !post)) {
    return <BlogEditorSkeleton />;
  }

  if (isEdit && isError) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl tracking-tight">Edit post</h1>
        <p className="text-destructive text-sm">Unable to load blog post details.</p>
      </div>
    );
  }

  const initialValues = isEdit && post ? blogPostDetailToFormValues(post.data) : DEFAULTS;

  return <BlogEditorForm key={id ?? "new"} postId={id} initialValues={initialValues} isEdit={isEdit} />;
}
