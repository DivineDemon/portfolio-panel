import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Testimonials</h1>
        <p className="text-muted-foreground text-sm">Manage client testimonials shown on your portfolio.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>Testimonial list and sheet-based CRUD will be implemented in a later phase.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
