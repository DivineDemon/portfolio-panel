import { useState } from "react";
import { toast } from "sonner";
import ClientSheet from "@/components/client/client-sheet";
import { Button } from "@/components/ui/button";
import { WarningModal } from "@/components/warning-dialog";
import { cn } from "@/lib/utils";
import { type GetApiClientsApiResponse, useDeleteApiClientsByIdMutation } from "@/store/services/apis";

interface ClientCardProps {
  client: GetApiClientsApiResponse["data"][number];
}

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

export default function ClientCard({ client }: ClientCardProps) {
  const [warn, setWarn] = useState(false);
  const [deleteClient, { isLoading }] = useDeleteApiClientsByIdMutation();

  const handleDelete = async () => {
    const response = await deleteClient({ id: `${client.id}` });

    if ("error" in response && response.error) {
      toast.error(getMutationErrorMessage(response.error));
    } else if ("data" in response && response.data) {
      toast.success(response.data.message);
      setWarn(false);
    }
  };

  return (
    <>
      <WarningModal
        open={warn}
        loading={isLoading}
        onOpenChange={setWarn}
        onConfirm={handleDelete}
        title="Delete client"
        subtitle="Are you sure you want to delete this client? Linked projects will be unlinked. This action cannot be undone."
        confirmText="Delete"
      />
      <article
        className={cn(
          "flex w-full shrink-0 flex-col rounded-xl border border-border bg-card p-5 shadow-sm",
          "transition-shadow duration-200 hover:shadow-md",
        )}
      >
        <div className="mb-4 flex items-center gap-3 border-border/80 border-b pb-4">
          {client.image ? (
            <img
              alt={client.clientName}
              src={client.image}
              className="size-10 shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-medium text-muted-foreground text-sm"
              aria-hidden
            >
              {client.clientName.charAt(0)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground text-sm">{client.clientName}</p>
            <p className="truncate text-muted-foreground text-xs">
              {client.designation}
              {client.company && ` · ${client.company}`}
            </p>
          </div>
        </div>
        <p className="line-clamp-3 text-foreground text-sm leading-relaxed" title={client.content}>
          {client.content}
        </p>
        {client.feedback?.trim() && (
          <p className="mt-3 line-clamp-2 text-muted-foreground text-xs leading-relaxed" title={client.feedback}>
            {client.feedback}
          </p>
        )}
        <div className="mt-5 grid w-full grid-cols-2 items-center justify-center gap-2.5 border-t pt-5">
          <ClientSheet id={client.id} />
          <Button type="button" variant="destructive" className="w-full" onClick={() => setWarn(true)}>
            Delete
          </Button>
        </div>
      </article>
    </>
  );
}
