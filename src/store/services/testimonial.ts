import { api } from "./core";

export const testimonialApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchTestimonials: build.query({
      query: () => ({
        url: "/testimonials",
        method: "GET",
      }),
      providesTags: ["Testimonials"],
    }),
    fetchTestimonial: build.query({
      query: (id: string) => ({
        url: `/testimonials/${id}`,
        method: "GET",
      }),
      providesTags: ["Testimonial"],
    }),
    postTestimonial: build.mutation({
      // Require Type
      query: (body) => ({
        url: "/testimonials",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Testimonials"],
    }),
    deleteTestimonial: build.mutation({
      query: (id: string) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonials"],
    }),
    updateTestimonial: build.mutation({
      query: ({ id, body }: { id: string; body: any }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Testimonials", "Testimonial"],
    }),
  }),
});

export const {
  useFetchTestimonialsQuery,
  useFetchTestimonialQuery,
  useDeleteTestimonialMutation,
  usePostTestimonialMutation,
  useUpdateTestimonialMutation,
} = testimonialApi;
