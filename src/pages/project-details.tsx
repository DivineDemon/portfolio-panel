import { useParams } from "react-router-dom";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Edit project</h1>
        <p className="text-muted-foreground text-sm">Update project {id}.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>The project edit wizard will be implemented in a later phase.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
