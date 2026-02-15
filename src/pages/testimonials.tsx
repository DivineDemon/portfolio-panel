import TestimonialSkeleton from "@/components/skeleton/testimonial-skeleton";
import TestimonialCard from "@/components/testimonial/testimonial-card";
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
          {testimonials?.data.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
