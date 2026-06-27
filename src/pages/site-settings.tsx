import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useGetApiSiteSettingsQuery, usePutApiSiteSettingsMutation } from "@/store/services/cms-apis";

const siteSettingsFormSchema = z.object({
  heroHeadline: z.string().optional(),
  heroBadge: z.string().optional(),
  positioningTitle: z.string().optional(),
  positioningDescription: z.string().optional(),
  bookingUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  llmsIntro: z.string().optional(),
  whoThisIsFor: z.string().optional(),
});

type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>;

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

export default function SiteSettingsPage() {
  const { data, isLoading, isError, error } = useGetApiSiteSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = usePutApiSiteSettingsMutation();

  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsFormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (!data?.data) return;
    const s = data.data;
    form.reset({
      heroHeadline: s.heroHeadline ?? "",
      heroBadge: s.heroBadge ?? "",
      positioningTitle: s.positioningTitle ?? "",
      positioningDescription: s.positioningDescription ?? "",
      bookingUrl: s.bookingUrl ?? "",
      linkedinUrl: s.linkedinUrl ?? "",
      githubUrl: s.githubUrl ?? "",
      llmsIntro: s.llmsIntro ?? "",
      whoThisIsFor: Array.isArray(s.whoThisIsFor) ? s.whoThisIsFor.join("\n") : "",
    });
  }, [data, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    const whoThisIsFor = values.whoThisIsFor
      ? values.whoThisIsFor
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : null;

    const response = await updateSettings({
      body: {
        heroHeadline: values.heroHeadline?.trim() || null,
        heroBadge: values.heroBadge?.trim() || null,
        positioningTitle: values.positioningTitle?.trim() || null,
        positioningDescription: values.positioningDescription?.trim() || null,
        bookingUrl: values.bookingUrl?.trim() || null,
        linkedinUrl: values.linkedinUrl?.trim() || null,
        githubUrl: values.githubUrl?.trim() || null,
        llmsIntro: values.llmsIntro?.trim() || null,
        whoThisIsFor,
      },
    });

    if ("error" in response && response.error) {
      toast.error(getMutationErrorMessage(response.error));
      return;
    }

    if ("data" in response && response.data) {
      toast.success(response.data.message);
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unable to load site settings</CardTitle>
          <CardDescription>{getMutationErrorMessage(error)}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const isSubmitting = isSaving || form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground text-sm">
          Homepage hero, positioning, booking link, and llms.txt intro override.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="heroBadge">Badge</FieldLabel>
              <Input id="heroBadge" {...form.register("heroBadge")} disabled={isSubmitting} />
            </Field>
            <Field>
              <FieldLabel htmlFor="heroHeadline">Headline</FieldLabel>
              <Textarea id="heroHeadline" rows={3} {...form.register("heroHeadline")} disabled={isSubmitting} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Positioning & SEO defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="positioningTitle">Site title</FieldLabel>
              <Input id="positioningTitle" {...form.register("positioningTitle")} disabled={isSubmitting} />
            </Field>
            <Field>
              <FieldLabel htmlFor="positioningDescription">Meta description</FieldLabel>
              <Textarea
                id="positioningDescription"
                rows={3}
                {...form.register("positioningDescription")}
                disabled={isSubmitting}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="llmsIntro">llms.txt intro override</FieldLabel>
              <Textarea id="llmsIntro" rows={4} {...form.register("llmsIntro")} disabled={isSubmitting} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="bookingUrl">Booking URL</FieldLabel>
              <Input id="bookingUrl" {...form.register("bookingUrl")} disabled={isSubmitting} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social & qualification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="linkedinUrl">LinkedIn</FieldLabel>
              <Input id="linkedinUrl" {...form.register("linkedinUrl")} disabled={isSubmitting} />
            </Field>
            <Field>
              <FieldLabel htmlFor="githubUrl">GitHub</FieldLabel>
              <Input id="githubUrl" {...form.register("githubUrl")} disabled={isSubmitting} />
            </Field>
            <Field>
              <FieldLabel htmlFor="whoThisIsFor">Who this is for (one bullet per line)</FieldLabel>
              <Textarea id="whoThisIsFor" rows={6} {...form.register("whoThisIsFor")} disabled={isSubmitting} />
            </Field>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Save settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
