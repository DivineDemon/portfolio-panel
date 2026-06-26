import { Loader2, Unlink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  type GetApiQuickLinkApiResponse,
  useGetApiQuickLinkQuery,
  usePutApiQuickLinkMutation,
} from "@/store/services/apis";

type UnlinkedProject = GetApiQuickLinkApiResponse["data"]["unlinkedProjects"][number];
type LinkedProject = GetApiQuickLinkApiResponse["data"]["linkedProjects"][number];
type ClientOption = GetApiQuickLinkApiResponse["data"]["clients"][number];

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
}

function ProjectThumb({ title, coverImage, className }: { title: string; coverImage: string; className?: string }) {
  return (
    <div className={cn("relative size-12 shrink-0 overflow-hidden rounded-md border bg-muted", className)}>
      {coverImage ? (
        <img alt={title} src={coverImage} className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground text-xs">—</div>
      )}
    </div>
  );
}

function ClientAvatar({ client }: { client: { clientName: string; image: string | null } }) {
  return (
    <Avatar className="size-8">
      <AvatarImage alt={client.clientName} src={client.image ?? undefined} />
      <AvatarFallback>{client.clientName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}

function UnlinkedProjectRow({
  project,
  clients,
  onLinked,
}: {
  project: UnlinkedProject;
  clients: ClientOption[];
  onLinked: () => void;
}) {
  const [clientId, setClientId] = useState<string>("");
  const [linkProject, { isLoading }] = usePutApiQuickLinkMutation();

  const handleLink = async () => {
    if (!clientId) {
      toast.error("Select a client first.");
      return;
    }

    const response = await linkProject({
      body: { projectId: project.id, clientId: Number(clientId) },
    });

    if ("error" in response && response.error) {
      toast.error(getMutationErrorMessage(response.error));
      return;
    }

    if ("data" in response && response.data) {
      toast.success(response.data.message);
      setClientId("");
      onLinked();
    }
  };

  return (
    <div className="flex flex-col gap-3 border-border/80 border-b py-4 last:border-b-0 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <ProjectThumb title={project.title} coverImage={project.coverImage} />
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">{project.title}</p>
          <p className="truncate text-muted-foreground text-xs">
            {project.industry ?? "No industry"} · {project.headlineResult}
          </p>
        </div>
      </div>
      <div className="flex w-full items-center gap-2 sm:w-auto sm:min-w-[280px]">
        <Select value={clientId || undefined} onValueChange={setClientId} disabled={isLoading || clients.length === 0}>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder={clients.length === 0 ? "No clients" : "Select client"} />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={String(client.id)}>
                {client.clientName}
                {client.company ? ` · ${client.company}` : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" size="sm" disabled={isLoading || !clientId} onClick={() => void handleLink()}>
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Link"}
        </Button>
      </div>
    </div>
  );
}

function LinkedProjectRow({
  project,
  clients,
  onUpdated,
}: {
  project: LinkedProject;
  clients: ClientOption[];
  onUpdated: () => void;
}) {
  const [clientId, setClientId] = useState(String(project.clientId));
  const [linkProject, { isLoading }] = usePutApiQuickLinkMutation();

  const hasChange = clientId !== String(project.clientId);

  const applyLink = async (nextClientId: number | null) => {
    const response = await linkProject({
      body: { projectId: project.id, clientId: nextClientId },
    });

    if ("error" in response && response.error) {
      toast.error(getMutationErrorMessage(response.error));
      return false;
    }

    if ("data" in response && response.data) {
      toast.success(response.data.message);
      onUpdated();
      return true;
    }

    return false;
  };

  const handleUpdate = async () => {
    const parsed = clientId ? Number(clientId) : null;
    if (parsed === null) {
      toast.error("Choose a client or use Unlink.");
      return;
    }
    await applyLink(parsed);
  };

  const handleUnlink = async () => {
    const ok = await applyLink(null);
    if (ok) setClientId("");
  };

  return (
    <div className="flex flex-col gap-3 border-border/80 border-b py-4 last:border-b-0 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <ProjectThumb title={project.title} coverImage={project.coverImage} />
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">{project.title}</p>
          <div className="mt-1 flex items-center gap-2">
            <ClientAvatar client={project.client} />
            <p className="truncate text-muted-foreground text-xs">
              {project.client.clientName}
              {project.client.company ? ` · ${project.client.company}` : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
        <Select value={clientId || undefined} onValueChange={setClientId} disabled={isLoading}>
          <SelectTrigger className="w-full min-w-[200px] sm:w-[220px]">
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={String(client.id)}>
                {client.clientName}
                {client.company ? ` · ${client.company}` : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={isLoading || !hasChange}
          onClick={() => void handleUpdate()}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Update"}
        </Button>
        <Button type="button" size="sm" variant="outline" disabled={isLoading} onClick={() => void handleUnlink()}>
          <Unlink className="size-4" />
          Unlink
        </Button>
      </div>
    </div>
  );
}

function QuickLinkSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {[0, 1].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[0, 1, 2].map((j) => (
              <div key={j} className="flex items-center gap-3">
                <Skeleton className="size-12 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function QuickLinkPage() {
  const { data, isLoading, isError, error, refetch } = useGetApiQuickLinkQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-96" />
        </div>
        <QuickLinkSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unable to load quick link data</CardTitle>
          <CardDescription>{getMutationErrorMessage(error)}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { unlinkedProjects, linkedProjects, clients } = data.data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Quick Link</h1>
        <p className="text-muted-foreground text-sm">
          Link existing projects to clients without opening the full project editor.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary">{unlinkedProjects.length} unlinked</Badge>
          <Badge variant="outline">{linkedProjects.length} linked</Badge>
          <Badge variant="outline">{clients.length} clients</Badge>
        </div>
      </div>

      {clients.length === 0 && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No clients yet</CardTitle>
            <CardDescription>Add clients first, then return here to link them to projects.</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="min-h-[320px]">
          <CardHeader>
            <CardTitle>Unlinked projects</CardTitle>
            <CardDescription>Projects without a client. Pick a client and click Link.</CardDescription>
          </CardHeader>
          <CardContent>
            {unlinkedProjects.length === 0 ? (
              <p className="text-muted-foreground text-sm">All projects are linked to a client.</p>
            ) : (
              unlinkedProjects.map((project) => (
                <UnlinkedProjectRow
                  key={project.id}
                  project={project}
                  clients={clients}
                  onLinked={() => void refetch()}
                />
              ))
            )}
          </CardContent>
        </Card>

        <Card className="min-h-[320px]">
          <CardHeader>
            <CardTitle>Linked projects</CardTitle>
            <CardDescription>Reassign a client or unlink a project.</CardDescription>
          </CardHeader>
          <CardContent>
            {linkedProjects.length === 0 ? (
              <p className="text-muted-foreground text-sm">No linked projects yet.</p>
            ) : (
              linkedProjects.map((project) => (
                <LinkedProjectRow
                  key={project.id}
                  project={project}
                  clients={clients}
                  onUpdated={() => void refetch()}
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {clients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
            <CardDescription>Overview of clients and how many projects each is linked to.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center gap-3 rounded-lg border border-border/80 bg-card p-3">
                  <ClientAvatar client={client} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">{client.clientName}</p>
                    <p className="truncate text-muted-foreground text-xs">
                      {client.designation}
                      {client.company ? ` · ${client.company}` : ""}
                    </p>
                  </div>
                  <Badge variant={client.linkedProjectCount > 0 ? "default" : "outline"}>
                    {client.linkedProjectCount}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
