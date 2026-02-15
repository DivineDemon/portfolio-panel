import TestimonialSkeleton from "@/components/skeleton/testimonial-skeleton";
import TestimonialCard from "@/components/testimonial/testimonial-card";
import TestimonialSheet from "@/components/testimonial/testimonial-sheet";
import { useGetApiTestimonialsQuery } from "@/store/services/apis";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useGetApiTestimonialsQuery();

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5 overflow-y-auto">
      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <TestimonialSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <div className="sticky top-0 col-span-1 flex w-full items-center justify-end border-b bg-background pb-5 md:col-span-2">
            <TestimonialSheet />
          </div>
          {testimonials?.data.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
