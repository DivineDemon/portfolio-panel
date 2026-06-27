import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetApiPagesQuery } from "@/store/services/cms-apis";

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Failed to load pages";
}

export default function PagesPage() {
  const { data, isLoading, isError, error } = useGetApiPagesQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Pages</h1>
          <p className="text-muted-foreground text-sm">CMS-managed landing pages — personas and index pages.</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/pages/new">
            <Plus className="size-4" />
            New page
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load pages</CardTitle>
            <CardDescription>{getMutationErrorMessage(error)}</CardDescription>
          </CardHeader>
        </Card>
      ) : data?.data.length === 0 ? (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>No pages yet</CardTitle>
            <CardDescription>Create CMS pages for personas and other indexable content.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Button asChild>
              <Link to="/dashboard/pages/new">
                <Plus className="size-4" />
                Create your first page
              </Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data?.data.map((page) => (
            <Card key={page.id} className="overflow-hidden">
              <CardHeader className="gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{page.pageType}</Badge>
                  {page.published ? (
                    <Badge variant="default">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                  {page.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <CardTitle className="text-lg">{page.title}</CardTitle>
                <CardDescription className="font-mono text-xs">/{page.slug}</CardDescription>
                {page.excerpt && <CardDescription>{page.excerpt}</CardDescription>}
                <Button asChild variant="outline" className="w-fit">
                  <Link to={`/dashboard/pages/${page.id}`}>Edit</Link>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
