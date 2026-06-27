import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetApiLeadsQuery } from "@/store/services/cms-apis";

export default function LeadsPage() {
  const { data, isLoading, isError } = useGetApiLeadsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Leads</h1>
        <p className="text-muted-foreground text-sm">Email captures from lead magnets on the public site.</p>
      </div>

      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load leads</CardTitle>
          </CardHeader>
        </Card>
      ) : data?.data.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No leads yet</CardTitle>
            <CardDescription>Submissions from /resources will appear here.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Magnet</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((lead) => (
                <tr key={lead.id} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-mono">{lead.email}</td>
                  <td className="px-4 py-3">{lead.name ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{lead.magnetSlug}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
