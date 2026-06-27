import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MarkdownField } from "@/components/ui/markdown-field";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { type BlogPostFormValues, blogPostFormSchema } from "@/lib/form-schemas";
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
  coverImage: "",
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

export default function BlogEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { data: post, isLoading } = useGetApiBlogPostsByIdQuery({ id: id ?? "" }, { skip: !isEdit });
  const [createPost, { isLoading: isCreating }] = usePostApiBlogPostsMutation();
  const [updatePost, { isLoading: isUpdating }] = usePutApiBlogPostsByIdMutation();

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema) as Resolver<BlogPostFormValues>,
    defaultValues: DEFAULTS,
  });

  useEffect(() => {
    if (!post?.data) return;
    const p = post.data;
    form.reset({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? "",
      content: p.content,
      coverImage: p.coverImage ?? "",
      seoTitle: p.seoTitle ?? "",
      seoDescription: p.seoDescription ?? "",
      keywords: p.keywords.join(", "),
      featured: p.featured,
      published: p.published,
    });
  }, [post, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    const body = {
      slug: values.slug.trim(),
      title: values.title.trim(),
      excerpt: values.excerpt?.trim() || null,
      content: values.content,
      coverImage: values.coverImage?.trim() || null,
      seoTitle: values.seoTitle?.trim() || null,
      seoDescription: values.seoDescription?.trim() || null,
      keywords: splitCsv(values.keywords),
      featured: values.featured,
      published: values.published,
      publishedAt: values.published ? new Date().toISOString() : null,
    };

    const response = isEdit ? await updatePost({ id: id!, body }) : await createPost({ body });

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

  if (isEdit && isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard/blog">
            <ChevronLeft className="size-4" />
            Blog
          </Link>
        </Button>
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">{isEdit ? "Edit post" : "New post"}</h1>
        </div>
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
                <FieldLabel htmlFor="coverImage">Cover image URL</FieldLabel>
                <Input id="coverImage" {...form.register("coverImage")} disabled={isSubmitting} />
              </Field>
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
              <Field className="flex items-center justify-between gap-3">
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
