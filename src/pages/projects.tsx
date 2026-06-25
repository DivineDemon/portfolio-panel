import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Projects</h1>
        <p className="text-muted-foreground text-sm">Manage portfolio case studies and project entries.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>Project list, create, and edit flows will be implemented in a later phase.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
