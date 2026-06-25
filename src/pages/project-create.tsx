import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectCreatePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">New project</h1>
        <p className="text-muted-foreground text-sm">Create a new portfolio project entry.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>The multi-step project wizard will be implemented in a later phase.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
