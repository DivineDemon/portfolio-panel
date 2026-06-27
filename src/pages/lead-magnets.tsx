import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetApiLeadMagnetsQuery } from "@/store/services/cms-apis";

export default function LeadMagnetsPage() {
  const { data, isLoading, isError } = useGetApiLeadMagnetsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Lead magnets</h1>
          <p className="text-muted-foreground text-sm">
            PDF downloads and calculators with email capture on /resources.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/lead-magnets/new">
            <Plus className="size-4" />
            New magnet
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-36 w-full rounded-xl" />
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load lead magnets</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data?.data.map((magnet) => (
            <Card key={magnet.id}>
              <CardHeader className="gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{magnet.magnetType}</Badge>
                  {magnet.published ? (
                    <Badge variant="default">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{magnet.title}</CardTitle>
                <CardDescription className="font-mono text-xs">/resources/{magnet.slug}</CardDescription>
                <Button asChild variant="outline" className="w-fit">
                  <Link to={`/dashboard/lead-magnets/${magnet.id}`}>Edit</Link>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
