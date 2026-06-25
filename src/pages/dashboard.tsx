import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your portfolio content.</p>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Project and testimonial management will be added in upcoming phases.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Use the sidebar to navigate between projects and testimonials. Your session is verified on each protected
            route.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
