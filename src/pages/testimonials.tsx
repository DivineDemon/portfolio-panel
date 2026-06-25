import TestimonialSkeleton from "@/components/skeleton/testimonial-skeleton";
import TestimonialCard from "@/components/testimonial/testimonial-card";
import TestimonialSheet from "@/components/testimonial/testimonial-sheet";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetApiTestimonialsQuery } from "@/store/services/apis";

function getMutationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Failed to load testimonials";
}

export default function TestimonialsPage() {
  const { data: testimonials, isLoading, isError, error } = useGetApiTestimonialsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground text-sm">Manage client testimonials shown on your portfolio.</p>
        </div>
        <TestimonialSheet />
      </div>

      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <TestimonialSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load testimonials</CardTitle>
            <CardDescription>{getMutationErrorMessage(error)}</CardDescription>
          </CardHeader>
        </Card>
      ) : testimonials?.data.length === 0 ? (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>No testimonials yet</CardTitle>
            <CardDescription>Add your first client testimonial to build trust on your portfolio.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <TestimonialSheet />
          </div>
        </Card>
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials?.data.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
}
