import { useState } from "react";

import { Loader2, Plus } from "lucide-react";

import TestimonialCard from "@/components/testimonial/testimonial-card";
import TestimonialSheet from "@/components/testimonial/testimonial-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFetchTestimonialsQuery } from "@/store/services/testimonial";

const Testimonials = () => {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useFetchTestimonialsQuery({});

  return (
    <>
      <TestimonialSheet open={open} setOpen={setOpen} />
      <div className="flex w-full flex-col items-start justify-start gap-5 px-5 pb-5 xl:px-0">
        <div className="flex w-full flex-col items-center justify-center gap-2.5 md:flex-row md:gap-0">
          <span className="w-full text-left text-xl font-bold md:w-auto md:flex-1">
            Testimonials List
          </span>
          <div className="flex w-full items-center justify-center gap-2.5 md:w-auto">
            <Button
              onClick={() => setOpen(true)}
              type="button"
              variant="outline"
            >
              <Plus /> <span className="hidden md:flex">Add Testimonial</span>
            </Button>
            <Input
              type="text"
              value={query}
              className="h-[36.5px] w-full md:w-64"
              placeholder="Search by Client Name"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div
          className={cn(
            "grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
            {
              "h-[calc(100vh-175px)]": isLoading,
            }
          )}
        >
          {isLoading ? (
            <div className="col-span-1 flex h-full w-full items-center justify-center md:col-span-2 xl:col-span-3">
              <Loader2 className="size-10 animate-spin" />
            </div>
          ) : query ? (
            data
              ?.filter((testimonial) =>
                testimonial.client_name
                  .toLowerCase()
                  .includes(query.toLowerCase())
              )
              .map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  className="col-span-1"
                  testimonial={testimonial}
                />
              ))
          ) : (
            data?.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                className="col-span-1"
                testimonial={testimonial}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
