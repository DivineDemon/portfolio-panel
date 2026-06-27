import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetApiBlogPostsQuery } from "@/store/services/cms-apis";

export default function BlogPostsPage() {
  const { data, isLoading, isError } = useGetApiBlogPostsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-sm">
            Keyword-targeted articles published to /blog on the public site.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/blog/new">
            <Plus className="size-4" />
            New post
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load blog posts</CardTitle>
          </CardHeader>
        </Card>
      ) : data?.data.length === 0 ? (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>No posts yet</CardTitle>
            <CardDescription>Create your first keyword-targeted article.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data?.data.map((post) => (
            <Card key={post.id}>
              <CardHeader className="gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {post.published ? (
                    <Badge variant="default">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                  {post.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription className="font-mono text-xs">/blog/{post.slug}</CardDescription>
                {post.excerpt && <CardDescription>{post.excerpt}</CardDescription>}
                <Button asChild variant="outline" className="w-fit">
                  <Link to={`/dashboard/blog/${post.id}`}>Edit</Link>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
