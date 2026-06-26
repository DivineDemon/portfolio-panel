import ClientCard from "@/components/client/client-card";
import ClientSheet from "@/components/client/client-sheet";
import ClientSkeleton from "@/components/skeleton/client-skeleton";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetApiClientsQuery } from "@/store/services/apis";

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Failed to load clients";
}

export default function ClientsPage() {
  const { data: clients, isLoading, isError, error } = useGetApiClientsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Clients</h1>
          <p className="text-muted-foreground text-sm">
            Manage clients and their testimonials. Link clients to projects from the project form.
          </p>
        </div>
        <ClientSheet />
      </div>

      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <ClientSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load clients</CardTitle>
            <CardDescription>{getMutationErrorMessage(error)}</CardDescription>
          </CardHeader>
        </Card>
      ) : clients?.data.length === 0 ? (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>No clients yet</CardTitle>
            <CardDescription>Add your first client to build trust on your portfolio.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <ClientSheet />
          </div>
        </Card>
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {clients?.data.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
}
